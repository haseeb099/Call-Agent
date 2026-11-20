import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("../../", import.meta.url));
const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  oxc: { jsx: { runtime: "automatic" } },
  resolve: {
    alias: {
      "@ringwise/shared/product-capabilities": `${root}/packages/shared/src/product-capabilities.ts`,
      "@ringwise/shared/plan-cards": `${root}/packages/shared/src/planCards.ts`,
      "@ringwise/shared/plan-comparison": `${root}/packages/shared/src/planComparison.ts`,
      "@ringwise/shared": `${root}/packages/shared/src/index.ts`,
      "@ringwise/contracts": `${root}/packages/contracts/src/index.ts`,
      "@ringwise/db": `${root}/packages/db/src/index.ts`,
      "@ringwise/domain": `${root}/packages/domain/src/index.ts`,
      "@ringwise/jobs": `${root}/packages/jobs/src/index.ts`,
      "@ringwise/agent-core": `${root}/packages/agent-core/src`,
      "@ringwise/providers/calendar": `${root}/packages/providers/src/calendar.ts`,
      "@ringwise/providers/storage/local": `${root}/packages/providers/src/storage/local.ts`,
      "@ringwise/providers/crawling/urlSafety": `${root}/packages/providers/src/crawling/urlSafety.ts`,
      "@ringwise/providers/crypto/secretBox": `${root}/packages/providers/src/crypto/secretBox.ts`,
      "@ringwise/providers/crypto/signedPayload": `${root}/packages/providers/src/crypto/signedPayload.ts`,
      "@ringwise/providers/storage/provider": `${root}/packages/providers/src/storage/provider.ts`,
      "@ringwise/providers/stripe/stripeConnect": `${root}/packages/providers/src/stripe/stripeConnect.ts`,
      "@ringwise/providers/stripe/fakeStripeConnect": `${root}/packages/providers/src/stripe/fakeStripeConnect.ts`,
      "@ringwise/providers/telephony": `${root}/packages/providers/src/telephony`,
      "@ringwise/providers/telnyx": `${root}/packages/providers/src/telnyx`,
      "@ringwise/providers/twilio": `${root}/packages/providers/src/twilio`,
      "@ringwise/providers/twilio/webhookSecurity": `${root}/packages/providers/src/twilio/webhookSecurity.ts`,
      "@ringwise/telemetry/node": `${root}/packages/telemetry/src/node.ts`,
      "@ringwise/telemetry/browser": `${root}/packages/telemetry/src/browser.ts`,
      "@ringwise/telemetry/testing": `${root}/packages/telemetry/src/testing.ts`,
      "@ringwise/telemetry": `${root}/packages/telemetry/src/index.ts`,
      "@": src,
    },
  },
  test: {
    environment: "node",
    exclude: ["**/node_modules/**", "**/.git/**", "**/.next/**"],
    setupFiles: ["./vitest.setup.ts"],
    // Component suites drive user-event and route navigation; the 5s default is
    // flaky when all workspaces run concurrently under `pnpm -r test`.
    testTimeout: 20000,
    hookTimeout: 20000,
  },
});
