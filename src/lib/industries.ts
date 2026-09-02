// Sector data for the Industries menu and the /industries pages.
// Copy here is editable in one place. Replace the "facts" values with real
// numbers once you have client results to publish.

export type IndustrySolution = {
  title: string;
  body: string;
};

export type IndustryFact = {
  value: string;
  label: string;
};

export type Industry = {
  slug: string;
  name: string;
  menuLine: string;
  featured?: boolean;
  headline: string;
  intro: string;
  problems: string[];
  solutions: IndustrySolution[];
  facts: IndustryFact[];
  stack: string[];
  standards: string[];
};

export const INDUSTRIES_HREF = "/industries";

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    menuLine: "Patient intake, records, claims and clinical AI",
    featured: true,
    headline: "Software that keeps clinical work moving",
    intro:
      "We build the systems hospitals, clinics and diagnostic groups run on. Patient intake, records, claims and the AI that takes the paperwork off your staff, wired into the tools you already use.",
    problems: [
      "Patient records live in three systems and none of them agree.",
      "Claims go out with coding errors and come back as denials weeks later.",
      "Front desk staff spend the day on the phone instead of with patients.",
      "Referral letters and scans arrive as PDFs that nobody can search.",
      "Regulatory reporting is assembled by hand at the end of every quarter.",
    ],
    solutions: [
      {
        title: "Patient intake and scheduling",
        body: "Booking, reminders, digital forms and check in that work on a phone and write straight back into your records system.",
      },
      {
        title: "Claims and revenue integrity",
        body: "Coding checks and denial prediction before a claim is submitted, with an audit trail on every edit.",
      },
      {
        title: "Document and scan understanding",
        body: "Referral letters, lab reports and discharge summaries turned into structured, searchable data.",
      },
      {
        title: "AI front desk",
        body: "Voice and chat agents that answer calls, book appointments and hand off to a human the moment it matters.",
      },
      {
        title: "Clinical data platform",
        body: "One warehouse for records, billing and operations, with dashboards clinicians actually open.",
      },
    ],
    facts: [
      { value: "FHIR R4", label: "Interoperability we build against" },
      { value: "HL7 v2", label: "Legacy interfaces we still speak" },
      { value: "Audit by default", label: "Every record change is traceable" },
    ],
    stack: [
      "FHIR and HL7 v2 interfaces",
      "Next.js clinical and admin apps",
      "Node and Python services",
      "Postgres with row level access control",
      "Speech and LLM pipelines",
      "Private cloud on AWS or Azure",
    ],
    standards: ["HIPAA aligned", "GDPR", "ISO 27001 practices", "Role based access", "Encryption at rest and in transit"],
  },
  {
    slug: "finance",
    name: "Finance",
    menuLine: "Core system integrations, risk and reconciliation",
    headline: "Money systems that reconcile themselves",
    intro:
      "Ledgers, payments and reporting for lenders, brokers and finance teams that have outgrown spreadsheets and off the shelf tools.",
    problems: [
      "Reconciliation is a monthly manual exercise across exports from four systems.",
      "Risk and exposure numbers are a day behind the business.",
      "Onboarding a customer takes days of document checks.",
    ],
    solutions: [
      {
        title: "Ledger and reconciliation engines",
        body: "Automated matching across accounts, providers and internal records, with exceptions queued for a human.",
      },
      {
        title: "Onboarding and verification",
        body: "Identity and document checks built into the signup flow, with decisions logged for review.",
      },
      {
        title: "Risk and reporting platforms",
        body: "Live exposure, limits and regulatory reporting from one modelled data layer.",
      },
    ],
    facts: [
      { value: "Double entry", label: "Ledger design we start from" },
      { value: "Immutable log", label: "Every posting is replayable" },
      { value: "Market neutral", label: "Built for multi currency operations" },
    ],
    stack: ["Event sourced services", "Postgres and columnar analytics", "Next.js operator consoles", "Queue backed workers", "Payment and KYC provider integrations"],
    standards: ["SOC 2 practices", "PCI aware design", "Segregation of duties", "Full change history"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    menuLine: "Fleet, warehouse and last mile visibility",
    headline: "Know where every shipment actually is",
    intro:
      "Planning, tracking and proof of delivery for operators who are running the network on phone calls and spreadsheets.",
    problems: [
      "Customers call to ask where an order is and nobody can answer quickly.",
      "Route planning happens in someone's head and leaves with them.",
      "Proof of delivery is a photo in a WhatsApp group.",
    ],
    solutions: [
      {
        title: "Dispatch and route planning",
        body: "Jobs assigned against capacity, distance and time windows, with changes pushed to drivers instantly.",
      },
      {
        title: "Driver and warehouse apps",
        body: "Offline capable mobile apps for scanning, pickups, exceptions and signed proof of delivery.",
      },
      {
        title: "Control tower dashboards",
        body: "One live view of fleet, orders and delays, with alerts before a customer notices.",
      },
    ],
    facts: [
      { value: "Offline first", label: "Field apps keep working without signal" },
      { value: "Live tracking", label: "Position and status in seconds" },
      { value: "Open APIs", label: "Connects to your existing TMS or ERP" },
    ],
    stack: ["Flutter and React Native field apps", "Geospatial services on Postgres and PostGIS", "Realtime event streams", "Next.js operations console"],
    standards: ["Driver data minimisation", "Retention policies on location history", "Auditable delivery records"],
  },
  {
    slug: "education",
    name: "Education",
    menuLine: "Learning platforms, assessments and proctoring",
    headline: "Learning platforms that hold up on exam day",
    intro:
      "Course delivery, assessment and certification for training providers, universities and skills businesses.",
    problems: [
      "The platform slows to a crawl the moment everyone sits the same exam.",
      "Course content, assessment and certificates live in separate tools.",
      "Nobody can prove who actually sat the test.",
    ],
    solutions: [
      {
        title: "Learning and course delivery",
        body: "Structured content, cohorts, progress tracking and reporting that administrators can run without a developer.",
      },
      {
        title: "Assessment and exam engines",
        body: "Question banks, timed papers, auto marking and results that survive a thousand concurrent candidates.",
      },
      {
        title: "Identity and proctoring",
        body: "Candidate verification, session monitoring and evidence retained for appeals.",
      },
    ],
    facts: [
      { value: "Multi tenant", label: "One platform, many training providers" },
      { value: "Exam grade", label: "Built for concurrent load spikes" },
      { value: "Accessible", label: "Keyboard and screen reader support" },
    ],
    stack: ["Next.js learner and admin apps", "Node services with Prisma", "Postgres per tenant isolation", "Object storage for media", "Background workers for marking"],
    standards: ["GDPR", "Accessibility to WCAG AA", "Exam evidence retention", "Tenant data separation"],
  },
  {
    slug: "tourism",
    name: "Tourism",
    menuLine: "Booking engines, itineraries and channel sync",
    headline: "Sell the trip without the middleman margin",
    intro:
      "Direct booking, itinerary building and supplier connectivity for tour operators and travel brands.",
    problems: [
      "Inventory is sold twice because channels update on different schedules.",
      "Itineraries are rebuilt from scratch for every enquiry.",
      "Most bookings arrive through an aggregator that takes the margin.",
    ],
    solutions: [
      {
        title: "Direct booking engines",
        body: "Search, availability, payment and confirmation on your own domain, tuned for conversion.",
      },
      {
        title: "Itinerary builders",
        body: "Reusable day by day templates that sales teams can price and send in minutes.",
      },
      {
        title: "Channel and supplier sync",
        body: "One inventory source pushed to every channel, with conflict handling built in.",
      },
    ],
    facts: [
      { value: "One inventory", label: "Single source across every channel" },
      { value: "Multi currency", label: "Pricing and payments per market" },
      { value: "Fast pages", label: "Booking flows built for mobile data" },
    ],
    stack: ["Next.js storefronts", "Booking and inventory services", "Payment gateway integrations", "Search and availability caching"],
    standards: ["PCI aware payment handling", "GDPR", "Cancellation and refund audit trails"],
  },
  {
    slug: "hospitality",
    name: "Hotels and resorts",
    menuLine: "PMS integrations, direct booking and AI concierge",
    headline: "Guest systems that answer at three in the morning",
    intro:
      "Direct booking, property operations and AI concierge for independent hotels and resort groups.",
    problems: [
      "Guest messages arrive on five channels and get answered on none.",
      "The property system does not talk to anything else you run.",
      "Housekeeping and maintenance coordination happens on paper.",
    ],
    solutions: [
      {
        title: "AI guest concierge",
        body: "WhatsApp and web agents that handle enquiries, bookings and requests in the guest's language, day and night.",
      },
      {
        title: "Direct booking and upsell",
        body: "Your own booking flow with room, rate and extras logic that protects margin.",
      },
      {
        title: "Property operations",
        body: "Housekeeping, maintenance and staff tasks on mobile, linked to arrivals and departures.",
      },
    ],
    facts: [
      { value: "24 / 7", label: "Guest response target with AI on the front line" },
      { value: "Multilingual", label: "Conversations in the guest's language" },
      { value: "PMS ready", label: "Integrates with your existing property system" },
    ],
    stack: ["WhatsApp Cloud API", "Conversation and LLM orchestration", "Next.js booking and admin apps", "PMS and channel manager integrations"],
    standards: ["GDPR", "Guest data retention limits", "Human handoff on every automated conversation"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    menuLine: "Ordering, POS integrations and delivery operations",
    headline: "Take the order without paying a platform for it",
    intro:
      "Own ordering, kitchen flow and loyalty for restaurant groups and cloud kitchens.",
    problems: [
      "A third of revenue goes through aggregators at aggregator commission.",
      "Orders from four channels arrive on four different tablets.",
      "Nobody knows which items actually make money.",
    ],
    solutions: [
      {
        title: "Direct ordering",
        body: "Web and app ordering with menus, modifiers and payments that you control end to end.",
      },
      {
        title: "Kitchen and POS integration",
        body: "Every channel routed into one kitchen display and one POS, with printed and digital tickets.",
      },
      {
        title: "Loyalty and customer data",
        body: "Repeat order tracking, offers and campaigns built on customers you own.",
      },
    ],
    facts: [
      { value: "One queue", label: "All channels into a single kitchen view" },
      { value: "Own the data", label: "Customers stay yours, not the platform's" },
      { value: "Item level", label: "Margin reporting down to the modifier" },
    ],
    stack: ["Next.js ordering apps", "POS and printer integrations", "Realtime kitchen displays", "Payments and wallet integrations"],
    standards: ["PCI aware payment handling", "GDPR", "Allergen and menu data integrity"],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function industrySlugs(): string[] {
  return industries.map((industry) => industry.slug);
}
