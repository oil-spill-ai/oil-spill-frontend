const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://82.148.19.217:8000";

export const getArchiveTimeLeft = async (userHash: string) => {
    const response = await fetch(`${API_URL}/api/archive_time_left/${userHash}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const getJobStatus = async (jobId: string) => {
    const response = await fetch(`${API_URL}/api/status/${jobId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const handleUpload = async (file: File, onProgress?: (progress: number, status: string) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    let progress = 0;
    let status = "Uploading...";
    let job_id = "";
    let user_hash = "";
    let isReady = false;

    if (onProgress) onProgress(progress, status);

    // Фейковый прогресс загрузки
    for (let i = 0; i <= 80; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        progress = i;
        if (onProgress) onProgress(progress, status);
    }

    // Отправка архива
    const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    job_id = result.job_id;
    user_hash = result.user_hash;
    status = "Processing...";
    progress = 80;
    if (onProgress) onProgress(progress, status);
    
    // Polling статуса задачи
    let pollTries = 0;
    while (!isReady && pollTries < 100) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        pollTries++;
        const jobStatus = await getJobStatus(job_id);
        // Можно сделать более умную оценку прогресса, если backend будет возвращать processed/total
        if (jobStatus.status === "SUCCESS") {
            progress = 100;
            status = "Готово!";
            isReady = true;
            if (onProgress) onProgress(progress, status);
            break;
        } else if (jobStatus.status === "FAILURE") {
            progress = 100;
            status = "Ошибка!";
            isReady = false;
            if (onProgress) onProgress(progress, status);
            break;
        } else {
            // Прогресс между 80 и 99
            progress = Math.min(99, progress + 1);
            status = "Обработка...";
            if (onProgress) onProgress(progress, status);
        }
    }

    return { progress, status, job_id, user_hash, isReady };
};