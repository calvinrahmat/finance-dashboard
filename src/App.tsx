import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { KpiRow } from "./components/KpiRow";
import { CashFlowChart } from "./components/CashFlowChart";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { BudgetMeters } from "./components/BudgetMeters";
import { TransactionsTable } from "./components/TransactionsTable";
import { ExchangeRateWidget } from "./components/ExchangeRateWidget";

function App() {
  return (
    <div className="flex min-h-screen bg-[var(--page)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex flex-col gap-4 p-6">
          <KpiRow />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <CashFlowChart />
            </div>
            <CategoryBreakdown />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <TransactionsTable />
            </div>
            <div className="flex flex-col gap-4">
              <BudgetMeters />
              <ExchangeRateWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
