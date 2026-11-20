import { describe, expect, it, vi } from "vitest";

import { assertDatabaseRole, roleDatabaseUrl, type DatabaseClient } from "./client";

const DATABASE_URL = "postgresql://postgres:superuser@postgres.internal:5432/ringwise";

describe("effective database role assertion", () => {
  it.each(["ringwise_worker", "ringwise_dispatcher", "ringwise_app"] as const)("checks %s in production", async (role) => {
    const query = vi.fn().mockResolvedValue({ rows: [{ role, privileged: false }] });
    const client = { role, pool: { query } } as unknown as DatabaseClient;
    await expect(assertDatabaseRole(client, { NODE_ENV: "production" })).resolves.toBeUndefined();
    query.mockResolvedValue({ rows: [{ role: "postgres", privileged: true }] });
    await expect(assertDatabaseRole(client, { NODE_ENV: "production" })).rejects.toThrow("Database role assertion failed");
    query.mockResolvedValue({ rows: [{ role, privileged: true }] });
    await expect(assertDatabaseRole(client, { NODE_ENV: "production" })).rejects.toThrow("Database role assertion failed");
    query.mockResolvedValue({ rows: [{ role: "other", privileged: false }] });
    await expect(assertDatabaseRole(client, { NODE_ENV: "production" })).rejects.toThrow("Database role assertion failed");
  });

  it("allows privileged migrator bootstrap", async () => {
    const query = vi.fn();
    await assertDatabaseRole({ role: "ringwise_migrator", pool: { query } } as unknown as DatabaseClient, { NODE_ENV: "production" });
    expect(query).not.toHaveBeenCalled();
  });
});

describe("roleDatabaseUrl", () => {
  it("prefers an explicit role URL", () => {
    expect(
      roleDatabaseUrl("ringwise_app", {
        DATABASE_URL,
        RINGWISE_APP_DATABASE_URL: "postgresql://ringwise_app:explicit@db:5432/ringwise",
        RINGWISE_APP_PASSWORD: "ignored",
      }),
    ).toBe("postgresql://ringwise_app:explicit@db:5432/ringwise");
  });

  it("builds the role URL from DATABASE_URL and the role password", () => {
    expect(roleDatabaseUrl("ringwise_worker", { DATABASE_URL, RINGWISE_WORKER_PASSWORD: "w0rker" })).toBe(
      "postgresql://ringwise_worker:w0rker@postgres.internal:5432/ringwise",
    );
  });

  it("encodes passwords with reserved characters", () => {
    const url = new URL(roleDatabaseUrl("ringwise_auth", { DATABASE_URL, RINGWISE_AUTH_PASSWORD: "p@ss/word" }));
    expect(decodeURIComponent(url.password)).toBe("p@ss/word");
  });

  it("falls back to DATABASE_URL when the role has no password", () => {
    expect(roleDatabaseUrl("ringwise_dispatcher", { DATABASE_URL })).toBe(DATABASE_URL);
  });

  it("never derives the migrator URL from its password", () => {
    expect(roleDatabaseUrl("ringwise_migrator", { DATABASE_URL, RINGWISE_MIGRATOR_PASSWORD: "m" })).toBe(DATABASE_URL);
  });

  it("requires DATABASE_URL when no explicit role URL is set", () => {
    expect(() => roleDatabaseUrl("ringwise_app", { RINGWISE_APP_PASSWORD: "a" })).toThrow("DATABASE_URL is required");
  });
});
