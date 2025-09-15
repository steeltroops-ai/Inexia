"use client";

import * as React from "react";
import { Layers2, Heading as HeadingIcon } from "lucide-react";
import { motion } from "framer-motion";

export interface AboutSectionProps {
  className?: string;
  id?: string;
  founderName?: string;
  founderTitle?: string;
  founderImageUrl?: string;
  founderBio?: string;
}

const defaultFounderImage =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop";

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function AboutSection({
  className,
  id = "about",
  founderName = "Mayank Pratap Singh",
  founderTitle = "Founder & CEO, Inexia VR",
  founderImageUrl = defaultFounderImage,
  founderBio = "Engineer and researcher with deep experience in AI/ML, robotics, and human–computer interaction. Mayank leads Inexia VR with a vision to fuse spatial computing, embodied intelligence, and humane design to build the next generation of immersive interfaces.",
}: AboutSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full max-w-full rounded-[1.25rem] overflow-hidden",
        // Dark section shell
        "bg-[#0a0f1e] text-white",
        // Subtle border for glass edge
        "border border-white/10",
        className
      )}
      aria-labelledby="about-heading"
    >
      {/* Decorative gradients and glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(0,229,255,0.5) 0%, rgba(0,229,255,0.12) 50%, rgba(0,229,255,0) 80%)",
          }}
        />
        <div className="absolute -bottom-1/4 -right-1/4 h-[560px] w-[560px] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(124,58,237,0.5) 0%, rgba(124,58,237,0.12) 50%, rgba(124,58,237,0) 80%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,229,255,0.07),transparent_40%,rgba(124,58,237,0.08)_60%,transparent_90%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2060%22 viewBox=%220 0 60 60%22><g fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%220.06%22 stroke-width=%220.5%22><path d=%22M0 30h60M30 0v60%22/></g></svg>')] opacity-100" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        className="relative z-10"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 md:px-12 pt-10 sm:pt-12 md:pt-16">
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-cyan-300">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 backdrop-blur-md">
              <HeadingIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm sm:text-base font-medium tracking-wide uppercase">
              Our Story
            </p>
          </motion.div>

          <motion.h2
            id="about-heading"
            variants={fadeUp}
            className={cn(
              "mt-4 sm:mt-5",
              "text-2xl sm:text-3xl md:text-4xl font-bold leading-tight",
              "min-w-0 break-words"
            )}
          >
            Building immersive futures with
            <span className="relative ml-2">
              <span className="px-1.5 rounded-md bg-gradient-to-r from-cyan-400/20 to-purple-500/20 ring-1 ring-cyan-400/30 text-cyan-300">
                spatial intelligence
              </span>
              <span className="absolute -inset-1 rounded-md blur-md bg-cyan-400/20 opacity-40 pointer-events-none" aria-hidden="true" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80 max-w-3xl"
          >
            Inexia VR began with a simple belief: the boundary between the digital and
            physical worlds should feel seamless, intuitive, and profoundly human. We
            craft systems where perception, action, and presence converge—so experiences
            don't just look real, they feel real.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="px-6 sm:px-8 md:px-12 pb-10 sm:pb-12 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Story + Mission */}
            <motion.div variants={fadeUp} className="min-w-0">
              <div
                className={cn(
                  "w-full rounded-2xl p-5 sm:p-6 md:p-7",
                  "bg-white/5 backdrop-blur-md",
                  "ring-1 ring-white/10",
                  "hover:ring-white/20 transition-colors"
                )}
              >
                <div className="flex items-center gap-2 text-white/80">
                  <Layers2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium">Founding Story</span>
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-white/85 break-words">
                  In 2023, a small team of engineers and designers set out to reimagine
                  how people learn, create, and collaborate in 3D. Early prototypes
                  combined{" "}
                  <span className="text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                    real‑time AI perception
                  </span>{" "}
                  with robust{" "}
                  <span className="text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                    robotics‑grade control
                  </span>
                  , unlocking interactions that feel natural, precise, and deeply
                  responsive. What started as research quickly became a mission.
                </p>

                <div className="mt-5 sm:mt-6 rounded-xl p-4 sm:p-5 bg-white/[0.04] ring-1 ring-white/10">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Mission
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80">
                    To deliver immersive systems that make{" "}
                    <span className="text-cyan-300">
                      spatial computing
                    </span>{" "}
                    accessible, expressive, and dependable—empowering creators, teams,
                    and industries to operate at{" "}
                    <span className="text-cyan-300">
                      previously impossible scales
                    </span>
                    .
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Founder spotlight */}
            <motion.div variants={fadeUp} className="min-w-0">
              <article
                className={cn(
                  "w-full rounded-2xl p-5 sm:p-6 md:p-7",
                  "bg-white/5 backdrop-blur-md",
                  "ring-1 ring-white/10",
                  "hover:ring-white/20 transition-colors"
                )}
                aria-labelledby="founder-heading"
              >
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                  <div className="relative shrink-0">
                    <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-xl overflow-hidden ring-1 ring-white/10">
                      <img
                        src={founderImageUrl}
                        alt={`${founderName} portrait`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      {/* Glow ring */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-cyan-400/30"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 id="founder-heading" className="text-lg sm:text-xl font-semibold leading-snug truncate">
                      {founderName}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{founderTitle}</p>
                    <p className="mt-3 text-sm sm:text-base text-white/80">
                      {founderBio}
                    </p>
                    <ul className="mt-4 flex flex-wrap items-center gap-2.5 text-xs text-white/70">
                      <li className="rounded-md px-2.5 py-1 bg-white/5 ring-1 ring-white/10">
                        AI/ML
                      </li>
                      <li className="rounded-md px-2.5 py-1 bg-white/5 ring-1 ring-white/10">
                        Robotics
                      </li>
                      <li className="rounded-md px-2.5 py-1 bg-white/5 ring-1 ring-white/10">
                        HCI
                      </li>
                      <li className="rounded-md px-2.5 py-1 bg-white/5 ring-1 ring-white/10">
                        Systems Design
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <StatItem label="Years in R&D" value="10+" />
                  <StatItem label="Patents/Papers" value="12" />
                </div>
              </article>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA-esque note (non-interactive, decorative) */}
        <motion.div
          variants={fadeUp}
          className="px-6 sm:px-8 md:px-12 pb-8 sm:pb-10 md:pb-14"
        >
          <div className="relative overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-md">
            <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_30%_40%,black,transparent)] bg-[conic-gradient(from_120deg,rgba(0,229,255,0.25),rgba(124,58,237,0.2),transparent_70%)]" aria-hidden="true" />
            <div className="relative p-5 sm:p-6">
              <p className="text-sm sm:text-base text-white/80">
                We're exploring collaborations across simulation, training, healthcare, and
                creative tooling—where immersive tech has the greatest impact.{" "}
                <span className="text-cyan-300">
                  Let's shape what's next, together.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative rounded-lg bg-white/[0.04] ring-1 ring-white/10 p-3.5 sm:p-4">
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-cyan-300">
        {value}
      </p>
    </div>
  );
}