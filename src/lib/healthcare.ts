// Content for the bespoke /industries/healthcare page.
// Everything on that page reads from here, so copy edits happen in one file.

export type CareSetting = {
  id: string;
  name: string;
  line: string;
  photo: string;
  reality: string;
  builds: string[];
};

export const careSettings: CareSetting[] = [
  {
    id: "hospital",
    name: "Hospitals and groups",
    line: "Multi-site, multi-speciality, never idle",
    photo: "hospital.jpg",
    reality:
      "Bed state, theatre lists and discharge decisions are made in meetings and messaging apps, then typed into a system hours later. The number on the dashboard is always the number from this morning.",
    builds: [
      "Bed and flow management with live occupancy",
      "Theatre and clinic scheduling against real staff capacity",
      "EMR integration over HL7 v2 and FHIR, not screen scraping",
      "Group level reporting that reconciles across sites",
    ],
  },
  {
    id: "nursing-home",
    name: "Nursing and care homes",
    line: "Long stays, thin staffing, heavy evidence burden",
    photo: "nursing-home.jpg",
    reality:
      "Care plans live in folders, medication rounds are signed on paper, and inspection prep costs two weeks of a manager's year reconstructing what already happened.",
    builds: [
      "Digital care plans with change history per resident",
      "Electronic medication administration on a handheld",
      "Rota and agency spend control",
      "Incident logging that assembles inspection evidence as you go",
    ],
  },
  {
    id: "clinic",
    name: "Clinics and practices",
    line: "High volume, short visits, thin margins",
    photo: "clinic.jpg",
    reality:
      "The front desk is the bottleneck. Phones ring through the consultation, no-shows go unfilled, and forms get copied from paper into the record twice.",
    builds: [
      "Online booking with waitlist backfill for cancellations",
      "Digital intake that writes straight into the record",
      "Teleconsultation with notes captured in the same flow",
      "Recall and reminder campaigns per condition",
    ],
  },
  {
    id: "diagnostics",
    name: "Diagnostics and imaging",
    line: "Throughput measured in turnaround time",
    photo: "diagnostics.jpg",
    reality:
      "Orders arrive by fax, phone and portal. Referrers call to chase reports that are already signed, and nobody can see where a study is sitting.",
    builds: [
      "Single order intake across every referral channel",
      "RIS, PACS and LIS integration with status back to the referrer",
      "Turnaround time tracking by modality and reporter",
      "Referrer portal with results and prior comparison",
    ],
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    line: "Stock, expiry and dispensing accuracy",
    photo: "pharmacy.jpg",
    reality:
      "Expiry write-offs are found during stock takes, refills depend on the patient remembering, and dispensing checks live in a paper log.",
    builds: [
      "E-prescribing intake and dispensing workflow",
      "Batch, expiry and cold chain tracking",
      "Refill reminders and adherence follow up",
      "Controlled drug register with a signed audit trail",
    ],
  },
  {
    id: "home-care",
    name: "Home and community care",
    line: "The record has to work without signal",
    photo: "home-care.jpg",
    reality:
      "Visits are planned on a spreadsheet, notes are written in the car at the end of a shift, and proof of visit is a message in a group chat.",
    builds: [
      "Visit scheduling with travel aware routing",
      "Offline first mobile notes that sync when signal returns",
      "Geo and time stamped proof of visit",
      "Remote monitoring readings into the same record",
    ],
  },
];

export type PathwayStage = {
  stage: string;
  system: string;
  removes: string;
};

export const carePathway: PathwayStage[] = [
  {
    stage: "Referral",
    system: "One intake queue for fax, email, portal and phone referrals, parsed into structured fields.",
    removes: "Referral letters sitting unread in a shared inbox.",
  },
  {
    stage: "Registration",
    system: "Digital pre-registration, identity and coverage checks before the patient arrives.",
    removes: "Clipboard forms retyped into the record by hand.",
  },
  {
    stage: "Triage and queue",
    system: "Live queue with priority, room state and expected wait shown to staff and patient.",
    removes: "Waiting rooms where nobody can say how long is left.",
  },
  {
    stage: "Consultation",
    system: "Notes captured in the visit, with ambient drafting the clinician reviews and signs.",
    removes: "Two hours of documentation after the last patient leaves.",
  },
  {
    stage: "Orders and results",
    system: "Orders routed to lab, imaging and pharmacy, results returned to the same record with acknowledgement.",
    removes: "Results acknowledged by nobody in particular.",
  },
  {
    stage: "Ward and treatment",
    system: "Bed state, care plan, medication administration and handover on one board.",
    removes: "Handover reconstructed from memory at shift change.",
  },
  {
    stage: "Discharge",
    system: "Summary drafted from the encounter, sent to the GP and the patient in plain language.",
    removes: "Discharge summaries written a week late.",
  },
  {
    stage: "Claim and follow up",
    system: "Coding checks and scrubbing before submission, follow up and recall scheduled automatically.",
    removes: "Denials discovered six weeks after the fact.",
  },
];

