"use client";

import React, { useCallback, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import TechnologySection from "@/components/TechnologySection";
import ApplicationsSection from "@/components/ApplicationsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

type SectionId = "about" | "projects" | "technology" | "team" | "contact";

export default function Page() {
  const [activeAccent, setActiveAccent] = useState<string>("#8b5cf6"); // neon purple default

  // Navigation links that persist
  const links = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "technology", label: "Technology" },
      { id: "team", label: "Team" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  // Map section to accent hue to keep a cohesive but dynamic feel
  const accentBySection: Record<SectionId, string> = useMemo(
    () => ({
      about: "#8b5cf6", // purple
      projects: "#8b5cf6", // purple
      technology: "#8b5cf6", // purple
      team: "#8b5cf6", // purple
      contact: "#8b5cf6", // purple
    }),
    []
  );

  const handleNavClick = useCallback(
    (id: string) => {
      const key = id as SectionId;
      if (accentBySection[key]) {
        setActiveAccent(accentBySection[key]);
      }
    },
    [accentBySection]
  );

  return (
    <div
      className="relative min-h-screen bg-background text-foreground"
      style={
        {
          // Provide a dynamic accent that all sections/components can read
          ["--accent" as any]: activeAccent,
          // Optional gradient anchors for some sections using CSS vars
          ["--bg-gradient-start" as any]: "hsl(260 35% 10%)",
          ["--bg-gradient-end" as any]: "hsl(260 40% 6%)",
        } as React.CSSProperties
      }
    >
      {/* Global decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_10%_-10%,rgba(139,92,246,0.08),transparent_70%),radial-gradient(900px_700px_at_90%_10%,rgba(124,58,237,0.10),transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>

      {/* Persistent floating navigation */}
      <Navigation links={links} logoLabel="Inexia" onLinkClick={handleNavClick} />

      {/* Full-bleed hero */}
      <HeroSection />

      <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 mt-8 sm:mt-10">

        {/* Sections with page-level spacing control */}
        <div id="about" className="scroll-mt-28 mt-12 sm:mt-16 md:mt-20">
          <AboutSection />
        </div>

        <div id="projects" className="scroll-mt-28 mt-12 sm:mt-16 md:mt-20">
          <ProjectsShowcase />
        </div>

        <div id="technology" className="scroll-mt-28 mt-12 sm:mt-16 md:mt-20">
          <TechnologySection />
        </div>

        {/* Applications section is not in nav but part of flow */}
        <div className="scroll-mt-28 mt-12 sm:mt-16 md:mt-20">
          <ApplicationsSection id="applications" />
        </div>

        <div id="team" className="scroll-mt-28 mt-12 sm:mt-16 md:mt-20">
          <TeamSection />
        </div>

        <div id="contact" className="scroll-mt-28 mt-12 sm:mt-16 md:mt-20 mb-16 sm:mb-24">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}