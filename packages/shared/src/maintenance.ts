/** Maintenance is deliberately opt-in; any value other than the exact flag keeps normal operation. */
export function isMaintenanceMode(environment: Readonly<Record<string, string | undefined>>): boolean {
  return environment.RINGWISE_MAINTENANCE_MODE === "true";
}
