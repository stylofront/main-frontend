'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/60 backdrop-blur-2xl border-b border-border/40 shadow-lg py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="header-item flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Image
                  src="/logo2.png"
                  alt="StyloFront Logo"
                  width={32}
                  height={32}
                  className="sm:w-9 sm:h-9 object-cover transition-all"
                  priority
                />
              </div>
              <span className="text-lg sm:text-xl font-heading font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all">
                StyloFront
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Nav Links */}
              <div className="flex items-center gap-6 lg:gap-8">
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

              {/* Theme Toggle */}
              <div className="header-item">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="relative p-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 group"
                aria-label="Open menu"
              >
                <HiOutlineMenuAlt3 className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-[100] md:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between py-2 px-7 pr-3 border-b border-border">
            <h2 className="text-lg font-heading font-bold">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-2 px-3 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "block px-4 py-2.5 rounded-lg text-base font-semibold",
                  "text-muted-foreground hover:text-foreground",
                  "hover:bg-accent transition-all duration-200",
                  "border border-transparent hover:border-border"
                )}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2024 StyloFront. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
