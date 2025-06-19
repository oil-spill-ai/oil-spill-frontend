"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaOilCan, FaWater, FaRobot, FaChartLine } from "react-icons/fa";
import UploadModal from "@/components/UploadModal";
import Tooltip from "@/components/Tooltip";
import { handleUpload } from "../../api/uploadService";
import { useTranslations } from "next-intl";

const AboutPage = () => {
    const t = useTranslations("AboutPage");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const features = [
        {
            key: "waterAnalysis",
            icon: <FaWater className="text-4xl mb-4 text-blue-300" />,
            title: t("features.analysis.title"),
            text: t("features.analysis.text")
        },
        {
            key: "aiProcessing",
            icon: <FaRobot className="text-4xl mb-4 text-emerald-300" />,
            title: t("features.ai.title"),
            text: t("features.ai.text")
        },
        {
            key: "spotDetection",
            icon: <FaOilCan className="text-4xl mb-4 text-amber-300" />,
            title: t("features.detection.title"),
            text: t("features.detection.text")
        },
        {
            key: "visualization",
            icon: <FaChartLine className="text-4xl mb-4 text-purple-300" />,
            title: t("features.visualization.title"),
            text: t("features.visualization.text")
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-20">
            {/* Hero секция */}
            <section className="py-20 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="text-center"
                >
                    <motion.h1
                        variants={item}
                        className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 leading-relaxed"
                    >
                        {t("heroTitle")}
                    </motion.h1>
                    <motion.p
                        variants={item}
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl max-w-4xl mx-auto text-blue-100 font-bold mt-4 sm:mt-6"
                    >
                        {t("heroSubtitle")}
                    </motion.p>
                </motion.div>
            </section>

            {/* Как это работает */}
            <section className="py-12 sm:py-20 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 leading-relaxed"
                >
                    {t("howItWorks")}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <Tooltip key={index} contentKey={feature.key}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`
                                    bg-gray-800/40 p-8 rounded-2xl 
                                    backdrop-blur-sm border-2 border-gray-600 
                                    hover:border-blue-400/50 transition-all
                                    h-full flex flex-col items-center text-center
                                `}
                            >
                                <div className="mb-6 text-5xl">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                <p className="text-gray-300 text-lg flex-grow">{feature.text}</p>
                            </motion.div>
                        </Tooltip>
                    ))}
                </div>
            </section>

            {/* Детали технологии */}
            <section className="py-16 sm:py-24 px-2 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gray-800/30 p-6 sm:p-10 rounded-2xl border-2 border-gray-600 backdrop-blur-sm"
                >
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-blue-300">
                        {t("technologyTitle")}
                    </h2>
                    <div className="space-y-4 sm:space-y-6 text-base sm:text-xl text-gray-200 leading-relaxed text-justify">
                        <p>{t("technologyText1")}</p>
                        <p>{t("technologyText2")}</p>
                        <p>{t("technologyText3")}</p>
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-12 sm:py-20 px-2 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                        {t("ctaTitle")}
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full text-base sm:text-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-emerald-500/20"
                    >
                        {t("uploadButton")}
                    </button>
                </motion.div>
            </section>
            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleUpload}
            />
        </div>
    );
};

export default AboutPage;