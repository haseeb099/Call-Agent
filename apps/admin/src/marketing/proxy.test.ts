import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

import { marketingProxy } from "./proxy";
import { resolveMarketingRoute } from "./routing";

const env = { MARKETING_HOSTS: "ringwise.example,www.ringwise.example", NODE_ENV: "production" };

function visit(url: string, headers: Record<string, string> = {}, method = "GET") {
  return marketingProxy(new NextRequest(url, { headers: { "user-agent": "Mozilla/5.0", ...headers }, method }), env);
}

function rewrittenPath(response: Response | null): string | null {
  const target = response?.headers.get("x-middleware-rewrite");
  return target ? new URL(target).pathname : null;
}

afterEach(() => vi.unstubAllEnvs())

describe("host routing", () => {
  it("leaves every host to the dashboard proxy when the build left the site out", () => {
    vi.stubEnv("MARKETING_SITE_BUILT", "false")
    expect(visit("https://ringwise.example/pricing/")).toBeNull()
    expect(visit("https://www.ringwise.example/")).toBeNull()
  })

  it("leaves every other host to the dashboard proxy", () => {
    expect(visit("https://app.ringwise.example/pricing/")).toBeNull();
    expect(marketingProxy(new NextRequest("https://ringwise.example/"), {})).toBeNull();
  });

  it.each([
    ["https://www.ringwise.example/solutions/self-hosted-ai-receptionist/?utm_source=test", "https://ringwise.example/solutions/self-hosted-ai-receptionist/?utm_source=test"],
    ["https://www.ringwise.example/pricing", "https://ringwise.example/pricing/"],
    ["https://www.ringwise.example/llms.txt", "https://ringwise.example/llms.txt"],
    ["https://www.ringwise.example/feed.xml", "https://ringwise.example/feed.xml"],
    ["https://www.ringwise.example/index.md", "https://ringwise.example/index.md"],
  ])("sends %s to the canonical host in one redirect", (from, to) => {
    const response = visit(from);
    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(to);
  });

  it("reads the host from the Host header, since the standalone server puts its own address in request.url", () => {
    const response = marketingProxy(new NextRequest("http://127.0.0.1:3000/pricing", { headers: { host: "ringwise.example" } }), env);
    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe("https://ringwise.example/pricing/");
  });

  it("rewrites within the server's own origin so Next.js doesn't fetch the page over HTTP", () => {
    const response = marketingProxy(new NextRequest("http://localhost:3000/pricing/", { headers: { host: "ringwise.example", "accept-language": "en" } }), env);
    expect(response?.headers.get("x-middleware-rewrite")).toBe("http://localhost:3000/site/en/pricing");
  });

  it("keeps a local dev host on plain HTTP and its port", () => {
    const response = marketingProxy(new NextRequest("http://www.ringwise.localhost:13000/pricing"), {
      MARKETING_HOSTS: "ringwise.localhost,www.ringwise.localhost",
    });
    expect(response?.headers.get("location")).toBe("http://ringwise.localhost:13000/pricing/");
  });
});

describe("internal routes", () => {
  it.each([
    ["/", "/site/en"],
    ["/pricing/", "/site/en/pricing"],
    ["/fr/", "/site/fr"],
    ["/sr/blog/openai-voices/", "/site/sr/blog/openai-voices"],
    ["/feed.xml", "/site/en/feed.xml"],
    ["/robots.txt", "/site/en/robots.txt"],
    ["/sitemap-index.xml", "/marketing-sitemaps/sitemap-index.xml"],
    ["/sitemap-blog-0.xml", "/marketing-sitemaps/sitemap-blog-0.xml"],
    ["/og/blog/fr/openai-voices.jpg", "/site/en/og/blog/fr/openai-voices.jpg"],
    ["/.well-known/agent-skills/ringwise-discovery/SKILL.md", "/site/en/.well-known/agent-skills/ringwise-discovery/SKILL.md"],
    ["/api/status", "/site/en/api/status"],
    ["/pricing.md", "/site/en/md/pricing"],
    ["/fr/index.md", "/site/fr/md/index"],
    ["/blog/openai-voices.md", "/site/en/md/blog/openai-voices"],
  ])("rewrites %s to %s", (pathname, internal) => {
    expect(rewrittenPath(visit(`https://ringwise.example${pathname}`, { "accept-language": "en" }))).toBe(internal);
  });

  it("leaves static files to public/", () => {
    for (const pathname of ["/illustrations/hero.webp", "/favicon.svg", "/webmcp.js", "/pagefind/pagefind.js", "/_next/hmr", "/__nextjs_original-stack-frames"]) {
      const response = visit(`https://ringwise.example${pathname}`);
      expect(rewrittenPath(response)).toBeNull();
      expect(response?.headers.get("x-middleware-next")).toBe("1");
    }
  });

  it("serves the IndexNow key file only when the key is configured", () => {
    expect(resolveMarketingRoute("/abc123.txt", "abc123")).toEqual({ kind: "page", locale: "en", internalPath: "/site/en/indexnow-key.txt" });
    expect(resolveMarketingRoute("/abc123.txt")).toEqual({ kind: "asset" });
  });

  it("does not expose the internal segment on its public path", () => {
    expect(rewrittenPath(visit("https://ringwise.example/site/en/"))).toBe("/site/en/site/en");
  });

  it.each(["/pricing", "/fr", "/fr/pricing", "/blog/openai-voices"])("adds the trailing slash to %s", (pathname) => {
    const response = visit(`https://ringwise.example${pathname}?ref=x`);
    expect(response?.status).toBe(301);
    expect(response?.headers.get("location")).toBe(`https://ringwise.example${pathname}/?ref=x`);
  });

  it("sends the marketing policy, not the dashboard's", () => {
    const response = visit("https://ringwise.example/", { "accept-language": "en" });
    expect(response?.headers.get("content-security-policy")).toContain("connect-src 'self' https://app.ringwise.example");
    expect(response?.headers.get("content-security-policy")).toContain("https://static.cloudflareinsights.com");
    expect(response?.headers.get("strict-transport-security")).toBe("max-age=31536000; includeSubDomains; preload");
    expect(response?.headers.get("cache-control")).toBe("public, max-age=0, must-revalidate");
  });
});

