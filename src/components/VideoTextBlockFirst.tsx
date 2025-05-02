"use client";

import React from "react";
import { motion } from "framer-motion";

const VideoTextBlockFirst = () => {
    const content = {
        title: "Oil transportation today",
        description: [
            "Maritime transportation accounts for a significant portion of global oil shipments, with over 60% of crude oil and refined products transported by sea.",
            "This dominance highlights the critical role of shipping in the energy sector, as it enables countries to access vital resources efficiently and cost-effectively."
        ],
        buttonText: "Узнать больше",
        videoSrc: "/videos/tanker1.mp4"
    };

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
        <section className="w-full bg-gray-950 text-white py-20 px-4 sm:px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="container mx-auto max-w-7xl"
            >
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-[600px] aspect-square bg-black rounded-xl overflow-hidden shadow-2xl"
                    >
                        <div className="relative h-full w-full">
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src={content.videoSrc} type="video/mp4" />
                                Your browser does not support video.
                            </video>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="w-full lg:flex-1 space-y-6"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                        >
                            {content.title}
                        </motion.h2>

                        {content.description.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                variants={itemVariants}
                                className="text-xl text-gray-300 leading-relaxed"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default VideoTextBlockFirst;