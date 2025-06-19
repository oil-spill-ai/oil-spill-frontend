"use client";

import React, { useState } from "react";
import UploadModal from "./UploadModal";
import { handleUpload } from "@/app/api/uploadService";
import {useTranslations} from 'next-intl';

const HeroSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = useTranslations('HeroSection');

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center px-2 sm:px-4">
            <div className="space-y-4">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 sm:mb-6">
                    <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold text-orange-300 block mb-2 sm:mb-4">
                        Oil Spill AI:
                    </span>
                    <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">
                        {t('title')}
                    </span>
                </h1>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-base sm:text-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/20"
            >
                {t('uploadButton')}
            </button>

            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleUpload}
            />
        </div>
    );
};

export default HeroSection;