describe("language redirects", () => {
  it.each([
    ["fr-CA,fr;q=0.9,en;q=0.5", "/pricing/", "/fr/pricing/"],
    ["es-MX,es;q=0.9", "/pricing/", "/es/pricing/"],
    ["sr-Latn-RS,sr;q=0.9,en;q=0.4", "/", "/sr/"],
    ["de-DE,es;q=0.6,en;q=0.5", "/features/", "/es/features/"],
  ])("sends %s visitors from %s to %s", (acceptLanguage, from, to) => {
    const response = visit(`https://ringwise.example${from}`, { "accept-language": acceptLanguage });
    expect(response?.status).toBe(302);
    expect(response?.headers.get("location")).toBe(`https://ringwise.example${to}`);
    expect(response?.headers.get("vary")).toBe("Accept-Language, Cookie");
    expect(response?.headers.get("cache-control")).toBe("private, no-store");
  });

  it("still negotiates first visits that carry unrelated cookies", () => {
    const response = visit("https://ringwise.example/pricing/", { "accept-language": "fr-CA,fr;q=0.9", cookie: "ph_session=abc; ringwise.locale=de" });
    expect(response?.headers.get("location")).toBe("https://ringwise.example/fr/pricing/");
  });

  it.each([
    ["fr-CA,fr;q=0.9", "/pricing/"],
    ["es-MX,es;q=0.9", "/"],
    ["sr-Latn-RS,sr;q=0.9", "/features/"],
  ])("keeps %s visitors who picked English on %s", (acceptLanguage, pathname) => {
    const response = visit(`https://ringwise.example${pathname}`, { "accept-language": acceptLanguage, cookie: "ph_session=abc; ringwise.locale=en" });
    expect(response?.status).toBe(200);
    expect(rewrittenPath(response)).not.toBeNull();
  });

  it.each([
    ["es-MX,es;q=0.9", "fr", "/pricing/", "/fr/pricing/"],
    ["fr-CA,fr;q=0.9", "es", "/", "/es/"],
    ["en-US,fr;q=0.8", "sr", "/features/", "/sr/features/"],
  ])("sends %s visitors who picked %s from %s to %s", (acceptLanguage, choice, from, to) => {
    const response = visit(`https://ringwise.example${from}`, { "accept-language": acceptLanguage, cookie: `ringwise.locale=${choice}` });
    expect(response?.status).toBe(302);
    expect(response?.headers.get("location")).toBe(`https://ringwise.example${to}`);
  });

  it("leaves localized, untranslated, crawler, and non-page requests alone", () => {
    expect(visit("https://ringwise.example/pricing/", { "accept-language": "en-US,es;q=0.5" })?.status).toBe(200);
    expect(visit("https://ringwise.example/sr/pricing/", { "accept-language": "es-MX,es;q=0.9", cookie: "ringwise.locale=sr" })?.status).toBe(200);
    expect(visit("https://ringwise.example/es/pricing/", { "accept-language": "sr" })?.status).toBe(200);
    expect(visit("https://ringwise.example/pricing/", { "accept-language": "es", "user-agent": "Googlebot/2.1" })?.status).toBe(200);
    expect(visit("https://ringwise.example/feed.xml", { "accept-language": "fr" })?.status).toBe(200);
    expect(visit("https://ringwise.example/pricing.md", { "accept-language": "fr" })?.status).toBe(200);
    expect(visit("https://ringwise.example/pricing/", { "accept-language": "fr" }, "POST")?.status).toBe(200);
  });
});

describe("homepage Markdown negotiation", () => {
  it.each([
    ["/", "/site/en/md/index"],
    ["/fr/", "/site/fr/md/index"],
  ])("serves the Markdown twin of %s", (pathname, internal) => {
    const response = visit(`https://ringwise.example${pathname}`, { accept: "text/markdown", "accept-language": "en" });
    expect(rewrittenPath(response)).toBe(internal);
    expect(response?.headers.get("vary")).toBe("Accept");
  });
});

