import { describe, expect, it } from "vitest";

import { roleDatabaseUrl } from "./playwright-database-url";

describe("roleDatabaseUrl", () => {
  it("prefers an explicitly configured role URL", () => {
    expect(roleDatabaseUrl(new URL("postgres://base:password@localhost/test"), "ringwise_app", "app", "postgres://ringwise_app:real@db/e2e"))
      .toBe("postgres://ringwise_app:real@db/e2e");
  });

  it("derives a local role URL only when no explicit role URL is configured", () => {
    expect(roleDatabaseUrl(new URL("postgres://base:password@localhost/test"), "ringwise_app", "app"))
      .toBe("postgres://ringwise_app:app@localhost/test");
  });
});
