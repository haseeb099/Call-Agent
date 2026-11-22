import type {
  DeploymentMode,
  TelemetryEventName,
  TelemetryProperties,
} from "@ringwise/telemetry";
import { createTelemetryRecorder } from "@ringwise/telemetry/testing";
import type { BrowserTelemetry } from "@ringwise/telemetry/browser";

const TEST_DEPLOYMENT_MODE: DeploymentMode = "development";

/**
 * Builds a BrowserTelemetry stand-in that validates every tracked event against
 * the shared registry, mirroring how createBrowserTelemetry injects
 * deploymentMode before capture.
 */
export function createRecordedBrowserTelemetry() {
  const recorder = createTelemetryRecorder();
  const telemetry: BrowserTelemetry = {
    track(event: TelemetryEventName, properties: TelemetryProperties = {}) {
      recorder.record({
        name: event,
        deploymentMode: TEST_DEPLOYMENT_MODE,
        properties: { deploymentMode: TEST_DEPLOYMENT_MODE, ...properties },
      });
    },
    identify() {},
    reset() {},
    setOptOut() {},
    setSensitiveRoute() {},
    setDeploymentMode() {},
  };
  return { telemetry, events: recorder.events, expectEvent: recorder.expectEvent };
}
