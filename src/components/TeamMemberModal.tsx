"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";

interface TeamMemberModalProps {
    children: React.ReactNode;
    contentKey?: string;
    nameKey?: string;
    isOpen: boolean;
    onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
                                                             children,
                                                             contentKey,
                                                             nameKey,
                                                             isOpen,
                                                             onClose,
                                                         }) => {
    const t = useTranslations();
    const content = contentKey ? t.raw(contentKey) : "";
    const localizedName = nameKey ? t(nameKey) : "";

    return (
        <>
            {children}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black"
                            onClick={onClose}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative z-50 w-full max-w-2xl p-8 text-base bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl shadow-2xl backdrop-blur-sm mx-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            {localizedName && (
                                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                                    {localizedName}
                                </h3>
                            )}
                            <div
                                className="text-gray-100 leading-relaxed text-lg text-justify [&>p]:indent-8 [&>p]:mb-2"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TeamMemberModal;