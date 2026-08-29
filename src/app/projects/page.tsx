import type { Metadata } from "next";
import Projects from "@/components/projects";

export const metadata: Metadata = {
  title: "Our Projects | Aventrixx",
  description:
    "Selected platforms we've designed and shipped end-to-end, from learning management systems to restaurant engagement tools.",
};

export default function ProjectsPage() {
  return (
    <main id="main" className="relative">
      <Projects />
    </main>
  );
}
