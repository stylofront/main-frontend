"use client";

import { useId, useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const id = useId();
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const [pulsingSquares, setPulsingSquares] = useState<Set<number>>(new Set());

  // Memoize total squares calculation
  const totalSquares = useMemo(() => horizontal * vertical, [horizontal, vertical]);

  // Detect if mobile for reduced animations
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 640;
  }, []);

  // Create random pulsing effect for ambient animation (optimized)
  useEffect(() => {
    // Disable pulsing on mobile for better performance
    // if (isMobile) {
    //   setPulsingSquares(new Set());
    //   return;
    // }

    const activateRandomSquares = () => {
      const newPulsing = new Set<number>();
      // Reduced from 8% to 5% for better performance
      const count = Math.floor(totalSquares * 0.05);

      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * totalSquares);
        newPulsing.add(randomIndex);
      }

      setPulsingSquares(newPulsing);
    };

    activateRandomSquares();
    // Increased interval from 3s to 4s for less frequent updates
    const interval = setInterval(activateRandomSquares, 4000);

    return () => clearInterval(interval);
  }, [totalSquares, isMobile]);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      viewBox={`0 0 ${width * horizontal} ${height * vertical}`}
      className={cn(
        "absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="hsl(var(--primary) / 0.12)"
            strokeWidth="1"
            strokeDasharray="0"
          />
        </pattern>

        {/* Gradient for fade effect */}
        <radialGradient id={`${id}-fade`}>
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base grid pattern */}
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

      {/* Animated squares overlay - only render visible squares */}
      <svg x="-1" y="-1" className="overflow-visible">
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const isPulsing = pulsingSquares.has(index);
          const isHovered = hoveredSquare === index;

          // Only render if pulsing or hovered for better performance
          if (!isPulsing && !isHovered) return null;

          const x = (index % horizontal) * width;
          const y = Math.floor(index / horizontal) * height;

          return (
            <rect
              key={index}
              x={x + 1}
              y={y + 1}
              width={width - 1}
              height={height - 1}
              fill="hsl(var(--primary))"
              strokeWidth="0"
              className={cn(
                "transition-opacity duration-500 ease-in-out",
                isHovered && "opacity-100",
                isPulsing && !isHovered && "opacity-[0.15] animate-pulse",
                squaresClassName,
              )}
              style={{
                animationDuration: isPulsing ? `${2.5 + Math.random() * 1.5}s` : undefined,
                willChange: isPulsing || isHovered ? 'opacity' : 'auto',
              }}
            />
          );
        })}
      </svg>

      {/* Invisible hover detection layer */}
      <svg x="-1" y="-1" className="overflow-visible pointer-events-auto">
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const x = (index % horizontal) * width;
          const y = Math.floor(index / horizontal) * height;

          return (
            <rect
              key={`hover-${index}`}
              x={x + 1}
              y={y + 1}
              width={width - 1}
              height={height - 1}
              fill="transparent"
              strokeWidth="0"
              onMouseEnter={() => setHoveredSquare(index)}
              onMouseLeave={() => setHoveredSquare(null)}
            />
          );
        })}
      </svg>
    </svg>
  );
}
