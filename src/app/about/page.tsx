"use client";

import { motion } from "framer-motion";
import { FaOilCan, FaWater, FaRobot, FaChartLine } from "react-icons/fa";
import React, { useState } from "react";
import UploadModal from "../../components/UploadModal";
import { handleUpload } from "../api/uploadService";

const AboutPage = () => {
    //Анимационные параметры
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-20">
            {/* Hero секция */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="text-center"
                >
                    <motion.h1
                        variants={item}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
                    >
                        Oil slick detection technology
                    </motion.h1>
                    <motion.p
                        variants={item}
                        className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100"
                    >
                        An innovative solution for monitoring water surfaces using artificial intelligence
                    </motion.p>
                </motion.div>
            </section>

            {/* Как это работает */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 text-center"
                >
                    How our system works?
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaWater className="text-4xl mb-4 text-blue-300" />,
                            title: "Water surface analysis",
                            text: "Scanning of satellite and aerial photographs in various spectral ranges",
                        },
                        {
                            icon: <FaRobot className="text-4xl mb-4 text-emerald-300" />,
                            title: "AI processing",
                            text: "The neural network analyzes images with an accuracy of 98.7%",
                        },
                        {
                            icon: <FaOilCan className="text-4xl mb-4 text-amber-300" />,
                            title: "Spot detection",
                            text: "Automatic detection and classification of oil pollution",
                        },
                        {
                            icon: <FaChartLine className="text-4xl mb-4 text-purple-300" />,
                            title: "Visualization",
                            text: "Generating reports with allocation of polluted zones",
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-400 transition-all"
                        >
                            {feature.icon}
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Детали технологии */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gray-800/30 p-8 md:p-10 rounded-2xl border border-gray-700 backdrop-blur-sm"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-300">
                        Technology Details
                    </h2>
                    <div className="space-y-4 text-lg text-gray-200">
                        <p>
                            Our neural network uses a modified U-Net architecture with attention
                            to key areas, allowing accurate segmentation of oil spills even on
                            heterogeneous water surfaces.
                        </p>
                        <p>
                            The algorithm highlights pollution with colored contours (default -
                            <span className="text-red-400"> red</span> for fresh spills and
                            <span className="text-amber-400"> orange</span> for dispersed ones),
                            indicating the area in square kilometers.
                        </p>
                        <p>
                            The system accounts for sea waves, sun glares and other interference,
                            minimizing false positives.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Are you ready to try our technology?
                    </h2>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                        Upload Archive
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