"use client";

import React, { useState } from "react";
import UploadModal from "./UploadModal";
import { handleUpload } from "@/app/api/uploadService";

const HeroSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-4xl md:text-6xl font-extrabold mb-6 text-orange-300">
          Oil Spill AI:
        </span>{" "}
                <br /> Detecting Pollution, Protecting Our Waters
            </h1>

            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/20"
            >
                Upload Archive
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