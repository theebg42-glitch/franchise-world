import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Headphones,
  Menu,
  ShieldCheck,
  Star,
  Quote,
  X,
  Zap,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ConsultantAvatar } from "@/components/consultant-avatar";
import { OpportunityBrandLogo } from "@/components/opportunity-brand-logo";
import { EarningsCalculator } from "@/components/earnings-calculator";
import { OpportunityModal } from "@/components/opportunity-modal";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categories, opportunities, type Opportunity } from "@/data/opportunities";
import { faqAnswers, faqItems } from "@/data/content";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { useUnlock } from "@/hooks/use-unlock";
import { SectionBlock } from "@/sections/section-block";
import { RUPEE, UNLOCK_AMOUNT, UNLOCK_CTA, UNLOCK_CTA_SHORT } from "@/lib/constants";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import heroRightFlowImage from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ChatGPT_Image_Jun_2__2026__03_27_42_PM-cae05e62-9c82-4307-b851-ab823f4aefa7.png";
import hariKrishnaShettyImage from "@/assets/consultants-hari-krishna-shetty.png";
import nehaSharmaImage from "@/assets/consultants-neha-sharma.png";
import navathKumarImage from "@/assets/consultants-navath-kumar.png";

const navItems = [
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Opportunities", href: "#opportunities", id: "opportunities" },
  { label: "Calculator", href: "#calculator", id: "calculator" },
  { label: "Success Stories", href: "#testimonials", id: "testimonials" },
  { label: "FAQ", href: "#faq", id: "faq" }
];

const opportunitiesHref = "#opportunities";
const paymentGatewayBase =
  import.meta.env.VITE_PAYMENT_GATEWAY_URL ?? "https://payments.franchiseworldconsultant.com/checkout";

type FlowState = "none" | "modal" | "lead-form";

