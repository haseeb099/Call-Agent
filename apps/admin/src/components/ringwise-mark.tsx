import { cn } from "@/lib/utils";

/** The Ringwise mark: a ring with a short receiver arc. Color follows currentColor. */
export function RingwiseMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={cn("size-8", className)} fill="none" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="2.6" fill="currentColor" />
      <path d="M23.2 10.4a10.2 10.2 0 0 1 2 6.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}
