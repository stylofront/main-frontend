"use client";

import { useState, useRef } from "react";
import { FaPaperPlane, FaLightbulb, FaCheckCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        email: "",
        idea: "",
        message: ""
    });

    useGSAP(() => {
        gsap.from(".contact-header", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".contact-header",
                start: "top 90%",
            }
        });

        gsap.from(".contact-form", {
            y: 40,
            opacity: 0,
            scale: 0.98,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".contact-form",
                start: "top 85%",
            }
        });
    }, { scope: containerRef });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        const data = new FormData();
        data.append("access_key", "b3673d69-0a75-4567-8d2d-50786ba24382");
        data.append("email", formData.email);
        data.append("idea", formData.idea);
        data.append("message", formData.message);
        data.append("subject", "New Idea Submission - StyloFront");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data,
            });

            const res = await response.json();
            if (res.success) {
                setStatus("success");
                setFormData({ email: "", idea: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (err) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section ref={containerRef} id="contact" className="py-24 px-6 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />

            <div className="container mx-auto max-w-2xl relative z-10">
                <div className="contact-header text-center mb-12">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                        <FaLightbulb className="w-4 h-4 animate-pulse" />
                        <span className="text-sm font-bold">Share Your Vision</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-extrabold font-heading mb-3 text-foreground tracking-tight">
                        Drop Your Idea
                    </h2>
                    <p className="text-muted-foreground font-body text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                        Have a feature request or brilliant idea? We're all ears. Drop it in the box below and help shape the future of StyloFront.
                    </p>
                </div>

                <div className="contact-form relative">
                    {/* Idea Drop Box */}
                    <div className="relative bg-card border-2 border-dashed border-border rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/50">
                        {/* Top decorative element */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-4 py-1.5 rounded-full border-2 border-border">
                            <FaLightbulb className="w-5 h-5 text-primary" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-bold font-heading text-muted-foreground uppercase tracking-wide ml-1">
                                    Your Email
                                </label>
                                <input
                                    id="email"
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-3 rounded-xl bg-secondary/30 border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body text-sm placeholder:text-muted-foreground/50"
                                    placeholder="your@email.com"
                                />
                            </div>

                            {/* Idea Category Field */}
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-xs font-bold font-heading text-muted-foreground uppercase tracking-wide ml-1">
                                    Idea Category (Optional)
                                </label>
                                <input
                                    id="category"
                                    type="text"
                                    value={formData.idea}
                                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                                    className="w-full px-5 py-3 rounded-xl bg-secondary/30 border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body text-sm placeholder:text-muted-foreground/50"
                                    placeholder="e.g., New Tool, UI Component, Feature Request"
                                />
                            </div>

                            {/* Message Field with enhanced styling */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-bold font-heading text-muted-foreground uppercase tracking-wide ml-1">
                                    Your Idea
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-5 py-3 rounded-xl bg-secondary/30 border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body text-sm resize-none placeholder:text-muted-foreground/50"
                                        placeholder="Tell us about your idea in detail... What problem does it solve? How would it help?"
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/50">
                                        {formData.message.length} characters
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={status === "sending"}
                                type="submit"
                                className={cn(
                                    "w-full py-3.5 rounded-xl font-bold font-heading text-base transition-all flex items-center justify-center gap-2.5 shadow-lg",
                                    status === "success"
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : status === "sending"
                                            ? "bg-primary/70 text-primary-foreground cursor-not-allowed"
                                            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98]"
                                )}
                            >
                                {status === "sending" ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <FaCheckCircle className="w-4 h-4" />
                                        Submitted Successfully!
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="w-4 h-4" />
                                        Drop Your Idea
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {status === "error" && (
                                <div className="text-center p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                    <p className="text-destructive text-sm font-medium">Something went wrong. Please try again.</p>
                                </div>
                            )}
                            {status === "success" && (
                                <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">Thank you! We'll review your idea soon. 🎉</p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Bottom decorative text */}
                    <p className="text-center text-xs text-muted-foreground mt-6">
                        Your ideas help us build better products. Thank you for contributing!
                    </p>
                </div>
            </div>
        </section>
    );
}
