import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Headphones,
  GraduationCap,
  Lock,
  Percent,
  PackageOpen,
  Presentation,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  Users,
  Wallet,
  Zap
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ConsultantAvatar } from "@/components/consultant-avatar";
import { OpportunityBrandLogo } from "@/components/opportunity-brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { categories, opportunities, type Opportunity } from "@/data/opportunities";
import { faqAnswers, faqItems } from "@/data/content";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { SectionBlock } from "@/sections/section-block";
import { MiniList } from "@/sections/mini-list";
import { RUPEE, UNLOCK_ACCESS, UNLOCK_AMOUNT, UNLOCK_CTA, UNLOCK_CTA_SHORT } from "@/lib/constants";
import heroRightFlowImage from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ChatGPT_Image_Jun_2__2026__03_27_42_PM-cae05e62-9c82-4307-b851-ab823f4aefa7.png";
import hariKrishnaShettyImage from "@/assets/consultants-hari-krishna-shetty.png";
import nehaSharmaImage from "@/assets/consultants-neha-sharma.png";
import navathKumarImage from "@/assets/consultants-navath-kumar.png";

const navItems = [
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Opportunities", href: "#opportunities", id: "opportunities" },
  { label: "Benefits", href: "#benefits", id: "benefits" },
  { label: "Success Stories", href: "#testimonials", id: "testimonials" },
  { label: "FAQ", href: "#faq", id: "faq" }
];

const opportunitiesHref = "#opportunities";
const paymentGatewayBase =
  import.meta.env.VITE_PAYMENT_GATEWAY_URL ?? "https://payments.franchiseworldconsultant.com/checkout";

const incomeFocusAreas = [
  "Referral Income",
  "Franchise Consulting",
  "Investor Introductions",
  "Deal Facilitation",
  "Consultant Earnings",
  "Recurring Revenue"
];

