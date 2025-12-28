"use client";

import { useRef } from "react";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LinkPreview } from "@/components/ui/link-preview";

const platforms = [
  {
    title: "StyloFront Themes",
    description: "Stunning, customizable themes and UI components. Build beautiful interfaces faster with our curated collection of premium design assets.",
    url: "https://theme.stylofront.com",
    gradient: "from-purple-600 via-violet-500 to-pink-500",
    bgGradient: "from-purple-600/10 via-violet-500/5 to-pink-500/10",
    accentColor: "text-purple-400",
    hoverAccent: "group-hover:text-purple-300",
    borderAccent: "group-hover:border-purple-500/50",
    glowColor: "group-hover:shadow-purple-500/20",
    badge: "Themes",
    icon: "🎨"
  },
  {
    title: "StyloFront Tools",
    description: "Comprehensive developer tools for modern web development. Speed up your workflow with performance-focused utilities and generators.",
    url: "https://tools.stylofront.com",
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
    bgGradient: "from-blue-600/10 via-cyan-500/5 to-teal-500/10",
    accentColor: "text-blue-400",
    hoverAccent: "group-hover:text-blue-300",
    borderAccent: "group-hover:border-blue-500/50",
    glowColor: "group-hover:shadow-blue-500/20",
    badge: "Tools",
    icon: "⚡"
  },
  {
    title: "StyloFront Scaffold",
    description: "Generate clean, modern project scaffolds in seconds. Client-side processing with version-agnostic dependency management.",
    url: "https://scaffold.stylofront.com",
    gradient: "from-emerald-600 via-green-500 to-lime-500",
    bgGradient: "from-emerald-600/10 via-green-500/5 to-lime-500/10",
    accentColor: "text-emerald-400",
    hoverAccent: "group-hover:text-emerald-300",
    borderAccent: "group-hover:border-emerald-500/50",
    glowColor: "group-hover:shadow-emerald-500/20",
    badge: "Scaffold",
    icon: "🚀"
  }
];

export default function PlatformSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Staggered entrance animation
    gsap.fromTo(".platform-card",
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1
      }
    );

    // Animate section header
    gsap.fromTo(".section-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .shimmer-border {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .floating-icon {
          animation: float 4s ease-in-out infinite;
        }
        
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradientMove 5s ease infinite;
        }
        
        .card-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.1) 50%, transparent 80%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .card-glow:hover::before {
          opacity: 1;
        }
      `}</style>

      <section ref={containerRef} id="platform" className="relative py-24 px-6 overflow-hidden">
        {/* Subtle background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="section-header text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Ecosystem</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading mb-4 tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text">
              The StyloFront Platform
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Everything you need to build faster, smarter, and more beautifully — all in one cohesive ecosystem.
            </p>
          </div>

          {/* Platform Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {platforms.map((platform, index) => (
              <LinkPreview
                key={platform.title}
                url={platform.url}
                width={300}
                height={180}
                quality={50}
                className="block"
              >
                <div
                  className={cn(
                    "platform-card card-glow group relative flex flex-col rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-500",
                    "hover:shadow-2xl hover:-translate-y-2",
                    platform.borderAccent,
                    platform.glowColor
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Header with animated gradient */}
                  <div className={cn(
                    "relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-br gradient-animate",
                    platform.bgGradient
                  )}>
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-xs font-bold font-heading uppercase tracking-wider",
                        platform.accentColor
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full bg-current")} />
                        {platform.badge}
                      </span>
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-background/80 backdrop-blur-md p-2.5 rounded-xl border border-border/50 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <FaExternalLinkAlt className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </div>

                    {/* Floating Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="floating-icon text-center group-hover:scale-110 transition-transform duration-500">
                        <div className="text-6xl md:text-7xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity">{platform.icon}</div>
                        <div className={cn(
                          "text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity",
                          platform.accentColor
                        )}>
                          Hover for preview
                        </div>
                      </div>
                    </div>

                    {/* Gradient line at bottom */}
                    <div className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity",
                      platform.gradient
                    )} />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-20 p-6 sm:p-8 flex flex-col flex-1">
                    <h3 className={cn(
                      "text-xl sm:text-2xl font-bold font-heading mb-3 transition-colors duration-300",
                      platform.hoverAccent
                    )}>
                      {platform.title}
                    </h3>

                    <p className="text-muted-foreground font-body text-sm sm:text-base leading-relaxed mb-6 flex-1">
                      {platform.description}
                    </p>

                    {/* CTA Button */}
                    <div className={cn(
                      "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold font-body text-sm transition-all duration-300",
                      "bg-gradient-to-r",
                      platform.gradient,
                      "text-white shadow-lg opacity-90 group-hover:opacity-100 group-hover:shadow-xl group-hover:-translate-y-0.5"
                    )}>
                      Explore {platform.badge}
                      <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-2xl",
                    platform.gradient
                  )} />
                </div>
              </LinkPreview>
            ))}
          </div>

          {/* Bottom accent */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="font-medium">Built for developers, designed for everyone</span>
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