describe("headers and redirects from the Pages site", () => {
  it("links the discovery resources and the page's Markdown twin", () => {
    const pricing = visit("https://ringwise.example/pricing/", { "accept-language": "en" })
    expect(pricing?.headers.get("link")).toMatch(/^<\/pricing\.md>; rel="alternate"; type="text\/markdown", <\/\.well-known\/api-catalog>; rel="api-catalog"/)
    expect(pricing?.headers.get("content-signal")).toBe("ai-train=yes, search=yes, ai-input=yes")
    expect(pricing?.headers.get("no-vary-search")).toContain('"utm_source"')
    expect(pricing?.headers.get("x-robots-tag")).toBeNull()
    expect(visit("https://ringwise.example/fr/pricing/")?.headers.get("link")).toMatch(/^<\/\.well-known\/api-catalog>/)
  })

  it.each(["/privacy/", "/sr/terms/", "/search/", "/pricing.md", "/schema/page.json", "/schemamap.xml", "/.well-known/api-catalog"])(
    "keeps %s out of search results",
    (pathname) => {
      expect(visit(`https://ringwise.example${pathname}`, { "accept-language": "en" })?.headers.get("x-robots-tag")).toBe("noindex, follow")
    }
  )

  it("caches social cards and images", () => {
    expect(visit("https://ringwise.example/og/pricing.jpg")?.headers.get("cache-control")).toBe("public, max-age=31536000, immutable")
    expect(visit("https://ringwise.example/illustrations/hero.webp")?.headers.get("cache-control")).toBe("public, max-age=604800")
    expect(visit("https://ringwise.example/webmcp.js")?.headers.get("cache-control")).toBe("public, max-age=3600")
  })

  it.each(["/", "/fr/pricing/", "/blog/upfirst-alternative/", "/pricing.md", "/feed.xml", "/sitemap-index.xml", "/robots.txt"])(
    "lets Cloudflare keep %s at its edge for five minutes",
    (pathname) => {
      const response = visit(`https://ringwise.example${pathname}`, { "accept-language": "en" })
      expect(response?.headers.get("cloudflare-cdn-cache-control")).toBe("max-age=300, stale-while-revalidate=86400")
      expect(response?.headers.get("cache-control")).toBe("public, max-age=0, must-revalidate")
    }
  )

  it("caches the search index for good and its loader like a page", () => {
    for (const pathname of ["/pagefind/fragment/en_11c0ebb.pf_fragment", "/pagefind/index/en_35798bb.pf_index", "/pagefind/pagefind.en_477d279c50.pf_meta"]) {
      const response = visit(`https://ringwise.example${pathname}`)
      expect(response?.headers.get("cache-control")).toBe("public, max-age=31536000, immutable")
      expect(response?.headers.get("cloudflare-cdn-cache-control")).toBeNull()
    }
    for (const pathname of ["/pagefind/pagefind.js", "/pagefind/pagefind-entry.json", "/pagefind/wasm.en.pagefind"]) {
      expect(visit(`https://ringwise.example${pathname}`)?.headers.get("cloudflare-cdn-cache-control")).toBe("max-age=300, stale-while-revalidate=86400")
    }
  })

  it("sends /favicon.ico to the SVG icon", () => {
    const response = visit("https://ringwise.example/favicon.ico")
    expect(response?.status).toBe(301)
    expect(response?.headers.get("location")).toBe("https://ringwise.example/favicon.svg")
  })

  it("lets Cloudflare keep the homepage's Markdown twin", () => {
    const response = visit("https://ringwise.example/", { accept: "text/markdown", "accept-language": "en" })
    expect(response?.headers.get("cloudflare-cdn-cache-control")).toBe("max-age=300, stale-while-revalidate=86400")
  })

  it("leaves redirects, social cards and static files to their own cache headers", () => {
    expect(visit("https://ringwise.example/pricing/", { "accept-language": "fr" })?.headers.get("cloudflare-cdn-cache-control")).toBeNull()
    expect(visit("https://www.ringwise.example/pricing/")?.headers.get("cloudflare-cdn-cache-control")).toBeNull()
    expect(visit("https://ringwise.example/comparison")?.headers.get("cloudflare-cdn-cache-control")).toBeNull()
    expect(visit("https://ringwise.example/og/pricing.jpg")?.headers.get("cloudflare-cdn-cache-control")).toBeNull()
    expect(visit("https://ringwise.example/illustrations/hero.webp")?.headers.get("cloudflare-cdn-cache-control")).toBeNull()
  })

  it.each([
    ["/comparison", "/blog/"],
    ["/fr/comparison/", "/fr/blog/"],
    ["/compare/ai-receptionist-vs-voicemail", "/blog/ai-receptionist-vs-voicemail/"],
    ["/blog/fintech-documentation-scales/", "/blog/"],
  ])("sends the retired %s to %s", (from, to) => {
    const response = visit(`https://ringwise.example${from}`)
    expect(response?.status).toBe(301)
    expect(response?.headers.get("location")).toBe(`https://ringwise.example${to}`)
  })
})
