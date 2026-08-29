import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/smooth-scroll";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import ScrollProgress from "@/components/scroll-progress";
<<<<<<< HEAD
=======
import Cursor from "@/components/cursor";
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--ff-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Geist({
  variable: "--ff-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Aventrixx | AI-native software engineering",
=======
  title: "Lumina | AI-native software engineering",
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
  description:
    "Enterprise-grade software, data and AI engineering. We design, build and run the systems modern companies operate on.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fonts = [display.variable, sans.variable, mono.variable].join(" ");

  return (
    <html lang="en" className={fonts}>
      <body className="grain bg-ground text-ink antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-ground">Skip to content</a><ScrollProgress />
<<<<<<< HEAD
=======
        <Cursor />
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
        <SmoothScroll>
          <SiteNav />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
<<<<<<< HEAD
}
=======
}

>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
