import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("../../", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@ringwise/agent-core": `${root}/packages/agent-core/src/index.ts`,
      "@ringwise/contracts": `${root}/packages/contracts/src/index.ts`,
      "@ringwise/db": `${root}/packages/db/src/index.ts`,
      "@ringwise/domain": `${root}/packages/domain/src/index.ts`,
      "@ringwise/jobs": `${root}/packages/jobs/src/index.ts`,
      "@ringwise/providers/ai/embeddingProvider": `${root}/packages/providers/src/ai/embeddingProvider.ts`,
      "@ringwise/providers/crawling/firecrawl": `${root}/packages/providers/src/crawling/firecrawl.ts`,
      "@ringwise/providers/crawling/urlSafety": `${root}/packages/providers/src/crawling/urlSafety.ts`,
      "@ringwise/providers/crypto/secretBox": `${root}/packages/providers/src/crypto/secretBox.ts`,
      "@ringwise/providers/crypto/signedPayload": `${root}/packages/providers/src/crypto/signedPayload.ts`,
      "@ringwise/providers/customHostnames/customHostnames": `${root}/packages/providers/src/customHostnames/customHostnames.ts`,
      "@ringwise/providers/customHostnames/fakeCustomHostnames": `${root}/packages/providers/src/customHostnames/fakeCustomHostnames.ts`,
      "@ringwise/providers/email/smtp": `${root}/packages/providers/src/email/smtp.ts`,
      "@ringwise/providers/calcom/calendar": `${root}/packages/providers/src/calcom/calendar.ts`,
      "@ringwise/providers/calendly/calendar": `${root}/packages/providers/src/calendly/calendar.ts`,
      "@ringwise/providers/calendar": `${root}/packages/providers/src/calendar.ts`,
      "@ringwise/providers/google/calendar": `${root}/packages/providers/src/google/calendar.ts`,
      "@ringwise/providers/instagram/instagram": `${root}/packages/providers/src/instagram/instagram.ts`,
      "@ringwise/providers/polar/polarBilling": `${root}/packages/providers/src/polar/polarBilling.ts`,
      "@ringwise/providers/stripe/fakeStripeConnect": `${root}/packages/providers/src/stripe/fakeStripeConnect.ts`,
      "@ringwise/providers/stripe/stripeConnect": `${root}/packages/providers/src/stripe/stripeConnect.ts`,
      "@ringwise/providers/storage/provider": `${root}/packages/providers/src/storage/provider.ts`,
      "@ringwise/providers/telephony": `${root}/packages/providers/src/telephony`,
      "@ringwise/providers/telnyx": `${root}/packages/providers/src/telnyx`,
      "@ringwise/providers/twilio": `${root}/packages/providers/src/twilio`,
      "@ringwise/providers/twilio/twilioProvider": `${root}/packages/providers/src/twilio/twilioProvider.ts`,
      "@ringwise/providers": `${root}/packages/providers/src/index.ts`,
      "@ringwise/shared": `${root}/packages/shared/src/index.ts`,
      "@ringwise/telemetry/node": `${root}/packages/telemetry/src/node.ts`,
      "@ringwise/telemetry": `${root}/packages/telemetry/src/index.ts`,
    },
  },
  test: {
    environment: "node",
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
});
