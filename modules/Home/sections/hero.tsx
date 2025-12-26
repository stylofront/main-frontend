'use client';

import { useRef, useState, useEffect } from "react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Ensure audio plays on page load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
        setIsPlaying(false);
      });
    }
  }, []);

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

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes musicPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes visualizerBar {
          0%, 100% { height: 10px; }
          50% { height: 20px; }
        }
        
        .visualizer-bar:not(.animating) {
          height: 10px !important;
        }

        @keyframes floatNote {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px) rotate(15deg);
            opacity: 0;
          }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3); }
          50% { box-shadow: 0 0 40px rgba(var(--primary-rgb), 0.6), 0 0 60px rgba(var(--primary-rgb), 0.3); }
        }

        .music-container {
          animation: ${isPlaying ? 'musicPulse 2s ease-in-out infinite' : 'none'};
        }

        .visualizer-bar.animating {
          animation: visualizerBar 0.6s ease-in-out infinite;
        }

        .floating-note {
          animation: floatNote 3s ease-in-out infinite;
        }

        .glow-effect {
          animation: ${isPlaying ? 'glowPulse 2s ease-in-out infinite' : 'none'};
        }
      `}</style>

      <section ref={containerRef} id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background pt-24 pb-16 px-6">
        {/* Mobile: 12x12, Tablet: 18x18, Desktop: 24x24 */}
        <div className="block sm:hidden">
          <InteractiveGridPattern
            squares={[12, 24]}
            className={cn(
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-50%] h-[200%] skew-y-12",
            )}
          />
        </div>
        <div className="hidden sm:block lg:hidden">
          <InteractiveGridPattern
            squares={[18, 18]}
            className={cn(
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-50%] h-[200%] skew-y-12",
            )}
          />
        </div>
        <div className="hidden lg:block">
          <InteractiveGridPattern
            squares={[24, 24]}
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-50%] h-[200%] skew-y-12",
            )}
          />
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} autoPlay loop>
          <source src="/Ship It With StyloFront.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Enhanced Music Control Button with Visualizer */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-20 music-container">
          {/* Floating Music Notes - Hidden on mobile, visible on tablet+ */}
          {isPlaying && (
            <div className="absolute -top-4 -left-4 pointer-events-none block">
              <div className="floating-note text-primary text-xl" style={{ animationDelay: '0s' }}>♪</div>
              <div className="floating-note text-primary text-lg absolute left-8" style={{ animationDelay: '0.5s' }}>♫</div>
              <div className="floating-note text-primary text-base absolute left-4 top-2" style={{ animationDelay: '1s' }}>♪</div>
            </div>
          )}

          {/* Main Button with Glow */}
          <button
            onClick={toggleAudio}
            className={cn(
              "relative px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 backdrop-blur-md border-2 border-primary/30 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 sm:gap-3 group hover:scale-105 active:scale-95 shadow-2xl",
              isPlaying && "glow-effect"
            )}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {/* Audio Visualizer Bars */}
            <div className="flex items-end gap-0.5 h-5">
              <div
                className={cn("visualizer-bar w-0.5 sm:w-1 bg-primary rounded-full transition-all duration-300", isPlaying && "animating")}
                style={{
                  animationDelay: '0s',
                  height: isPlaying ? undefined : '12px'
                }}
              />
              <div
                className={cn("visualizer-bar w-0.5 sm:w-1 bg-primary rounded-full transition-all duration-300", isPlaying && "animating")}
                style={{
                  animationDelay: '0.1s',
                  height: isPlaying ? undefined : '18px'
                }}
              />
              <div
                className={cn("visualizer-bar w-0.5 sm:w-1 bg-primary rounded-full transition-all duration-300", isPlaying && "animating")}
                style={{
                  animationDelay: '0.2s',
                  height: isPlaying ? undefined : '8px'
                }}
              />
              <div
                className={cn("visualizer-bar w-0.5 sm:w-1 bg-primary rounded-full transition-all duration-300", isPlaying && "animating")}
                style={{
                  animationDelay: '0.15s',
                  height: isPlaying ? undefined : '14px'
                }}
              />
            </div>

            {/* Play/Pause Icon */}
            <div className="relative">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] text-primary transition-transform group-hover:scale-110">
                  <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                  <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] text-primary transition-transform group-hover:scale-110">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </div>

            {/* Text Label - Hidden on mobile, visible on tablet+ */}
            <span className="hidden sm:inline text-primary font-bold tracking-wide">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </span>

            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </button>
        </div>

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
    </>
  );
}
