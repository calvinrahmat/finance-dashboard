import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Wallet,
  Settings,
  Landmark,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Transactions", icon: ArrowLeftRight, active: false },
  { label: "Budgets", icon: PiggyBank, active: false },
  { label: "Accounts", icon: Wallet, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface-1)] px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--series-1)] text-white">
          <Landmark size={18} />
        </div>
        <span className="text-[15px] font-semibold text-[var(--text-primary)]">
          Northwind Finance
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[var(--series-1)]/10 text-[var(--series-1)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--page)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-lg border border-[var(--border)] bg-[var(--page)] p-3">
        <p className="text-xs font-medium text-[var(--text-primary)]">
          Checking •••• 4821
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          Synced 2 minutes ago
        </p>
      </div>
    </aside>
  );
}
