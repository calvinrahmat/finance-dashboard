import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { StatTile } from "./StatTile";
import { kpis, cashFlow } from "../data/mockData";
import { formatCurrency, formatCompactCurrency } from "../lib/format";

export function KpiRow() {
  const incomeTrend = cashFlow.map((p) => p.income);
  const expenseTrend = cashFlow.map((p) => p.expenses);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        label="Total balance"
        value={formatCurrency(kpis.totalBalance.value)}
        deltaPct={kpis.totalBalance.deltaPct}
        icon={Wallet}
      />
      <StatTile
        label="Income"
        value={formatCompactCurrency(kpis.income.value)}
        deltaPct={kpis.income.deltaPct}
        icon={TrendingUp}
        sparkline={incomeTrend}
      />
      <StatTile
        label="Expenses"
        value={formatCompactCurrency(kpis.expenses.value)}
        deltaPct={kpis.expenses.deltaPct}
        icon={TrendingDown}
        sparkline={expenseTrend}
      />
      <StatTile
        label="Savings rate"
        value={`${kpis.savingsRate.value.toFixed(1)}%`}
        deltaPct={kpis.savingsRate.deltaPct}
        icon={PiggyBank}
      />
    </div>
  );
}
