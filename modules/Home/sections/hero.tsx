'use client';

import { motion } from "framer-motion";
import Link from "next/link";

const floatingTags = [
  "⚡ Lightning Fast CDN",
  "🎨 Themes Auto-Generated",
  "🅰️ Fonts Bundled",
  "🖼 Asset Delivery",
];

const codePreview = `
<script src="https://cdn.stylofront.site/[USER_NIKENAME]/v1/[PROJECT_NAME].js"></script>
`;

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary via-secondary to-accent">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] opacity-10 mix-blend-screen" />
      </div>

      <div className="relative mx-auto flex  max-w-7xl flex-col items-center gap-16 px-6 pt-32 pb-24 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <span className="inline-flex items-center  gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full  bg-emerald-400 font-body" />
            Trusted CDN Toolkit
          </span>
          <h1 className="mt-8 text-[28px] font-semibold tracking-tight font-heading text-white sm:text-5xl ">
            Build Stunning UI — With Just One CDN Link.
          </h1>
          <p className="mt-6 text-base font-body text-white/70 sm:text-lg">
            StyloFront bundles your colors, fonts, icons, animations & assets into one super-fast CDN link.
          </p>
          <div className="mt-10 flex max-lg:justify-center flex-col gap-4 sm:flex-row">
            <Link
              className="group inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-primary to-primary/30 px-8 py-4 text-base font-medium text-white font-body shadow-[0_20px_60px_rgba(16,185,129,0.35)] transition hover:translate-y-0.5"
              href="auth.stylofront.site"
            >
              Start Creating →
            </Link>
            <a
              className="inline-flex items-center font-body justify-center rounded-2xl border border-gray-300 px-8 py-4 text-base font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              href="#demo"
            >
              Contect us
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex w-full flex-1 justify-center"
        >
          <div className="relative w-full max-w-xl">
            <div className="absolute -inset-6 rounded-lg bg-linear-to-r from-cyan-500/30 via-emerald-500/40 to-blue-500/30 blur-3xl shadow-2xl  shadow-blue-200" />
            <div className="relative rounded-lg border border-white/10 bg-white/5 p-4 shadow-[0_40px_120px_rgba(14,165,233,0.35)] backdrop-blur-xl">
              <div className="mb-4 font-bo flex items-center justify-between text-xs text-white/60">
                <span>index.tsx</span>
                <span>Live CDN Preview</span>
              </div>
              <div className="rounded-lg bg-black/60 p-6 font-body text-sm leading-relaxed text-emerald-100 shadow-inner shadow-black/40">
                {codePreview}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  { title: "Theme Tokens", value: "48+" },
                  { title: "Icon Packs", value: "1200+" },
                  { title: "Animations", value: "80+" },
                  { title: "Avg. Latency", value: "32ms" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/10 bg-black/30 p-4 text-center text-white/80"
                  >
                    <p className="text-3xl font-semibold font-heading text-white">{item.value}</p>
                    <p className="text-xs uppercase tracking-[0.2em] font-body text-gray-300">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {floatingTags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6, type: "spring" }}
                className="absolute inline-flex text-nowrap rounded-lg border font-body border-gray-300 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur"
                style={{
                  top: `${15 + index * 22}%`,
                  right: index % 2 === 0 ? "-10%" : "80%",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center pb-10">
        <div className="flex flex-col items-center gap-3 font-body text-white/60">
          <div className="h-16 w-10 rounded-full border border-gray-300 p-2">
            <span className="block h-full w-full rounded-full bg-gray-300 animate-bounce" />
          </div>
          <span className="text-xs tracking-[0.4em] uppercase font-body text-gray-300">Scroll</span>
        </div>
      </div>
    </section>
  );
}
