'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Smooth entrance animation
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Logo and nav items stagger
    gsap.from(".header-item", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)",
      delay: 0.3
    });
  }, { scope: headerRef });

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#platform", label: "Platform" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/60 backdrop-blur-2xl border-b border-border/40 shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="header-item flex items-center gap-2.5 group shrink-0">
            <div className="relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <Image
                src="/logo2.png"
                alt="StyloFront Logo"
                width={36}
                height={36}
                className="object-cover transition-all"
                priority
              />
            </div>
            <span className="text-xl font-heading font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all">
              StyloFront
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="header-item relative text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border/50" />

            {/* Actions */}
            <div className="header-item flex items-center gap-3">
              <ThemeToggle />
              {/* <Link
                href="https://auth.stylofront.site"
                className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Log In
              </Link> */}
            </div>
          </div>

          {/* Mobile Actions */}
          {/* <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <Link
              href="https://auth.stylofront.site"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-md"
            >
              Login
            </Link>
          </div> */}
        </div>

        {/* Mobile Navigation (Bottom positioned on scroll) */}
        {isScrolled && (
          <div className="md:hidden mt-3 pb-2 flex items-center justify-center gap-6 border-t border-border/40 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
