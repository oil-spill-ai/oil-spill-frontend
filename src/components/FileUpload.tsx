"use client";

import { useState } from 'react';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState<string | null>(null);

    const handleButtonClick = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setFile(null);
        setMessage('');
        setResponse(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage('');
        } else {
            setMessage('Файл не выбран');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setMessage('');
        setResponse(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setResponse(JSON.stringify(data, null, 2));
                setMessage('Файл успешно отправлен.');
            } else {
                setMessage(`Ошибка: ${data.error || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            setMessage('Ошибка при соединении с сервером');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
            <button
                onClick={handleButtonClick}
                className="bg-purple-800 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-900 transition duration-300"
            >
                Выбрать файл
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-30">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl max-w-md w-full border border-gray-700">
                        <h2 className="text-lg font-bold mb-4">Загрузите файл</h2>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mb-4 text-white"
                        />

                        {message && (
                            <p className="text-sm text-center mb-2 text-red-400">{message}</p>
                        )}

                        <div className="flex justify-between gap-2 mb-4">
                            <button
                                onClick={handleClose}
                                className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300"
                            >
                                Закрыть
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={uploading || !file}
                                className={`${
                                    uploading ? 'bg-purple-700' : 'bg-purple-800 hover:bg-purple-900'
                                } text-white font-bold py-2 px-4 rounded-full transition duration-300`}
                            >
                                {uploading ? 'Загрузка...' : 'Загрузить'}
                            </button>
                        </div>

                        {response && (
                            <div className="bg-gray-800 p-3 rounded text-sm font-mono whitespace-pre overflow-x-auto max-h-64 border border-gray-700">
                                {response}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;