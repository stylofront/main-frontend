'use client';

import { useRef } from "react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-title span", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
    })
      .from(".hero-description", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(".hero-btns", {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-24 pb-16 px-6">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-50%] h-[200%] skew-y-12",
        )}
      />

      <div className="relative z-10 container max-w-4xl mx-auto text-center">
        <div ref={textRef}>
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground mb-5 leading-[1.1] text-balance">
            <span className="block">A Smarter Way to Build the</span>

            <span className="text-primary animate-gradient bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent block">
              Front-End
            </span>
          </h1>
          <p className="hero-description text-base sm:text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-8 leading-relaxed">
            StyloFront is a modular front-end platform focused on simplifying workflows, reducing setup time, and accelerating modern web development.
          </p>

          <div className="hero-btns flex flex-wrap gap-4 justify-center">
            <button className="px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95">
              Start Building
            </button>
            <button className="px-7 py-3.5 bg-secondary text-secondary-foreground rounded-xl font-bold text-base hover:bg-secondary/80 border border-border transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
