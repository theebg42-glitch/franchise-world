import { useState } from "react";
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
  Play,
  CheckCircle,
  BarChart2,
  PhoneCall,
  Video,
  BookOpen,
  UserCheck,
  BadgeDollarSign,
  MessageCircle,
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Download,
  FileText,
  Lock,
  Percent,
  Sparkles,
  Phone,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ConsultantAvatar } from "@/components/consultant-avatar";
import { EarningsCalculator } from "@/components/earnings-calculator";
import { OpportunityModal } from "@/components/opportunity-modal";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { opportunities, type Opportunity } from "@/data/opportunities";
import { faqAnswers, faqItems } from "@/data/content";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { useUnlock } from "@/hooks/use-unlock";
import { SectionBlock } from "@/sections/section-block";
import { RUPEE, UNLOCK_AMOUNT, UNLOCK_CTA, UNLOCK_CTA_SHORT } from "@/lib/constants";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import bomanIraniImage from "@/assets/boman-irani-hero.jpeg";
import daewooLogo from "@/assets/brand-daewoo-logo.jpeg";
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

const daewoo = opportunities.find((o) => o.id === "daewoo")!;

const whatYouGet = [
  { icon: BarChart2, title: "Investor Pitch Decks", desc: "Access professionally designed franchise investment presentations." },
  { icon: PhoneCall, title: "Sales Scripts", desc: "Ready-to-use scripts to confidently pitch opportunities." },
  { icon: Video, title: "Brand Videos", desc: "Access official brand presentations and promotional videos." },
  { icon: BookOpen, title: "Training Support", desc: "Learn how to identify and qualify potential investors." },
  { icon: UserCheck, title: "Dedicated Relationship Manager", desc: "Get support from Franchise World's expert team." },
  { icon: BadgeDollarSign, title: "Earn Up to 1% Commission", desc: "Receive attractive payouts on every successful closure." },
];

