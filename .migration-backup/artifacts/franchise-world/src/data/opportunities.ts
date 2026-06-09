export interface Opportunity {
  id: string;
  name: string;
  category:
    | "Food & Beverage"
    | "Automotive & EV"
    | "Hospitality & Wellness"
    | "Retail";
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
  demandTag?: "High Demand" | "Growing Demand" | "Stable Demand" | "Validated" | "High Growth" | "Very High" | "Growing";
  opportunityHighlights?: string[];
  investmentDetails?: { label: string; value: string }[];
  salesContact?: string;
  salesContactFull?: string;
}

export const categories: Opportunity["category"][] = [
  "Food & Beverage",
  "Automotive & EV",
  "Hospitality & Wellness",
  "Retail"
];

export const opportunities: Opportunity[] = [
  // ── FOOD & BEVERAGE ─────────────────────────────────────────────────────
  {
    id: "adhira-appa",
    name: "Adhira & Appa Coffee",
    category: "Food & Beverage",
    industry: "Café / Filter Coffee",
    investment: "₹35L – ₹1.25 Cr",
    description: "India's culturally rooted coffee café brand combining authentic filter coffee, fusion food, and community-driven experiences.",
    businessModel: "Growth Capital Opportunity",
    about: "India's culturally rooted coffee café brand combining authentic filter coffee, fusion food, and community-driven experiences.",
    whyPreferred: "Strong cultural identity with high repeat footfall and scalable growth capital model.",
    marketDemand: "Rapidly growing café culture with demand for authentic regional coffee experiences.",
    supportProvided: "Full brand and operations support from launch through expansion.",
    consultantBenefits: "Easy positioning with compelling brand story and premium café appeal.",
    commissionPotential: "Up to 1%",
    modelType: "Growth Capital Opportunity",
    commission: "Up to 1%",
    demandTag: "High Growth",
    opportunityHighlights: [
      "Growth Capital Entry – ₹35L+",
      "Expansion Partner – ₹75L+",
      "Strategic Growth Partner – ₹1.25 Cr",
      "Authentic filter coffee concept",
      "Community-driven café experience"
    ],
    investmentDetails: [
      { label: "Growth Capital Entry", value: "₹35L+" },
      { label: "Expansion Partner", value: "₹75L+" },
      { label: "Strategic Growth Partner", value: "₹1.25 Cr" }
    ],
    salesContact: "987XX XXXXX",
    salesContactFull: "9876543210"
  },
  {
    id: "natuf",
    name: "NATUF",
    category: "Food & Beverage",
    industry: "Levantine / Mediterranean QSR",
    investment: "₹35L – ₹5 Cr",
    description: "A premium Levantine food brand bringing authentic Mediterranean-inspired cuisine to India through scalable multi-format operations.",
    businessModel: "Franchise / State Master Franchise",
    about: "A premium Levantine food brand bringing authentic Mediterranean-inspired cuisine to India through scalable multi-format operations.",
    whyPreferred: "Unique cuisine category with high differentiation and strong aspirational positioning.",
    marketDemand: "High consumer demand for authentic international cuisine experiences.",
    supportProvided: "Full franchise system support including kitchen setup, training, and marketing.",
    consultantBenefits: "Premium positioning with multiple investment tiers from café to state rights.",
    commissionPotential: "Up to 1%",
    modelType: "Franchise / State Master Franchise",
    commission: "Up to 1%",
    demandTag: "High Growth",
    opportunityHighlights: [
      "Café Format – ₹35L+",
      "Premium Format – ₹1 Cr+",
      "Zone 3 State Rights – ₹2 Cr",
      "Zone 2 State Rights – ₹3.5 Cr",
      "Zone 1 State Rights – ₹5 Cr"
    ],
    investmentDetails: [
      { label: "Café Format", value: "₹35L+" },
      { label: "Premium Format", value: "₹1 Cr+" },
      { label: "Zone 3 State Rights", value: "₹2 Cr" },
      { label: "Zone 2 State Rights", value: "₹3.5 Cr" },
      { label: "Zone 1 State Rights", value: "₹5 Cr" }
    ],
    salesContact: "912XX XXXXX",
    salesContactFull: "9123456789"
  },
  {
    id: "go-mill",
    name: "GoMill",
    category: "Food & Beverage",
    industry: "Mobile Food / Millet QSR",
    investment: "₹15L – ₹50L",
    description: "A branded millet-based mobile food concept delivering healthier, hygienic, and convenient food-on-the-go.",
    businessModel: "Mobile Food Business",
    about: "A branded millet-based mobile food concept delivering healthier, hygienic, and convenient food-on-the-go.",
    whyPreferred: "Low investment entry with mobile format flexibility and growing health-food demand.",
    marketDemand: "Rising consumer demand for healthy, convenient, and affordable food options.",
    supportProvided: "Brand kit, recipe support, and operational training for mobile units.",
    consultantBenefits: "Low investment threshold makes it easy to refer to a wide investor base.",
    commissionPotential: "Up to 1%",
    modelType: "Mobile Food Business",
    commission: "Up to 1%",
    demandTag: "Growing",
    opportunityHighlights: [
      "Mobile Cart Model – ₹15L",
      "Mobile Truck Model – ₹30L",
      "Multi-Unit Expansion – ₹50L",
      "Millet-based health food",
      "Low entry investment"
    ],
    investmentDetails: [
      { label: "Mobile Cart Model", value: "₹15L" },
      { label: "Mobile Truck Model", value: "₹30L" },
      { label: "Multi-Unit Expansion", value: "₹50L" }
    ],
    salesContact: "944XX XXXXX",
    salesContactFull: "9445678901"
  },
  {
    id: "pro-mill",
    name: "ProMill",
    category: "Food & Beverage",
    industry: "Protein / Millet QSR",
    investment: "₹20L – ₹75L",
    description: "A protein and millet-powered quick-service food brand offering healthier everyday meals for modern consumers.",
    businessModel: "Quick Service Restaurant",
    about: "A protein and millet-powered quick-service food brand offering healthier everyday meals for modern consumers.",
    whyPreferred: "Health-first positioning aligned with growing consumer wellness awareness.",
    marketDemand: "Strong demand for protein-rich, nutritious QSR alternatives.",
    supportProvided: "Operations manual, menu engineering, and launch marketing support.",
    consultantBenefits: "Multiple format options suit different investor budgets.",
    commissionPotential: "Up to 1%",
    modelType: "Quick Service Restaurant",
    commission: "Up to 1%",
    demandTag: "High Growth",
    opportunityHighlights: [
      "Kiosk Format – ₹20L",
      "Standard Store – ₹45L",
      "Premium Store – ₹75L",
      "Protein & millet-powered menu",
      "Modern QSR format"
    ],
    investmentDetails: [
      { label: "Kiosk Format", value: "₹20L" },
      { label: "Standard Store", value: "₹45L" },
      { label: "Premium Store", value: "₹75L" }
    ],
    salesContact: "987XX XXXXX",
    salesContactFull: "9870123456"
  },

  // ── AUTOMOTIVE & EV ──────────────────────────────────────────────────────
  {
    id: "acer-electric",
    name: "Acer Electric",
    category: "Automotive & EV",
    industry: "EV Retail / Appliances / E-Cycles / FOCO Dealership",
    investment: "₹30L – ₹1 Cr",
    description: "An EV-focused retail and dealership opportunity spanning electric mobility, appliances, bicycles, and FOCO expansion models.",
    businessModel: "Passive Inventory / FOCO Dealership",
    about: "An EV-focused retail and dealership opportunity spanning electric mobility, appliances, bicycles, and FOCO expansion models.",
    whyPreferred: "Validated EV market with passive income potential and multiple investment tiers.",
    marketDemand: "Rapidly expanding EV adoption across India with strong government support.",
    supportProvided: "Inventory management, dealership setup, and brand marketing support.",
    consultantBenefits: "Strong EV market tailwind makes investor pitches compelling.",
    commissionPotential: "Up to 1%",
    modelType: "Passive Inventory / FOCO Dealership",
    commission: "Up to 1%",
    demandTag: "Validated",
    opportunityHighlights: [
      "Appliance Inventory – ₹30L",
      "Bicycle Model – ₹30L",
      "FOCO Tier 1 – ₹1 Cr",
      "FOCO Tier 2 – ₹80L",
      "2% Guaranteed Monthly Return"
    ],
    investmentDetails: [
      { label: "Appliance Inventory", value: "₹30L" },
      { label: "Bicycle Model", value: "₹30L" },
      { label: "FOCO Tier 1", value: "₹1 Cr" },
      { label: "FOCO Tier 2", value: "₹80L" }
    ],
    salesContact: "988XX XXXXX",
    salesContactFull: "9889012345"
  },

  // ── HOSPITALITY & WELLNESS ───────────────────────────────────────────────
  {
    id: "carlton-wellness",
    name: "Carlton Wellness Center",
    category: "Hospitality & Wellness",
    industry: "Integrated Wellness / Prevention & Recovery",
    investment: "₹2 Cr – ₹5 Cr+",
    description: "A premium prevention, recovery, and longevity wellness network offering integrated wellness experiences through a structured, protocol-led model.",
    businessModel: "Franchise-Invested, Company-Operated (FICO)",
    about: "A premium prevention, recovery, and longevity wellness network offering integrated wellness experiences through a structured, protocol-led model.",
    whyPreferred: "Premium wellness sector with strong FICO model reducing operational burden on investors.",
    marketDemand: "High growth in preventive healthcare and longevity wellness demand.",
    supportProvided: "Full FICO operations, staff, protocols, and brand management.",
    consultantBenefits: "High ticket size drives strong commission earnings per referral.",
    commissionPotential: "Up to 1%",
    modelType: "Franchise-Invested, Company-Operated (FICO)",
    commission: "Up to 1%",
    demandTag: "High Growth",
    opportunityHighlights: [
      "Compact Centre – ₹2 Cr",
      "Signature Centre – ₹2.5 Cr",
      "Flagship Centre – ₹3 Cr",
      "Zone 3 Territory Rights – ₹2 Cr",
      "Zone 2 Territory Rights – ₹3.5 Cr",
      "Zone 1 Territory Rights – ₹5 Cr"
    ],
    investmentDetails: [
      { label: "Compact Centre", value: "₹2 Cr" },
      { label: "Signature Centre", value: "₹2.5 Cr" },
      { label: "Flagship Centre", value: "₹3 Cr" },
      { label: "Zone 3 Territory Rights", value: "₹2 Cr" },
      { label: "Zone 2 Territory Rights", value: "₹3.5 Cr" },
      { label: "Zone 1 Territory Rights", value: "₹5 Cr" }
    ],
    salesContact: "982XX XXXXX",
    salesContactFull: "9820234567"
  },
  {
    id: "carlton-salon",
    name: "Carlton Wellness Salon",
    category: "Hospitality & Wellness",
    industry: "Premium Wellness Salon / City Rights",
    investment: "₹1 Cr – ₹2 Cr",
    description: "India's first premium wellness-led salon chain combining beauty, wellness, memberships, and standardized salon operations through a scalable city-rights expansion model.",
    businessModel: "Cluster Master Franchise",
    about: "India's first premium wellness-led salon chain combining beauty, wellness, memberships, and standardized salon operations through a scalable city-rights expansion model.",
    whyPreferred: "First-mover premium wellness-salon positioning with city rights exclusivity.",
    marketDemand: "High growth in organized premium beauty and wellness services.",
    supportProvided: "Training, launch campaigns, operations monitoring, and brand support.",
    consultantBenefits: "Strong aspirational brand appeal and high city scalability.",
    commissionPotential: "Up to 1%",
    modelType: "Cluster Master Franchise",
    commission: "Up to 1%",
    demandTag: "High Growth",
    opportunityHighlights: [
      "Zone 3 City Rights – ₹1 Cr",
      "Zone 2 City Rights – ₹1.5 Cr",
      "Zone 1 City Rights – ₹2 Cr",
      "Wellness + beauty membership model",
      "City-level exclusivity rights"
    ],
    investmentDetails: [
      { label: "Zone 3 City Rights", value: "₹1 Cr" },
      { label: "Zone 2 City Rights", value: "₹1.5 Cr" },
      { label: "Zone 1 City Rights", value: "₹2 Cr" }
    ],
    salesContact: "981XX XXXXX",
    salesContactFull: "9810123456"
  },
  {
    id: "ageon",
    name: "AGEON",
    category: "Hospitality & Wellness",
    industry: "Smart-Ageing / Longevity & Recovery",
    investment: "₹35L – ₹1 Cr+",
    description: "A smart-ageing and longevity platform focused on prevention, recovery, diagnostics, and personalized wellness journeys.",
    businessModel: "Longevity & Recovery Centre",
    about: "A smart-ageing and longevity platform focused on prevention, recovery, diagnostics, and personalized wellness journeys.",
    whyPreferred: "Emerging longevity sector with high income demographics and strong repeat engagement.",
    marketDemand: "Growing demand for science-backed wellness and smart-ageing solutions.",
    supportProvided: "Clinical protocols, brand support, staff training, and technology platform.",
    consultantBenefits: "Unique category with high investor interest in longevity and wellness.",
    commissionPotential: "Up to 1%",
    modelType: "Longevity & Recovery Centre",
    commission: "Up to 1%",
    demandTag: "High Growth",
    opportunityHighlights: [
      "Wellness Centre – ₹35L+",
      "Premium Longevity Centre – ₹75L+",
      "Multi-Centre Expansion – ₹1 Cr+",
      "Science-backed longevity protocols",
      "Personalized wellness journeys"
    ],
    investmentDetails: [
      { label: "Wellness Centre", value: "₹35L+" },
      { label: "Premium Longevity Centre", value: "₹75L+" },
      { label: "Multi-Centre Expansion", value: "₹1 Cr+" }
    ],
    salesContact: "931XX XXXXX",
    salesContactFull: "9313567890"
  },
  {
    id: "nonstop-physio",
    name: "NonStop PhysioCare",
    category: "Hospitality & Wellness",
    industry: "Physiotherapy & Recovery Network",
    investment: "₹50L – ₹2 Cr+",
    description: "An organized physiotherapy and recovery network focused on rehabilitation, mobility care, and preventive wellness services.",
    businessModel: "Master Franchise / Territory Rights",
    about: "An organized physiotherapy and recovery network focused on rehabilitation, mobility care, and preventive wellness services.",
    whyPreferred: "Recession-resistant healthcare sector with strong recurring patient demand.",
    marketDemand: "Very high demand for organized physiotherapy and recovery services across India.",
    supportProvided: "Clinical protocols, therapist training, technology platform, and brand support.",
    consultantBenefits: "Healthcare positioning with strong investor confidence and recurring revenue model.",
    commissionPotential: "Up to 1%",
    modelType: "Master Franchise / Territory Rights",
    commission: "Up to 1%",
    demandTag: "Very High",
    opportunityHighlights: [
      "Territory Rights – ₹50L+",
      "Regional Expansion – ₹1 Cr+",
      "Large Territory Rights – ₹2 Cr+",
      "Organized physiotherapy network",
      "Preventive wellness focus"
    ],
    investmentDetails: [
      { label: "Territory Rights", value: "₹50L+" },
      { label: "Regional Expansion", value: "₹1 Cr+" },
      { label: "Large Territory Rights", value: "₹2 Cr+" }
    ],
    salesContact: "993XX XXXXX",
    salesContactFull: "9930345678"
  },
  {
    id: "tarzan",
    name: "Tarzan Nature Retreat",
    category: "Hospitality & Wellness",
    industry: "Eco-Tourism / Nature Retreat Territory Master Franchise",
    investment: "₹2 Cr – ₹5 Cr",
    description: "A hospitality and wellness opportunity focused on eco-tourism, farm stays, retreats, and nature-based experiences.",
    businessModel: "Territory Master Franchise",
    about: "A hospitality and wellness opportunity focused on eco-tourism, farm stays, retreats, and nature-based experiences.",
    whyPreferred: "Growing eco-tourism sector with territory exclusivity and licensing revenue streams.",
    marketDemand: "Rapidly growing demand for nature retreats and experiential hospitality.",
    supportProvided: "Brand standards, development support, licensing framework, and operations playbook.",
    consultantBenefits: "High ticket investments with compelling nature hospitality story.",
    commissionPotential: "Up to 1%",
    modelType: "Territory Master Franchise",
    commission: "Up to 1%",
    demandTag: "Validated",
    opportunityHighlights: [
      "Zone 3 Territory – ₹2 Cr",
      "Zone 2 Territory – ₹3.5 Cr",
      "Zone 1 Territory – ₹5 Cr",
      "Licensing Opportunities – ₹10L–₹75L",
      "Eco-tourism & farm stay model"
    ],
    investmentDetails: [
      { label: "Zone 3 Territory", value: "₹2 Cr" },
      { label: "Zone 2 Territory", value: "₹3.5 Cr" },
      { label: "Zone 1 Territory", value: "₹5 Cr" },
      { label: "Licensing Opportunities", value: "₹10L – ₹75L" }
    ],
    salesContact: "971XX XXXXX",
    salesContactFull: "9712456789"
  },

  // ── RETAIL ───────────────────────────────────────────────────────────────
  {
    id: "daewoo",
    name: "Daewoo",
    category: "Retail",
    industry: "Consumer Electronics & Appliances",
    investment: "₹25L – ₹1 Cr+",
    description: "A globally trusted electronics and appliance brand operating in 160+ countries and expanding rapidly across India.",
    businessModel: "District Program / Business Partner",
    about: "A globally trusted electronics and appliance brand operating in 160+ countries and expanding rapidly across India.",
    whyPreferred: "Globally recognized brand with validated India expansion and multiple partnership tiers.",
    marketDemand: "Strong and consistent demand for trusted consumer electronics across all tier cities.",
    supportProvided: "Distribution support, brand co-marketing, and partner onboarding.",
    consultantBenefits: "Brand recognition makes investor conversations straightforward and credible.",
    commissionPotential: "Up to 1%",
    modelType: "District Program / Business Partner",
    commission: "Up to 1%",
    demandTag: "Validated",
    opportunityHighlights: [
      "District Partner – ₹25L+",
      "Regional Partner – ₹50L+",
      "Strategic Expansion Partner – ₹1 Cr+",
      "160+ countries presence",
      "Rapid India expansion"
    ],
    investmentDetails: [
      { label: "District Partner", value: "₹25L+" },
      { label: "Regional Partner", value: "₹50L+" },
      { label: "Strategic Expansion Partner", value: "₹1 Cr+" }
    ],
    salesContact: "921XX XXXXX",
    salesContactFull: "9216678901"
  },
];
