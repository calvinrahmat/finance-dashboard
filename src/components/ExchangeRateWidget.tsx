import { useState, useCallback } from "react";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";

type Rate = {
  currency: string;
  code: string;
  flag: string;
  rate: number;
  deltaPct: number;
};

const BASE_RATES: Rate[] = [
  { currency: "US Dollar",        code: "USD", flag: "🇺🇸", rate: 0.000062,  deltaPct:  0.31 },
  { currency: "Singapore Dollar", code: "SGD", flag: "🇸🇬", rate: 0.000083,  deltaPct: -0.14 },
  { currency: "Euro",             code: "EUR", flag: "🇪🇺", rate: 0.000057,  deltaPct:  0.08 },
  { currency: "British Pound",    code: "GBP", flag: "🇬🇧", rate: 0.000049,  deltaPct:  0.22 },
  { currency: "Thai Baht",        code: "THB", flag: "🇹🇭", rate: 0.0023,    deltaPct:  0.05 },
  { currency: "UAE Dirham",       code: "AED", flag: "🇦🇪", rate: 0.000228,  deltaPct:  0.17 },
  { currency: "Malaysian Ringgit",code: "MYR", flag: "🇲🇾", rate: 0.000292,  deltaPct:  0.12 },
];

function jitter(rate: number): number {
  const factor = 1 + (Math.random() - 0.5) * 0.004;
  return parseFloat((rate * factor).toFixed(8));
}

function formatRate(rate: number): string {
  if (rate < 0.001) return rate.toFixed(6);
  if (rate < 1)    return rate.toFixed(4);
  return rate.toFixed(2);
}

function getCurrencySymbol(code: string): string {
  switch (code) {
    case "USD": return "$";
    case "SGD": return "S$";
    case "GBP": return "£";
    case "THB": return "฿";
    case "AED": return "د.إ";
    case "MYR": return "RM";
    case "EUR": return "€";
    default:    return "";
  }
}

export function ExchangeRateWidget() {
  const [rates, setRates] = useState<Rate[]>(BASE_RATES);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [amount, setAmount] = useState<string>("1000000");

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRates((prev) =>
        prev.map((r) => {
          const newRate = jitter(r.rate);
          const newDelta = parseFloat(((Math.random() - 0.48) * 0.8).toFixed(2));
          return { ...r, rate: newRate, deltaPct: newDelta };
        })
      );
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 600);
  }, []);

  const idrAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Exchange Rates
          </h2>
          <p className="text-xs text-[var(--text-muted)]">IDR to major currencies</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--series-1)]/10 text-[var(--series-1)] transition-opacity hover:opacity-70 disabled:opacity-40"
          aria-label="Refresh rates"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {/* IDR input */}
      <div className="mt-4">
        <label className="text-xs font-medium text-[var(--text-secondary)]">
          Amount (IDR)
        </label>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--page)] px-3 py-2">
          <span className="text-sm font-semibold text-[var(--text-muted)]">Rp</span>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-sm font-medium tabular-nums text-[var(--text-primary)] outline-none"
            placeholder="1000000"
          />
        </div>
      </div>

      {/* Rate rows */}
      <div className="mt-4 flex flex-col gap-3">
        {rates.map((r) => {
          const converted = idrAmount * r.rate;
          const isUp = r.deltaPct >= 0;
          const DeltaIcon = isUp ? TrendingUp : TrendingDown;
          const deltaColor = isUp ? "var(--success-text)" : "var(--status-critical)";

          return (
            <div
              key={r.code}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--page)] px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl leading-none">{r.flag}</span>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    {r.code}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{r.currency}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="tabular-nums text-sm font-semibold text-[var(--text-primary)]">
                  {getCurrencySymbol(r.code)}
                  {converted.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div
                  className="mt-0.5 flex items-center justify-end gap-1 text-xs font-medium tabular-nums"
                  style={{ color: deltaColor }}
                >
                  <DeltaIcon size={11} />
                  <span>
                    1 IDR = {formatRate(r.rate)} {r.code}
                  </span>
                  <span className="font-normal text-[var(--text-muted)]">
                    ({isUp ? "+" : ""}{r.deltaPct.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-right text-xs text-[var(--text-muted)]">
        Updated{" "}
        {lastUpdated.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
    </div>
  );
}
