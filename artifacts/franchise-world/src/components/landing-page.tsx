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
  Clock3,
  Headphones,
  GraduationCap,
  Lock,
  Percent,
  PackageOpen,
  Presentation,
  Quote,
  RefreshCcw,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  Users,
  Wallet,
  Zap
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
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
import ageonLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_AgeOn-beec8dc3-a54c-4ddd-8848-26a834c57a4b.png";
import adhiraLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Adhira___appa_coffee_logo_pdf_page-0001-c15e2b95-7a6c-41d8-934e-7b4a2ec2d932.png";
import acerLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Acer-1bd2c7d5-f7dc-4960-ac80-b7484219f27c.png";
import carltonLondonLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Carlton-london-logo-Op2-e899c0a2-e9b8-4339-9278-290de2882899.png";
import carltonSalonLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Carlton-Salon-logo-a5e9eaed-a622-4862-a749-4bf707ca4d73.png";
import carltonWellnessSpaLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_carlton_wellness_spa-01-a15f4c94-c3d9-4de1-80c0-965bcbd25dfe.png";
import chhotaBheemLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Chhota_Bheem-dea142f6-259a-4f14-b8ee-797a7da883ac.png";
import daewooLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Daewoo-be603bab-b198-4eb5-b5e6-307883d69fc3.png";
import ebikeGoLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Rental-381fe882-6675-4350-bfe4-bd90ee0a932a.png";
import goMillLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Go_Mill-010730c2-0111-42c9-a5d8-247e71589c2b.png";
import natufLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Natuf-d715e02b-db5f-45f3-aeac-324e6ce5dea1.png";
import nativeTouchLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Native_Touch-b15aeaba-99a8-4e5e-8a11-827ba726cfca.png";
import nonstopLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_NonStop-44a96236-884f-40d5-874b-be130a73dfed.png";
import tarzanLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Tarzan_Original_Logo-41978e5c-8f9a-4a9a-b8ef-40bebcd85735.png";
import heroRightFlowImage from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ChatGPT_Image_Jun_2__2026__03_27_42_PM-cae05e62-9c82-4307-b851-ab823f4aefa7.png";
import hariKrishnaShettyImage from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Hari_Krishna_Shetty-955a510f-01f2-4c78-a6f8-11a6909a43e5.png";
import nehaSharmaImage from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Neha_Sharma-50f8cff8-490d-4255-a3b1-fe93cc135ffb.png";
import navathKumarImage from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Navath_Kumar-1f9f1af1-8a76-406b-97fd-bbb1df44b1a4.png";

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

const opportunityLogos: Partial<Record<Opportunity["id"], string>> = {
  "adhira-appa": adhiraLogo,
  natuf: natufLogo,
  "go-mill": goMillLogo,
  "pro-mill": nativeTouchLogo,
  "acer-electric": acerLogo,
  "carlton-salon": carltonSalonLogo,
  "carlton-spa": carltonWellnessSpaLogo,
  "carlton-wellness": carltonWellnessSpaLogo,
  "nonstop-physio": nonstopLogo,
  "carlton-furniture": carltonLondonLogo,
  ageon: ageonLogo,
  daewoo: daewooLogo,
  "chhota-bheem": chhotaBheemLogo,
  tarzan: tarzanLogo,
  rental: ebikeGoLogo
};

