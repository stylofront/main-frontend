'use client';

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { FaFont, FaIcons, FaPalette, FaImage, FaCode, FaClock } from "react-icons/fa";

const issues = [
  {
    title: "Fonts from everywhere",
    description: "Google here, self-hosted there. Nothing stays in sync.",
    Icon: FaFont,
    badge: "Fonts",
    stat: "6 sources",
    statLabel: "per project",
    impact: "+4h setup",
    tag: "Inconsistent theming",
    gridClass: "md:col-span-2",
    headerBg: "bg-linear-to-br from-red-100 via-rose-200 to-pink-200",
    cardBg: "bg-linear-to-br from-red-50/80 via-rose-50/80 to-pink-50/80",
    iconColor: "text-red-600",
    borderColor: "border-red-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(239,68,68,0.25)]",
  },
  {
    title: "Icon mismatch",
    description: "Feather, Lucide, custom SVGs — all with different sizes.",
    Icon: FaIcons,
    badge: "Icons",
    stat: "3 libraries",
    statLabel: "to normalize",
    impact: "Different stroke widths",
    tag: "Visual drift",
    headerBg: "bg-linear-to-br from-orange-100 via-amber-200 to-yellow-200",
    cardBg: "bg-linear-to-br from-orange-50/80 via-amber-50/80 to-yellow-50/80",
    iconColor: "text-orange-600",
    borderColor: "border-orange-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(249,115,22,0.25)]",
  },
  {
    title: "Repeating color setups",
    description: "Copy-paste color tokens into every new project.",
    Icon: FaPalette,
    badge: "Color",
    stat: "12 tokens",
    statLabel: "rewritten weekly",
    impact: "Palette drift",
    tag: "Duplicate work",
    gridClass: "md:row-span-2",
    headerBg: "bg-linear-to-br from-pink-100 via-rose-200 to-red-200",
    cardBg: "bg-linear-to-br from-pink-50/80 via-rose-50/80 to-red-50/80",
    iconColor: "text-pink-600",
    borderColor: "border-pink-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(236,72,153,0.25)]",
  },
  {
    title: "Asset storage mess",
    description: "Logos in Drive, illustrations in Notion, random S3 buckets.",
    Icon: FaImage,
    badge: "Assets",
    stat: "5 storage buckets",
    statLabel: "per launch",
    impact: "Broken links",
    tag: "Manual sync",
    gridClass: "md:col-span-2",
    headerBg: "bg-linear-to-br from-purple-100 via-violet-200 to-indigo-200",
    cardBg: "bg-linear-to-br from-purple-50/80 via-violet-50/80 to-indigo-50/80",
    iconColor: "text-purple-600",
    borderColor: "border-purple-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(168,85,247,0.25)]",
  },
  {
    title: "CSS utility chaos",
    description: "Every team builds the same Tailwind config from scratch.",
    Icon: FaCode,
    badge: "Utilities",
    stat: "480 lines",
    statLabel: "of boilerplate",
    impact: "Global overrides",
    tag: "Collision risk",
    headerBg: "bg-linear-to-br from-slate-100 via-gray-200 to-zinc-200",
    cardBg: "bg-linear-to-br from-slate-50/80 via-gray-50/80 to-zinc-50/80",
    iconColor: "text-slate-600",
    borderColor: "border-slate-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(71,85,105,0.25)]",
  },
  {
    title: "Time wasted",
    description: "Hours burned before anyone ships a single screen.",
    Icon: FaClock,
    badge: "Time",
    stat: "18 hrs",
    statLabel: "lost monthly",
    impact: "Ship slower",
    tag: "Blocked teams",
    headerBg: "bg-linear-to-br from-orange-100 via-red-200 to-rose-200",
    cardBg: "bg-linear-to-br from-orange-50/80 via-red-50/80 to-rose-50/80",
    iconColor: "text-orange-600",
    borderColor: "border-orange-300/50",
    shadowColor: "shadow-[0_20px_60px_rgba(251,146,60,0.25)]",
  },
];

export default function ProblemSection() {
  return (
    <section id="problems" className="relative bg-linear-to-b from-gray-50 via-red-50/20 to-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.08),transparent_50%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.4em] text-red-600 font-body font-semibold">Bento Grid Issues</p>
          <h2 className="mt-6 text-3xl font-semibold font-heading sm:text-4xl text-gray-900">Why building UI still hurts?</h2>
          <p className="mt-4 text-lg text-gray-600 font-body">
            Developers waste hours doing the same repetitive UI setup again and again.
          </p>
        </div>

        <BentoGrid className="mt-14 gap-6 md:auto-rows-[24rem]">
          {issues.map((issue) => {
            const IconComponent = issue.Icon;
            return (
              <BentoGridItem
                key={issue.title}
                title={issue.title}
                description={
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700 font-body">{issue.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-700 font-semibold">{issue.impact}</span>
                      <span className="rounded-full border border-red-300 bg-red-100/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-red-700 backdrop-blur-sm">
                        {issue.tag}
                      </span>
                    </div>
                  </div>
                }
                header={
                  <div
                    className={cn(
                      "relative flex h-full min-h-40 flex-col justify-between overflow-hidden rounded-lg border-2 p-5 backdrop-blur-sm",
                      issue.headerBg,
                      issue.borderColor,
                    )}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent pointer-events-none" />
                    <div className="absolute -inset-4 bg-red-200/20 blur-2xl opacity-50" />
                    <div className="relative z-10 flex items-center justify-between">
                      <div className={cn("text-5xl drop-shadow-lg", issue.iconColor)}>
                        <IconComponent />
                      </div>
                      <span className="rounded-full border-2 border-white/40 bg-white/60 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-[0.3em] text-gray-800 font-body font-semibold shadow-lg">
                        {issue.badge}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <p className="text-4xl text-gray-900 font-heading font-bold drop-shadow-sm">{issue.stat}</p>
                      <p className="text-xs uppercase tracking-[0.4em] text-gray-700 font-body mt-1 font-semibold">{issue.statLabel}</p>
                    </div>
                  </div>
                }
                icon={
                  <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white/80 backdrop-blur-md text-xl shadow-lg", issue.borderColor, issue.iconColor)}>
                    <IconComponent />
                  </div>
                }
                className={cn(
                  "border-2 backdrop-blur-xl text-gray-900 font-body transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
                  issue.cardBg,
                  issue.borderColor,
                  issue.shadowColor,
                  issue.gridClass,
                )}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
