"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Gamepad2,
  MonitorPlay,
  Rotate3d,
  MousePointerClick,
  Frame,
  Scroll,
  ImagePlay,
  PanelsRightBottom,
  RectangleGoggles,
} from "lucide-react";
import { motion } from "framer-motion";

type Scenario = {
  key: string;
  title: string;
  description: string;
  benefits: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ApplicationsSectionProps = {
  className?: string;
  id?: string;
  initialTab?: "gaming" | "training";
  layout?: "default" | "compact";
};

const gamingScenarios: Scenario[] = [
  {
    key: "immersive-worlds",
    title: "Immersive Worlds",
    description:
      "Create expansive VR environments with realistic physics, volumetric audio, and procedural events that adapt to the player.",
    benefits: [
      "Dynamic storytelling systems",
      "Haptics-ready interactions",
      "Low-latency streaming",
    ],
    icon: Rotate3d,
  },
  {
    key: "multiplayer-sessions",
    title: "Multiplayer Sessions",
    description:
      "Seamless co-op and competitive play with spatial voice, presence indicators, and synchronized world states.",
    benefits: ["Cross-device sync", "Matchmaking primitives", "Anti-cheat hooks"],
    icon: Gamepad2,
  },
  {
    key: "creator-tools",
    title: "Creator Tools",
    description:
      "In-headset level editing and prototyping with node-based logic and instant iteration feedback.",
    benefits: ["No-code blocks", "Prefab libraries", "Live reload"],
    icon: MousePointerClick,
  },
];

const trainingScenarios: Scenario[] = [
  {
    key: "procedural-training",
    title: "Procedural Training",
    description:
      "Step-by-step guided simulations for SOPs and compliance with performance tracking and remediation paths.",
    benefits: ["Analytics-ready events", "Progress checkpoints", "Adaptive difficulty"],
    icon: Scroll,
  },
  {
    key: "remote-coaching",
    title: "Remote Coaching",
    description:
      "Instructor-led sessions with synchronized playback, pointer tools, and shared perspectives for rapid upskilling.",
    benefits: ["Session recordings", "Multicam views", "Role-based access"],
    icon: MonitorPlay,
  },
  {
    key: "spatial-design-review",
    title: "Spatial Design Review",
    description:
      "Real-scale visualization of products and spaces with annotation layers and versioned snapshots.",
    benefits: ["CAD import", "Accurate scale", "Collaborative markup"],
    icon: Frame,
  },
];

const surfaceBase =
  "bg-card/70 backdrop-blur-xl border border-border shadow-sm hover:shadow-md transition-shadow";

function classNames(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function ApplicationsSection({
  className,
  id,
  initialTab = "gaming",
  layout = "default",
}: ApplicationsSectionProps) {
  const [tab, setTab] = useState<"gaming" | "training">(initialTab);
  const [activeKey, setActiveKey] = useState<string>(
    initialTab === "gaming" ? gamingScenarios[0].key : trainingScenarios[0].key
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Reset active scenario when tab changes
    setActiveKey(
      tab === "gaming" ? gamingScenarios[0].key : trainingScenarios[0].key
    );
  }, [tab]);

  const scenarios = tab === "gaming" ? gamingScenarios : trainingScenarios;
  const activeIndex = scenarios.findIndex((s) => s.key === activeKey);

  // Dynamic background layers driven by active scenario index
  const bgGradient = useMemo(() => {
    // Use purple-forward hues for the theme
    const hues = [
      "var(--chart-2)", // purple
      "var(--chart-2)", // purple
      "var(--chart-2)", // purple
    ];
    const primary = "var(--primary)";
    const start = hues[activeIndex % hues.length];
    const mid = hues[(activeIndex + 1) % hues.length];
    const end = hues[(activeIndex + 2) % hues.length];
    return {
      backgroundImage: `
        radial-gradient(1200px 600px at 90% 10%, ${start}33, transparent 60%),
        radial-gradient(800px 400px at 10% 90%, ${mid}26, transparent 60%),
        linear-gradient(180deg, var(--bg-gradient-start), var(--bg-gradient-end))
      `,
      // Subtle inner highlight ring for glass look
      boxShadow:
        "inset 0 1px 0 0 rgba(255,255,255,0.15), inset 0 0 0 9999px rgba(255,255,255,0.015)",
      outlineColor: primary,
    } as React.CSSProperties;
  }, [activeIndex]);

  return (
    <section
      id={id}
      ref={containerRef}
      aria-labelledby="applications-heading"
      className={classNames(
        "w-full max-w-full",
        layout === "compact" ? "py-10" : "py-20",
        className
      )}
    >
      <div
        className={classNames(
          "relative w-full max-w-full overflow-hidden rounded-[var(--radius)]",
          surfaceBase
        )}
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Decorative aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 200px at 10% -10%, rgba(139,92,246,0.10), transparent 60%)",
          }}
        />

        <header className="relative z-10 px-6 sm:px-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground/80">
              <RectangleGoggles className="h-4 w-4" aria-hidden="true" />
              Applications & Use Cases
            </div>
            <h2
              id="applications-heading"
              className="text-xl sm:text-2xl md:text-3xl font-heading font-bold tracking-tight"
            >
              Where Inexia VR Delivers Impact
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
              Explore how our platform powers next‑generation experiences across
              Gaming Innovation and Professional Training with seamless, scalable
              technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
            className="mt-6"
          >
            <Tabs
              value={tab}
              onValueChange={(v) =>
                setTab(v === "gaming" || v === "training" ? v : "gaming")
              }
            >
              <TabsList
                aria-label="Application areas"
                className={classNames(
                  "grid w-full max-w-fit grid-cols-2 gap-1 rounded-[calc(var(--radius)-6px)] bg-secondary p-1",
                  "border border-input"
                )}
              >
                <TabsTrigger
                  value="gaming"
                  className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <Gamepad2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  Gaming Innovation
                </TabsTrigger>
                <TabsTrigger
                  value="training"
                  className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <MonitorPlay className="mr-2 h-4 w-4" aria-hidden="true" />
                  Professional Training
                </TabsTrigger>
              </TabsList>

              {/* Split layout */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-1 pb-8">
                {/* Left: Scenarios list */}
                <div className="min-w-0">
                  <TabsContent value="gaming" forceMount className="m-0">
                    <ScenarioList
                      scenarios={gamingScenarios}
                      activeKey={activeKey}
                      onSelect={setActiveKey}
                    />
                  </TabsContent>
                  <TabsContent value="training" forceMount className="m-0">
                    <ScenarioList
                      scenarios={trainingScenarios}
                      activeKey={activeKey}
                      onSelect={setActiveKey}
                    />
                  </TabsContent>
                </div>

                {/* Right: Preview panel */}
                <div className="min-w-0">
                  <div
                    className={classNames(
                      "relative overflow-hidden rounded-[calc(var(--radius)-4px)]",
                      "border border-border",
                      "transition-colors"
                    )}
                    style={bgGradient}
                    role="region"
                    aria-label="Scenario preview"
                  >
                    {/* Glass overlay */}
                    <div className="absolute inset-px rounded-[calc(var(--radius)-6px)] bg-card/40 backdrop-blur-xl pointer-events-none" />
                    {/* Content */}
                    <div className="relative z-10 p-5 sm:p-6 md:p-8">
                      <AnimatedPreview
                        scenario={
                          scenarios[activeIndex >= 0 ? activeIndex : 0]
                        }
                        index={activeIndex}
                        area={tab}
                      />
                    </div>

                    {/* Subtle grid texture */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        color: "var(--primary)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Tabs>
          </motion.div>
        </header>
      </div>
    </section>
  );
}