export function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | (typeof categories)[number]>("ALL");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [flowState, setFlowState] = useState<FlowState>("none");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSection(navItems.map((i) => i.id));
  const { isUnlocked, unlockBrand } = useUnlock();
  const categoryTabs: Array<"ALL" | (typeof categories)[number]> = ["ALL", ...categories];

  const filtered = useMemo(
    () => (selectedCategory === "ALL" ? opportunities : opportunities.filter((o) => o.category === selectedCategory)),
    [selectedCategory]
  );

  const openOpportunity = (o: Opportunity) => {
    setSelectedOpportunity(o);
    setFlowState("modal");
    trackEvent(AnalyticsEvents.VIEW_OPPORTUNITY, { brandId: o.id, brandName: o.name });
  };

  const openLeadForm = () => {
    if (!selectedOpportunity) return;
    setFlowState("lead-form");
    trackEvent(AnalyticsEvents.LEAD_FORM_OPEN, { brandId: selectedOpportunity.id });
  };

  const closeAll = () => {
    setFlowState("none");
  };

  const backToModal = () => setFlowState("modal");

  const redirectToPayment = (brand?: Opportunity) => {
    const b = brand ?? selectedOpportunity;
    const params = new URLSearchParams({
      source: "Franchise World Landing Page",
      ...(b ? { brandName: b.name, brandId: b.id } : {}),
      amount: "499",
    });
    trackEvent(AnalyticsEvents.PAYMENT_INITIATE, { brandId: b?.id, amount: 499 });
    window.location.href = `${paymentGatewayBase}?${params.toString()}`;
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="overflow-x-hidden bg-brand-light text-brand-black">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <BrandLogo className="shrink-0" />
          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <a key={item.id} href={item.href}
                className={`text-sm font-medium transition-colors ${activeSection === item.id ? "text-brand-red" : "text-zinc-700 hover:text-brand-red"}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={opportunitiesHref} className="hidden sm:block shrink-0">
              <Button size="sm">{UNLOCK_CTA}</Button>
            </a>
            <button
              className="flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-zinc-100 bg-white lg:hidden"
            >
              <nav className="flex flex-col px-4 py-3 gap-1">
                {navItems.map((item) => (
                  <a key={item.id} href={item.href} onClick={closeMobileMenu}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      activeSection === item.id ? "bg-red-50 text-brand-red" : "text-zinc-700 hover:bg-zinc-50 hover:text-brand-red"
                    }`}>
                    {item.label}
                  </a>
                ))}
                <a href={opportunitiesHref} onClick={closeMobileMenu} className="mt-2">
                  <Button className="w-full" size="sm">{UNLOCK_CTA}</Button>
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:px-6 md:pb-16">

        {/* ── HERO ── */}
        <section className="grid items-center gap-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-premium md:grid-cols-2 md:p-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge>India's Trusted Franchise Consultant Platform</Badge>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              <span className="block">Turn Your Network Into A</span>
              <span className="mt-1 block font-extrabold text-brand-red">Franchise Referral Business</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">
              Join India's consultant platform. Refer investors, we close the deal — you earn up to 1% commission.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={opportunitiesHref} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">{UNLOCK_CTA}</Button>
              </a>
              <a href="#opportunities" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Opportunities <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand-red" /> Secure Payment</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-brand-red" /> Instant Access</span>
              <span className="flex items-center gap-1.5"><Headphones className="h-4 w-4 text-brand-red" /> Dedicated Support</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <img src={heroRightFlowImage} alt="Consultant workflow"
                className="h-auto w-full object-contain mix-blend-multiply" />
            </div>
          </motion.div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <SectionBlock id="how-it-works" title="Start Earning In 4 Steps">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { n: "01", title: "Choose Opportunity", desc: "Pick a franchise that fits your network." },
              { n: "02", title: `Pay ${UNLOCK_AMOUNT}`, desc: "Unlock your consultant workspace instantly." },
              { n: "03", title: "Refer Investors", desc: "Introduce qualified investors from your circle." },
              { n: "04", title: "We Close", desc: "Our team handles meetings, pitches & closure." }
            ].map((step) => (
              <Card key={step.n} className="relative overflow-hidden">
                <span className="absolute right-4 top-4 text-2xl font-black text-zinc-100">{step.n}</span>
                <CardContent className="pt-8 pb-6">
                  <p className="font-bold text-brand-red text-xs mb-1">{step.n}</p>
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        {/* ── OPPORTUNITIES ── */}
        <SectionBlock id="opportunities" title="Franchise Opportunities">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible">
            {categoryTabs.map((cat) => (
              <Button key={cat} variant={cat === selectedCategory ? "default" : "outline"} size="sm"
                className="shrink-0 text-xs sm:text-sm" onClick={() => setSelectedCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <Card key={item.id} className="group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-premium">
                <CardContent className="flex h-full flex-col p-4">
                  <OpportunityBrandLogo brandId={item.id} brandName={item.name} variant="card" className="mb-3" />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.industry}</p>
                    </div>
                    {isUnlocked(item.id) && (
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-brand-red">{item.investment}</p>
                  <p className="mt-1.5 text-xs text-zinc-500 flex-1 line-clamp-2">
                    {item.description || "Details coming soon"}
                  </p>
                  {/* Masked contact preview */}
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                    <span>Sales Contact:</span>
                    <span className="font-mono font-medium">{item.salesContact ?? "987XX XXXXX"}</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button className="w-full" size="sm" onClick={() => openOpportunity(item)}>
                      View Opportunity
                    </Button>
                    {!isUnlocked(item.id) && (
                      <Button className="w-full h-auto py-2 leading-tight text-center whitespace-normal" size="sm" variant="outline"
                        onClick={() => { setSelectedOpportunity(item); openLeadForm(); }}>
                        Unlock {item.name} – {UNLOCK_AMOUNT}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        {/* ── EARNINGS CALCULATOR ── */}
        <EarningsCalculator />

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="py-10">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Our Consultant Success Stories</h2>
          <p className="mt-2 text-center text-zinc-500">Real people. Real commissions.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { quote: "Referred an investor and earned my first commission within 45 days. The team handled everything.", opportunity: "Carlton Salon", name: "Hari Krishna Shetty", location: "Pune, MH", profession: "Business Consultant", earned: `${RUPEE}6,00,000`, image: hariKrishnaShettyImage, imageFile: "hari.png" },
              { quote: "Simple, professional and very effective. The team handles everything so we can focus on our network.", opportunity: "Acer Electric", name: "Neha Sharma", location: "Noida, UP", profession: "Real Estate Advisor", earned: `${RUPEE}4,00,000`, image: nehaSharmaImage, imageFile: "neha.png" },
              { quote: "I love the transparency. Franchise World supports consultants with presentations and closures end-to-end.", opportunity: "Carlton Wellness", name: "Navath Kumar", location: "Ahmedabad, GJ", profession: "Insurance Advisor", earned: `${RUPEE}8,00,000`, image: navathKumarImage, imageFile: "navath.png" }
            ].map((t) => (
              <Card key={t.name} className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex gap-4 items-start">
                    <ConsultantAvatar src={t.image} name={t.name} imageFile={t.imageFile} className="shrink-0" />
                    <div>
                      <Quote className="h-4 w-4 text-brand-red mb-1" />
                      <p className="text-sm leading-6 text-zinc-700">{t.quote}</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-zinc-100 pt-4 flex items-end justify-between">
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.location} · {t.profession}</p>
                      <div className="mt-1 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400">Earned</p>
                      <p className="text-xl font-bold text-brand-red">{t.earned}</p>
                      <p className="text-xs text-zinc-500">{t.opportunity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="rounded-2xl bg-brand-gradient px-6 py-10 text-white shadow-premium md:px-10">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to earn from your network?</h2>
          <p className="mt-2 text-white/80 max-w-lg">
            Unlock access for {UNLOCK_AMOUNT}. Get your consultant workspace, brand materials, and dedicated support — today.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={opportunitiesHref}>
              <Button className="bg-white text-brand-red hover:bg-zinc-100 w-full sm:w-auto" size="lg">
                {UNLOCK_CTA} <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <span className="text-sm text-white/70">Secure payment · Instant access · Dedicated SPOC</span>
          </div>
        </section>

        {/* ── FAQ ── */}
        <SectionBlock id="faq" title="Frequently Asked Questions">
          <Card>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqItems.map((q) => (
                  <AccordionItem key={q} value={q}>
                    <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                    <AccordionContent>{faqAnswers[q]}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </SectionBlock>

        {/* ── POST-FAQ CTA ── */}
        <section className="py-14 pb-28 md:pb-14 text-center px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-red mb-3">Start Today</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-2 leading-tight">
            Turn Your Network Into A<br className="hidden sm:block" />{" "}
            <span className="text-brand-red">Franchise Referral Business</span>
          </h2>
          <p className="mt-3 text-zinc-500 text-base max-w-md mx-auto mb-7">
            Join India's consultant platform. Refer investors, we close the deal — you earn up to 1% commission.
          </p>
          <a href={opportunitiesHref}>
            <Button size="lg" className="px-10 text-base">
              {UNLOCK_CTA} <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </a>
          <p className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-400">
            <span>✓ Secure Payment</span>
            <span>✓ Instant Access</span>
            <span>✓ Dedicated Support</span>
          </p>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0c1220] pb-20 md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <BrandLogo variant="light" className="h-7" />
            <p className="mt-2 text-xs text-white/50">Your Gateway To Success</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/60">
            {["Privacy Policy", "Refund Policy", "Terms & Conditions", "Disclaimer", "Contact Us"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition">{item}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <a href={opportunitiesHref}>
          <Button className="w-full">{UNLOCK_CTA_SHORT} <ChevronRight className="h-4 w-4" /></Button>
        </a>
      </div>

      {/* ── OPPORTUNITY MODAL ── */}
      <OpportunityModal
        open={flowState === "modal"}
        opportunity={selectedOpportunity}
        isUnlocked={selectedOpportunity ? isUnlocked(selectedOpportunity.id) : false}
        onClose={closeAll}
        onRequestUnlock={() => {
          if (selectedOpportunity && isUnlocked(selectedOpportunity.id)) return;
          setFlowState("lead-form");
          if (selectedOpportunity) trackEvent(AnalyticsEvents.LEAD_FORM_OPEN, { brandId: selectedOpportunity.id });
        }}
        onPayNow={() => redirectToPayment()}
      />

      {/* ── LEAD CAPTURE FORM ── */}
      {selectedOpportunity && (
        <LeadCaptureForm
          open={flowState === "lead-form"}
          onClose={backToModal}
          brandId={selectedOpportunity.id}
          brandName={selectedOpportunity.name}
          paymentGatewayBase={paymentGatewayBase}
        />
      )}
    </div>
  );
}
