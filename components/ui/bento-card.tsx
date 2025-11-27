'use client';

import { ReactNode } from "react";
import { motion } from "framer-motion";

type BentoCardProps = {
  title: string;
  description: string;
  icon?: string;
  accent?: "problem" | "solution";
  delay?: number;
  children?: ReactNode;
};

const accentStyles: Record<NonNullable<BentoCardProps["accent"]>, string> = {
  problem:
    "bg-linear-to-br from-[#2b0b0b]/90 via-[#3b1a15]/70 to-[#120404]/80 border-red-500/20 shadow-[0_20px_80px_rgba(255,70,70,0.25)]",
  solution:
    "bg-linear-to-br from-[#042f2e]/90 via-[#063b4c]/70 to-[#020f1a]/80 border-emerald-400/30 shadow-[0_20px_80px_rgba(16,185,129,0.25)]",
};

export default function BentoCard({
  title,
  description,
  icon,
  accent = "solution",
  delay = 0,
  children,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={`relative overflow-hidden rounded-3xl border p-6 text-white backdrop-blur-md ${accentStyles[accent]}`}
    >
      {icon && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-lg">
          {icon}
        </span>
      )}
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </motion.div>
  );
}