function ScenarioList({
  scenarios,
  activeKey,
  onSelect,
}: {
  scenarios: Scenario[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {scenarios.map((s, i) => {
        const Icon = s.icon;
        const isActive = s.key === activeKey;
        return (
          <li key={s.key} className="w-full">
            <motion.button
              type="button"
              onClick={() => onSelect(s.key)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.995 }}
              aria-pressed={isActive}
              aria-current={isActive ? "true" : undefined}
              className={classNames(
                "group w-full text-left rounded-[calc(var(--radius)-6px)]",
                "border border-border px-4 py-4 sm:px-5 sm:py-5",
                "bg-card/70 backdrop-blur-xl",
                "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                isActive
                  ? "ring-1 ring-[color:var(--chart-1)] shadow-sm"
                  : "hover:bg-secondary/60"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={classNames(
                    "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    "border border-border bg-secondary/70",
                    "transition-colors",
                    isActive
                      ? "outline outline-1 -outline-offset-1 outline-[color:var(--chart-1)]"
                      : "group-hover:bg-secondary"
                  )}
                >
                  <Icon
                    className={classNames(
                      "h-5 w-5",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight truncate">
                      {s.title}
                    </h3>
                    {isActive ? (
                      <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-foreground">
                        Active
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.benefits.map((b) => (
                      <span
                        key={b}
                        className={classNames(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
                          "border border-border bg-secondary/60"
                        )}
                      >
                        <PanelsRightBottom className="h-3.5 w-3.5" aria-hidden="true" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );
}

function AnimatedPreview({
  scenario,
  index,
  area,
}: {
  scenario: Scenario;
  index: number;
  area: "gaming" | "training";
}) {
  const Icon = scenario.icon;
  return (
    <div className="w-full max-w-full">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg blur-md opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(139,92,246,0.35), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
              <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight break-words">
              {scenario.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {area === "gaming" ? "Gaming Innovation" : "Professional Training"} ·
              Scenario {index + 1}
            </p>
          </div>
        </div>
        <div
          className={classNames(
            "hidden sm:flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground"
          )}
        >
          {area === "gaming" ? (
            <>
              <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
              Real-time
            </>
          ) : (
            <>
              <MonitorPlay className="h-3.5 w-3.5" aria-hidden="true" />
              Guided
            </>
          )}
        </div>
      </div>

      <motion.p
        key={scenario.key + "-desc"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mt-3 text-sm sm:text-base text-foreground/90"
      >
        {scenario.description}
      </motion.p>

      {/* Capability tiles */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CapabilityTile
          title="Capabilities"
          items={scenario.benefits}
          icon={ImagePlay}
        />
        <CapabilityTile
          title="Applications"
          items={
            area === "gaming"
              ? ["Live events", "Esports arenas", "UGC worlds"]
              : ["Onboarding", "Safety drills", "Design approvals"]
          }
          icon={Scroll}
        />
      </div>

      {/* Benefits callouts */}
      <div className="mt-6 flex flex-wrap gap-2">
        {[
          { label: "Lower Time‑to‑Value", icon: MousePointerClick },
          { label: "Scalable Infrastructure", icon: PanelsRightBottom },
          { label: "Measurable Outcomes", icon: Frame },
        ].map((b) => {
          const I = b.icon;
          return (
            <motion.span
              key={b.label}
              whileHover={{ y: -1 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium"
            >
              <I className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
              {b.label}
            </motion.span>
          );
        })}
      </div>

      {/* Subtle animated scene mock */}
      <div className="mt-7 relative rounded-[calc(var(--radius)-8px)] border border-border bg-card/70 p-4 overflow-hidden">
        <div className="absolute -inset-24 opacity-20 blur-2xl pointer-events-none"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(139,92,246,0.35), rgba(124,58,237,0.25), rgba(147,51,234,0.25), rgba(139,92,246,0.35))",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-center gap-3 text-xs text-muted-foreground">
          <Rotate3d className="h-4 w-4" aria-hidden="true" />
          Simulated preview
        </div>

        <div className="relative mt-3 grid grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              className="col-span-3 sm:col-span-2 rounded-md border border-border bg-secondary/60 p-3"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded border border-border bg-card/80" />
                <div className="min-w-0">
                  <div className="h-2 w-20 rounded bg-muted" />
                  <div className="mt-1 h-2 w-14 rounded bg-muted/80" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA-esque micro control row */}
        <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors"
            aria-label="Recenter view"
          >
            <Rotate3d className="h-4 w-4" aria-hidden="true" />
            Recenter
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors"
            aria-label="Toggle overlays"
          >
            <ImagePlay className="h-4 w-4" aria-hidden="true" />
            Overlays
          </button>
        </div>
      </div>
    </div>
  );
}

function CapabilityTile({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div
      className={classNames(
        "rounded-[calc(var(--radius)-8px)] border border-border bg-card/70 p-4",
        "hover:shadow-sm transition-shadow"
      )}
      role="group"
      aria-label={title}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <ul className="mt-3 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2 text-sm">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--chart-2)" }} />
            <span className="text-foreground/90">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}