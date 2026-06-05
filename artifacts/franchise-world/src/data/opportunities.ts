export interface Opportunity {
  id: string;
  name: string;
  category:
    | "Food & Beverage"
    | "Automotive & EV"
    | "Hospitality & Wellness"
    | "Retail"
    | "Miscellaneous";
  industry: string;
  investment: string;
  description: string;
  businessModel: string;
  about: string;
  whyPreferred: string;
  marketDemand: string;
  supportProvided: string;
  consultantBenefits: string;
  commissionPotential: string;
  comingSoon?: boolean;
  areaRequired?: string;
  modelType?: string;
  commission?: string;
  payoutTime?: string;
  demandTag?: "High Demand" | "Growing Demand" | "Stable Demand" | "Validated";
  opportunityHighlights?: string[];
  investmentDetails?: { label: string; value: string }[];
}

export const categories: Opportunity["category"][] = [
  "Food & Beverage",
  "Automotive & EV",
  "Hospitality & Wellness",
  "Retail",
  "Miscellaneous"
];

const comingSoonBase = (id: string, name: string, category: Opportunity["category"], industry: string, investment: string): Opportunity => ({
  id,
  name,
  category,
  industry,
  investment,
  description: "",
  businessModel: "",
  about: "",
  whyPreferred: "",
  marketDemand: "",
  supportProvided: "",
  consultantBenefits: "",
  commissionPotential: "",
  comingSoon: true
});

export const opportunities: Opportunity[] = [
  comingSoonBase("adhira-appa", "Adhira & Appa", "Food & Beverage", "South Indian QSR", "₹20L – ₹50L"),
  comingSoonBase("natuf", "Natuf", "Food & Beverage", "Healthy Food Concept", "₹15L – ₹35L"),
  comingSoonBase("go-mill", "Go Mill", "Food & Beverage", "Quick Service Brand", "₹30L – ₹50L"),
  comingSoonBase("pro-mill", "Pro Mill", "Food & Beverage", "Premium Casual Dining", "₹25L – ₹50L"),
  comingSoonBase("chhota-bheem", "Chhota Bheem", "Food & Beverage", "Family Entertainment", "₹30L – ₹80L"),
  {
    id: "acer-electric",
    name: "Acer Electric",
    category: "Automotive & EV",
    industry: "EV Retail / Appliances / E-Cycles / FOCO Dealership",
    investment: "₹30L – ₹1 Cr",
    description: "EV-led retail and passive investment opportunity covering electric mobility products, inventory deployment, dealership expansion, and FOCO models.",
    businessModel: "Passive Inventory / FOCO Dealership",
    about: "EV-led retail and passive investment opportunity covering electric mobility products, inventory deployment, dealership expansion, and FOCO models.",
    whyPreferred: "",
    marketDemand: "",
    supportProvided: "",
    consultantBenefits: "",
    commissionPotential: "Up to 1%",
    modelType: "Passive Inventory / FOCO Dealership",
    commission: "Up to 1%",
    demandTag: "Validated",
    opportunityHighlights: [
      "Appliance Model – ₹30L",
      "2% Guaranteed Monthly Return",
      "Bicycle Model – ₹30L",
      "FOCO Tier 1 – ₹1 Cr",
      "FOCO Tier 2 – ₹80L"
    ],
    investmentDetails: [
      { label: "Appliance Inventory", value: "₹30L" },
      { label: "Bicycle Model", value: "₹30L" },
      { label: "Tier 1", value: "₹1 Cr" },
      { label: "Tier 2", value: "₹80L" }
    ]
  },
  {
    id: "carlton-salon",
    name: "Carlton Salon",
    category: "Hospitality & Wellness",
    industry: "Premium Salon",
    investment: "₹30L – ₹70L",
    description: "Established premium salon concept with recurring customer demand.",
    businessModel: "Managed Salon Franchise",
    about: "Brand with consistent positioning and premium customer base.",
    whyPreferred: "Recurring revenue and strong city scalability.",
    marketDemand: "Steady growth in organized beauty services.",
    supportProvided: "Stylist training, launch campaigns and operations monitoring.",
    consultantBenefits: "Easy positioning with aspirational brand appeal.",
    commissionPotential: "Up to 1%",
    areaRequired: "600–1500 sq.ft",
    modelType: "Premium Salon",
    commission: "Up to 1%",
    payoutTime: "30–60 days",
    demandTag: "Stable Demand",
    opportunityHighlights: ["Recurring services revenue", "Premium positioning", "Staff training included", "City scalability"],
    investmentDetails: [
      { label: "Setup Cost", value: "₹30L – ₹70L" },
      { label: "Area Required", value: "600–1500 sq.ft" },
      { label: "Format", value: "Premium salon studio" },
      { label: "Support", value: "Training + launch campaigns" }
    ]
  },
  comingSoonBase("carlton-wellness", "Carlton Wellness Center", "Hospitality & Wellness", "Integrated Wellness", "₹45L – ₹1 Cr"),
  comingSoonBase("nonstop-physio", "NonStop Physio", "Hospitality & Wellness", "Physiotherapy Clinics", "₹20L – ₹50L"),
  {
    id: "tarzan",
    name: "Tarzan",
    category: "Hospitality & Wellness",
    industry: "Nature Retreat Territory Master Franchise",
    investment: "₹2 Cr – ₹5 Cr",
    description: "Territory master franchise opportunity focused on building regional nature hospitality networks.",
    businessModel: "Territory Master Franchise",
    about: "Tarzan Nature Retreat is a territory master franchise opportunity focused on building regional nature hospitality networks through eco-stays, farmhouses, retreat developments, and investor partnerships.",
    whyPreferred: "",
    marketDemand: "",
    supportProvided: "",
    consultantBenefits: "",
    commissionPotential: "Up to 1%",
    modelType: "Territory Master Franchise",
    commission: "Up to 1%",
    demandTag: "Validated",
    opportunityHighlights: [
      "Zone 1: ₹5 Cr",
      "Zone 2: ₹3.5 Cr",
      "Zone 3: ₹2 Cr",
      "Licensing: ₹10L–75L",
      "Modular Investments: ₹35L–80L+",
      "Profit-sharing farmstay model"
    ],
    investmentDetails: [
      { label: "Zone 1", value: "₹5 Cr" },
      { label: "Zone 2", value: "₹3.5 Cr" },
      { label: "Zone 3", value: "₹2 Cr" },
      { label: "Licensing", value: "₹10L–75L" },
      { label: "Modular Ticket", value: "₹35L–80L+" }
    ]
  },
  comingSoonBase("ageon", "AgeOn", "Retail", "Lifestyle Retail", "₹15L – ₹40L"),
  comingSoonBase("daewoo", "Daewoo", "Retail", "Consumer Products Retail", "₹25L – ₹70L"),
];
