"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; label: string };

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Track the last heading to cross the top of the viewport.
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-20">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-faint">
        On this page
      </p>
      <ul className="mt-3 flex flex-col gap-1 border-l border-line">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`-ml-px block border-l py-1 pl-4 text-sm leading-snug transition-colors ${
                  isActive
                    ? "border-accent text-accent-light"
                    : "border-transparent text-text-mute hover:border-line hover:text-text"
                }`}
              >
                {h.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
