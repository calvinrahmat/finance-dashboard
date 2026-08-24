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
  { currency: "Australian Dollar", code: "AUD", flag: "\uD83C\uDDE6\uD83C\uDDFA", rate: 1.54, deltaPct: 0.00 },
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
    case "AUD": return "A$";
    default:    return "";
  }
}

export function ExchangeRateWidget() {
  const [rates, setRates] = useState<Rate[]>(BASE_RATES);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [amount, setAmount] = useState<string>("1000");
  const [direction, setDirection] = useState<"USD_TO_AUD" | "AUD_TO_USD">("USD_TO_AUD");

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

  const handleDirectionChange = (dir: "USD_TO_AUD" | "AUD_TO_USD") => {
    setDirection(dir);
    setAmount("1000");
  };

  const inputAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  // AUD rate (USD-based): 1 USD = rate AUD
  const audRate = rates.find((r) => r.code === "AUD")?.rate ?? 1.54;

  // visibleRates is always the single AUD entry
  const visibleRates = rates;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Exchange Rates
          </h2>
          <p className="text-xs text-[var(--text-muted)]">USD to AUD</p>
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

      {/* Direction toggle */}
      <div className="mt-3 flex gap-2">
        {(["USD_TO_AUD", "AUD_TO_USD"] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => handleDirectionChange(dir)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              direction === dir
                ? "bg-[var(--series-1)] text-white"
                : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-1)]"
            }`}
          >
            {dir === "USD_TO_AUD" ? "USD \u2192 AUD" : "AUD \u2192 USD"}
          </button>
        ))}
      </div>

      {/* Amount input */}
      <div className="mt-4">
        <label className="text-xs font-medium text-[var(--text-secondary)]">
          {direction === "AUD_TO_USD" ? "Amount (AUD)" : "Amount (USD)"}
        </label>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--page)] px-3 py-2">
          <span className="text-sm font-semibold text-[var(--text-muted)]">
            {direction === "AUD_TO_USD" ? "A$" : "$"}
          </span>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-sm font-medium tabular-nums text-[var(--text-primary)] outline-none"
            placeholder="1000"
          />
        </div>
      </div>

      {/* Rate rows */}
      <div className="mt-4 flex flex-col gap-3">
        {visibleRates.map((r) => {
          const isUp = r.deltaPct >= 0;
          const DeltaIcon = isUp ? TrendingUp : TrendingDown;
          const deltaColor = isUp ? "var(--success-text)" : "var(--status-critical)";

          if (direction === "AUD_TO_USD") {
            // AUD → USD: converted = audAmount / rate
            const inverseRate = audRate > 0 ? 1 / audRate : 0;
            const converted = inputAmount * inverseRate;
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
                    ${converted.toLocaleString("en-US", {
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
                      1 AUD = {formatRate(inverseRate)} USD
                    </span>
                    <span className="font-normal text-[var(--text-muted)]">
                      ({isUp ? "+" : ""}{r.deltaPct.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // USD → AUD mode (default): converted = usdAmount * rate
          const converted = inputAmount * r.rate;
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
                    1 USD = {formatRate(r.rate)} {r.code}
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
