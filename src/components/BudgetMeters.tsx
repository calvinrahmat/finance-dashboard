import { AlertTriangle } from "lucide-react";
import { budgets } from "../data/mockData";
import { formatCurrency } from "../lib/format";

export function BudgetMeters() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <h2 className="text-sm font-semibold text-[var(--text-primary)]">
        Budgets
      </h2>
      <p className="text-xs text-[var(--text-muted)]">Spent vs. monthly limit</p>

      <div className="mt-4 flex flex-col gap-4">
        {budgets.map((b) => {
          const pct = Math.min(b.spent / b.limit, 1);
          const isOver = b.spent > b.limit;
          return (
            <div key={b.category}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--text-primary)]">
                  {b.category}
                </span>
                <span className="tabular-nums text-[var(--text-secondary)]">
                  {formatCurrency(b.spent)}{" "}
                  <span className="text-[var(--text-muted)]">/ {formatCurrency(b.limit)}</span>
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--page)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct * 100}%`,
                    background: isOver ? "var(--status-critical)" : "var(--series-1)",
                  }}
                />
              </div>
              {isOver && (
                <div className="mt-1 flex items-center gap-1 text-xs font-medium" style={{ color: "var(--status-critical)" }}>
                  <AlertTriangle size={12} />
                  Over budget by {formatCurrency(b.spent - b.limit)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
