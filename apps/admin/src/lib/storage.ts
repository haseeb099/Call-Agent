import { createStorageProvider, type RuntimeStorageProvider } from "@ringwise/providers/storage/provider";

import { configuredAppOrigins } from "./app-origins";

let storageProvider: RuntimeStorageProvider | undefined;

/** One provider per process, so SDK clients reuse their connection pools. */
export function getStorageProvider(): RuntimeStorageProvider {
  return storageProvider ??= createStorageProvider(process.env, { corsOrigins: configuredAppOrigins() });
}
