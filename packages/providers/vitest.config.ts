import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("../../", import.meta.url));

export default defineConfig({
  resolve: { alias: {
    "@ringwise/shared": `${root}/packages/shared/src/index.ts`,
    "@ringwise/telemetry/node": `${root}/packages/telemetry/src/node.ts`,
    "@ringwise/telemetry": `${root}/packages/telemetry/src/index.ts`,
  } },
  test: { include: ["src/**/*.test.{ts,tsx}"] },
});
