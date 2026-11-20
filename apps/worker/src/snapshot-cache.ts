import { redisSnapshotCache, type SnapshotCacheClient } from "@ringwise/domain";

import { createRedisConnection } from "@ringwise/jobs";

let store: ReturnType<typeof createRedisConnection> | undefined;

export function getWorkerSnapshotCache(): SnapshotCacheClient {
  if (!store) {
    store = createRedisConnection({ prefix: process.env.REDIS_PREFIX ?? "ringwise" });
    store.on("error", () => undefined);
  }
  const connection = store;
  return redisSnapshotCache(() => connection);
}
