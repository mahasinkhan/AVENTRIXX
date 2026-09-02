// Additional content for the healthcare page. Same rule as healthcare.ts:
// copy lives here, components stay dumb.

export const galleryScreens = [
  { slot: "gallery-intake", title: "Pre-arrival intake", caption: "Consent, history and coverage captured on the patient's phone before they reach the desk." },
  { slot: "gallery-queue", title: "Live queue", caption: "Priority, room state and expected wait, visible to staff and to the waiting room." },
  { slot: "gallery-ward", title: "Ward board", caption: "Bed state, blockers and discharge readiness in one view that updates itself." },
  { slot: "gallery-results", title: "Results acknowledgement", caption: "Every result has a named owner and a timestamp. Nothing sits unread." },
  { slot: "gallery-claims", title: "Claim scrubber", caption: "Denials predicted and fixed before submission, not discovered six weeks later." },
];

export type IntegrationGroup = { group: string; systems: string[] };

export const integrationGroups: IntegrationGroup[] = [
  { group: "Electronic records", systems: ["Epic", "Oracle Health (Cerner)", "MEDITECH", "eClinicalWorks", "athenahealth", "OpenMRS"] },
  { group: "Imaging and lab", systems: ["PACS via DICOM", "RIS integrations", "LIS via HL7 ORU", "Sectra", "Philips", "GE HealthCare"] },
  { group: "Payers and billing", systems: ["Clearinghouse EDI 837 / 835", "Eligibility 270 / 271", "Stripe", "Razorpay", "Insurer portals"] },
  { group: "Communication", systems: ["WhatsApp Cloud API", "Twilio voice and SMS", "Microsoft Teams", "SMTP and transactional email"] },
  { group: "Identity and infra", systems: ["Azure AD / Entra", "Okta", "AWS", "Azure", "On-premise Kubernetes"] },
  { group: "Standards", systems: ["FHIR R4", "HL7 v2.x", "DICOM", "SNOMED CT", "ICD-10", "LOINC"] },
];

export const commitments = [
  { value: 100, suffix: "%", label: "of claims scrubbed before submission from day one of the pilot" },
  { value: 24, prefix: "<", suffix: "h", label: "discharge summary target from decision to GP inbox" },
  { value: 2, suffix: " wks", label: "for the systems review, fixed price, cancellable" },
  { value: 1, suffix: " site", label: "goes live first. Nothing rolls out before it works there" },
];

export type CompareRow = { criterion: string; offTheShelf: string; custom: string; hybrid: string };

export const buildVsBuy: CompareRow[] = [
  { criterion: "Fit to your workflow", offTheShelf: "You adapt to the product", custom: "Product adapts to you", hybrid: "Core bought, edges built" },
  { criterion: "Time to first value", offTheShelf: "3 to 9 months", custom: "6 to 10 weeks for one module", hybrid: "Depends on the core" },
  { criterion: "Integration with your estate", offTheShelf: "Vendor roadmap decides", custom: "Built to your interfaces", hybrid: "Built at the seams" },
  { criterion: "Who owns the code", offTheShelf: "The vendor", custom: "You", hybrid: "Split" },
  { criterion: "Cost shape", offTheShelf: "Per user, per year, forever", custom: "Project fee, then your infra", hybrid: "Both" },
  { criterion: "Exit cost", offTheShelf: "High, data export negotiable", custom: "None, it is your repository", hybrid: "Moderate" },
];

export const faqs = [
  { q: "Who owns the code and the data?", a: "You do. The repository, the infrastructure account and every byte of patient data sit under your organisation. We work inside it and hand over completely at the end." },
  { q: "Can you integrate with the EMR we already have?", a: "Almost always, and that is usually where we start. We build against FHIR and HL7 v2 interfaces rather than screen scraping, so the integration survives your vendor's upgrades." },
  { q: "How long before something is live?", a: "Two weeks for the systems review, then six to ten weeks for the first module on one site. That module is real and in use, not a demo." },
  { q: "How is pricing structured?", a: "The review is a fixed fee. Each module is a fixed-scope project quoted at the end of the review. There are no per-user licences and no lock-in fees." },
  { q: "Where does the data live?", a: "In the region and cloud account you choose, or on-premise. We do not host patient data on our own infrastructure." },
  { q: "What about compliance sign-off?", a: "We supply a security and data protection pack for your information governance team: data flows, access model, retention, encryption, subprocessors and audit trail design." },
  { q: "Do you build clinical decision systems?", a: "No. We build the intake, records, operations and revenue systems around clinical work, and AI that drafts for a clinician to review. Diagnosis stays with the clinician." },
  { q: "What happens after handover?", a: "Optional support and improvement retainers, month to month. Many teams run the system themselves after training; the code is written so they can." },
];
