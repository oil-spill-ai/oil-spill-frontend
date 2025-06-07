"use client";

import React, { useState } from "react";
import UploadModal from "./UploadModal";
import { handleUpload } from "@app/api/uploadService";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("HeroSection");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 md:px-8">
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
          Oil Spill AI
        </h1>
        <span className="block text-base sm:text-lg md:text-xl font-extrabold text-orange-300 mb-3 sm:mb-4 md:mb-6">
          Oil Spill AI
        </span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-base sm:text-lg font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/20"
        >
          {t("title")}
        </button>
      </div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default HeroSection;
