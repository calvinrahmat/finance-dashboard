import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";

type StatTileProps = {
  label: string;
  value: string;
  deltaPct: number;
  icon: LucideIcon;
  sparkline?: number[];
};

export function StatTile({ label, value, deltaPct, icon: Icon, sparkline }: StatTileProps) {
  const isPositive = deltaPct >= 0;
  const deltaColor = isPositive ? "var(--success-text)" : "var(--status-critical)";
  const DeltaIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const sparkData = sparkline?.map((v, i) => ({ i, v }));

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--series-1)]/10 text-[var(--series-1)]">
          <Icon size={16} />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <p className="tabular-nums text-2xl font-semibold text-[var(--text-primary)]">
          {value}
        </p>
        {sparkData && (
          <div className="h-8 w-16 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="var(--series-1)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium tabular-nums"
        style={{ color: deltaColor }}
      >
        <DeltaIcon size={13} />
        {Math.abs(deltaPct).toFixed(1)}%
        <span className="font-normal text-[var(--text-muted)]">vs last month</span>
      </div>
    </div>
  );
}
