import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import { cashFlow } from "../data/mockData";
import { formatCurrency, formatCompactCurrency } from "../lib/format";

function CashFlowTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-[var(--text-muted)]">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey as string}
          className="tabular-nums text-sm font-medium text-[var(--text-primary)]"
        >
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
            style={{ background: entry.color }}
          />
          {entry.name}: {formatCurrency(entry.value as number)}
        </p>
      ))}
    </div>
  );
}

export function CashFlowChart() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Cash flow
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Income vs. expenses, last 6 months
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--series-1)]" />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--series-2)]" />
            Expenses
          </span>
        </div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cashFlow} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--series-1)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--series-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expensesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--series-2)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--series-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--gridline)" />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "var(--baseline)" }}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickFormatter={(v: number) => formatCompactCurrency(v)}
              width={48}
            />
            <Tooltip
              content={(props) => <CashFlowTooltip {...props} />}
              cursor={{ stroke: "var(--baseline)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="var(--series-1)"
              strokeWidth={2}
              fill="url(#incomeFill)"
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="var(--series-2)"
              strokeWidth={2}
              fill="url(#expensesFill)"
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
