import { afterEach, describe, expect, it, vi } from "vitest";

import {
  RINGWISE_CONTACT_EMAILS,
  brandLinks,
  contactEmailFor,
  invalidBrandLinkVariables,
  normalizeEmailAddress,
  normalizePageUrl,
  normalizeSiteUrl,
  resolveBrandLinks,
} from "./brandLinks";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("normalizeSiteUrl", () => {
  it("keeps http and https sites without the trailing slash", () => {
    expect(normalizeSiteUrl(" https://acme.example/ ")).toBe("https://acme.example");
    expect(normalizeSiteUrl("https://Example.com/docs/")).toBe("https://example.com/docs");
    expect(normalizeSiteUrl("http://localhost:13000")).toBe("http://localhost:13000");
  });

  it("refuses values a path can't be added to", () => {
    expect(normalizeSiteUrl("acme.example")).toBeNull();
    expect(normalizeSiteUrl("ftp://acme.example")).toBeNull();
    expect(normalizeSiteUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeSiteUrl("https://user:secret@acme.example")).toBeNull();
    expect(normalizeSiteUrl("https://acme.example/?ref=app")).toBeNull();
    expect(normalizeSiteUrl("https://acme.example/#top")).toBeNull();
    expect(normalizeSiteUrl("   ")).toBeNull();
    expect(normalizeSiteUrl(undefined)).toBeNull();
  });
});

describe("normalizePageUrl", () => {
  it("keeps a page's path, query and fragment", () => {
    expect(normalizePageUrl("https://acme.example/legal/terms")).toBe("https://acme.example/legal/terms");
    expect(normalizePageUrl("https://example.com/legal?doc=terms#top")).toBe("https://example.com/legal?doc=terms#top");
  });

  it("refuses anything but an http or https URL without credentials", () => {
    expect(normalizePageUrl("/legal/terms")).toBeNull();
    expect(normalizePageUrl("javascript:alert(1)")).toBeNull();
    expect(normalizePageUrl("https://user@acme.example/legal/terms")).toBeNull();
  });
});

describe("normalizeEmailAddress", () => {
  it("accepts plain addresses", () => {
    expect(normalizeEmailAddress(" support@acme.example ")).toBe("support@acme.example");
    expect(normalizeEmailAddress("first.last+help@mail.example.co.uk")).toBe("first.last+help@mail.example.co.uk");
  });

  it("refuses values that would break a mailto: link or a text", () => {
    expect(normalizeEmailAddress("support")).toBeNull();
    expect(normalizeEmailAddress("support@acme")).toBeNull();
    expect(normalizeEmailAddress("support@acme.example?subject=hi")).toBeNull();
    expect(normalizeEmailAddress("Support <support@acme.example>")).toBeNull();
    expect(normalizeEmailAddress("a b@acme.example")).toBeNull();
    expect(normalizeEmailAddress(42)).toBeNull();
  });
});

describe("resolveBrandLinks", () => {
  it("links to Ringwise's site, docs and addresses when nothing is set", () => {
    const links = resolveBrandLinks({});
    expect(links).toEqual({ siteUrl: "https://ringwise.example", termsUrl: null, privacyUrl: null, docsUrl: "https://docs.ringwise.example", contactEmail: null });
    expect(contactEmailFor(links, "support")).toBe("support@ringwise.example");
    expect(contactEmailFor(links, "sales")).toBe("hello@ringwise.example");
    expect(contactEmailFor(links, "sms")).toBe("hello@ringwise.example");
  });

  it("uses the deployment's own links and one address for every purpose", () => {
    const links = resolveBrandLinks({
      NEXT_PUBLIC_LANDING_SITE_URL: "https://acme.example",
      NEXT_PUBLIC_TERMS_URL: "https://acme.example/legal/terms",
      NEXT_PUBLIC_PRIVACY_URL: "https://acme.example/legal/privacy",
      NEXT_PUBLIC_DOCS_SITE_URL: "https://acme.example",
      NEXT_PUBLIC_CONTACT_EMAIL: "support@acme.example",
    });
    expect(links).toEqual({
      siteUrl: "https://acme.example",
      termsUrl: "https://acme.example/legal/terms",
      privacyUrl: "https://acme.example/legal/privacy",
      docsUrl: "https://acme.example",
      contactEmail: "support@acme.example",
    });
    for (const purpose of Object.keys(RINGWISE_CONTACT_EMAILS) as Array<keyof typeof RINGWISE_CONTACT_EMAILS>) {
      expect(contactEmailFor(links, purpose)).toBe("support@acme.example");
    }
  });

  it("falls back to Ringwise's link for an empty or unusable value, and names the unusable ones", () => {
    const environment = { NEXT_PUBLIC_LANDING_SITE_URL: "acme.example", NEXT_PUBLIC_DOCS_SITE_URL: "", NEXT_PUBLIC_CONTACT_EMAIL: "support at acme" };
    expect(resolveBrandLinks(environment)).toMatchObject({ siteUrl: "https://ringwise.example", docsUrl: "https://docs.ringwise.example", contactEmail: null });
    expect(invalidBrandLinkVariables(environment)).toEqual(["NEXT_PUBLIC_LANDING_SITE_URL", "NEXT_PUBLIC_CONTACT_EMAIL"]);
    expect(invalidBrandLinkVariables({ NEXT_PUBLIC_LANDING_SITE_URL: "https://acme.example", NEXT_PUBLIC_TERMS_URL: "  " })).toEqual([]);
  });
});

describe("brandLinks", () => {
  it("reads the deployment's variables from the environment", () => {
    vi.stubEnv("NEXT_PUBLIC_LANDING_SITE_URL", "https://acme.example/");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "support@acme.example");
    expect(brandLinks()).toMatchObject({ siteUrl: "https://acme.example", docsUrl: "https://docs.ringwise.example", contactEmail: "support@acme.example" });
  });
});
