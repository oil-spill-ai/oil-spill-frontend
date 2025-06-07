"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const VideoTextBlockSecond = () => {
  const t = useTranslations("VideoBlocks.secondBlock");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full bg-gray-950 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto max-w-5xl sm:max-w-6xl md:max-w-7xl"
      >
        <div className="flex flex-col lg:flex-row-reverse gap-8 sm:gap-10 md:gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-[400px] sm:w-[300px] aspect-square bg-black rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-full w-full">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/tanker2.mp4" type="video/mp4" />
                Your browser does not support video.
              </video>
            </div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="w-full lg:flex-1 space-y-4 sm:space-y-6 flex flex-col items-end text-right"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              {t("description1")}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              {t("description2")}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              {t("description3")}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoTextBlockSecond;
