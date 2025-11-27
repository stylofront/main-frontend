'use client';

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'b3673d69-0a75-4567-8d2d-50786ba24382';
    
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState('success');
        setErrorMessage('');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-linear-to-b from-white via-blue-50/40 to-white py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl border-2 border-blue-200/50 bg-linear-to-br from-white via-blue-50/30 to-cyan-50/30 p-10 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20 blur-2xl opacity-50 rounded-2xl" />
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.4em] text-blue-600 font-body font-semibold">Contact</p>
              <h2 className="mt-6 text-3xl font-semibold sm:text-4xl font-heading text-gray-900">Got questions? Want early access?</h2>
              <p className="mt-4 text-gray-600 font-body">
                Tell us what you&apos;re building. We&apos;ll help you ship a gorgeous UI stack without the headache.
              </p>
              
              {formState === 'success' ? (
                <div className="mt-10 rounded-lg border-2 border-emerald-300 bg-linear-to-br from-emerald-50 to-green-50 p-6 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <FaCheckCircle className="text-2xl" />
                    <div>
                      <h3 className="font-semibold font-heading">Message sent successfully!</h3>
                      <p className="text-sm font-body mt-1">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-4 text-sm text-emerald-700 hover:text-emerald-800 font-body underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                  {formState === 'error' && errorMessage && (
                    <div className="rounded-lg border-2 border-red-300 bg-linear-to-br from-red-50 to-rose-50 p-4 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-red-700">
                        <FaTimesCircle />
                        <span className="text-sm font-body">{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  <label className="block">
                    <span className="text-sm text-gray-700 font-body font-medium">Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="mt-2 w-full rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-body transition shadow-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-700 font-body font-medium">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="mt-2 w-full rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-body transition shadow-sm"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-700 font-body font-medium">Message</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us what you need..."
                      className="mt-2 w-full rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-body transition resize-none shadow-sm"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary to-secondary px-6 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/40 transition hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed font-body"
                  >
                    {formState === 'loading' ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border-2 border-cyan-200/50 bg-linear-to-br from-blue-50 via-cyan-50 to-teal-50 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl" />
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/60 backdrop-blur-md px-4 py-1 text-xs uppercase tracking-[0.3em] text-blue-700 font-body shadow-lg font-semibold">
                Support
              </span>
              <h3 className="mt-6 text-2xl font-semibold font-heading text-gray-900">We reply within 24 hours.</h3>
              <p className="mt-4 text-sm text-gray-600 font-body">
                Send us a note — a real human StyloFront engineer helps you wire the perfect UI pipeline.
              </p>
              <div className="mt-8 space-y-4 text-sm font-body">
                <p className="flex items-center gap-3 text-gray-700">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" /> Live chat in-app
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  <span className="h-3 w-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" /> Priority email support
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  <span className="h-3 w-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50" /> Dedicated onboarding
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
