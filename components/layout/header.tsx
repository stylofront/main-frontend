'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#problems", label: "Problems" },
    { href: "#solutions", label: "Solutions" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/65 backdrop-blur-xl border-b right-2 left-2 sm:right-6 sm:left-6 max-w-7xl mx-auto mt-2 rounded-lg border-gray-200 shadow-lg shadow-gray-900/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3 justify-between">
          {/* Logo and Brand */}
          <Link href="#" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 transition-transform group-hover:scale-110">
              {isScrolled ? (
                <Image
                  src="/logo2.png"
                  alt="StyloFront Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                  priority
                  loading="eager"
                />
              ) : (
                <Image
                  src="/ogimage.png"
                  alt="StyloFront Logo"
                  width={40}
                  height={40}
                  loading="eager"
                  className="object-contain rounded-full"
                  priority
                />
              )}
            </div>
            <span className={`text-xl sm:text-2xl font-heading font-bold transition-colors ${
              isScrolled
                ? 'bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'
                : 'text-white'
            }`}>
              StyloFront
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body font-medium transition-colors relative group ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                  isScrolled
                    ? 'bg-linear-to-r from-blue-600 to-cyan-600'
                    : 'bg-white'
                }`} />
              </Link>
            ))}
            <Link
              href="#contact"
              className="px-5 lg:px-6 py-2 rounded-lg bg-linear-to-r from-primary to-primary/30 text-white font-body font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-white/90 hover:text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t pt-4 transition-colors ${
            isScrolled
              ? 'border-gray-200'
              : 'border-white/20'
          }`}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-body font-medium transition-colors py-2 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-3 rounded-lg bg-linear-to-r from-primary to-primary/30 text-white font-body font-semibold shadow-lg shadow-blue-500/30 text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
