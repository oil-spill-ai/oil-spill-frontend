"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface TooltipProps {
  children: React.ReactNode;
  contentKey?: string;
  rawContent?: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  contentKey,
  rawContent,
  position = "top",
  delay = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const t = useTranslations("Tooltips");

  const handleToggle = () => {
    if (isVisible) {
      setIsVisible(false);
      if (timeoutId) clearTimeout(timeoutId);
    } else {
      setIsVisible(true);
      const id = setTimeout(() => setIsVisible(false), 3000); // Скрыть через 3 секунды
      setTimeoutId(id);
    }
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3 sm:mb-4 before:bottom-[-6px] sm:before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3 sm:mt-4 before:top-[-6px] sm:before:top-[-8px] before:left-1/2 before:-translate-x-1/2",
    left: "right-full top-1/2 -translate-y-1/2 mr-3 sm:mr-4 before:right-[-6px] sm:before:right-[-8px] before:top-1/2 before:-translate-y-1/2",
    right: "left-full top-1/2 -translate-y-1/2 ml-3 sm:ml-4 before:left-[-6px] sm:before:left-[-8px] before:top-1/2 before:-translate-y-1/2",
  };

  const content = contentKey ? t(contentKey) : rawContent || "";

  return (
    <div className="relative inline-block w-full h-full">
      <div onClick={handleToggle} className="w-full h-full">
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "top" ? -10 : 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`
              absolute z-30 w-[90%] sm:w-96 md:w-110 p-4 sm:p-6 text-sm sm:text-base
              bg-gradient-to-br from-gray-800 to-gray-900
              border-2 border-gray-600 rounded-xl shadow-2xl
              backdrop-blur-sm ${positionClasses[position]}
              before:content-[''] before:absolute before:w-3 sm:before:w-4 before:h-3 sm:before:h-4
              before:bg-gray-800 before:rotate-45 before:border-l-2
              before:border-t-2 before:border-gray-600
            `}
          >
            <p
              className="text-gray-100 leading-relaxed text-sm sm:text-base md:text-lg text-justify indent-6 sm:indent-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
