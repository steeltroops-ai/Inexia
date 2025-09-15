"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Layers2,
  Grid3x3,
  LayoutTemplate,
  TabletSmartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PillarKey = "ue5" | "cpp" | "blender" | "vr";

interface Pillar {
  key: PillarKey;
  title: string;
  summary: string;
  details: string[];
  capabilities: string[];
  icon: React.ReactNode;
  accent: string;
}

interface TechnologySectionProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  layout?: "compact" | "full";
}

const pillars: Pillar[] = [
  {
    key: "ue5",
    title: "Unreal Engine 5",
    summary: "Nanite + Lumen rendering, modular gameplay architecture, robust build tooling.",
    details: [
      "Enhanced Input, GAS-lite patterns, Subsystems",
      "Niagara VFX, Chaos Physics, World Partition",
      "Editor Utility Tools, Data Assets driven config",
    ],
    capabilities: ["Lumen GI", "Nanite", "Chaos", "Niagara"],
    icon: <Layers2 className="h-6 w-6" aria-hidden="true" />,
    accent: "from-chart-1/80 to-primary/60",
  },
  {
    key: "cpp",
    title: "C++ Development",
    summary: "High-performance systems with strict memory and threading discipline.",
    details: [
      "ECS-inspired data locality, hot paths profiled",
      "Lock-free queues, task graph alignment",
      "Unreal reflection & build toolchain mastery",
    ],
    capabilities: ["ECS", "SIMD", "Async", "Profiling"],
    icon: <Grid3x3 className="h-6 w-6" aria-hidden="true" />,
    accent: "from-primary/70 to-chart-2/50",
  },
  {
    key: "blender",
    title: "Blender Pipeline",
    summary: "Non-destructive modeling, UV, and USD/FBX export with automated checks.",
    details: [
      "Procedural materials, trim sheets, texel density",
      "Geometry Nodes for parametric assets",
      "USD/FBX export, scale/unit sanity, LODs",
    ],
    capabilities: ["USD/FBX", "Geo Nodes", "LOD", "PBR"],
    icon: <LayoutTemplate className="h-6 w-6" aria-hidden="true" />,
    accent: "from-chart-3/80 to-chart-5/50",
  },
  {
    key: "vr",
    title: "VR Integration",
    summary: "Comfort-first interaction, precise tracking, and platform abstractions.",
    details: [
      "XR plugins, action mapping, haptics",
      "Foveated rendering + late latching",
      "Locomotion comfort modes, safety bounds",
    ],
    capabilities: ["OpenXR", "Haptics", "Foveated", "IK"],
    icon: <TabletSmartphone className="h-6 w-6" aria-hidden="true" />,
    accent: "from-chart-2/70 to-primary/60",
  },
];

