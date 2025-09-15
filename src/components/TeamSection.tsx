"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Layers2,
  GitGraph,
  SquareKanban,
  Trello,
  Frame,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
};

type CultureValue = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ProcessStage = {
  key: string;
  label: string;
  summary: string;
  points: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export interface TeamSectionProps {
  className?: string;
  headline?: string;
  subheading?: string;
  members?: TeamMember[];
  values?: CultureValue[];
  stages?: ProcessStage[];
  defaultStageKey?: string;
}

const defaultMembers: TeamMember[] = [
  {
    name: "Avery Kim",
    role: "XR Product Lead",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Jordan Lee",
    role: "Realtime Graphics",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Riley Singh",
    role: "Haptics Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Samira Ortega",
    role: "Interaction Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1544005316-04ce1f0df3f4?q=80&w=1200&auto=format&fit=crop",
  },
];

const defaultValues: CultureValue[] = [
  {
    title: "Collaboration First",
    description:
      "We swarm problems, share context openly, and ship together. No silos—just a tight feedback loop.",
    icon: Users,
  },
  {
    title: "Layered Experimentation",
    description:
      "Ideas move from quick sketches to playable prototypes in days. Learn fast, iterate faster.",
    icon: Layers2,
  },
  {
    title: "Evidence over Ego",
    description:
      "We let data, playtests, and user delight guide us. The best ideas win—whoever they come from.",
    icon: GitGraph,
  },
];

const defaultStages: ProcessStage[] = [
  {
    key: "discover",
    label: "Discover",
    summary:
      "Align on outcomes, understand constraints, and map opportunity space.",
    points: [
      "Lightweight research & field notes",
      "Team canvas + risks upfront",
      "VR feasibility spikes",
    ],
    icon: SquareKanban,
  },
  {
    key: "design",
    label: "Design",
    summary:
      "Craft interactions and ergonomics that feel effortless inside the headset.",
    points: ["Interaction flows", "Haptics & comfort tests", "Prototype UI"],
    icon: Frame,
  },
  {
    key: "build",
    label: "Build",
    summary:
      "Tight loops between code, art, and hardware. Nightly builds; weekly playtests.",
    points: ["Track in Kanban", "Real device profiling", "Automated smoke tests"],
    icon: Trello,
  },
  {
    key: "iterate",
    label: "Iterate",
    summary:
      "Measure, learn, and refine. We celebrate what we learn—not just what we launch.",
    points: ["Playtest analytics", "Qual + quant insights", "Scope for delight"],
    icon: GitGraph,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const glowBg =
  "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius)+8px)] before:bg-[radial-gradient(120px_120px_at_10%_10%,_rgba(231,255,58,0.2),_transparent_60%),radial-gradient(160px_160px_at_90%_20%,_rgba(26,26,26,0.08),_transparent_60%)]";

export default function TeamSection({
  className,
  headline = "Agile team of innovators",
  subheading = "We design, prototype, and build immersive experiences through radical collaboration and disciplined experimentation.",
  members = defaultMembers,
  values = defaultValues,
  stages = defaultStages,
  defaultStageKey = "discover",
}: TeamSectionProps) {
  const [active, setActive] = React.useState(
    stages.find((s) => s.key === defaultStageKey)?.key ?? stages[0]?.key,
  );

  return (
    <section
      aria-label="Team and culture"
      className={
        "relative w-full max-w-full " +
        (className ?? "")
      }
    >
      {/* Background decorative layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        {/* Floating geometric tiles */}
        <motion.div
          className="absolute left-6 top-10 h-10 w-10 rounded-md border bg-card/50 backdrop-blur"
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute right-10 bottom-8 h-12 w-12 rounded-lg border bg-card/50 backdrop-blur"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
        className="w-full max-w-full"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border bg-card/70 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            Humans + Hardware + Software
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {headline}
          </h2>
          <p className="mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
            {subheading}
          </p>
        </motion.header>

        {/* Main content grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:gap-7 md:grid-cols-3">
          {/* Philosophy card */}
          <motion.div
            variants={itemVariants}
            className={"relative col-span-1 md:col-span-1 " + glowBg}
          >
            <Card className="relative w-full max-w-full overflow-hidden rounded-2xl border bg-card/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 focus-within:shadow-lg">
              <div className="absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(120px_80px_at_50%_100%,_rgba(231,255,58,0.18),_transparent_70%)]" />
              <div className="relative">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SquareKanban className="h-4 w-4" aria-hidden="true" />
                  <span>Team philosophy</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">Build to learn</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We believe the fastest path to clarity is through tangible prototypes. We aim small, ship often, and reflect constantly—because momentum compounds.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="min-w-0 break-words">
                      Shared ownership: every voice shapes the product.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="min-w-0 break-words">
                      Demo culture: progress is measured in playable moments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="min-w-0 break-words">
                      Respect the craft: design, code, art, and ops in lockstep.
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Culture values */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
            <div className="flex w-full flex-col gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title + i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative"
                  >
                    <Card className="relative w-full max-w-full overflow-hidden rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/70 hover:shadow-md">
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-[radial-gradient(200px_120px_at_80%_10%,_rgba(231,255,58,0.16),_transparent_70%)]" />
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border bg-secondary/60 text-foreground">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-base font-semibold">{v.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Team members grid */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
            <div className="grid grid-cols-2 gap-4">
              {members.slice(0, 4).map((m, idx) => (
                <motion.div
                  key={m.name + idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * idx, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  <Card className="relative overflow-hidden rounded-2xl border bg-card/60 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[4/3] w-full">
                      <img
                        src={m.imageUrl}
                        alt={`${m.name} – ${m.role}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      {/* Shimmer overlay */}
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -inset-x-10 -top-1/2 h-[150%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3 pb-3 pt-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{m.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                      </div>
                      <div className="ml-2 flex h-8 w-8 flex-none items-center justify-center rounded-full border bg-secondary/60">
                        <Users className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Process visualization */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
          <Card className="relative overflow-hidden rounded-2xl border bg-card/70 p-4 shadow-sm backdrop-blur-md">
            <div className="absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(220px_120px_at_70%_80%,_rgba(231,255,58,0.18),_transparent_70%)]" />
            <div className="relative">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <GitGraph className="h-4 w-4" aria-hidden="true" />
                <span>Development approach</span>
              </div>
              <Tabs
                value={active}
                onValueChange={setActive}
                className="w-full"
              >
                <TabsList className="flex w-full flex-wrap gap-2 bg-transparent p-0">
                  {stages.map((s) => {
                    const Icon = s.icon;
                    return (
                      <TabsTrigger
                        key={s.key}
                        value={s.key}
                        className="data-[state=active]:bg-secondary/80 data-[state=active]:text-foreground rounded-full border bg-card/60 px-3 py-1.5 text-xs shadow-sm transition-all hover:bg-card/80 sm:text-sm"
                        aria-label={s.label}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{s.label}</span>
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {stages.map((s, idx) => (
                  <TabsContent key={s.key} value={s.key} className="mt-4">
                    <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-3">
                      {/* Timeline line */}
                      <div className="relative col-span-1 sm:col-span-2">
                        <div className="relative">
                          <div className="h-1 w-full rounded-full bg-muted" />
                          <motion.div
                            className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent"
                            initial={{ x: 0, opacity: 0 }}
                            animate={{ x: ["0%", "33%", "66%", "100%"], opacity: [0.4, 0.9, 0.9, 0.4] }}
                            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
                            aria-hidden="true"
                          />
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                            <div className="grid grid-cols-4">
                              {[0, 1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-end pr-1"
                                  aria-hidden="true"
                                >
                                  <div className="h-3 w-3 rounded-full border bg-card" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-muted-foreground">
                          {s.summary}
                        </div>
                      </div>

                      {/* Bullet points */}
                      <div className="col-span-1">
                        <ul className="space-y-2">
                          {s.points.map((p, i) => (
                            <li key={p + i} className="flex items-start gap-2 text-sm">
                              <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                              <span className="min-w-0 break-words">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </Card>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Our cadence favors small bets with compounding learning—every sprint ends with a demo and a decision.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}