const testimonials = [
  {
    quote: "Referred an investor and earned my first commission within 45 days. The team handled everything.",
    opportunity: "Carlton Salon",
    name: "Hari Krishna Shetty",
    location: "Pune, MH",
    profession: "Business Consultant",
    earned: `${RUPEE}6,00,000`,
    image: hariKrishnaShettyImage,
    imageFile: "hari.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    quote: "Simple, professional and very effective. The team handles everything so we can focus on our network.",
    opportunity: "Acer Electric",
    name: "Neha Sharma",
    location: "Noida, UP",
    profession: "Real Estate Advisor",
    earned: `${RUPEE}4,00,000`,
    image: nehaSharmaImage,
    imageFile: "neha.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    quote: "I love the transparency. Franchise World supports consultants with presentations and closures end-to-end.",
    opportunity: "Carlton Wellness",
    name: "Navath Kumar",
    location: "Ahmedabad, GJ",
    profession: "Insurance Advisor",
    earned: `${RUPEE}8,00,000`,
    image: navathKumarImage,
    imageFile: "navath.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

type FlowState = "none" | "modal" | "lead-form";

export function LandingPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [flowState, setFlowState] = useState<FlowState>("none");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [daewooTab, setDaewooTab] = useState<"overview" | "investment" | "calculator" | "downloads" | "training" | "contact">("overview");
  const activeSection = useScrollSection(navItems.map((i) => i.id));
  const { isUnlocked } = useUnlock();

  const closeAll = () => setFlowState("none");
  const backToModal = () => setFlowState("modal");
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const redirectToPayment = (brand?: Opportunity) => {
    const b = brand ?? selectedOpportunity ?? daewoo;
    const params = new URLSearchParams({
      source: "Franchise World Landing Page",
      brandName: b.name,
      brandId: b.id,
      amount: "500",
    });
    trackEvent(AnalyticsEvents.PAYMENT_INITIATE, { brandId: b?.id, amount: 500 });
    window.location.href = `${paymentGatewayBase}?${params.toString()}`;
  };

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
              India has sellers. India has buyers. The bridge is missing — and you can be it. Refer investors, our experts close the deal, you earn a 1% success-fee share upto 5 lakhs.
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
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <img
                src={bomanIraniImage}
                alt="Boman Irani — Brand Ambassador, Franchise World"
                className="h-auto w-full rounded-2xl object-cover shadow-lg"
              />
              {/* Glassmorphism badge */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-white/40 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md max-w-[85%]">
                <CheckCircle className="h-4 w-4 shrink-0 text-brand-red" />
                <p className="text-xs font-semibold leading-tight text-zinc-800">
                  Supported by Boman Irani, Bollywood Actor &amp; Brand Ambassador
                </p>
              </div>
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

        {/* ── OPPORTUNITIES — Daewoo Only (tabbed, mirrors modal) ── */}
        <SectionBlock id="opportunities" title="Featured Franchise Opportunity">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-2 border-brand-red/20 shadow-premium">
              <CardContent className="p-0">

                {/* ── Header ── */}
                <div className="flex items-start gap-4 border-b border-zinc-100 p-5 sm:p-6">
                  <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2">
                    <img src={daewooLogo} alt="Daewoo" className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-brand-red">
                      {daewoo.category}
                    </span>
                    <p className="mt-1 text-lg font-bold leading-tight sm:text-xl">{daewoo.industry}</p>
                    <p className="text-sm text-zinc-500">{daewoo.industry} · {daewoo.investment}</p>
                  </div>
                  {isUnlocked(daewoo.id) ? (
                    <span className="shrink-0 flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <BadgeCheck className="h-3.5 w-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                      {daewoo.demandTag}
                    </span>
                  )}
                </div>

                {/* ── Tabs ── */}
                <div className="flex overflow-x-auto border-b border-zinc-100 bg-white px-5 sm:px-6 scrollbar-hide">
                  {(["overview", "investment", "calculator", "downloads", "training", "contact"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDaewooTab(tab)}
                      className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium capitalize transition ${
                        daewooTab === tab
                          ? "border-brand-red text-brand-red"
                          : "border-transparent text-zinc-500 hover:text-zinc-800"
                      }`}
                    >
                      {tab === "overview" ? "Overview" :
                       tab === "investment" ? "Investment Details" :
                       tab === "calculator" ? "Earnings Calculator" :
                       tab === "downloads" ? "Downloads" :
                       tab === "training" ? "Training Videos" :
                       "Sales Contact"}
                    </button>
                  ))}
                </div>

                {/* ── Tab Content ── */}
                <div className="p-5 sm:p-6">
                  <motion.div
                    key={daewooTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >

                    {/* Overview */}
                    {daewooTab === "overview" && (
                      <div className="space-y-5">
                        <p className="text-sm leading-relaxed text-zinc-600">{daewoo.description}</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl border border-zinc-200 p-4">
                            <p className="flex items-center gap-2 font-semibold text-sm mb-2">
                              <ShieldCheck className="h-4 w-4 text-brand-red" /> Highlights
                            </p>
                            <div className="space-y-1.5">
                              {(daewoo.opportunityHighlights ?? []).map((h) => (
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
                            <p className="text-sm text-zinc-600 leading-relaxed">{daewoo.about}</p>
                          </div>
                        </div>
                        {!isUnlocked(daewoo.id) && (
                          <div className="flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-bold text-sm">Unlock Full Access</p>
                              <p className="text-xs text-zinc-500">Pay {UNLOCK_AMOUNT} to get contact, downloads & training.</p>
                            </div>
                            <Button className="shrink-0 h-auto py-2" onClick={() => redirectToPayment(daewoo)}>
                              <Lock className="h-4 w-4 shrink-0" /> Unlock Daewoo – {UNLOCK_AMOUNT}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Investment Details */}
                    {daewooTab === "investment" && (
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          {[
                            { label: "Investment", value: daewoo.investment, icon: CircleDollarSign },
                            { label: "Model", value: daewoo.modelType ?? daewoo.businessModel, icon: Sparkles },
                            { label: "Commission", value: daewoo.commission ?? daewoo.commissionPotential, icon: Percent },
                            { label: "Demand", value: daewoo.demandTag ?? "Validated", icon: BadgeCheck }
                          ].map((item) => (
                            <div key={item.label} className="rounded-xl border border-red-100 bg-red-50/40 p-4 text-center">
                              <item.icon className="h-5 w-5 text-brand-red mx-auto" />
                              <p className="mt-2 text-xs font-semibold text-zinc-700">{item.label}</p>
                              <p className="mt-0.5 text-xs text-zinc-600">{item.value || "—"}</p>
                            </div>
                          ))}
                        </div>
                        {(daewoo.investmentDetails ?? []).length > 0 && (
                          <div className="rounded-xl border border-zinc-200 overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-zinc-50 border-b border-zinc-200">
                                  <th className="px-4 py-2.5 text-left font-semibold text-zinc-700">Item</th>
                                  <th className="px-4 py-2.5 text-right font-semibold text-zinc-700">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(daewoo.investmentDetails ?? []).map((row, i) => (
                                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}>
                                    <td className="px-4 py-2.5 text-zinc-700">{row.label}</td>
                                    <td className="px-4 py-2.5 text-right font-semibold text-brand-red">{row.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {!isUnlocked(daewoo.id) && (
                          <div className="flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-bold text-sm">Unlock Full Access</p>
                              <p className="text-xs text-zinc-500">Pay {UNLOCK_AMOUNT} to get contact, downloads & training.</p>
                            </div>
                            <Button className="shrink-0 h-auto py-2" onClick={() => redirectToPayment(daewoo)}>
                              <Lock className="h-4 w-4 shrink-0" /> Unlock Daewoo – {UNLOCK_AMOUNT}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Earnings Calculator */}
                    {daewooTab === "calculator" && (
                      <div>
                        <p className="mb-4 text-sm text-zinc-600">
                          See how much you can earn by referring investors to <strong>{daewoo.name}</strong>.
                        </p>
                        <EarningsCalculator compact />
                        {!isUnlocked(daewoo.id) && (
                          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-bold text-sm">Unlock Full Access</p>
                              <p className="text-xs text-zinc-500">Pay {UNLOCK_AMOUNT} to get contact, downloads & training.</p>
                            </div>
                            <Button className="shrink-0 h-auto py-2" onClick={() => redirectToPayment(daewoo)}>
                              <Lock className="h-4 w-4 shrink-0" /> Unlock Daewoo – {UNLOCK_AMOUNT}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Downloads */}
                    {daewooTab === "downloads" && (
                      isUnlocked(daewoo.id) ? (
                        <div className="space-y-3">
                          <p className="text-sm text-zinc-600 mb-4">All brand resources are available for download below.</p>
                          {[
                            { name: "Brand Brochure", ext: "PDF" },
                            { name: "Investment Deck", ext: "PDF" },
                            { name: "Business Model Overview", ext: "PDF" },
                            { name: "Earnings Structure", ext: "PDF" },
                            { name: "Opportunity Presentation", ext: "PPTX" },
                          ].map((doc) => (
                            <div key={doc.name} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 hover:border-brand-red/30 transition">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                                  <FileText className="h-5 w-5 text-brand-red" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{doc.name}</p>
                                  <p className="text-xs text-zinc-400">{doc.ext} Document</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" /> Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                            <Lock className="h-6 w-6 text-zinc-400" />
                          </div>
                          <p className="font-semibold text-zinc-800">Unlock this content for {UNLOCK_AMOUNT}</p>
                          <p className="mt-1 text-sm text-zinc-500">Fill a quick form then pay {UNLOCK_AMOUNT} to get instant access.</p>
                          <Button className="mt-4 h-auto py-2" onClick={() => redirectToPayment(daewoo)}>
                            <Lock className="h-4 w-4 shrink-0" /> Unlock Downloads – {UNLOCK_AMOUNT}
                          </Button>
                        </div>
                      )
                    )}

                    {/* Training Videos */}
                    {daewooTab === "training" && (
                      isUnlocked(daewoo.id) ? (
                        <div className="space-y-4">
                          <p className="text-sm text-zinc-600 mb-2">Training content to help you refer confidently.</p>
                          {[
                            { title: "Introduction to the Opportunity", duration: "30 sec preview" },
                            { title: "How Consultants Earn Commission", duration: "Coming soon" },
                            { title: "Referral Process Walkthrough", duration: "Coming soon" },
                            { title: "What You Get After Unlocking", duration: "Coming soon" },
                          ].map((video, i) => (
                            <div key={video.title}
                              className={`relative overflow-hidden rounded-xl border ${i === 0 ? "border-brand-red/30 bg-red-50/30" : "border-zinc-200 bg-zinc-50"}`}>
                              <div className="flex items-center gap-4 p-4">
                                <button
                                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red text-white shadow hover:bg-brand-red/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={i !== 0}
                                >
                                  <Play className="h-5 w-5 fill-white" />
                                </button>
                                <div>
                                  <p className="font-medium text-sm">{video.title}</p>
                                  <p className="text-xs text-zinc-500">{video.duration}</p>
                                </div>
                                {i === 0 && (
                                  <span className="ml-auto shrink-0 rounded-full bg-brand-red px-2.5 py-0.5 text-xs font-semibold text-white">Preview</span>
                                )}
                              </div>
                              {i === 0 && (
                                <div className="mx-4 mb-4 flex aspect-video items-center justify-center rounded-xl bg-zinc-900">
                                  <div className="text-center text-white">
                                    <Play className="mx-auto h-10 w-10 fill-white opacity-80" />
                                    <p className="mt-2 text-sm font-medium opacity-70">Training Preview — {daewoo.name}</p>
                                    <p className="text-xs opacity-50">30-second overview</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                            <Lock className="h-6 w-6 text-zinc-400" />
                          </div>
                          <p className="font-semibold text-zinc-800">Unlock this content for {UNLOCK_AMOUNT}</p>
                          <p className="mt-1 text-sm text-zinc-500">Fill a quick form then pay {UNLOCK_AMOUNT} to get instant access.</p>
                          <Button className="mt-4 h-auto py-2" onClick={() => redirectToPayment(daewoo)}>
                            <Lock className="h-4 w-4 shrink-0" /> Unlock Training Videos – {UNLOCK_AMOUNT}
                          </Button>
                        </div>
                      )
                    )}

                    {/* Sales Contact */}
                    {daewooTab === "contact" && (
                      isUnlocked(daewoo.id) ? (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                            <BadgeCheck className="mx-auto h-8 w-8 text-emerald-600" />
                            <p className="mt-2 font-semibold text-emerald-800">Sales Contact Unlocked</p>
                            <p className="mt-3 text-xs text-zinc-500 uppercase tracking-wide">Direct Number</p>
                            <div className="mt-1 flex items-center justify-center gap-2">
                              <Phone className="h-5 w-5 text-emerald-700" />
                              <a href={`tel:${daewoo.salesContactFull ?? "9999999999"}`}
                                className="text-2xl font-bold tracking-widest text-emerald-800 hover:text-emerald-600">
                                {daewoo.salesContactFull ?? "Contact Support"}
                              </a>
                            </div>
                            <p className="mt-3 text-xs text-zinc-500">Mention you're a Franchise World consultant when calling.</p>
                          </div>
                          <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
                            <p className="font-semibold mb-1">Next Steps</p>
                            <ul className="space-y-1 list-disc list-inside text-zinc-500">
                              <li>Introduce qualified investors from your network</li>
                              <li>Schedule a meeting with the brand's team</li>
                              <li>Our team will assist with presentations and closure</li>
                              <li>Earn up to 1% commission on successful deals</li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center">
                            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Sales Contact</p>
                            <p className="text-3xl font-mono font-bold tracking-widest text-zinc-800 select-none filter blur-[3px]">
                              {daewoo.salesContact ?? "921XX XXXXX"}
                            </p>
                            <p className="mt-2 text-sm text-zinc-500">Unlock to reveal the full number</p>
                          </div>
                          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                              <Lock className="h-6 w-6 text-zinc-400" />
                            </div>
                            <p className="font-semibold text-zinc-800">Unlock this content for {UNLOCK_AMOUNT}</p>
                            <p className="mt-1 text-sm text-zinc-500">Fill a quick form then pay {UNLOCK_AMOUNT} to get instant access.</p>
                            <Button className="mt-4 h-auto py-2" onClick={() => redirectToPayment(daewoo)}>
                              <Lock className="h-4 w-4 shrink-0" /> Unlock Daewoo – {UNLOCK_AMOUNT}
                            </Button>
                          </div>
                        </div>
                      )
                    )}

                  </motion.div>
                </div>

                {/* Bottom CTA */}
                <div className="border-t border-zinc-100 px-5 py-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50">
                  <p className="text-sm text-zinc-500">
                    One-time unlock fee · Instant access · Dedicated support
                  </p>
                  <Button size="lg" className="h-auto py-2.5 text-wrap" onClick={() => redirectToPayment(daewoo)}>
                    Unlock Daewoo Opportunity for ₹500 <ArrowRight className="h-4 w-4 ml-1 shrink-0" />
                  </Button>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </SectionBlock>

        {/* ── WHAT YOU GET FOR ₹500 ── */}
        <SectionBlock id="what-you-get" title={`What You Get for ${RUPEE}500`}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whatYouGet.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Card className="group h-full border border-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-premium">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red mb-4 transition-all group-hover:bg-brand-red group-hover:text-white">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-zinc-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-500 flex-1 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
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
            {testimonials.map((t) => (
              <Card key={t.name} className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex gap-4 items-start">
                    {/* Avatar with play button overlay */}
                    <div
                      className="relative shrink-0 cursor-pointer group"
                      onClick={() => setActiveVideo(t.videoUrl)}
                      role="button"
                      aria-label={`Play ${t.name}'s story`}
                    >
                      <ConsultantAvatar src={t.image} name={t.name} imageFile={t.imageFile} />
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-5 w-5 fill-white text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-red shadow-md">
                        <Play className="h-3 w-3 fill-white text-white" />
                      </div>
                    </div>
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
                  <button
                    onClick={() => setActiveVideo(t.videoUrl)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 py-2 text-xs font-semibold text-zinc-600 transition hover:border-brand-red hover:text-brand-red"
                  >
                    <Play className="h-3.5 w-3.5" /> Watch Story
                  </button>
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
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-red mb-3">Your Next Move</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-2 leading-tight">
            Still Have Doubts?<br className="hidden sm:block" />{" "}
            <span className="text-brand-red">Your First Commission Will Answer Them.</span>
          </h2>
          <p className="mt-3 text-zinc-500 text-base max-w-md mx-auto mb-7">
            Thousands of consultants started with the same questions. One referral later — they never looked back.
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

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href="https://wa.me/91XXXXXXXXXX?text=Hi%20Franchise%20World%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Daewoo%20Consultant%20Opportunity."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 z-50 md:bottom-6 group"
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110">
          <MessageCircle className="h-7 w-7 fill-white" />
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        </div>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>

      {/* ── VIDEO MODAL ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition"
                aria-label="Close video"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={activeVideo}
                  title="Consultant Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