export default function TechnologySection({
  id = "technology",
  className,
  style,
  layout = "full",
}: TechnologySectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [activeKey, setActiveKey] = useState<PillarKey | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "relative w-full max-w-full",
        "rounded-[calc(var(--radius))] overflow-hidden",
        "bg-transparent",
        className
      )}
      style={style}
      aria-label="Technology stack overview"
    >
      {/* Decorative animated background */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          "before:absolute before:inset-0 before:bg-[radial-gradient(closest-side_at_20%_20%,rgba(231,255,58,0.12),transparent_70%),radial-gradient(closest-side_at_80%_30%,rgba(26,26,26,0.08),transparent_60%)] before:blur-[0px]",
          "after:absolute after:-inset-16 after:bg-[conic-gradient(from_90deg_at_50%_50%,rgba(26,26,26,0.04),transparent_60%)] after:animate-spin-slow after:opacity-80",
        )}
      />
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          maskImage:
            "radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,1), rgba(0,0,0,0.1))",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,1), rgba(0,0,0,0.1))",
        }}
      >
        <GridPattern />
      </div>

      <div className={cn("relative", layout === "compact" ? "py-8" : "py-14")}>
        <header
          className={cn(
            "mx-auto w-full max-w-5xl px-4 sm:px-6",
            "text-center"
          )}
        >
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "bg-card/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur",
              "border border-border/60 px-3 py-1.5",
              visible ? "animate-in fade-in zoom-in-50 duration-500" : "opacity-0"
            )}
          >
            <span className="h-2 w-2 rounded-full bg-chart-1 shadow-[0_0_12px_rgba(231,255,58,0.9)]" />
            <span className="text-xs font-medium tracking-wide text-foreground">
              Technology Stack
            </span>
          </div>
          <h2
            className={cn(
              "mt-4 text-[1.6rem] sm:text-3xl md:text-4xl font-heading font-bold tracking-tight",
              "break-words"
            )}
          >
            Built for performance, precision, and immersion
          </h2>
          <p
            className={cn(
              "mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground"
            )}
          >
            A tightly integrated pipeline across engine, code, content, and XR hardware with
            automation, testing, and profiling at its core.
          </p>
        </header>

        {/* Grid */}
        <div
          className={cn(
            "mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6",
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          )}
        >
          {pillars.map((p, idx) => {
            const expanded = activeKey === p.key;
            return (
              <article
                key={p.key}
                className={cn(
                  "group relative min-w-0",
                  "rounded-[calc(var(--radius))] border border-border/60",
                  "bg-card/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 focus-within:-translate-y-0.5",
                  "outline-none focus-within:ring-2 focus-within:ring-primary/40",
                  visible
                    ? "animate-in fade-in slide-in-from-bottom-2 duration-500"
                    : "opacity-0",
                )}
                style={{
                  transitionDelay: visible ? `${idx * 60}ms` : undefined,
                }}
              >
                {/* Glow accent on hover */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-[calc(var(--radius))]",
                    "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
                    "transition-opacity duration-300",
                    "bg-gradient-to-br",
                    p.accent
                  )}
                  style={{ mixBlendMode: "overlay", filter: "blur(24px)" }}
                />
                {/* Electric edge */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 rounded-[calc(var(--radius))]",
                    "ring-1 ring-inset ring-border/60",
                    "group-hover:ring-primary/50 group-focus-within:ring-primary/60",
                    "transition-colors"
                  )}
                />

                <button
                  type="button"
                  className={cn(
                    "relative z-10 w-full text-left",
                    "p-4 sm:p-5 flex flex-col gap-3"
                  )}
                  onMouseEnter={() => setActiveKey(p.key)}
                  onFocus={() => setActiveKey(p.key)}
                  onMouseLeave={() => setActiveKey((k) => (k === p.key ? null : k))}
                  onBlur={() => setActiveKey((k) => (k === p.key ? null : k))}
                  aria-expanded={expanded}
                  aria-controls={`${p.key}-details`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex size-9 items-center justify-center rounded-lg",
                        "bg-secondary border border-border/70",
                        "text-primary"
                      )}
                    >
                      {p.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold leading-6 truncate">
                        {p.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {p.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className={cn(
                          "inline-flex items-center rounded-md border border-border/70",
                          "bg-secondary/60 px-2 py-1 text-[11px] font-medium",
                          "text-foreground"
                        )}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div
                    id={`${p.key}-details`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                        {p.details.map((d, i) => (
                          <li
                            key={i}
                            className={cn(
                              "relative pl-4",
                              "before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-chart-1 before:shadow-[0_0_10px_rgba(231,255,58,0.9)]"
                            )}
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        {/* Testing + Performance */}
        <div className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6">
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5",
              visible ? "animate-in fade-in duration-700" : "opacity-0"
            )}
          >
            <InfoCard
              title="Testing Framework"
              bullets={[
                "C++ unit tests integrated with Unreal Automation",
                "Map-based functional tests with determinism gates",
                "Golden screenshots and perf budgets in CI",
              ]}
            />
            <InfoCard
              title="Performance Optimization"
              bullets={[
                "Stat profiles + Unreal Insights + trace sessions",
                "Frame-time budgets per system; automated regressions",
                "LOD, HLODs, streaming, and shader permutation hygiene",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) {
  return (
    <div
      className={cn(
        "relative rounded-[calc(var(--radius))] border border-border/60",
        "bg-card/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur",
        "p-4 sm:p-5"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[calc(var(--radius))] bg-gradient-to-br from-chart-1/10 to-primary/5"
        style={{ mixBlendMode: "overlay" }}
      />
      <h3 className="relative z-10 text-base sm:text-lg font-semibold">{title}</h3>
      <ul className="relative z-10 mt-3 space-y-2 text-sm text-foreground/90">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="relative pl-4 before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-primary"
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Subtle animated grid background (no external dependencies).
 */
function GridPattern() {
  const rows = 18;
  const cols = 24;
  const cells = Array.from({ length: rows * cols });
  return (
    <div className="h-full w-full">
      <div
        className={cn(
          "grid h-full w-full",
          "grid-rows-[repeat(18,1fr)] grid-cols-[repeat(24,1fr)]"
        )}
      >
        {cells.map((_, i) => (
          <div
            key={i}
            className={cn(
              "border border-border/30",
              // Pulsing highlight waves
              "animate-[pulse_6s_ease-in-out_infinite]",
            )}
            style={{
              animationDelay: `${(i % cols) * 60}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Utility: simple classnames merge fallback if shadcn utils are absent
function _twMerge(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}