export function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | (typeof categories)[number]>("ALL");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const activeSection = useScrollSection(navItems.map((i) => i.id));
  const categoryTabs: Array<"ALL" | (typeof categories)[number]> = ["ALL", ...categories];

  const filtered = useMemo(
    () => (selectedCategory === "ALL" ? opportunities : opportunities.filter((item) => item.category === selectedCategory)),
    [selectedCategory]
  );

  const openOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenModal(true);
  };

  const redirectToPayment = (brand?: Opportunity) => {
    const params = new URLSearchParams({
      source: "Franchise World Landing Page",
      ...(brand ? { brandName: brand.name, brandId: brand.id } : {})
    });
    window.location.href = `${paymentGatewayBase}?${params.toString()}`;
  };

  return (
    <div className="overflow-x-hidden bg-brand-light text-brand-black">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 md:px-6">
          <BrandLogo className="shrink-0" />
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-brand-red" : "text-zinc-700 hover:text-brand-red"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href={opportunitiesHref} className="shrink-0">
            <Button size="sm" className="hidden px-3 text-xs sm:inline-flex sm:h-11 sm:px-5 sm:text-sm">
              {UNLOCK_CTA}
            </Button>
            <Button size="sm" className="sm:hidden">
              {UNLOCK_CTA_SHORT}
            </Button>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:pb-28 sm:pt-8 md:px-6 md:pb-16">
        <section className="grid items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-premium sm:p-6 md:grid-cols-2 md:gap-8 md:p-10 lg:gap-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge>India&apos;s Trusted Franchise Consultant Platform</Badge>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-brand-black">Turn Your Network Into</span>
              <span className="mt-2 block text-[clamp(1.35rem,5vw,3.75rem)] font-extrabold leading-[1.05] text-brand-red min-[380px]:whitespace-nowrap">
                Franchise Deal Income
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-700">
              Discover franchise opportunities that help you generate recurring income through your network and business connections.
            </p>

            <div className="mt-6 grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-4">
              {[
                "15+ Curated Opportunities",
                "Dedicated Brand SPOCs",
                "Closure Support",
                "Earn Up To 1% Commission"
              ].map((item) => (
                <div key={item} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 font-medium text-zinc-700">
                  <CheckCircle2 className="mb-2 h-4 w-4 text-brand-red" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={opportunitiesHref} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">{UNLOCK_CTA}</Button>
              </a>
              <a href="#opportunities" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Opportunities <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-600">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Secure Payment</span>
              <span className="flex items-center gap-1"><Zap className="h-4 w-4" /> Instant Access</span>
              <span className="flex items-center gap-1"><Headphones className="h-4 w-4" /> Dedicated Support</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-last flex w-full items-center justify-center md:order-none"
          >
            <div className="relative aspect-[4/3] w-full max-w-lg md:max-w-none">
              <img
                src={heroRightFlowImage}
                alt="Consultant conversion workflow"
                className="absolute inset-0 h-full w-full object-contain object-center mix-blend-multiply"
              />
            </div>
          </motion.div>
        </section>

        <SectionBlock id="benefits" title="Why Franchise World?" subtitle="Built for consultants who want structured support and predictable closures.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "15+ Curated Opportunities","Dedicated Support Team","Investor Matching",
              "Business Presentations","Consultant Dashboard","Commission Earnings"
            ].map((item) => (
              <Card key={item} className="transition hover:-translate-y-1 hover:shadow-premium">
                <CardContent className="flex items-center gap-3 py-6"><BadgeCheck className="h-5 w-5 text-brand-red" /><p className="font-medium">{item}</p></CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="how-it-works" title="Start Earning In 4 Simple Steps">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { title: "Choose Opportunity", desc: "Select a franchise opportunity that matches your network." },
              { title: `Unlock Access ${UNLOCK_AMOUNT}`, desc: `Pay ${UNLOCK_AMOUNT} and get immediate consultant access.` },
              { title: "Refer Investors", desc: "Introduce serious investors from your network." },
              { title: "We Close The Deal", desc: "Our experts support meetings and closure with brands." }
            ].map((step, i) => (
              <Card key={step.title} className="relative overflow-hidden">
                <span className="absolute left-4 top-4 text-xs font-bold text-brand-red">0{i + 1}</span>
                <CardContent className="pt-10"><p className="font-semibold">{step.title}</p><p className="mt-2 text-sm text-zinc-600">{step.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="opportunities" title="Choose Your Opportunity Category">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            {categoryTabs.map((cat) => (
              <Button
                key={cat}
                variant={cat === selectedCategory ? "default" : "outline"}
                size="sm"
                className="shrink-0 text-xs sm:shrink sm:text-sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <Card key={item.id} className="group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-premium">
                <CardContent className="flex h-full flex-col p-4 sm:p-5">
                  <OpportunityBrandLogo brandId={item.id} brandName={item.name} variant="card" className="mb-4" />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{item.industry}</p>
                  <p className="mt-2 text-sm font-semibold text-brand-red">{item.investment}</p>
                  {item.description ? (
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-zinc-600">{item.description}</p>
                  ) : (
                    <p className="mt-2 flex-1 text-sm italic text-zinc-500">Details coming soon</p>
                  )}
                  <Button className="mt-5 w-full" onClick={() => redirectToPayment(item)}>
                    {UNLOCK_ACCESS}
                  </Button>
                  <Button className="mt-2 w-full" variant="outline" onClick={() => openOpportunity(item)}>
                    View Opportunity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          id="consultant-benefits"
          title="Why Investors & Consultants Love Franchise World"
          subtitle="Structured support, low entry barrier, and a proven conversion engine."
        >
          {(() => {
            const consultantLoveCards = [
              { label: "Dedicated Brand Experts", icon: UserRoundCheck },
              { label: "Meeting Support", icon: Users },
              { label: "Presentation Support", icon: Presentation },
              { label: "Closure Assistance", icon: ShieldCheck },
              { label: "No Franchise Experience Needed", icon: GraduationCap },
              { label: "Work From Anywhere", icon: BriefcaseBusiness },
              { label: "No Inventory", icon: PackageOpen },
              { label: "No Staff Required", icon: ClipboardCheck },
              { label: "Low Entry Cost", icon: Wallet },
              { label: "Scalable Income", icon: CircleDollarSign }
            ];
            return (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {consultantLoveCards.map((item) => (
                  <Card key={item.label} className="transition hover:-translate-y-1 hover:shadow-premium">
                    <CardContent className="flex flex-col items-start gap-3 py-5">
                      <item.icon className="h-5 w-5 text-brand-red" />
                      <p className="text-sm font-medium">{item.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })()}
        </SectionBlock>

        <SectionBlock id="payment-benefits" title="What You Get After Payment">
          <div className="grid gap-4 md:grid-cols-2">
            <MiniList title="Everything Included In Your Consultant Workspace" items={["Dashboard Access","Brand Presentation","Investment Information","Revenue Models","Investor Qualification Guide","Marketing Materials","Dedicated Support Contact","Opportunity Updates","Training Resources","Deal Tracking Dashboard"]} />
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">See How Your Network Can Generate Income</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Multiple income streams through your relationships, introductions, and deal facilitation.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {incomeFocusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm font-medium text-zinc-800"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-red" />
                      {area}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </SectionBlock>

        <section id="testimonials" className="py-10">
          <h2 className="text-center text-4xl font-bold">Hear From Our Consultants</h2>
          <p className="mt-2 text-center text-lg text-zinc-600">Real consultants. Real opportunities. Real earnings.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                quote: "Franchise World provides excellent support at every step. I referred an investor and earned my first commission within 45 days.",
                opportunity: "Carlton Salon",
                name: "Hari Krishna Shetty",
                location: "Pune, Maharashtra",
                profession: "Business Consultant",
                earned: `${RUPEE}6,00,000`,
                image: hariKrishnaShettyImage,
                imageFile: "Harikrishna_Shetty-90bb5083-cf45-4807-a8a8-ddbf37c0ae8b.png"
              },
              {
                quote: "The platform is simple, professional and very effective. The team handles everything so well that we can focus on our network.",
                opportunity: "Acer Electric",
                name: "Neha Sharma",
                location: "Noida, Uttar Pradesh",
                profession: "Real Estate Advisor",
                earned: `${RUPEE}4,00,000`,
                image: nehaSharmaImage,
                imageFile: "Neha_Sharma-70bd2845-ce83-4f70-aa19-8a6b11b74f8d.png"
              },
              {
                quote: "I love the transparency and the way Franchise World supports consultants with presentations and closures.",
                opportunity: "Carlton Wellness Center",
                name: "Navath Kumar",
                location: "Ahmedabad, Gujarat",
                profession: "Insurance Advisor",
                earned: `${RUPEE}8,00,000`,
                image: navathKumarImage,
                imageFile: "Navath_Kumar-be897b9a-3eb3-4131-b5b9-b209e159485b.png"
              }
            ].map((item) => (
              <Card key={item.name} className="overflow-hidden border-zinc-200 bg-white shadow-sm transition hover:shadow-premium">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <ConsultantAvatar src={item.image} name={item.name} imageFile={item.imageFile} />
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <Quote className="h-5 w-5 text-brand-red" />
                      <p className="mt-1 text-[15px] leading-7 text-zinc-700">{item.quote}</p>
                    </div>
                  </div>

                  <div className="my-4 border-t border-zinc-200" />

                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{item.location}</p>
                  <p className="text-sm text-zinc-600">{item.profession}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500">Lifetime Earned</p>
                      <p className="mt-1 text-3xl font-bold text-brand-red">{item.earned}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-zinc-500">Opportunity Referred</p>
                      <p className="mt-1 text-sm font-semibold sm:text-base">{item.opportunity}</p>
                      <div className="mt-3 flex justify-start gap-1 sm:justify-end">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 font-semibold text-brand-red hover:underline">
              View More Success Stories <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="final-cta" className="mt-12 rounded-2xl bg-brand-gradient p-6 text-white shadow-premium sm:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready To Turn Your Network Into Franchise Deal Income?</h2>
          <p className="mt-2 max-w-2xl text-white/90">Join Franchise World&apos;s Consultant Platform and unlock your preferred opportunity today.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href={opportunitiesHref} className="w-full sm:w-auto">
              <Button className="w-full bg-white text-brand-red hover:bg-zinc-100 sm:w-auto">
                {UNLOCK_CTA} <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <div className="flex gap-4 text-sm"><span>Secure Payment</span><span>Instant Access</span><span>Dedicated Support</span></div>
          </div>
        </section>

        <SectionBlock id="faq" title="Frequently Asked Questions">
          <Card><CardContent>
            <Accordion type="single" collapsible>
              {faqItems.map((q) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{faqAnswers[q]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent></Card>
        </SectionBlock>

        <section className="mt-10 rounded-2xl bg-brand-gradient px-6 py-10 text-center text-white shadow-premium md:px-10">
          <h2 className="text-3xl font-bold">Ready to Explore Franchise Opportunities?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Unlock access to premium franchise opportunities and connect with leading brands today.
          </p>
          <div className="mt-6">
            <Button className="bg-white text-brand-red hover:bg-zinc-100" size="lg" onClick={() => redirectToPayment()}>
              {UNLOCK_CTA}
            </Button>
          </div>
        </section>
      </main>

      <footer className="mt-14 bg-[#0c1220] pb-20 md:pb-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-8 md:flex-row md:items-center md:px-6">
          <div className="text-white">
            <BrandLogo variant="light" className="scale-110 origin-left sm:scale-125" />
            <div className="mt-2 h-px w-40 bg-white/50" />
            <p className="mt-1 text-xs text-white/80">Your Gateway To Success</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/90 sm:text-sm md:text-base">
            {["Privacy Policy", "Refund Policy", "Terms & Conditions", "Disclaimer", "Contact Us"].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                {index !== 0 ? <span className="text-white/40">|</span> : null}
                <a href="#" className="transition hover:text-white">{item}</a>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-premium backdrop-blur md:hidden">
        <a href={opportunitiesHref}><Button className="w-full">{UNLOCK_CTA_SHORT} <ChevronRight className="h-4 w-4" /></Button></a>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto p-0">
          {selectedOpportunity && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col gap-5 sm:gap-6 lg:grid lg:grid-cols-[minmax(0,220px)_1fr_minmax(0,240px)] lg:items-start">
                <OpportunityBrandLogo
                  brandId={selectedOpportunity.id}
                  brandName={selectedOpportunity.name}
                  variant="modal"
                  className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none"
                />

                <div className="min-w-0 text-center lg:text-left">
                  <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-brand-red">
                    {selectedOpportunity.category}
                  </span>
                  <DialogTitle className="mt-3 text-2xl font-bold md:text-3xl">{selectedOpportunity.name}</DialogTitle>
                  <p className="mt-2 text-sm text-zinc-600">{selectedOpportunity.industry}</p>
                  {!selectedOpportunity.comingSoon && (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">{selectedOpportunity.description}</p>
                  )}
                </div>

                <div className="space-y-3 lg:sticky lg:top-4">
                  {!selectedOpportunity.comingSoon && (
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-center">
                      <p className="text-xs font-medium uppercase tracking-wide text-emerald-800">Demand</p>
                      <p className="mt-1 text-sm font-semibold text-emerald-700">
                        {selectedOpportunity.demandTag ?? "Validated"}
                      </p>
                      <p className="mt-4 text-sm text-zinc-700">Commission</p>
                      <p className="text-xl font-bold text-brand-red">
                        {selectedOpportunity.commission ?? "Up to 1%"}
                      </p>
                    </div>
                  )}
                  <Button className="w-full" size="lg" onClick={() => redirectToPayment(selectedOpportunity)}>
                    <Lock className="h-4 w-4" />
                    {UNLOCK_ACCESS}
                  </Button>
                </div>
              </div>

              {selectedOpportunity.comingSoon ? (
                <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
                  <p className="text-xl font-semibold text-zinc-800">Opportunity Details Coming Soon</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600">
                    Full investment details for {selectedOpportunity.name} will be available shortly. Unlock access now to
                    be notified when details go live.
                  </p>
                  <Button className="mt-6" onClick={() => redirectToPayment(selectedOpportunity)}>
                    {UNLOCK_ACCESS}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {[
                      { label: "Investment Range", value: selectedOpportunity.investment, icon: CircleDollarSign },
                      { label: "Model Type", value: selectedOpportunity.modelType ?? selectedOpportunity.businessModel, icon: Sparkles },
                      { label: "Commission", value: selectedOpportunity.commission ?? selectedOpportunity.commissionPotential, icon: Percent },
                      { label: "Demand Tag", value: selectedOpportunity.demandTag ?? "Validated", icon: BadgeCheck }
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-red-100 bg-red-50/40 p-4 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-brand-red">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <p className="mt-2 text-xs font-semibold text-zinc-700">{item.label}</p>
                        <p className="mt-1 text-xs text-zinc-600">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-brand-red">
                          <ClipboardCheck className="h-5 w-5" />
                        </div>
                        <p className="text-base font-bold">About Brand</p>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-zinc-600">{selectedOpportunity.about}</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-brand-red">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <p className="text-base font-bold">Opportunity Highlights</p>
                      </div>
                      <div className="mt-4 space-y-3">
                        {(selectedOpportunity.opportunityHighlights ?? []).map((h) => (
                          <div key={h} className="flex items-start gap-2 text-sm text-zinc-700">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                            <span className="leading-6">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-brand-red">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <p className="text-base font-bold">Investment Details</p>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {(selectedOpportunity.investmentDetails ?? []).map((row) => (
                        <div key={row.label} className="rounded-2xl border border-zinc-200 bg-white p-4 text-center">
                          <p className="text-xs font-semibold text-zinc-700">{row.label}</p>
                          <p className="mt-1 text-sm font-medium text-brand-red">{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-brand-red">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-lg font-bold">Unlock Access</p>
                        <p className="mt-1 text-sm text-zinc-600">Pay {UNLOCK_AMOUNT} to view complete details and connect with the brand.</p>
                      </div>
                    </div>
                    <Button className="w-full shrink-0 md:w-auto" size="lg" onClick={() => redirectToPayment(selectedOpportunity)}>
                      <Lock className="h-4 w-4" />
                      {UNLOCK_ACCESS}
                    </Button>
                  </div>
                </>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Secure Payment
                </span>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
