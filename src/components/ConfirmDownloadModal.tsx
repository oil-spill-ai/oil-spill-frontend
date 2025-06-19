import React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDownloadModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDownloadModal: React.FC<ConfirmDownloadModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const t = useTranslations("UploadModal");

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
              />

              {/* Модальное окно */}
              <div className="flex items-center justify-center min-h-screen p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 max-w-116 w-full border-2 border-gray-700 flex flex-col items-center"
                >
                  <div className="text-white text-2xl font-semibold mb-4 text-center">
                    {t("confirmDownloadTitle")}<br />
                    <span className="text-gray-400 text-sm font-normal">
                      {t("confirmDownloadSubtitle")}
                    </span>
                  </div>
                  <div className="flex w-full gap-4 mt-2">
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-colors"
                    >
                      {t("confirmDownloadYes")}
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                    >
                      {t("confirmDownloadStay")}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
        )}
      </AnimatePresence>
  );
};

export default ConfirmDownloadModal;