export const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    //Создаем объект для отслеживания прогресса
    const progressTracker = {
        progress: 0,
        status: "Uploading..."
    };

    //Функция для обновления прогресса
    const updateProgress = (progress: number) => {
        progressTracker.progress = progress;
        return progressTracker;
    };

    try {
        //Симуляция загрузки с прогрессом
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            updateProgress(i);
        }

        //Отправка на бэкенд
        const response = await fetch("http://localhost:8000/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Upload successful:", result);

        // Возвращаем финальный прогресс
        return { progress: 100, status: "Upload complete!" };
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};