import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("../../", import.meta.url));

export default defineConfig({
  // Test against workspace sources: built packages nest their output under
  // dist/<package>/src, which their package.json entry points don't match.
  resolve: {
    alias: {
      "@ringwise/contracts": `${root}/packages/contracts/src/index.ts`,
      "@ringwise/db": `${root}/packages/db/src/index.ts`,
      "@ringwise/providers/telephony": `${root}/packages/providers/src/telephony`,
      "@ringwise/providers/telnyx": `${root}/packages/providers/src/telnyx`,
      "@ringwise/providers/twilio": `${root}/packages/providers/src/twilio`,
      "@ringwise/providers/calendar": `${root}/packages/providers/src/calendar.ts`,
      "@ringwise/domain": `${root}/packages/domain/src/index.ts`,
      "@ringwise/providers/crawling/urlSafety": `${root}/packages/providers/src/crawling/urlSafety.ts`,
      "@ringwise/providers/crypto/secretBox": `${root}/packages/providers/src/crypto/secretBox.ts`,
      "@ringwise/providers/crypto/signedPayload": `${root}/packages/providers/src/crypto/signedPayload.ts`,
      "@ringwise/shared": `${root}/packages/shared/src/index.ts`,
      "@ringwise/telemetry/node": `${root}/packages/telemetry/src/node.ts`,
      "@ringwise/telemetry": `${root}/packages/telemetry/src/index.ts`,
    },
  },
  test: { include: ["src/**/*.test.ts"] },
});