export type ModuleGroup = {
  group: string;
  note: string;
  items: { name: string; body: string }[];
};

export const moduleGroups: ModuleGroup[] = [
  {
    group: "Clinical",
    note: "Everything that touches a patient record",
    items: [
      { name: "EMR and EHR integration", body: "Bidirectional over FHIR R4 and HL7 v2, with mapping you can audit." },
      { name: "Order entry and results", body: "Lab, imaging and pharmacy orders with acknowledgement tracking." },
      { name: "E-prescribing", body: "Dose checking, interactions and pharmacy routing." },
      { name: "Care plans and eMAR", body: "Plans, rounds and medication signing on ward handhelds." },
      { name: "Bed and theatre management", body: "Live occupancy, list building and turnaround timing." },
      { name: "Clinical documentation", body: "Ambient drafting the clinician edits and signs, never auto-files." },
    ],
  },
  {
    group: "Operations",
    note: "The building, the rota and the stock",
    items: [
      { name: "Booking and queue", body: "Online booking, waitlist backfill and live queue displays." },
      { name: "Staff rostering", body: "Skill mix, working time rules and agency spend control." },
      { name: "Inventory and assets", body: "Batch, expiry, consumable burn rate and equipment location." },
      { name: "Incidents and audit", body: "Structured reporting that accumulates inspection evidence." },
      { name: "Operational dashboards", body: "Occupancy, wait, turnaround and cancellation in one view." },
      { name: "Patient app and portal", body: "Appointments, results, documents and payments for the patient." },
    ],
  },
  {
    group: "Revenue",
    note: "Getting paid for work already done",
    items: [
      { name: "Eligibility and estimates", body: "Coverage checked and cost estimated before the visit." },
      { name: "Coding assistance", body: "Code suggestions from the encounter, reviewed by a coder." },
      { name: "Claim scrubbing", body: "Rule and model checks before submission, with reasons shown." },
      { name: "Denial prediction", body: "Likely denials flagged pre-submission and routed for fix." },
      { name: "Payments and plans", body: "Card, transfer and instalment collection with reconciliation." },
      { name: "Revenue analytics", body: "Denial reasons, payer performance and days in receivable." },
    ],
  },
];

export const aiCapabilities = [
  {
    name: "Document understanding",
    body: "Referral letters, discharge summaries, lab PDFs and insurance correspondence turned into structured fields a human confirms.",
  },
  {
    name: "Ambient documentation",
    body: "The consultation is drafted as it happens. The clinician edits and signs. Nothing files itself.",
  },
  {
    name: "Front desk agent",
    body: "Voice and chat that books, reschedules and answers routine questions, and hands to a person the moment it should.",
  },
  {
    name: "Denial prediction",
    body: "Claims scored against your own denial history before they are submitted, with the specific field to fix.",
  },
];

export const complianceItems = [
  { name: "HIPAA aligned", body: "Access control, audit logging and BAA ready hosting." },
  { name: "GDPR and DPDP", body: "Lawful basis, retention schedules and subject access handled in product." },
  { name: "ISO 27001 practices", body: "Change control, secure SDLC and reviewed dependencies." },
  { name: "Role based access", body: "Permissions by role, site and department, not by seniority." },
  { name: "Encryption", body: "At rest and in transit, with keys you can rotate." },
  { name: "Data residency", body: "Deployed in the region and cloud account you choose." },
];

export const engagementSteps = [
  {
    step: "Systems review",
    duration: "2 weeks",
    body: "We sit with the people doing the work, map the current systems and integrations, and come back with a costed plan and a build order.",
  },
  {
    step: "Pilot on one site",
    duration: "6 to 10 weeks",
    body: "One ward, one clinic or one home goes live with the highest value module. Real users, real data, measured against the baseline we took.",
  },
  {
    step: "Rollout and handover",
    duration: "Ongoing",
    body: "Site by site rollout, staff training, and a full handover of the repository, infrastructure and documentation. You own the code outright.",
  },
];
