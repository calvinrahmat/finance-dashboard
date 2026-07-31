import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-1)] px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">
          Overview
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Wednesday, July 29 · Last 6 months
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="search"
            placeholder="Search transactions"
            className="w-56 rounded-lg border border-[var(--border)] bg-[var(--page)] py-2 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]/40"
          />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--page)]"
        >
          <Bell size={16} />
        </button>
        <div className="h-9 w-9 rounded-full bg-[var(--series-7)] flex items-center justify-center text-white text-sm font-medium">
          CR
        </div>
      </div>
    </header>
  );
}
