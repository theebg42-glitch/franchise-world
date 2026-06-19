import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck, CheckCircle2, CircleDollarSign, ClipboardCheck,
  Lock, Percent, ShieldCheck, Sparkles
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OpportunityBrandLogo } from "@/components/opportunity-brand-logo";
import { EarningsCalculator } from "@/components/earnings-calculator";
import { UNLOCK_AMOUNT } from "@/lib/constants";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import type { Opportunity } from "@/data/opportunities";

type Tab = "overview" | "investment" | "calculator";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "investment", label: "Investment Details" },
  { id: "calculator", label: "Earnings Calculator" },
];

type Props = {
  open: boolean;
  opportunity: Opportunity | null;
  isUnlocked: boolean;
  onClose: () => void;
  onRequestUnlock: () => void;
  onPayNow: () => void;
};

export function OpportunityModal({ open, opportunity, isUnlocked, onClose, onRequestUnlock }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (!opportunity) return null;

  const o = opportunity;
  const unlockCTA = `Unlock ${o.name} – ${UNLOCK_AMOUNT}`;

  const UnlockBanner = () => {
    if (isUnlocked) return null;
    return (
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-sm">Unlock Full Access</p>
          <p className="text-xs text-zinc-500">Pay {UNLOCK_AMOUNT} · One-time · Instant access</p>
        </div>
        <Button className="shrink-0 text-wrap h-auto py-2" onClick={onRequestUnlock}>
          <Lock className="h-4 w-4 shrink-0" /> {unlockCTA}
        </Button>
      </div>
    );
  };

  const TabButton = ({ tab }: { tab: typeof TABS[number] }) => (
    <button
      onClick={() => setActiveTab(tab.id)}
      className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
        activeTab === tab.id
          ? "border-brand-red text-brand-red"
          : "border-transparent text-zinc-500 hover:text-zinc-800"
      }`}
    >
      {tab.label}
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-hidden p-0 mx-4 sm:mx-auto flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-zinc-100 p-5 sm:p-6">
          <OpportunityBrandLogo
            brandId={o.id}
            brandName={o.name}
            variant="card"
            className="!h-16 !px-3 !py-2 w-24 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-brand-red">
              {o.category}
            </span>
            <DialogTitle className="mt-1 text-lg font-bold leading-tight sm:text-xl">{o.name}</DialogTitle>
            <p className="text-sm text-zinc-500">{o.industry} · {o.investment}</p>
          </div>
          {isUnlocked && (
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <BadgeCheck className="h-3.5 w-3.5" /> Unlocked
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-zinc-100 bg-white px-5 sm:px-6 scrollbar-hide">
          {TABS.map((t) => <TabButton key={t.id} tab={t} />)}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                {o.comingSoon ? (
                  <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
                    <p className="font-semibold text-zinc-800">Opportunity Details Coming Soon</p>
                    <p className="mt-1 text-sm text-zinc-500">Unlock now to be notified when details go live.</p>
                    <Button className="mt-5 text-wrap h-auto py-2" onClick={onRequestUnlock}>
                      <Lock className="h-4 w-4 shrink-0" /> {unlockCTA}
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm leading-relaxed text-zinc-600">{o.description}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-zinc-200 p-4">
                        <p className="flex items-center gap-2 font-semibold text-sm mb-2">
                          <ShieldCheck className="h-4 w-4 text-brand-red" /> Highlights
                        </p>
                        <div className="space-y-1.5">
                          {(o.opportunityHighlights ?? []).map((h) => (
                            <div key={h} className="flex items-start gap-2 text-sm text-zinc-700">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />{h}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-zinc-200 p-4">
                        <p className="flex items-center gap-2 font-semibold text-sm mb-2">
                          <ClipboardCheck className="h-4 w-4 text-brand-red" /> Why This Brand
                        </p>
                        <p className="text-sm text-zinc-600 leading-relaxed">{o.about}</p>
                      </div>
                    </div>
                    <UnlockBanner />
                  </>
                )}
              </div>
            )}

            {/* ── INVESTMENT DETAILS ── */}
            {activeTab === "investment" && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Investment", value: o.investment, icon: CircleDollarSign },
                    { label: "Model", value: o.modelType ?? o.businessModel, icon: Sparkles },
                    { label: "Commission", value: o.commission ?? o.commissionPotential, icon: Percent },
                    { label: "Demand", value: o.demandTag ?? "Validated", icon: BadgeCheck }
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-red-100 bg-red-50/40 p-4 text-center">
                      <item.icon className="h-5 w-5 text-brand-red mx-auto" />
                      <p className="mt-2 text-xs font-semibold text-zinc-700">{item.label}</p>
                      <p className="mt-0.5 text-xs text-zinc-600">{item.value || "—"}</p>
                    </div>
                  ))}
                </div>
                {(o.investmentDetails ?? []).length > 0 && (
                  <div className="rounded-xl border border-zinc-200 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200">
                          <th className="px-4 py-2.5 text-left font-semibold text-zinc-700">Item</th>
                          <th className="px-4 py-2.5 text-right font-semibold text-zinc-700">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(o.investmentDetails ?? []).map((row, i) => (
                          <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}>
                            <td className="px-4 py-2.5 text-zinc-700">{row.label}</td>
                            <td className="px-4 py-2.5 text-right font-semibold text-brand-red">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {o.areaRequired && (
                  <p className="text-sm text-zinc-500">Area required: <span className="font-medium text-zinc-800">{o.areaRequired}</span></p>
                )}
                <UnlockBanner />
              </div>
            )}

            {/* ── EARNINGS CALCULATOR ── */}
            {activeTab === "calculator" && (
              <div>
                <p className="mb-4 text-sm text-zinc-600">
                  See how much you can earn by referring investors to <strong>{o.name}</strong>.
                </p>
                <EarningsCalculator compact />
                <UnlockBanner />
              </div>
            )}

          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
