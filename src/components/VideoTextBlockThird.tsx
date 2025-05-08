"use client";

import React from "react";
import { motion } from "framer-motion";

const VideoTextBlockFirst = () => {
    const content = {
        title: "Our solution to the problem",
        description: [
            "We propose using artificial intelligence on satellites to detect oil spills and monitor the environment.",
            "Satellites orbiting the Earth continuously scan vast areas of water bodies, taking high-resolution images.",
            "The neural network Oil Spill AI processes these images in real time, detecting even the smallest oil spots that may pose a threat to marine ecosystems."
        ],
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
        <section className="w-full bg-[#030411] text-white py-20 px-4 sm:px-6">
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
                        className="w-full lg:flex-1 space-y-8"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-lime-400 to-emerald-700 bg-clip-text text-transparent mb-6 leading-[1.3]"
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