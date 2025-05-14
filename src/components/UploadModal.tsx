"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FiUpload, FiX, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useTranslations } from "next-intl";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<{ progress: number; status: string }>;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
    const t = useTranslations("UploadModal");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(t("defaultStatus"));
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
            setError(null);
            setStatus(t("readyStatus"));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setError(null);
            setStatus(t("readyStatus"));
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError(t("noFileError"));
            return;
        }

        setIsLoading(true);
        setError(null);
        setProgress(0);
        setStatus(t("loadingStatus"));

        try {
            const result = await onUpload(selectedFile);
            setProgress(result.progress);
            setStatus(result.status);
        } catch (err) {
            setError(t("error"));
            console.error("Upload error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectedFile(null);
            setProgress(0);
            setStatus(t("defaultStatus"));
            setError(null);
        }
    }, [isOpen, t]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Затемнение фона */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Модальное окно */}
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Заголовок */}
                            <div className="p-6 border-b border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-white">
                                        <FiUpload className="inline mr-2" />
                                        {t("title")}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <FiX size={24} />
                                    </button>
                                </div>
                                <p className="flex justify-start text-gray-400 mt-1">
                                    {t("supportedFormats")}
                                </p>
                            </div>

                            {/* Основное содержимое */}
                            <div className="p-6">
                                {/* Область перетаскивания */}
                                <div
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                                        dragActive
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-gray-600 hover:border-gray-500"
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragOver={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <FiUpload
                                        size={48}
                                        className={`mx-auto mb-4 ${
                                            dragActive ? "text-blue-400" : "text-gray-500"
                                        }`}
                                    />
                                    <p className="text-gray-300 mb-2">
                                        {selectedFile
                                            ? selectedFile.name
                                            : t("dragText")}
                                    </p>
                                    <p className="text-gray-500">
                                        {t("maxSize")}
                                    </p>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                        accept=".zip,.rar,.7z"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white cursor-pointer transition-colors"
                                    >
                                        {t("selectFile")}
                                    </label>
                                </div>

                                {/* Индикатор прогресса */}
                                {isLoading && (
                                    <div className="mt-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">{status}</span>
                                            <span className="text-blue-400">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Сообщение об ошибке */}
                                {error && (
                                    <div className="mt-4 flex items-center text-red-400 text-sm">
                                        <FiAlertCircle className="mr-2" />
                                        {error}
                                    </div>
                                )}

                                {/* Успешная загрузка */}
                                {progress === 100 && (
                                    <div className="mt-4 flex items-center text-green-400 text-sm">
                                        <FiCheck className="mr-2" />
                                        {t("success")}
                                    </div>
                                )}
                            </div>

                            {/* Футер с кнопками */}
                            <div className="p-4 bg-gray-800/50 border-t border-gray-700 flex justify-end space-x-3">
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors disabled:opacity-50"
                                >
                                    {t("cancel")}
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading || !selectedFile || progress === 100}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition-all disabled:opacity-50"
                                >
                                    {isLoading ? t("loadingStatus") : t("upload")}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UploadModal;