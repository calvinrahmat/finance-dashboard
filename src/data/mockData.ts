export type CashFlowPoint = {
  month: string;
  income: number;
  expenses: number;
};

export const cashFlow: CashFlowPoint[] = [
  { month: "Feb", income: 8200, expenses: 5100 },
  { month: "Mar", income: 8200, expenses: 6400 },
  { month: "Apr", income: 8600, expenses: 5800 },
  { month: "May", income: 8600, expenses: 7200 },
  { month: "Jun", income: 9100, expenses: 6100 },
  { month: "Jul", income: 9400, expenses: 6850 },
];

export type CategorySpend = {
  category: string;
  amount: number;
};

export const categorySpend: CategorySpend[] = [
  { category: "Housing", amount: 2200 },
  { category: "Food & Dining", amount: 940 },
  { category: "Transport", amount: 610 },
  { category: "Subscriptions", amount: 340 },
  { category: "Shopping", amount: 780 },
  { category: "Utilities", amount: 260 },
];

export type Budget = {
  category: string;
  spent: number;
  limit: number;
};

export const budgets: Budget[] = [
  { category: "Food & Dining", spent: 940, limit: 1100 },
  { category: "Shopping", spent: 780, limit: 600 },
  { category: "Transport", spent: 610, limit: 800 },
  { category: "Subscriptions", spent: 340, limit: 400 },
];

export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  status: "posted" | "pending";
};

export const transactions: Transaction[] = [
  { id: "t1", merchant: "Whole Foods Market", category: "Food & Dining", date: "Jul 29", amount: -86.42, status: "posted" },
  { id: "t2", merchant: "Acme Corp Payroll", category: "Income", date: "Jul 28", amount: 4200.0, status: "posted" },
  { id: "t3", merchant: "Shell Gas Station", category: "Transport", date: "Jul 27", amount: -52.1, status: "posted" },
  { id: "t4", merchant: "Netflix", category: "Subscriptions", date: "Jul 26", amount: -15.49, status: "posted" },
  { id: "t5", merchant: "Amazon", category: "Shopping", date: "Jul 25", amount: -134.99, status: "pending" },
  { id: "t6", merchant: "City Power & Light", category: "Utilities", date: "Jul 24", amount: -128.33, status: "posted" },
  { id: "t7", merchant: "Blue Bottle Coffee", category: "Food & Dining", date: "Jul 23", amount: -6.75, status: "posted" },
  { id: "t8", merchant: "Rent — Meridian Apts", category: "Housing", date: "Jul 21", amount: -2200.0, status: "posted" },
];

export const kpis = {
  totalBalance: { value: 24680.32, deltaPct: 4.2 },
  income: { value: 9400, deltaPct: 3.3 },
  expenses: { value: 6850, deltaPct: -5.1 },
  savingsRate: { value: 27.1, deltaPct: 2.4 },
};
