"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FiUpload, FiX, FiCheck, FiAlertCircle, FiClock } from "react-icons/fi";
import { useTranslations } from "next-intl";
import ConfirmDownloadModal from "./ConfirmDownloadModal";
import { handleUpload, getArchiveTimeLeft } from "@/app/api/uploadService";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<{ progress: number; status: string }>;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const t = useTranslations("UploadModal");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(t("defaultStatus"));
    const [dragActive, setDragActive] = useState(false);
    const [userHash, setUserHash] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const ARCHIVE_LIFETIME_SECONDS = 600;
    const [archiveTimeLeft, setArchiveTimeLeft] = useState<number | null>(null);
    const [archiveUnavailable, setArchiveUnavailable] = useState(false);

    // Анимация обработки
    const loadingVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "linear"
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

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
        setUserHash(null);
        setIsReady(false);

        try {
            const result = await handleUpload(selectedFile, (progress, status) => {
                setProgress(progress);
                setStatus(status);
            });
            setProgress(result.progress);
            setStatus(result.status);
            setUserHash(result.user_hash);
            setIsReady(result.isReady);
        } catch (err) {
            setError(t("error"));
            console.error("Upload error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setSelectedFile(null);
            setProgress(0);
            setStatus(t("defaultStatus"));
            setError(null);
            setDragActive(false);
            setUserHash(null);
            setIsReady(false);
            setShowConfirmModal(false);
            setArchiveTimeLeft(null);
            setArchiveUnavailable(false);
        }
    }, [isOpen, t]);

    // Блокируем закрытие по ESC во время загрузки
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isLoading && e.key === "Escape") {
                e.stopPropagation();
                e.preventDefault();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown, true);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [isLoading, isOpen]);

    // Таймер для архива: локальный отсчет + синхронизация раз в 30 сек
    useEffect(() => {
        let interval: NodeJS.Timeout;
        let syncInterval: NodeJS.Timeout;
        let stopped = false;

        const fetchTimeLeft = async () => {
            try {
                const res = await getArchiveTimeLeft(userHash!);
                if (typeof res.seconds_left === 'number') {
                    setArchiveTimeLeft(res.seconds_left);
                    if (res.seconds_left <= 0) {
                        setArchiveUnavailable(true);
                        stopped = true;
                    }
                }
            } catch (e) {
                setArchiveUnavailable(true);
                stopped = true;
            }
        };

        if (isReady && userHash) {
            fetchTimeLeft();
            interval = setInterval(() => {
                setArchiveTimeLeft(prev => {
                    if (prev === null) return null;
                    if (prev <= 1) {
                        setArchiveUnavailable(true);
                        stopped = true;
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            syncInterval = setInterval(() => {
                if (!stopped) fetchTimeLeft();
            }, 30000);
        }
        return () => {
            if (interval) clearInterval(interval);
            if (syncInterval) clearInterval(syncInterval);
        };
    }, [isReady, userHash]);

    // Хендлеры для подтверждающего модального окна
    const handleTryClose = () => {
        if (isReady && !archiveUnavailable) {
            setShowConfirmModal(true);
        } else {
            onClose();
        }
    };
    const handleConfirmClose = () => {
        setShowConfirmModal(false);
        onClose();
    };
    const handleCancelClose = () => {
        setShowConfirmModal(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Затемнение фона */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 0.5}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
                        onClick={isLoading ? undefined : handleTryClose}
                    />

                    {/* Модальное окно */}
                    <div className="flex items-center justify-center min-h-screen p-4 overflow-y-auto">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 20}}
                            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Заголовок */}
                            <div className="p-6 border-b border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-white">
                                        <FiUpload className="inline mr-2"/>
                                        {t("title")}
                                    </h2>
                                    <button
                                        onClick={handleTryClose}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <FiX size={24}/>
                                    </button>
                                </div>
                                <p className="flex justify-start text-gray-400 mt-1">
                                    {t("supportedFormats")}
                                </p>
                            </div>

                            {/* Основное содержимое */}
                            <div className="p-6">
                                {/* Область перетаскивания */}
                                {!isLoading && !isReady && (
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
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                            accept=".zip"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="inline-block mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white cursor-pointer transition-colors"
                                        >
                                            {t("selectFile")}
                                        </label>
                                    </div>
                                )}

                                {/* Индикатор прогресса */}
                                {isLoading && (
                                    <div className="mt-6 px-6">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="text-gray-400">{status}</span>
                                            <span className="text-blue-400">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                            <motion.div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                                style={{width: `${progress}%`}}
                                                initial={{width: 0}}
                                                animate={{width: `${progress}%`}}
                                                transition={{duration: 0.3}}
                                            />
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <motion.div
                                                className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent"
                                                variants={loadingVariants}
                                                animate="animate"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Сообщение об ошибке */}
                                {error && (
                                    <div className="mt-4 flex items-center text-red-400 text-sm">
                                        <FiAlertCircle className="mr-2"/>
                                        {error}
                                    </div>
                                )}

                                {/* Успешная загрузка */}
                                {isReady && userHash && (
                                    <div className="text-xl mt-4 px-6 flex flex-col items-center">
                                        {archiveUnavailable ? (
                                            <div className="text-red-400 mb-2">
                                                <FiAlertCircle className="mr-2 inline"/>
                                                {t("archiveExpired")}
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-green-400 mb-2">
                                                    <FiCheck className="mr-2 inline"/>
                                                    {t("success")}
                                                </div>
                                                <a
                                                    href={`http://localhost:8000/api/download/${userHash}`}
                                                    className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 hover:from-emerald-500 hover:to-green-700 text-white font-medium transition-all"
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {t("download")}
                                                </a>
                                            </>
                                        )}
                                        <div className="w-full mt-4 space-y-2">
                                            <div className="flex items-center justify-between text-gray-300 text-xl">
                                                <FiClock className="mr-1"/>
                                                <span>
                                                <span>
                                                    {formatTime(archiveTimeLeft ?? ARCHIVE_LIFETIME_SECONDS)}
                                                </span>
                                            </span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                                    initial={{width: "100%"}}
                                                    animate={{
                                                        width: `${Math.max(
                                                            0,
                                                            ((archiveTimeLeft ?? ARCHIVE_LIFETIME_SECONDS) / ARCHIVE_LIFETIME_SECONDS) * 100
                                                        )}%`
                                                    }}
                                                    transition={{duration: 1}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Футер с кнопками */}
                            {!isLoading && !isReady && (
                                <div className="p-4 bg-gray-800/50 border-t border-gray-700 flex justify-end space-x-3">
                                    <button
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors disabled:opacity-50"
                                        tabIndex={isLoading ? -1 : 0}
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
                            )}
                            <ConfirmDownloadModal
                                isOpen={showConfirmModal}
                                onConfirm={handleConfirmClose}
                                onCancel={handleCancelClose}
                            />
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Форматирование времени для таймера
function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

export default UploadModal;