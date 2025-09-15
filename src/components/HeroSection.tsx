"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Axis3d,
  Layers2,
  MonitorPlay,
  Wand,
  Framer,
  Scale3d,
  Section,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
  id?: string;
}

const FloatingCard = ({
  className,
  icon: Icon,
  title,
  subtitle,
  parallax,
  delay = 0,
}: {
  className?: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  parallax: number;
  delay?: number;
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax]);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={cn(
        "group relative w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.35)]",
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.45)]",
        "transition-shadow",
        className
      )}
      aria-label={`${title} ${subtitle}`}
      role="note"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative grid h-10 w-10 place-items-center rounded-xl",
            "bg-gradient-to-br from-[#5b7cfa]/30 to-[#8a4bff]/30",
            "ring-1 ring-white/10"
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5 text-white/90" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              boxShadow:
                "0 0 24px 6px rgba(91,124,250,0.25), 0 0 36px 10px rgba(138,75,255,0.2)",
            }}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-primary-foreground">
            {title}
          </p>
          <p className="truncate text-xs text-white/70">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function HeroSection({
  className,
  id = "hero",
}: HeroSectionProps) {
  const { scrollYProgress } = useScroll();
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const meshShift = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id={id}
      className={cn(
        "relative w-full min-h-[100svh] overflow-hidden rounded-none",
        "bg-primary",
        className
      )}
      aria-label="Inexia VR hero"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Base deep gradient */}
        <motion.div
          aria-hidden="true"
          style={{ y: bgShift }}
          className={cn(
            "absolute inset-0",
            "bg-[radial-gradient(1200px_800px_at_10%_-10%,#20263f_0%,transparent_70%),radial-gradient(800px_600px_at_90%_10%,#191a2e_0%,transparent_65%),linear-gradient(180deg,#0b0d15_0%,#0a0b12_60%,#070811_100%)]"
          )}
        />

        {/* Electric blue blob */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.28, scale: 1 }}
          animate={{ opacity: 0.4, scale: 1.05 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-24 left-1/2 h-[52rem] w-[52rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.35), rgba(139,92,246,0.10), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Neon purple bloom */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.22, scale: 1 }}
          animate={{ opacity: 0.32, scale: 1.08 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
          className="absolute -bottom-40 right-[-10%] h-[44rem] w-[44rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.35), rgba(124,58,237,0.10), transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Animated mesh grid overlay */}
        <motion.div
          aria-hidden="true"
          style={{ y: meshShift }}
          className="pointer-events-none absolute inset-0 opacity-[0.28] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
        >
          <div
            className={cn(
              "absolute inset-0",
              "bg-[linear-gradient(115deg,rgba(139,92,246,0.10)_0%,rgba(147,51,234,0.12)_50%,rgba(124,58,237,0.10)_100%)]"
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              "bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]",
              "bg-[size:40px_40px]"
            )}
          />
        </motion.div>

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-28 text-center sm:gap-10 z-10">
        {/* Tagline */}
        <motion.h1
          className={cn(
            "mx-auto max-w-4xl break-words",
            "md:max-w-5xl",
            "text-3xl leading-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-[1.05]",
            "font-extrabold tracking-tight text-primary-foreground"
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ staggerChildren: 0.04 }}
        >
          {[
            "Building",
            " the",
            " Future",
            " of",
            " VR",
            " Gaming",
            " &",
            " Training",
          ].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className={cn(
                i >= 2 && i <= 6
                  ? "bg-gradient-to-r from-[#c084fc] via-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent"
                  : ""
              )}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={cn(
            "mx-auto max-w-2xl text-balance",
            "text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
          )}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{
            duration: 0.7,
            delay: 0.06,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          Inexia crafts immersive simulations and next-gen experiences with
          Unreal Engine 5, procedural systems, and real-time 3D to advance VR
          gaming, training, and human performance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          role="group"
          aria-label="Primary actions"
        >
          <Button
            asChild
            className={cn(
              "relative",
              "bg-white text-black hover:bg-white/90",
              "shadow-[0_0_0_0_rgba(0,0,0,0)]",
              "transition-transform duration-200 will-change-transform",
              "hover:-translate-y-0.5 active:translate-y-0"
            )}
          >
            <Link href="#projects" aria-label="Explore our work section">
              <span className="relative z-10">Explore Our Work</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-md"
                style={{
                  boxShadow:
                    "0 0 24px 6px rgba(139,92,246,0.35), 0 0 36px 12px rgba(124,58,237,0.28)",
                }}
              />
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className={cn(
              "relative border border-white/20 bg-white/10 text-primary-foreground hover:bg-white/20",
              "backdrop-blur-md",
              "transition-transform duration-200 will-change-transform",
              "hover:-translate-y-0.5 active:translate-y-0"
            )}
          >
            <Link href="#contact" aria-label="Start a project with Inexia">
              <span className="relative z-10">Start a Project</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-md"
                style={{
                  boxShadow:
                    "0 0 22px 8px rgba(124,58,237,0.22), inset 0 0 1px 1px rgba(255,255,255,0.05)",
                }}
              />
            </Link>
          </Button>
        </motion.div>

        {/* Floating glass UI elements */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-[56%] mx-auto flex w-full max-w-7xl justify-between px-6",
            "hidden md:flex z-0"
          )}
          aria-hidden="true"
        >
          <FloatingCard
            icon={Axis3d}
            title="Real-time 3D"
            subtitle="High-fidelity worlds"
            parallax={-40}
            delay={0.05}
            className="translate-y-8"
          />
          <FloatingCard
            icon={Layers2}
            title="Procedural Systems"
            subtitle="Scalable content"
            parallax={-20}
            delay={0.1}
            className="translate-y-2"
          />
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-24 mx-auto flex w-full max-w-7xl items-end justify-between px-6",
            "hidden md:flex z-0"
          )}
          aria-hidden="true"
        >
          <FloatingCard
            icon={MonitorPlay}
            title="UE5 Pipelines"
            subtitle="Nanite + Lumen"
            parallax={30}
            delay={0.12}
            className=""
          />
          <FloatingCard
            icon={Wand}
            title="Interaction Design"
            subtitle="Human-centered UX"
            parallax={50}
            delay={0.18}
            className="translate-y-6"
          />
        </div>

        {/* Center badge row */}
        <motion.div
          className="mt-2 flex items-center gap-3 text-white/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, delay: 0.14 }}
          aria-label="Technology capabilities"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
            <Framer className="h-4 w-4 text-white/80" aria-hidden="true" />
            <span className="text-xs">Smooth Motion</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
            <Scale3d className="h-4 w-4 text-white/80" aria-hidden="true" />
            <span className="text-xs">Spatial Presence</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
            <Section className="h-4 w-4 text-white/80" aria-hidden="true" />
            <span className="text-xs">Multi-Platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
