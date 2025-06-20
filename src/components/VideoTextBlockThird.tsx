"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const VideoTextBlockThird = () => {
    const t = useTranslations("VideoBlocks.thirdBlock");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="w-full bg-[#030411] text-white py-12 sm:py-20 px-2 sm:px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="container mx-auto max-w-7xl"
            >
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
                    <motion.div
                        variants={itemVariants}
                        className="w-full sm:w-[90%] lg:w-[600px] aspect-square bg-black rounded-xl overflow-hidden shadow-2xl"
                    >
                        <div className="relative h-full w-full">
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/videos/video_3.mp4" type="video/mp4" />
                                Your browser does not support video.
                            </video>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        className="w-full lg:flex-1 space-y-6 sm:space-y-8"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-400 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-[1.3] text-center lg:text-left"
                        >
                            {t("title")}
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-xl text-gray-300 leading-relaxed text-justify lg:text-left"
                        >
                            {t("description1")}
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-xl text-gray-300 leading-relaxed text-justify lg:text-left"
                        >
                            {t("description2")}
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-xl text-gray-300 leading-relaxed text-justify lg:text-left"
                        >
                            {t("description3")}
                        </motion.p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default VideoTextBlockThird;