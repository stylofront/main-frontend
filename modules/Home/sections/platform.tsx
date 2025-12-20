"use client";

import { useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const platforms = [
  {
    title: "StyloFront Themes",
    description: "Stunning, customizable themes and UI components. Build beautiful interfaces faster with our curated collection of premium design assets.",
    url: "https://theme.stylofront.com",
    gradient: "from-purple-600/20 to-pink-500/10",
    accentColor: "text-purple-400",
    badge: "Themes"
  },
  {
    title: "StyloFront Tools",
    description: "Comprehensive developer tools for modern web development. Speed up your workflow with performance-focused utilities and generators.",
    url: "https://tools.stylofront.com",
    gradient: "from-blue-600/20 to-cyan-500/10",
    accentColor: "text-blue-400",
    badge: "Tools"
  }
];

export default function PlatformSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Simpler animation without scroll trigger issues
    gsap.fromTo(".platform-card",
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="platform" className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold font-heading mb-3 tracking-tight">Our Platform</h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Everything you need to build faster and better, all in one place.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {platforms.map((platform) => (
            <a
              key={platform.title}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-card group relative flex flex-col rounded-xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl dark:hover:shadow-primary/5 hover:-translate-y-1.5"
            >
              {/* Card Header with gradient */}
              <div className={cn("relative h-[240px] sm:h-[280px] w-full overflow-hidden bg-gradient-to-br", platform.gradient)}>
                <div className="absolute inset-0 z-10 bg-grid-white/[0.05] [mask-image:radial-gradient(white,transparent)]" />

                {/* Preview Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 rounded-full bg-background/40 backdrop-blur-md border border-white/10 text-xs font-bold font-heading uppercase tracking-widest text-foreground">
                    {platform.badge}
                  </span>
                </div>

                {/* External Link Indicator */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-background/95 backdrop-blur-md p-2.5 rounded-xl border border-border shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <FaExternalLinkAlt className="w-3.5 h-3.5 text-primary" />
                  </div>
                </div>

                {/* Icon Display */}
                <div className="absolute inset-0 flex items-center justify-center p-8 z-0">
                  <div className="text-center group-hover:scale-110 transition-transform duration-500">
                    <div className={cn("text-5xl md:text-6xl font-bold mb-2", platform.accentColor)}>
                      {platform.badge}
                    </div>
                    <div className="text-xs text-white/60">Click to visit →</div>
                  </div>
                </div>
              </div>

              <div className="relative z-20 p-8 sm:p-10 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                  {platform.title}
                </h3>

                <p className="text-muted-foreground font-body text-sm sm:text-base leading-relaxed mb-6 flex-1">
                  {platform.description}
                </p>

                <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-bold font-body text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:shadow-lg group-hover:shadow-primary/10">
                  Explore Platform
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