export function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | (typeof categories)[number]>("ALL");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
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

  const handleUnlock = async () => {
    setIsUnlocking(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    window.location.href = opportunitiesHref;
  };

  const redirectToPayment = (brand?: Opportunity) => {
    const params = new URLSearchParams({
      source: "Franchise World Landing Page",
      ...(brand ? { brandName: brand.name, brandId: brand.id } : {})
    });
    window.location.href = `${paymentGatewayBase}?${params.toString()}`;
  };

  return (
    <div className="bg-brand-light text-brand-black">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <BrandLogo />
          <nav className="hidden items-center gap-6 md:flex">
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
          <a href={opportunitiesHref}>
            <Button>Unlock Opportunity Access - ₹500</Button>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-8 md:px-6 md:pb-16">
        <section className="grid gap-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-premium md:grid-cols-2 md:p-10">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge>India&apos;s Trusted Franchise Consultant Platform</Badge>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Turn Your Network Into <span className="text-brand-red">Franchise Deal Income</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-700">
              Unlock a franchise opportunity workspace for just ₹500 and start referring serious investors.
            </p>
            <p className="mt-3 text-lg text-zinc-700">
              Access brand materials, investor resources, expert support and closure assistance while earning commissions on successful franchise deals.
            </p>

            <div className="mt-6 grid gap-2 text-sm md:grid-cols-4">
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
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={opportunitiesHref}><Button size="lg">Unlock Opportunity Access - ₹500</Button></a>
              <a href="#opportunities"><Button variant="outline" size="lg">Explore Opportunities <ArrowRight className="h-4 w-4" /></Button></a>
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
            className="flex items-center md:-mr-2"
          >
            <img
              src={heroRightFlowImage}
              alt="Consultant conversion workflow"
              className="w-full object-contain mix-blend-multiply"
            />
          </motion.div>
        </section>

        <SectionBlock id="benefits" title="Why Franchise World?" subtitle="Built for consultants who want structured support and predictable closures.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "15+ Curated Opportunities","Dedicated Support Team","Investor Matching",
              "Business Presentations","Partner Dashboard","Commission Earnings"
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
              { title: "Unlock Access ₹500", desc: "Pay ₹500 and get immediate consultant access." },
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
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((cat) => (
              <Button key={cat} variant={cat === selectedCategory ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((item) => (
              <Card key={item.id} className="group">
                <CardContent>
                  <div className="mb-4 flex h-20 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                    {opportunityLogos[item.id] ? (
                      <img
                        src={opportunityLogos[item.id]}
                        alt={`${item.name} logo`}
                        className="max-h-14 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-xs text-zinc-500">Brand Logo Here</span>
                    )}
                  </div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{item.industry}</p>
                  <p className="mt-2 text-sm font-medium text-brand-red">{item.investment}</p>
                  <p className="mt-2 text-sm text-zinc-600">{item.description}</p>
                  <Button className="mt-4 w-full" onClick={() => redirectToPayment(item)}>
                    Unlock Access - ₹500
                  </Button>
                  <Button className="mt-2 w-full" variant="outline" onClick={() => openOpportunity(item)}>View Opportunity</Button>
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
              <CardContent>
                <h3 className="font-semibold">See How Your Network Can Generate Income</h3>
                <div className="mt-4 space-y-2 text-sm">
                  {[
                    ["₹20 Lakhs", "₹20,000"],
                    ["₹50 Lakhs", "₹50,000"],
                    ["₹1 Crore", "₹1,00,000"],
                    ["₹2 Crore", "₹2,00,000"]
                  ].map(([a, b]) => (
                    <div key={a} className="flex justify-between border-b pb-2">
                      <span>{a}</span>
                      <span className="font-semibold text-brand-red">{b}</span>
                    </div>
                  ))}
                  <p className="pt-2 text-xs text-zinc-500">
                    Disclaimer: Commission values are indicative and vary by final investment amount and brand payout policy.
                  </p>
                </div>
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
                quote:
                  "Franchise World provides excellent support at every step. I referred an investor and earned my first commission within 45 days.",
                opportunity: "Carlton Salon",
                name: "Hari Krishna Shetty",
                location: "Pune, Maharashtra",
                profession: "Business Consultant",
                earned: "₹6,00,000",
                image: hariKrishnaShettyImage
              },
              {
                quote:
                  "The platform is simple, professional and very effective. The team handles everything so well that we can focus on our network.",
                opportunity: "Acer Electric",
                name: "Neha Sharma",
                location: "Noida, Uttar Pradesh",
                profession: "Real Estate Advisor",
                earned: "₹4,00,000",
                image: nehaSharmaImage
              },
              {
                quote:
                  "I love the transparency and the way Franchise World supports consultants with presentations and closures.",
                opportunity: "Carlton Wellness Center",
                name: "Navath Kumar",
                location: "Ahmedabad, Gujarat",
                profession: "Insurance Advisor",
                earned: "₹8,00,000",
                image: navathKumarImage
              }
            ].map((item) => (
              <Card key={item.name} className="overflow-hidden border-zinc-200 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 shrink-0 rounded-xl object-cover"
                    />
                    <div>
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
                      <p className="text-xs text-zinc-500">Commission Earned</p>
                      <p className="mt-1 text-3xl font-bold text-brand-red">{item.earned}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Opportunity Referred</p>
                      <p className="mt-1 text-base font-semibold">{item.opportunity}</p>
                      <div className="mt-3 flex justify-end gap-1">
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

        <section id="final-cta" className="mt-12 rounded-2xl bg-brand-gradient p-8 text-white shadow-premium">
          <h2 className="text-3xl font-bold">Ready To Turn Your Network Into Franchise Deal Income?</h2>
          <p className="mt-2 max-w-2xl text-white/90">Join Franchise World&apos;s Consultant Platform and unlock your preferred opportunity today.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={opportunitiesHref}>
              <Button className="bg-white text-brand-red hover:bg-zinc-100">Unlock Opportunity Access - ₹500 <ArrowRight className="h-4 w-4" /></Button>
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
              Unlock Opportunity Access - ₹500
            </Button>
          </div>
        </section>
      </main>

      <footer className="mt-14 bg-[#0c1220]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-6 md:flex-row md:items-center md:px-6">
          <div className="text-white">
            <p className="text-3xl font-bold leading-none">FranchiseWorld</p>
            <div className="mt-1 h-px w-40 bg-white/50" />
            <p className="mt-1 text-xs text-white/80">Your Gateway To Success</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/90 md:text-base">
            {["Privacy Policy", "Refund Policy", "Terms & Conditions", "Disclaimer", "Contact Us"].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                {index !== 0 ? <span className="text-white/40">|</span> : null}
                <a href="#" className="transition hover:text-white">{item}</a>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white p-3 shadow-premium md:hidden">
        <a href={opportunitiesHref}><Button className="w-full">Unlock Opportunity Access - ₹500 <ChevronRight className="h-4 w-4" /></Button></a>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-5xl p-0">
          {selectedOpportunity && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[240px_1fr_280px]">
                <div className="flex h-[150px] items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  {opportunityLogos[selectedOpportunity.id] ? (
                    <img
                      src={opportunityLogos[selectedOpportunity.id]}
                      alt={`${selectedOpportunity.name} logo`}
                      className="max-h-24 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-sm text-zinc-500">Brand Logo Here</span>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-brand-red">
                      {selectedOpportunity.category}
                    </span>
                  </div>
                  <DialogTitle className="mt-3 text-3xl font-bold">{selectedOpportunity.name}</DialogTitle>
                  <p className="mt-2 text-sm text-zinc-600">{selectedOpportunity.industry}</p>
                  <div className="mt-4 space-y-2 text-sm text-zinc-600">
                    <div className="h-2 w-2/3 rounded-full bg-zinc-200" />
                    <div className="h-2 w-1/2 rounded-full bg-zinc-200" />
                    <div className="h-2 w-3/4 rounded-full bg-zinc-200" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-center">
                    <p className="text-sm font-semibold text-emerald-700">
                      {selectedOpportunity.demandTag ?? "High Demand"}
                    </p>
                    <p className="mt-4 text-sm text-zinc-700">Earn Up To</p>
                    <p className="text-xl font-bold text-brand-red">{selectedOpportunity.commission ?? "Up to 1% Commission"}</p>
                  </div>
                  <Button className="w-full" onClick={handleUnlock} disabled={isUnlocking}>
                    <Lock className="h-4 w-4" />
                    {isUnlocking ? "Processing..." : "Unlock Access - ₹500"}
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-5">
                {[
                  { label: "Investment Range", value: selectedOpportunity.investment, icon: CircleDollarSign },
                  { label: "Area Required", value: selectedOpportunity.areaRequired ?? "—", icon: Ruler },
                  { label: "Model Type", value: selectedOpportunity.modelType ?? selectedOpportunity.businessModel, icon: Sparkles },
                  { label: "Commission", value: selectedOpportunity.commission ?? selectedOpportunity.commissionPotential, icon: Percent },
                  { label: "Pay-out Time", value: selectedOpportunity.payoutTime ?? "30–60 days", icon: Clock3 }
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
                    <p className="text-base font-bold">About the Brand</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">{selectedOpportunity.about}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Brand SOPs", "Launch Support", "Training", "Marketing"].map((tag) => (
                      <span key={tag} className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-brand-red">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-brand-red">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <p className="text-base font-bold">Opportunity Highlights</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {(selectedOpportunity.opportunityHighlights ?? [
                      selectedOpportunity.whyPreferred,
                      selectedOpportunity.marketDemand,
                      selectedOpportunity.supportProvided,
                      selectedOpportunity.consultantBenefits
                    ])
                      .slice(0, 6)
                      .map((h) => (
                        <div key={h} className="flex items-start gap-2 text-sm text-zinc-700">
                          <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white">
                            ✓
                          </span>
                          <span className="leading-6">{h}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-zinc-900">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-brand-red">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <p className="text-base font-bold">Investment &amp; Space Details</p>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  {(selectedOpportunity.investmentDetails ?? [
                    { label: "Setup Cost", value: selectedOpportunity.investment },
                    { label: "Area Required", value: selectedOpportunity.areaRequired ?? "—" },
                    { label: "Business Model", value: selectedOpportunity.modelType ?? selectedOpportunity.businessModel },
                    { label: "Support", value: "Brand + Franchise World assistance" }
                  ]).slice(0, 4).map((row) => (
                    <div key={row.label} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-brand-red">
                        {row.label === "Area Required" ? (
                          <Ruler className="h-5 w-5" />
                        ) : row.label === "Support" ? (
                          <ShieldCheck className="h-5 w-5" />
                        ) : row.label === "Business Model" || row.label === "Model" || row.label === "Format" ? (
                          <Sparkles className="h-5 w-5" />
                        ) : (
                          <CircleDollarSign className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-zinc-700">{row.label}</p>
                        <p className="text-xs text-zinc-600">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-5 md:flex-row md:items-center">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-brand-red">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Ready to Unlock This Opportunity?</p>
                    <p className="mt-1 text-sm text-zinc-600">Pay ₹500 to view complete details and connect with the brand.</p>
                  </div>
                </div>
                <Button className="w-full md:w-auto" onClick={handleUnlock} disabled={isUnlocking}>
                  <Lock className="h-4 w-4" />
                  {isUnlocking ? "Processing..." : "Unlock Access - ₹500"}
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure Payment</span>
                <span className="flex items-center gap-2"><RefreshCcw className="h-4 w-4" /> 100% Refundable if not satisfied</span>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
