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
        "group relative w-full max-w-xs rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-md",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.4)]",
        "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_80px_rgba(0,0,0,0.5)]",
        "transition-all duration-300 hover:scale-105 hover:border-white/25",
        className
      )}
      aria-label={`${title} ${subtitle}`}
      role="note"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative grid h-12 w-12 place-items-center rounded-xl",
            "bg-gradient-to-br from-[#5b7cfa]/40 to-[#8a4bff]/40",
            "ring-1 ring-white/15 shadow-[0_4px_20px_rgba(139,92,246,0.3)]"
          )}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6 text-white/95" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100"
            style={{
              boxShadow:
                "0 0 30px 8px rgba(91,124,250,0.35), 0 0 50px 15px rgba(138,75,255,0.25)",
            }}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white tracking-tight">
            {title}
          </p>
          <p className="truncate text-xs text-white/75 font-medium">
            {subtitle}
          </p>
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

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-10 px-6 py-32 text-center sm:gap-12 z-10">
        {/* Tagline */}
        <motion.h1
          className={cn(
            "mx-auto max-w-4xl break-words",
            "md:max-w-5xl lg:max-w-6xl",
            "text-4xl leading-[1.1] sm:text-5xl sm:leading-[1.08] md:text-6xl md:leading-[1.05] lg:text-7xl lg:leading-[1.02]",
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
            "text-base leading-relaxed text-white/85 sm:text-lg md:text-xl lg:text-xl",
            "font-medium tracking-wide"
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
          className="flex flex-wrap items-center justify-center gap-6"
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
            size="lg"
            className={cn(
              "relative h-14 px-8 text-base font-semibold tracking-tight",
              "bg-white text-black hover:bg-white/95",
              "shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
              "transition-all duration-300 will-change-transform",
              "hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]",
              "active:translate-y-0 active:shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
              "border-0 rounded-xl"
            )}
          >
            <Link href="#projects" aria-label="Explore our work section">
              <span className="relative z-10">Explore Our Work</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-60 transition-opacity duration-300 hover:opacity-80"
                style={{
                  boxShadow:
                    "0 0 30px 8px rgba(139,92,246,0.4), 0 0 60px 16px rgba(124,58,237,0.3)",
                }}
              />
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className={cn(
              "relative h-14 px-8 text-base font-semibold tracking-tight",
              "border border-white/25 bg-white/10 text-white hover:bg-white/20 hover:border-white/35",
              "backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
              "transition-all duration-300 will-change-transform",
              "hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)]",
              "active:translate-y-0 active:shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
              "rounded-xl"
            )}
          >
            <Link href="#contact" aria-label="Start a project with Inexia">
              <span className="relative z-10">Start a Project</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-40 transition-opacity duration-300 hover:opacity-60"
                style={{
                  boxShadow:
                    "0 0 25px 6px rgba(124,58,237,0.25), inset 0 0 1px 1px rgba(255,255,255,0.08)",
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
          className="mt-4 flex flex-wrap items-center justify-center gap-4 text-white/80"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.6, delay: 0.14 }}
          aria-label="Technology capabilities"
        >
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-white/12 hover:border-white/25 transition-all duration-200">
            <Framer className="h-4 w-4 text-white/90" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">
              Smooth Motion
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-white/12 hover:border-white/25 transition-all duration-200">
            <Scale3d className="h-4 w-4 text-white/90" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">
              Spatial Presence
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-white/12 hover:border-white/25 transition-all duration-200">
            <Section className="h-4 w-4 text-white/90" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">
              Multi-Platform
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
