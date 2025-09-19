import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');

      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: 'Fichier invalide' },
          { status: 400 }
        );
      }

      const filename = `${Date.now()}-${file.name}`.toLowerCase();

      const blob = await put(filename, file, {
        access: 'public',
      });

      return NextResponse.json({ url: blob.url, pathname: blob.pathname });
    }

    // Upload binaire direct
    const url = new URL(request.url);
    const filenameParam = url.searchParams.get('filename');
    const filename = (filenameParam || `${Date.now()}-upload`).toLowerCase();

    const arrayBuffer = await request.arrayBuffer();
    const file = new Blob([arrayBuffer]);

    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    return NextResponse.json({ error: 'Upload échoué' }, { status: 500 });
  }
}
