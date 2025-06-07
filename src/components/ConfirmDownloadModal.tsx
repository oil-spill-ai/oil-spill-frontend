import React from "react";

interface ConfirmDownloadModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDownloadModal: React.FC<ConfirmDownloadModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-[90%] sm:max-w-sm w-full border border-gray-700 flex flex-col items-center">
        <div className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">
          Вы точно скачали файл?<br />
          <span className="text-gray-400 text-xs sm:text-sm font-normal">
            После закрытия окна эта возможность будет недоступна.
          </span>
        </div>
        <div className="flex w-full gap-3 sm:gap-4 mt-2">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-colors text-sm sm:text-base"
          >
            Скачал
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors text-sm sm:text-base"
          >
            Остаться
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDownloadModal;
