"use client"

import * as React from "react"
import { LayoutGrid, LayoutList, Grid3x2, Layers2, Rotate3d, Scale3d, FolderKanban, Framer } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Project = {
  id: string
  title: string
  category: "training" | "gaming" | "simulator"
  image: string
  description: string
  features: string[]
  stack: string[]
  date: string // ISO
}

const PROJECTS: Project[] = [
  {
    id: "vr-firefighter",
    title: "VR Firefighter Training Simulator",
    category: "simulator",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1974&auto=format&fit=crop",
    description:
      "Immersive hazard recognition and response simulator replicating smoke dynamics, heat zones, and interactive equipment handling for high-fidelity skill acquisition.",
    features: [
      "Dynamic fire propagation and smoke simulation",
      "Interactive nozzle control with pressure feedback",
      "Scenario authoring with branching outcomes",
      "Biometric performance tracking",
    ],
    stack: ["Unreal Engine 5", "C++", "Blender"],
    date: "2024-07-20",
  },
  {
    id: "mechanics-lab",
    title: "Interactive Gaming Mechanics Lab",
    category: "gaming",
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1974&auto=format&fit=crop",
    description:
      "Sandbox environment to prototype locomotion, haptics, and physics-driven gameplay loops with rapid iteration and live parameter tuning.",
    features: [
      "Modular locomotion system (teleport, slide, hybrid)",
      "Real-time physics tweaker and profiler",
      "Haptic event editor",
      "Recording and replay for A/B testing",
    ],
    stack: ["Unreal Engine 5", "C++", "Blender"],
    date: "2024-05-10",
  },
  {
    id: "skills-platform",
    title: "Professional Skills Training Platform",
    category: "training",
    image:
      "https://images.unsplash.com/photo-1529336953121-a0ab79a5bbcb?q=80&w=2069&auto=format&fit=crop",
    description:
      "Scenario-based roleplay for soft skills and procedures with analytics, adaptive difficulty, and enterprise deployment support.",
    features: [
      "Adaptive scenarios with competency rubrics",
      "Voice-driven interactions and prompts",
      "SCORM/xAPI progress reporting",
      "Multi-user facilitator mode",
    ],
    stack: ["Unreal Engine 5", "C++", "Blender"],
    date: "2024-08-12",
  },
]

type SortKey = "recent" | "title-asc" | "title-desc"

interface ProjectsShowcaseProps {
  className?: string
  layout?: "masonry" | "grid"
  initialFilter?: "all" | Project["category"]
  initialSort?: SortKey
}

