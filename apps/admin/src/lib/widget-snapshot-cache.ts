import { redisSnapshotCache, type SnapshotCacheClient } from "@ringwise/domain";

import { getRedis } from "./redis";

export const getAdminSnapshotCache = (): SnapshotCacheClient => redisSnapshotCache(getRedis);
