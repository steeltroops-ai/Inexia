"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Send, Linkedin, Link2, Mails, Phone } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  className?: string;
  id?: string;
  onSubmit?: (data: InquiryFormState) => Promise<void> | void;
};

type InquiryFormState = {
  name: string;
  email: string;
  projectType?: "prototype" | "product" | "research" | "consulting" | "other";
  budget?: "lt10k" | "10to25" | "25to50" | "50to100" | "gt100";
  timeline?: "asap" | "1to3" | "3to6" | "flexible";
  requirements: string;
};

type FormErrors = Partial<Record<keyof InquiryFormState, string>>;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const initialState: InquiryFormState = {
  name: "",
  email: "",
  projectType: undefined,
  budget: undefined,
  timeline: undefined,
  requirements: "",
};

export default function ContactSection({
  className,
  id = "contact",
  onSubmit,
}: Props) {
  const [form, setForm] = useState<InquiryFormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const validate = (state: InquiryFormState): FormErrors => {
    const next: FormErrors = {};
    if (!state.name.trim()) next.name = "Please tell us your name.";
    if (!state.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!state.projectType) next.projectType = "Select a project type.";
    if (!state.budget) next.budget = "Select an estimated budget.";
    if (!state.timeline) next.timeline = "Select a timeline.";
    if (!state.requirements.trim() || state.requirements.trim().length < 30) {
      next.requirements = "Please provide at least 30 characters of detail.";
    }
    return next;
  };

  const isValid = useMemo(
    () => Object.keys(validate(form)).length === 0,
    [form]
  );

  const handleChange =
    <K extends keyof InquiryFormState>(key: K) =>
    (value: InquiryFormState[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        // Real-time field-level validation
        const fieldErrors = validate(next);
        setErrors((prevErr) => ({ ...prevErr, [key]: fieldErrors[key] }));
        return next;
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors = validate(form);
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) {
      toast("Please review the form", {
        description: "Some fields need your attention.",
      });
      return;
    }

    try {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 1000));
      if (onSubmit) {
        await onSubmit(form);
      }
      toast("Message sent", {
        description: "We’ll get back to you within 1–2 business days.",
      });
      setForm(initialState);
    } catch (err) {
      toast("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full max-w-full rounded-[1.25rem] overflow-hidden",
        // Dark section shell matching other sections
        "bg-[#0a0f1e] text-white",
        // Subtle border for glass edge
        "border border-white/10",
        className
      )}
      aria-label="Contact and collaboration"
    >
      {/* Decorative gradients and glows matching AboutSection pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-1/4 -left-1/4 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0.12) 50%, rgba(139,92,246,0) 80%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-[560px] w-[560px] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(124,58,237,0.5) 0%, rgba(124,58,237,0.12) 50%, rgba(124,58,237,0) 80%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(139,92,246,0.07),transparent_40%,rgba(124,58,237,0.08)_60%,transparent_90%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><g fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%220.06%22 stroke-width=%220.5%22><path d=%22M0 30h60M30 0v60%22/></g></svg>')] opacity-100" />
      </div>

      <div className="relative p-6 sm:p-8 lg:p-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
            Let’s Build the Future Together
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight break-words text-white">
            Collaborate with Inexia VR
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
            Have a project in mind or want to explore a partnership? Reach out
            through any channel, or send a detailed brief and we’ll follow up
            shortly.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-2">
          {/* Left: Contact methods and showcase */}
          <div className="space-y-6 min-w-0">
            <div
              className={cn(
                "rounded-[calc(var(--radius)-4px)] border border-white/10",
                "bg-white/5 backdrop-blur-sm p-4 sm:p-5"
              )}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Connect directly
              </h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:hello@inexia.vr"
                  className={cn(
                    "group flex items-center gap-3 rounded-md border border-white/20 bg-white/10 p-3",
                    "transition-all duration-200 hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  )}
                  aria-label="Email us"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                    <Mails className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">Email</div>
                    <div className="text-xs text-white/60 truncate">
                      hello@inexia.vr
                    </div>
                  </div>
                </a>
                <a
                  href="tel:+1234567890"
                  className={cn(
                    "group flex items-center gap-3 rounded-md border border-white/20 bg-white/10 p-3",
                    "transition-all duration-200 hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  )}
                  aria-label="Call us"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                    <Phone className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">Phone</div>
                    <div className="text-xs text-white/60 truncate">
                      +1 (234) 567-890
                    </div>
                  </div>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "group flex items-center gap-3 rounded-md border border-white/20 bg-white/10 p-3 sm:col-span-1",
                    "transition-all duration-200 hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  )}
                  aria-label="GitHub"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                    <Link2 className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">GitHub</div>
                    <div className="text-xs text-white/60 truncate">
                      Follow our open-source work
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "group flex items-center gap-3 rounded-md border border-white/20 bg-white/10 p-3 sm:col-span-1",
                    "transition-all duration-200 hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  )}
                  aria-label="LinkedIn"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                    <Linkedin
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">
                      LinkedIn
                    </div>
                    <div className="text-xs text-white/60 truncate">
                      Connect with our team
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Portfolio showcase links */}
            <div
              className={cn(
                "rounded-[calc(var(--radius)-4px)] border border-white/10",
                "bg-white/5 backdrop-blur-sm p-4 sm:p-5"
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Explore our work
                </h3>
                <a
                  href="#projects"
                  className="text-sm font-medium text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
                >
                  View all
                </a>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href="#projects"
                  className={cn(
                    "group relative overflow-hidden rounded-md border border-white/20",
                    "bg-white/10"
                  )}
                  aria-label="View Projects"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="https://images.unsplash.com/photo-1605649487212-47bdab064df3?q=80&w=1200&auto=format&fit=crop"
                      alt="Immersive VR interface"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="rounded bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                      Prototype Gallery
                    </div>
                  </div>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "group relative overflow-hidden rounded-md border border-white/20",
                    "bg-white/10"
                  )}
                  aria-label="Open-source on GitHub"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <img
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
                      alt="Code and development"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="rounded bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                      Engineering Repos
                    </div>
                  </div>
                </a>
              </div>
              <p className="mt-3 text-xs text-white/60">
                We collaborate with startups and enterprise R&D teams on
                prototypes, full-stack XR products, and research initiatives.
              </p>
            </div>

            {/* Collaboration opportunities */}
            <div
              className={cn(
                "rounded-[calc(var(--radius)-4px)] border border-white/10",
                "bg-white/5 backdrop-blur-sm p-4 sm:p-5"
              )}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Collaboration opportunities
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="min-w-0 text-white/80">
                    Custom VR prototypes and POCs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="min-w-0 text-white/80">
                    End-to-end immersive product builds
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="min-w-0 text-white/80">
                    Research partnerships and UX studies
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="min-w-0 text-white/80">
                    Advisory and consulting
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={cn(
              "rounded-[calc(var(--radius)-4px)] border border-white/10",
              "bg-white/5 backdrop-blur-sm p-4 sm:p-5"
            )}
          >
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-white"
                  >
                    Your name
                  </label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleChange("name")(e.target.value)}
                    placeholder="Ada Lovelace"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      "bg-white/10 backdrop-blur placeholder:text-white/50 text-white",
                      "border-white/20",
                      "transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                      "hover:bg-white/15 hover:border-white/30"
                    )}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-xs text-destructive"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange("email")(e.target.value)}
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      "bg-white/10 backdrop-blur placeholder:text-white/50 text-white",
                      "border-white/20",
                      "transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                      "hover:bg-white/15 hover:border-white/30"
                    )}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-xs text-destructive"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="group">
                  <label className="mb-1 block text-sm font-medium text-white">
                    Project type
                  </label>
                  <Select
                    value={form.projectType}
                    onValueChange={(v: string) =>
                      handleChange("projectType")(
                        v as InquiryFormState["projectType"]
                      )
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-white/10 backdrop-blur border-white/20 text-white",
                        "focus:ring-2 focus:ring-[var(--accent)]"
                      )}
                      aria-invalid={!!errors.projectType}
                    >
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prototype">Prototype / POC</SelectItem>
                      <SelectItem value="product">Product build</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="mb-1 block text-sm font-medium text-white">
                    Budget
                  </label>
                  <Select
                    value={form.budget}
                    onValueChange={(v: string) =>
                      handleChange("budget")(v as InquiryFormState["budget"])
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-white/10 backdrop-blur border-white/20 text-white",
                        "focus:ring-2 focus:ring-[var(--accent)]"
                      )}
                      aria-invalid={!!errors.budget}
                    >
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lt10k">Under $10k</SelectItem>
                      <SelectItem value="10to25">$10k – $25k</SelectItem>
                      <SelectItem value="25to50">$25k – $50k</SelectItem>
                      <SelectItem value="50to100">$50k – $100k</SelectItem>
                      <SelectItem value="gt100">$100k+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.budget}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="mb-1 block text-sm font-medium text-white">
                    Timeline
                  </label>
                  <Select
                    value={form.timeline}
                    onValueChange={(v: string) =>
                      handleChange("timeline")(
                        v as InquiryFormState["timeline"]
                      )
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "bg-white/10 backdrop-blur border-white/20 text-white",
                        "focus:ring-2 focus:ring-[var(--accent)]"
                      )}
                      aria-invalid={!!errors.timeline}
                    >
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1to3">1–3 months</SelectItem>
                      <SelectItem value="3to6">3–6 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.timeline}
                    </p>
                  )}
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="requirements"
                    className="mb-1 block text-sm font-medium text-white"
                  >
                    Tell us about your project
                  </label>
                  <small className="text-xs text-white/60">
                    {Math.max(0, 30 - (form.requirements.trim().length || 0))}{" "}
                    more chars
                  </small>
                </div>
                <Textarea
                  id="requirements"
                  value={form.requirements}
                  onChange={(e) => handleChange("requirements")(e.target.value)}
                  placeholder="Goals, scope, platform(s), references, constraints…"
                  rows={6}
                  aria-invalid={!!errors.requirements}
                  aria-describedby={
                    errors.requirements ? "requirements-error" : undefined
                  }
                  className={cn(
                    "bg-white/10 backdrop-blur placeholder:text-white/50 text-white",
                    "border-white/20 resize-vertical",
                    "transition-all duration-200",
                    "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    "hover:bg-white/15 hover:border-white/30"
                  )}
                />
                {errors.requirements && (
                  <p
                    id="requirements-error"
                    className="mt-1 text-xs text-destructive"
                  >
                    {errors.requirements}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Button
                  type="submit"
                  disabled={submitting || !isValid}
                  className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90",
                    "focus-visible:ring-2 focus-visible:ring-accent",
                    "transition-all duration-200",
                    "disabled:opacity-70 disabled:cursor-not-allowed"
                  )}
                >
                  <Send
                    className={cn("h-4 w-4", submitting ? "animate-pulse" : "")}
                    aria-hidden="true"
                  />
                  {submitting ? "Sending…" : "Send inquiry"}
                </Button>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/60 break-words">
                    By submitting, you agree to be contacted about your inquiry.
                    Your information is kept private.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Inexia VR · Pioneering immersive
            technology.
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className={cn(
                "rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white",
                "transition-all hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              )}
            >
              View Projects
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white",
                "transition-all hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              )}
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              Connect
            </a>
          </div>
        </div>
      </div>

      {/* Smooth mount-in animation via opacity/translate */}
      <style jsx>{`
        section > div {
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? "0px" : "6px"});
          transition: opacity 300ms ease, transform 300ms ease;
        }
      `}</style>
    </section>
  );
}