export default function ProjectsShowcase({
  className,
  layout = "masonry",
  initialFilter = "all",
  initialSort = "recent",
}: ProjectsShowcaseProps) {
  const [filter, setFilter] = React.useState<"all" | Project["category"]>(initialFilter)
  const [sortKey, setSortKey] = React.useState<SortKey>(initialSort)
  const [view, setView] = React.useState<"grid" | "list">("grid")
  const [inView, setInView] = React.useState(false)

  // Scroll-triggered reveal
  const sectionRef = React.useRef<HTMLElement | null>(null)
  React.useEffect(() => {
    if (!sectionRef.current) return
    const el = sectionRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = React.useMemo(() => {
    const base =
      filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)
    const sorted = [...base].sort((a, b) => {
      if (sortKey === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (sortKey === "title-asc") {
        return a.title.localeCompare(b.title)
      }
      if (sortKey === "title-desc") {
        return b.title.localeCompare(a.title)
      }
      return 0
    })
    return sorted
  }, [filter, sortKey])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className={
        "relative w-full max-w-full " +
        "rounded-[calc(var(--radius)+12px)] overflow-hidden " +
        "bg-[radial-gradient(1200px_600px_at_10%_-20%,rgba(26,26,26,0.12),transparent),linear-gradient(180deg,rgba(0,0,0,0.04),transparent)] " +
        (className ? " " + className : "")
      }
    >
      {/* Floating geometric background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-16 h-64 w-64 rotate-12 rounded-xl bg-muted/40 blur-2xl" />
        <div className="absolute bottom-0 left-1/4 h-56 w-56 -rotate-6 rounded-full bg-accent/20 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-full">
        <header className="w-full max-w-full px-4 sm:px-6 pt-8 sm:pt-10">
          <div className="flex items-center gap-3">
            <Layers2 className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Inexia VR
            </span>
          </div>
          <h2
            id="projects-heading"
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight"
          >
            Projects Showcase
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Explore our VR prototypes across simulation, gaming mechanics, and professional training. Filter, sort, and dive into the details.
          </p>
        </header>

        {/* Controls */}
        <div className="mt-6 sm:mt-8 w-full max-w-full px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              value={filter}
              onValueChange={(val) =>
                setFilter(val as "all" | Project["category"])
              }
              className="w-full sm:w-auto"
            >
              <TabsList
                aria-label="Filter projects"
                className="bg-secondary text-secondary-foreground"
              >
                <TabsTrigger value="all" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <Grid3x2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  All
                </TabsTrigger>
                <TabsTrigger value="simulator" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <Rotate3d className="mr-2 h-4 w-4" aria-hidden="true" />
                  Simulator
                </TabsTrigger>
                <TabsTrigger value="gaming" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <Framer className="mr-2 h-4 w-4" aria-hidden="true" />
                  Gaming
                </TabsTrigger>
                <TabsTrigger value="training" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  <FolderKanban className="mr-2 h-4 w-4" aria-hidden="true" />
                  Training
                </TabsTrigger>
              </TabsList>
              <TabsContent value={filter} />
            </Tabs>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center rounded-md border bg-card p-1">
                <Button
                  type="button"
                  variant={view === "grid" ? "default" : "ghost"}
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className="h-9 px-3"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  type="button"
                  variant={view === "list" ? "default" : "ghost"}
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className="h-9 px-3"
                >
                  <LayoutList className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>

              <Select
                onValueChange={(v) => setSortKey(v as SortKey)}
                defaultValue={initialSort}
              >
                <SelectTrigger className="w-[180px]" aria-label="Sort projects">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="title-asc">Title A–Z</SelectItem>
                  <SelectItem value="title-desc">Title Z–A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div
          className={
            "relative mt-6 sm:mt-8 px-4 sm:px-6 pb-10 " +
            (layout === "masonry" && view === "grid"
              ? "columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [column-fill:_balance] "
              : "")
          }
        >
          <ul
            role="list"
            className={
              view === "list"
                ? "flex flex-col gap-4 sm:gap-5"
                : layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                : "contents"
            }
          >
            {filtered.map((project, idx) => (
              <li
                key={project.id}
                className={
                  (layout === "masonry" && view === "grid" ? "break-inside-avoid " : "") +
                  "min-w-0"
                }
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  revealed={inView}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  revealed,
}: {
  project: Project
  index: number
  revealed: boolean
}) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <Card
      role="article"
      aria-labelledby={`${project.id}-title`}
      className={
        "group relative isolate w-full max-w-full overflow-hidden " +
        "rounded-[calc(var(--radius)+8px)] border border-border/60 " +
        "bg-card/70 backdrop-blur-xl " +
        "shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_24px_-10px_rgba(0,0,0,0.15)] " +
        "transition-transform duration-300 ease-out will-change-transform " +
        (revealed
          ? "translate-y-0 opacity-100 "
          : "translate-y-6 opacity-0 ") +
        (revealed ? "animate-in fade-in-25 " : "") +
        "hover:-translate-y-0.5"
      }
      style={{
        transitionDelay: revealed ? `${index * 70}ms` : "0ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow border on hover */}
      <div
        aria-hidden="true"
        className={
          "pointer-events-none absolute inset-0 rounded-[inherit] " +
          "before:absolute before:inset-[-1px] before:rounded-[inherit] " +
          "before:bg-[conic-gradient(from_180deg,rgba(231,255,58,0.25),rgba(26,26,26,0.1),rgba(231,255,58,0.25))] " +
          "before:opacity-0 before:transition-opacity before:duration-500 " +
          (hovered ? "before:opacity-100" : "")
        }
      />
      <div className="relative z-10">
        {/* Media */}
        <div className="relative overflow-hidden">
          <div className="relative h-48 sm:h-56 w-full">
            <img
              src={project.image}
              alt=""
              className={
                "h-full w-full object-cover " +
                "transition-transform duration-500 ease-out " +
                (hovered ? "scale-[1.05]" : "scale-100")
              }
              loading="lazy"
            />
            {/* top gradient overlay */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-primary/20 to-transparent" />
          </div>

          {/* Category badge overlay */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="backdrop-blur bg-secondary/80 text-secondary-foreground"
            >
              {iconForCategory(project.category)}
              <span className="ml-1 capitalize">{project.category}</span>
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3
            id={`${project.id}-title`}
            className="text-lg sm:text-xl font-semibold tracking-tight break-words"
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.description}
          </p>

          {/* Stack */}
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground/90"
              >
                <Scale3d className="mr-1.5 h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm">
            {project.features.map((f, i) => (
              <li key={i} className="marker:text-accent/80 text-foreground/90">
                <span className="min-w-0 break-words">{f}</span>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Updated {new Date(project.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-9 px-3 hover:bg-primary hover:text-primary-foreground"
              >
                <Layers2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Details
              </Button>
              <Button className="h-9 px-4">
                <Rotate3d className="mr-2 h-4 w-4" aria-hidden="true" />
                View
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle inner highlight */}
      <div
        aria-hidden="true"
        className={
          "pointer-events-none absolute inset-x-6 -top-10 h-20 rounded-full blur-2xl " +
          "bg-accent/10 transition-opacity duration-500 " +
          (hovered ? "opacity-100" : "opacity-0")
        }
      />
    </Card>
  )
}

function iconForCategory(cat: Project["category"]) {
  if (cat === "simulator") return <Rotate3d className="h-3.5 w-3.5" aria-hidden="true" />
  if (cat === "gaming") return <Framer className="h-3.5 w-3.5" aria-hidden="true" />
  return <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
}