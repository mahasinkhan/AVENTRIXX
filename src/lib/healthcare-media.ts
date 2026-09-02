// Media wiring for the healthcare page.
// Drop files into public/media/healthcare/ named after a slot below and they
// are picked up automatically. Video wins over image, image wins over the
// designed fallback. Accepted: .mp4 .webm for video, .jpg .jpeg .png .webp
// .avif for stills.

export type MediaAsset = { video?: string; poster?: string };
export type MediaManifest = Record<string, MediaAsset>;

export const MEDIA_PUBLIC_PATH = "/media/healthcare";

export const mediaSlots = [
  "hero",
  "hospital",
  "nursing-home",
  "clinic",
  "diagnostics",
  "pharmacy",
  "home-care",
  "demo-flow-board",
  "demo-claims",
  "demo-intake",
  "gallery-intake",
  "gallery-queue",
  "gallery-ward",
  "gallery-results",
  "gallery-claims",
  "ai-documentation",
  "ai-frontdesk",
  "ai-imaging",
  "ai-denials",
  "ai-patient",
  "security",
  "engagement",
  "cta",
] as const;

export const aiTiles = [
  {
    slot: "ai-documentation",
    tag: "Ambient documentation",
    title: "The note writes itself while the clinician looks at the patient.",
    body: "Consultation audio becomes a structured draft in the record's own template. The clinician edits and signs. Nothing files without a signature.",
    wide: true,
  },
  {
    slot: "ai-frontdesk",
    tag: "Front desk agent",
    title: "Books, reschedules, answers. Hands over the moment it should.",
    body: "Voice and chat on your existing phone number and WhatsApp, in the patient's language.",
  },
  {
    slot: "ai-imaging",
    tag: "Worklist triage",
    title: "Urgent studies rise to the top of the reporting queue.",
    body: "Prioritised by referral urgency, modality and reporter load. Turnaround tracked per study.",
  },
  {
    slot: "ai-denials",
    tag: "Denial prediction",
    title: "Every claim scored against your own denial history.",
    body: "Flagged before submission with the exact field to fix, routed to the coder who can fix it.",
  },
  {
    slot: "ai-patient",
    tag: "Patient app",
    title: "Results, appointments, documents and payment, in their pocket.",
    body: "Plain language explanations of results, drafted by AI and approved by the clinic before release.",
  },
];

export const standardsMarquee = [
  "FHIR R4",
  "HL7 v2",
  "DICOM",
  "SNOMED CT",
  "ICD-10",
  "LOINC",
  "RIS and PACS",
  "LIS",
  "eMAR",
  "HIPAA",
  "GDPR",
  "ISO 27001 practices",
  "SOC 2 practices",
  "Role based access",
  "Audit trail on every write",
];

export const productDemos = [
  {
    slot: "demo-flow-board",
    name: "Ward flow board",
    body: "Bed state, cleaning, admissions and discharge blockers on one screen, updated by the people doing the work rather than typed up afterwards.",
    meta: "Hospital operations",
  },
  {
    slot: "demo-claims",
    name: "Claim scrubber",
    body: "Every claim scored against your own denial history before submission, with the failing field and the fix shown to the coder.",
    meta: "Revenue integrity",
  },
  {
    slot: "demo-intake",
    name: "Patient intake",
    body: "Booking, consent, history and coverage captured on the patient's phone and written into the record before they arrive.",
    meta: "Front of house",
  },
];
