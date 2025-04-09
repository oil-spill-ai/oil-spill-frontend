import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const file = data.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'Файл не получен' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${uuidv4()}_${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ message: 'Файл успешно загружен', fileName });
}