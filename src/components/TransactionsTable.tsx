import { transactions } from "../data/mockData";
import { formatCurrency } from "../lib/format";

export function TransactionsTable() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Recent transactions
          </h2>
          <p className="text-xs text-[var(--text-muted)]">Last 8 transactions</p>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-[var(--series-1)] hover:underline"
        >
          View all
        </button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--text-muted)]">
              <th className="py-2 font-medium">Merchant</th>
              <th className="py-2 font-medium">Category</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 pr-1 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-[var(--border)] last:border-0">
                <td className="py-2.5 font-medium text-[var(--text-primary)]">
                  {t.merchant}
                  {t.status === "pending" && (
                    <span className="ml-2 rounded-full bg-[var(--status-warning)]/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[var(--text-secondary)]">
                      Pending
                    </span>
                  )}
                </td>
                <td className="py-2.5 text-[var(--text-secondary)]">{t.category}</td>
                <td className="py-2.5 text-[var(--text-muted)]">{t.date}</td>
                <td
                  className="tabular-nums py-2.5 pr-1 text-right font-medium"
                  style={{ color: t.amount >= 0 ? "var(--success-text)" : "var(--text-primary)" }}
                >
                  {t.amount >= 0 ? "+" : ""}
                  {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
