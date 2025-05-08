"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
                                             children,
                                             content,
                                             position = "top",
                                             delay = 300
                                         }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        const id = setTimeout(() => setIsHovered(true), delay);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsHovered(false);
    };

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-4 before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-4 before:top-[-8px] before:left-1/2 before:-translate-x-1/2",
        left: "right-full top-1/2 -translate-y-1/2 mr-4 before:right-[-8px] before:top-1/2 before:-translate-y-1/2",
        right: "left-full top-1/2 -translate-y-1/2 ml-4 before:left-[-8px] before:top-1/2 before:-translate-y-1/2"
    };

    return (
        <div className="relative inline-block w-full h-full">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full"
            >
                {children}
            </div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: position === "top" ? -10 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: position === "top" ? -10 : 10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`
              absolute z-30 w-96 p-6 text-base
              bg-gradient-to-br from-gray-800 to-gray-900
              border-2 border-gray-600 rounded-xl shadow-2xl
              backdrop-blur-sm ${positionClasses[position]}
              before:content-[''] before:absolute before:w-4 before:h-4
              before:bg-gray-800 before:rotate-45 before:border-l-2
              before:border-t-2 before:border-gray-600
            `}
                    >
                        <p
                            className="text-gray-100 leading-relaxed text-lg text-justify indent-8"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;