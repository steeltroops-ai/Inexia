"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu, X } from "lucide-react";

type NavLink = {
  id: string;
  label: string;
};

interface NavigationProps {
  className?: string;
  style?: React.CSSProperties;
  links?: NavLink[];
  logoLabel?: string;
  onLinkClick?: (id: string) => void;
}

const DEFAULT_LINKS: NavLink[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "technology", label: "Technology" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export default function Navigation({
  className,
  style,
  links = DEFAULT_LINKS,
  logoLabel = "Inexia",
  onLinkClick,
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [elevated, setElevated] = useState(false);
  const linksRef = useRef(links);

  useEffect(() => {
    linksRef.current = links;
  }, [links]);

  // Observe sections to track active link
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = linksRef.current.map((l) => l.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most visible near the center/top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          );

        if (visible.length > 0) {
          const topMost = visible[0].target as HTMLElement;
          setActiveId(topMost.id);
        } else {
          // Fallback: determine by scroll position
          const scrollY = window.scrollY + 120; // offset for fixed nav
          let current: string | null = null;
          for (const s of sections) {
            if (s.offsetTop <= scrollY) {
              current = s.id;
            }
          }
          if (current) setActiveId(current);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Elevation when scrolled
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setElevated(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = useCallback(
    (id: string) => {
      if (typeof window === "undefined") return;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        onLinkClick?.(id);
      }
      setMenuOpen(false);
    },
    [onLinkClick]
  );

  const navClasses = useMemo(
    () =>
      [
        "fixed left-1/2 z-50 -translate-x-1/2",
        "top-4 sm:top-6",
        "w-[min(100%-16px,1120px)]", // Improved max width and spacing
        "rounded-2xl", // Increased border radius for modern look
        "backdrop-blur-xl",
        "bg-primary/80", // Slightly more opaque for better contrast
        "border border-white/15", // Better border visibility
        "transition-all duration-300 ease-out",
        elevated
          ? "shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]"
          : "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]",
        elevated ? "ring-1 ring-white/10" : "ring-0",
        "px-4 sm:px-6", // Better padding using 8px grid
        "py-3", // Consistent vertical padding
      ].join(" "),
    [elevated]
  );

  const linkBase =
    "relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--accent)] hover:text-[var(--accent)]";
  const linkInactive =
    "text-white/85 hover:bg-white/8 hover:text-white hover:scale-[1.02]";
  const linkActive =
    "text-[var(--accent)] bg-white/10 shadow-[0_0_20px_rgba(139,92,246,0.3)] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-[var(--accent)]/10 before:to-transparent before:opacity-50";

  return (
    <nav
      className={["pointer-events-auto", className].filter(Boolean).join(" ")}
      style={style}
      aria-label="Primary"
    >
      <div className={navClasses} role="navigation">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className="group flex items-center gap-2 rounded-xl px-3 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label={`${logoLabel} home`}
            onClick={() => {
              if (typeof window !== "undefined")
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-heading text-lg sm:text-xl font-bold leading-none tracking-tight bg-gradient-to-r from-[#c084fc] via-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent drop-shadow-sm">
              {logoLabel}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.id);
                  }}
                  className={[
                    linkBase,
                    isActive ? linkActive : linkInactive,
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="truncate">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-overlay"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 ring-1 ring-white/15 text-white/90 transition-all duration-200 hover:bg-white/15 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu
                className={`h-5 w-5 transition-transform duration-200 ${
                  menuOpen ? "rotate-90" : "rotate-0"
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Subtle Glow Border */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl shadow-[0_0_60px_8px] shadow-[rgba(255,255,255,0.06)]" />
      </div>

      {/* Full-screen mobile overlay */}
      <div
        id="mobile-nav-overlay"
        className={[
          "fixed inset-0 z-40 md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
          "transition-opacity duration-300",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div
          className={[
            "absolute inset-0",
            "bg-primary/95 backdrop-blur-2xl",
            "transition-all duration-300 ease-out",
            menuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-95",
          ].join(" ")}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6">
            <button
              type="button"
              className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white/90 transition-all duration-200 hover:bg-white/15 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="mb-8 flex items-center gap-3">
              <span className="font-heading text-3xl font-bold bg-gradient-to-r from-[#c084fc] via-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent drop-shadow-sm">
                {logoLabel}
              </span>
            </div>

            <ul className="w-full max-w-md space-y-3">
              {links.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(link.id);
                      }}
                      className={[
                        "group flex w-full items-center justify-between rounded-2xl px-6 py-4 text-lg font-semibold transition-all duration-200",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                        isActive
                          ? "bg-white/15 text-[var(--accent)] shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-[1.02]"
                          : "bg-white/8 text-white/90 hover:bg-white/15 hover:text-[var(--accent)] hover:scale-[1.02]",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="min-w-0 truncate tracking-tight">
                        {link.label}
                      </span>
                      <span className="pointer-events-none ml-4 h-2.5 w-2.5 rounded-full bg-[var(--accent)]/70 group-hover:bg-[var(--accent)] transition-all duration-200" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-12 text-center text-sm text-white/60 px-6 font-medium">
              Navigate through sections. Smooth scroll enabled.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
