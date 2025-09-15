"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu } from "lucide-react";

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
        "w-[min(100%-1rem,1100px)]",
        "rounded-[1.25rem]",
        "backdrop-blur-xl",
        "bg-primary/70", // glassy dark surface
        "border",
        "border-white/10",
        "transition-all duration-300",
        elevated
          ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
          : "shadow-[0_6px_20px_-12px_rgba(0,0,0,0.4)]",
        elevated ? "ring-1 ring-white/10" : "ring-0",
        "px-3 sm:px-4",
      ].join(" "),
    [elevated]
  );

  const linkBase =
    "relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--accent)] hover:text-[var(--accent)]";
  const linkInactive = "text-[var(--primary-foreground)]/80 hover:bg-white/5";
  const linkActive =
    "text-[var(--accent)] bg-white/5 before:absolute before:inset-0 before:rounded-lg before:shadow-[0_0_20px_2px] before:shadow-[color:var(--accent)]/40";

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
            className="group flex items-center gap-2 rounded-xl px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={`${logoLabel} home`}
            onClick={() => {
              if (typeof window !== "undefined")
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-heading text-base sm:text-lg leading-none tracking-tight bg-gradient-to-r from-[#c084fc] via-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
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
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-overlay"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-[var(--primary-foreground)]/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Subtle Glow Border */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[1.25rem] shadow-[0_0_60px_8px] shadow-[rgba(255,255,255,0.04)]" />
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
            "bg-primary/90 backdrop-blur-2xl",
            "transition-transform duration-300",
            menuOpen ? "translate-y-0" : "-translate-y-2",
          ].join(" ")}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-[var(--primary-foreground)]/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <Menu
                className="h-5 w-5 rotate-90 transition-transform"
                aria-hidden="true"
              />
            </button>

            <div className="mb-10 flex items-center gap-3">
              <span className="font-heading text-2xl bg-gradient-to-r from-[#c084fc] via-[#8b5cf6] to-[#7c3aed] bg-clip-text text-transparent">
                {logoLabel}
              </span>
            </div>

            <ul className="w-full max-w-sm space-y-2">
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
                        "group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-lg font-medium transition",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                        isActive
                          ? "bg-white/10 text-[var(--accent)]"
                          : "bg-white/5 text-[var(--primary-foreground)]/90 hover:bg-white/10 hover:text-[var(--accent)]",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="min-w-0 truncate">{link.label}</span>
                      <span className="pointer-events-none ml-4 h-2 w-2 rounded-full bg-[var(--accent)]/70 group-hover:bg-[var(--accent)] transition" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-center text-sm text-[var(--primary-foreground)]/70 px-6">
              Navigate through sections. Smooth scroll enabled.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
