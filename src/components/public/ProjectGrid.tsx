"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Stagger delay between columns (ms) */
  step?: number;
  /** Columns per row — used to wrap stagger delay */
  columns?: number;
};

export function ProjectGrid({ children, step = 140, columns = 3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>(":scope > *"));
    if (tiles.length === 0) return;

    tiles.forEach((tile, i) => {
      tile.classList.add("is-tile");
      tile.style.setProperty("--tile-delay", `${(i % columns) * step}ms`);
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    tiles.forEach((tile) => obs.observe(tile));
    return () => obs.disconnect();
  }, [columns, step]);

  return (
    <div ref={ref} className="project-grid">
      {children}
    </div>
  );
}
