import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import { RUPEE } from "@/lib/constants";

const PRESETS = [2500000, 5000000, 10000000, 20000000, 50000000];
const COMMISSION_RATE = 0.01;

function formatIndian(n: number): string {
  if (isNaN(n) || n < 0) return "0";
  return n.toLocaleString("en-IN");
}

function parseIndian(s: string): number {
  const cleaned = s.replace(/[^0-9]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

type Props = { compact?: boolean };

export function EarningsCalculator({ compact = false }: Props) {
  const [amount, setAmount] = useState(2500000);
  const [inputStr, setInputStr] = useState("25,00,000");
  const [tracked, setTracked] = useState(false);

  const commission = Math.round(amount * COMMISSION_RATE);

  const handlePreset = (val: number) => {
    setAmount(val);
    setInputStr(formatIndian(val));
    if (!tracked) { trackEvent(AnalyticsEvents.CALCULATOR_USE); setTracked(true); }
  };

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = parseIndian(raw);
    setAmount(parsed);
    setInputStr(formatIndian(parsed));
    if (!tracked) { trackEvent(AnalyticsEvents.CALCULATOR_USE); setTracked(true); }
  }, [tracked]);

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => handlePreset(p)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                amount === p ? "border-brand-red bg-brand-red text-white" : "border-zinc-200 text-zinc-600 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {RUPEE}{formatIndian(p)}
            </button>
          ))}
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-500">Investment Amount</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3">
            <span className="text-zinc-400">{RUPEE}</span>
            <input
              type="text"
              value={inputStr}
              onChange={handleInput}
              className="flex-1 bg-transparent text-base font-semibold outline-none"
              placeholder="Enter amount"
            />
          </div>
        </div>
        <div className="rounded-xl border border-brand-red/20 bg-red-50 p-4 text-center">
          <p className="text-xs text-zinc-500">Commission Rate: 1%</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-red">
            {RUPEE}{formatIndian(commission)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Estimated Earnings</p>
        </div>
      </div>
    );
  }

  return (
    <div id="calculator" className="py-10">
      <h2 className="text-center text-2xl font-bold sm:text-3xl">Franchise Earnings Calculator</h2>
      <p className="mt-2 text-center text-zinc-500">See how much you can earn from a single referral</p>
      <Card className="mx-auto mt-8 max-w-2xl shadow-premium">
        <CardContent className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-zinc-700 mb-3">Select Investment Amount</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  amount === p ? "border-brand-red bg-brand-red text-white shadow" : "border-zinc-200 text-zinc-600 hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {RUPEE}{formatIndian(p)}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-zinc-600">Investment Amount</label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 focus-within:border-brand-red transition">
              <span className="text-lg text-zinc-400">{RUPEE}</span>
              <input
                type="text"
                value={inputStr}
                onChange={handleInput}
                className="flex-1 bg-transparent text-lg font-semibold outline-none"
                placeholder="e.g. 25,00,000"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Investment</p>
              <p className="mt-2 text-xl font-bold text-zinc-800">{RUPEE}{formatIndian(amount)}</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Commission Rate</p>
              <p className="mt-2 text-xl font-bold text-zinc-800">1%</p>
            </div>
            <div className="rounded-xl border-2 border-brand-red bg-red-50 p-4 text-center shadow">
              <p className="text-xs font-medium text-brand-red uppercase tracking-wide">Your Earnings</p>
              <p className="mt-2 text-2xl font-extrabold text-brand-red">{RUPEE}{formatIndian(commission)}</p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-zinc-400">
            Estimated earnings based on 1% commission. Actual payouts depend on finalized investment value and brand agreement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
