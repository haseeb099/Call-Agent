import { realtimeEventSchema, type RealtimeEvent } from "@ringwise/contracts";

export function parseRealtimeMessage(rawMessage: string, businessId: string): RealtimeEvent | null {
  try {
    const parsed = realtimeEventSchema.safeParse(JSON.parse(rawMessage) as unknown);
    return parsed.success && parsed.data.businessId === businessId ? parsed.data : null;
  } catch {
    return null;
  }
}
