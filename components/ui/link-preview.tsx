"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";
import Microlink from "@microlink/react";

export const LinkPreview = ({
    children,
    url,
    className,
    width = 400,
    height = 250,
}: {
    children: React.ReactNode;
    url: string;
    className?: string;
    width?: number;
    height?: number;
}) => {
    let [isOpen, setOpen] = useState(false);

    let springConfig = { stiffness: 100, damping: 15 };
    let x = useMotionValue(0);

    let translateX = useSpring(x, springConfig);

    let handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const targetRect = event.currentTarget.getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = eventOffsetX - targetRect.width / 2;

        x.set(offsetFromCenter);
    };

    return (
        <a
            className={className}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
                setOpen(true);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setOpen(false);
            }}
        >
            {children}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.6 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 260,
                                damping: 15,
                            },
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.6 }}
                        style={{
                            translateX: translateX,
                            rotate: 0,
                            whiteSpace: "nowrap",
                        }}
                        className="absolute -top-72 left-1/2 flex -translate-x-1/2 flex-col items-start justify-start rounded-xl bg-card shadow-2xl border border-border z-50 overflow-hidden"
                    >
                        <div className="w-full" style={{ width: width }}>
                            <Microlink
                                url={url}
                                size="large"
                                media={['screenshot', 'logo']}
                                screenshot={{
                                    overlay: {
                                        browser: 'dark',
                                        background: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    fontFamily: 'inherit',
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </a>
    );
};
