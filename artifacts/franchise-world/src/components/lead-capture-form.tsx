import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RUPEE, PAYMENT_AMOUNT_NUM, UNLOCK_AMOUNT } from "@/lib/constants";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

type FormData = {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  occupation: string;
  budget: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!/^[6-9]\d{9}$/.test(data.mobile)) errors.mobile = "Enter a valid 10-digit mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address";
  if (!data.city.trim()) errors.city = "City is required";
  if (!data.occupation) errors.occupation = "Occupation is required";
  if (!data.budget) errors.budget = "Investment budget is required";
  return errors;
}

const OCCUPATIONS = [
  "Business Consultant", "Real Estate Advisor", "Insurance Advisor",
  "Financial Advisor", "HR Professional", "Sales Professional",
  "Entrepreneur", "Investor", "Other"
];

const BUDGETS = [
  "Below ₹10L", "₹10L – ₹25L", "₹25L – ₹50L",
  "₹50L – ₹1 Cr", "₹1 Cr – ₹5 Cr", "Above ₹5 Cr"
];

type Props = {
  open: boolean;
  onClose: () => void;
  brandId: string;
  brandName: string;
  paymentGatewayBase: string;
};

export function LeadCaptureForm({ open, onClose, brandId, brandName, paymentGatewayBase }: Props) {
  const [form, setForm] = useState<FormData>({
    fullName: "", mobile: "", email: "", city: "", occupation: "", budget: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormData) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    trackEvent(AnalyticsEvents.LEAD_FORM_SUBMIT, { brandId, brandName, ...form });

    try {
      localStorage.setItem(`fw_lead_${brandId}`, JSON.stringify({ ...form, brandId, ts: Date.now() }));
    } catch {}

    const returnUrl = `${window.location.origin}${window.location.pathname}?unlocked=${brandId}`;
    const params = new URLSearchParams({
      source: "Franchise World Landing Page",
      brandId, brandName,
      amount: String(PAYMENT_AMOUNT_NUM),
      currency: "INR",
      returnUrl,
      fullName: form.fullName,
      mobile: form.mobile,
      email: form.email,
      city: form.city,
      occupation: form.occupation,
      budget: form.budget,
    });

    trackEvent(AnalyticsEvents.PAYMENT_INITIATE, { brandId, amount: PAYMENT_AMOUNT_NUM });
    window.location.href = `${paymentGatewayBase}?${params.toString()}`;
  };

  const Field = ({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) => (
    <div>
      <Label htmlFor={id} className="text-sm font-medium text-zinc-700">{label}</Label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto p-0 mx-4 sm:mx-auto">
        <div className="p-6 sm:p-7">
          <div className="mb-5">
            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-brand-red">
              Step 1 of 2
            </span>
            <DialogTitle className="mt-2 text-xl font-bold">
              Unlock {brandName}
            </DialogTitle>
            <p className="mt-1 text-sm text-zinc-500">
              Fill in your details to continue to payment ({UNLOCK_AMOUNT} one-time).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full Name *" id="fullName" error={errors.fullName}>
              <Input id="fullName" placeholder="Your full name"
                value={form.fullName} onChange={(e) => set("fullName")(e.target.value)}
                className={errors.fullName ? "border-red-400" : ""} />
            </Field>

            <Field label="Mobile Number *" id="mobile" error={errors.mobile}>
              <Input id="mobile" placeholder="10-digit mobile number" maxLength={10}
                value={form.mobile} onChange={(e) => set("mobile")(e.target.value.replace(/\D/g, ""))}
                className={errors.mobile ? "border-red-400" : ""} />
            </Field>

            <Field label="Email Address *" id="email" error={errors.email}>
              <Input id="email" type="email" placeholder="you@example.com"
                value={form.email} onChange={(e) => set("email")(e.target.value)}
                className={errors.email ? "border-red-400" : ""} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="City *" id="city" error={errors.city}>
                <Input id="city" placeholder="Your city"
                  value={form.city} onChange={(e) => set("city")(e.target.value)}
                  className={errors.city ? "border-red-400" : ""} />
              </Field>

              <Field label="Occupation *" id="occupation" error={errors.occupation}>
                <Select value={form.occupation} onValueChange={set("occupation")}>
                  <SelectTrigger className={errors.occupation ? "border-red-400" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="z-[300]">
                    {OCCUPATIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="Investment Budget *" id="budget" error={errors.budget}>
              <Select value={form.budget} onValueChange={set("budget")}>
                <SelectTrigger className={errors.budget ? "border-red-400" : ""}>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="z-[300]">
                  {BUDGETS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-600">
              After submitting, you'll be redirected to our secure payment page to complete the{" "}
              <span className="font-semibold text-brand-red">{UNLOCK_AMOUNT} unlock</span>.
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? "Redirecting…" : `Continue to Payment – ${UNLOCK_AMOUNT}`}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
