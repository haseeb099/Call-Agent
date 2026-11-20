/** A drawn dashboard, so the homepage shows the Ringwise desk instead of a screenshot of another product. */
export function DashboardMock({ label }: { label: string }) {
  const calls = [
    ["Maya Chen", "Booked a cut · 2:30 PM", "Booked"],
    ["Northside HVAC", "Asked about after-hours", "Message"],
    ["Jordan Ellis", "Transferred to the owner", "Live"],
  ];
  return (
    <div aria-label={label} className="grid min-h-[22rem] bg-background text-foreground md:min-h-[28rem] md:grid-cols-[13.5rem_minmax(0,1fr)]" role="img">
      <aside className="hidden flex-col gap-4 bg-sidebar px-4 py-5 text-sidebar-foreground md:flex">
        <div className="flex items-center gap-2 px-1">
          <span className="grid size-8 place-items-center rounded-full border border-sidebar-primary text-sidebar-primary">
            <span className="size-2 rounded-full bg-sidebar-primary" />
          </span>
          <span className="font-heading text-lg leading-none">Ringwise</span>
        </div>
        <div className="mt-2 space-y-1 text-sm">
          {["Inbox", "Appointments", "Contacts", "Knowledge"].map((item, index) => (
            <div className={index === 0 ? "rounded-full bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground" : "px-3 py-2 text-sidebar-foreground/75"} key={item}>{item}</div>
          ))}
        </div>
      </aside>
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">Today</p>
            <p className="font-heading text-2xl leading-tight">Northside Plumbing</p>
          </div>
          <p className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">12 calls answered</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Answered", "12"],
            ["Booked", "7"],
            ["Missed", "0"],
          ].map(([name, value]) => (
            <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-[0_10px_24px_oklch(0.25_0.04_255/6%)]" key={name}>
              <p className="text-xs text-muted-foreground">{name}</p>
              <p className="font-heading text-3xl leading-none">{value}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {calls.map(([name, detail, state]) => (
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0" key={name}>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-medium text-secondary-foreground">{state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
