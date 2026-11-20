import { describe, expect, it, vi } from "vitest";

import { marketingSessionResponse, marketingSiteOrigin } from "./marketing-session";

const production = { NODE_ENV: "production", MARKETING_HOSTS: "ringwise.example,www.ringwise.example" };
const local = { NODE_ENV: "production", MARKETING_HOSTS: "ringwise.localhost" };

function request(origin?: string) {
  return new Request("https://app.ringwise.example/api/marketing/session", {
    headers: { ...(origin ? { origin } : {}), cookie: "__Secure-better-auth.session_token=abc" },
  });
}

describe("marketingSiteOrigin", () => {
  it("accepts the marketing hosts over https", () => {
    expect(marketingSiteOrigin("https://ringwise.example", production)).toBe("https://ringwise.example");
    expect(marketingSiteOrigin("https://www.ringwise.example", production)).toBe("https://www.ringwise.example");
  });

  it("refuses other hosts, plain http in production, and malformed origins", () => {
    expect(marketingSiteOrigin("https://evil.example", production)).toBeNull();
    expect(marketingSiteOrigin("https://ringwise.example.evil.example", production)).toBeNull();
    expect(marketingSiteOrigin("http://ringwise.example", production)).toBeNull();
    expect(marketingSiteOrigin("null", production)).toBeNull();
    expect(marketingSiteOrigin("https://ringwise.example/path", production)).toBeNull();
    expect(marketingSiteOrigin(null, production)).toBeNull();
    expect(marketingSiteOrigin("https://ringwise.example", { NODE_ENV: "production" })).toBeNull();
  });

  it("accepts a local marketing host over http", () => {
    expect(marketingSiteOrigin("http://ringwise.localhost:13000", local)).toBe("http://ringwise.localhost:13000");
    expect(marketingSiteOrigin("http://localhost:13000", local)).toBeNull();
  });
});

describe("marketingSessionResponse", () => {
  it("tells a marketing host whether the visitor is signed in, and nothing more", async () => {
    const isSignedIn = vi.fn(async (_headers: Headers) => true);
    const response = await marketingSessionResponse(request("https://ringwise.example"), isSignedIn, production);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ signedIn: true });
    expect(response.headers.get("access-control-allow-origin")).toBe("https://ringwise.example");
    expect(response.headers.get("access-control-allow-credentials")).toBe("true");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("vary")).toBe("origin");
    expect(isSignedIn.mock.calls[0]?.[0]?.get("cookie")).toContain("session_token");
  });

  it("answers signed out when the session lookup fails", async () => {
    const response = await marketingSessionResponse(request("https://ringwise.example"), async () => { throw new Error("down"); }, production);
    expect(await response.json()).toEqual({ signedIn: false });
  });

  it("refuses any other origin without looking up the session", async () => {
    const isSignedIn = vi.fn(async () => true);
    for (const origin of ["https://evil.example", undefined]) {
      const response = await marketingSessionResponse(request(origin), isSignedIn, production);
      expect(response.status).toBe(403);
      expect(response.headers.get("access-control-allow-origin")).toBeNull();
      expect(await response.text()).toBe("");
    }
    expect(isSignedIn).not.toHaveBeenCalled();
  });
});
