'use client';

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { FaRocket, FaMagic, FaBox, FaGlobe, FaPuzzlePiece, FaCog } from "react-icons/fa";

const solutions = [
  {
    title: "Unified CDN",
    description: "Ship all colors, fonts, icons, animations & assets in one link.",
    Icon: FaRocket,
    badge: "Single Link",
    stat: "1 CDN",
    statLabel: "for entire UI",
    impact: "Instant global cache",
    tag: "Everything bundled",
    gridClass: "md:col-span-2",
    headerBg: "bg-linear-to-br from-blue-100 via-cyan-200 to-teal-200",
    cardBg: "bg-linear-to-br from-blue-50/80 via-cyan-50/80 to-teal-50/80",
    iconColor: "text-blue-600",
    borderColor: "border-blue-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(59,130,246,0.25)]",
  },
  {
    title: "Auto theme generator",
    description: "Let StyloFront craft palettes, glass panels, shadows & gradients.",
    Icon: FaMagic,
    badge: "Themes",
    stat: "30+ palettes",
    statLabel: "AI composed",
    impact: "Neon, glass, matte",
    tag: "Click → Theme",
    headerBg: "bg-linear-to-br from-emerald-100 via-teal-200 to-cyan-200",
    cardBg: "bg-linear-to-br from-emerald-50/80 via-teal-50/80 to-cyan-50/80",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(16,185,129,0.25)]",
  },
  {
    title: "Font + icon bundles",
    description: "Curated pairings with perfect sizing and fallback handling.",
    Icon: FaBox,
    badge: "Bundles",
    stat: "1 import",
    statLabel: "fonts & icons",
    impact: "Perfect pairing",
    tag: "Auto fallback",
    gridClass: "md:row-span-2",
    headerBg: "bg-linear-to-br from-indigo-100 via-blue-200 to-purple-200",
    cardBg: "bg-linear-to-br from-indigo-50/80 via-blue-50/80 to-purple-50/80",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(99,102,241,0.25)]",
  },
  {
    title: "Asset CDN",
    description: "Fast global delivery with cache invalidation & signed URLs.",
    Icon: FaGlobe,
    badge: "Assets",
    stat: "32ms avg",
    statLabel: "edge latency",
    impact: "Signed URLs + versioning",
    tag: "Edge network",
    gridClass: "md:col-span-2",
    headerBg: "bg-linear-to-br from-sky-100 via-blue-200 to-cyan-200",
    cardBg: "bg-linear-to-br from-sky-50/80 via-blue-50/80 to-cyan-50/80",
    iconColor: "text-sky-600",
    borderColor: "border-sky-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(14,165,233,0.25)]",
  },
  {
    title: "Ready UI components",
    description: "Buttons, cards, nav bars, hero blocks — all styles aligned.",
    Icon: FaPuzzlePiece,
    badge: "Components",
    stat: "120+ blocks",
    statLabel: "direction ready",
    impact: "Neon + glassmorphism",
    tag: "Copy & ship",
    headerBg: "bg-linear-to-br from-violet-100 via-purple-200 to-fuchsia-200",
    cardBg: "bg-linear-to-br from-violet-50/80 via-purple-50/80 to-fuchsia-50/80",
    iconColor: "text-violet-600",
    borderColor: "border-violet-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(139,92,246,0.25)]",
  },
  {
    title: "Zero setup",
    description: "Drop the CDN link, call the SDK, start shipping screens.",
    Icon: FaCog,
    badge: "Setup",
    stat: "< 5 min",
    statLabel: "to production",
    impact: "SDK + CLI + tokens",
    tag: "One dashboard",
    headerBg: "bg-linear-to-br from-teal-100 via-emerald-200 to-green-200",
    cardBg: "bg-linear-to-br from-teal-50/80 via-emerald-50/80 to-green-50/80",
    iconColor: "text-teal-600",
    borderColor: "border-teal-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(20,184,166,0.25)]",
  },
];

export default function SolutionSection() {
  return (
    <section id="solutions" className="relative bg-linear-to-b from-white via-emerald-50/30 to-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-600 font-body font-semibold">Instant Fix</p>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl font-heading text-gray-900">StyloFront fixes all of it — instantly.</h2>
          <p className="mt-4 text-lg text-gray-600 font-body">One dashboard → One CDN link → Everything is ready.</p>
        </div>

        <BentoGrid className="mt-14 gap-6 md:auto-rows-[24rem]">
          {solutions.map((solution) => {
            const IconComponent = solution.Icon;
            return (
              <BentoGridItem
                key={solution.title}
                title={solution.title}
                description={
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 font-body">{solution.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold">{solution.impact}</span>
                      <span className="rounded-full border border-emerald-300 bg-emerald-100/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-emerald-700 backdrop-blur-sm">
                        {solution.tag}
                      </span>
                    </div>
                  </div>
                }
                header={
                  <div
                    className={cn(
                      "relative flex h-full min-h-40 flex-col justify-between overflow-hidden rounded-lg border-2 p-5 backdrop-blur-sm",
                      solution.headerBg,
                      solution.borderColor,
                    )}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent pointer-events-none" />
                    <div className="absolute -inset-4 bg-emerald-200/20 blur-2xl opacity-50" />
                    <div className="relative z-10 flex items-center justify-between">
                      <div className={cn("text-5xl drop-shadow-lg", solution.iconColor)}>
                        <IconComponent />
                      </div>
                      <span className="rounded-full border-2 border-white/40 bg-white/60 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-[0.3em] text-gray-800 font-body font-semibold shadow-lg">
                        {solution.badge}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <p className="text-4xl text-gray-900 font-heading font-bold drop-shadow-sm">{solution.stat}</p>
                      <p className="text-xs uppercase tracking-[0.4em] text-gray-700 font-body mt-1 font-semibold">{solution.statLabel}</p>
                    </div>
                  </div>
                }
                icon={
                  <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white/80 backdrop-blur-md text-xl shadow-lg", solution.borderColor, solution.iconColor)}>
                    <IconComponent />
                  </div>
                }
                className={cn(
                  "border-2 backdrop-blur-xl text-gray-900 font-body transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
                  solution.cardBg,
                  solution.borderColor,
                  solution.shadowColor,
                  solution.gridClass,
                )}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
