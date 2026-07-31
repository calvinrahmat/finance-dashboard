import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
import { categorySpend } from "../data/mockData";
import { formatCurrency, formatCompactCurrency } from "../lib/format";

const SERIES_COLORS = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
  "var(--series-5)",
  "var(--series-6)",
];

const data = [...categorySpend].sort((a, b) => b.amount - a.amount);

export function CategoryBreakdown() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <h2 className="text-sm font-semibold text-[var(--text-primary)]">
        Spending by category
      </h2>
      <p className="text-xs text-[var(--text-muted)]">This month</p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 64, left: 8, bottom: 4 }}
            barCategoryGap={12}
          >
            <CartesianGrid horizontal={false} stroke="var(--gridline)" />
            <XAxis
              type="number"
              domain={[0, (max: number) => max * 1.15]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickFormatter={(v: number) => formatCompactCurrency(v)}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              width={110}
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]} maxBarSize={18}>
              {data.map((entry, i) => (
                <Cell key={entry.category} fill={SERIES_COLORS[i % SERIES_COLORS.length]} />
              ))}
              <LabelList
                dataKey="amount"
                position="right"
                formatter={(v) => (typeof v === "number" ? formatCurrency(v) : "")}
                style={{ fill: "var(--text-primary)", fontSize: 12, fontVariantNumeric: "tabular-nums" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
