import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getServerSession } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as HandleUploadBody;

    // Upload-completed callbacks are signed by Vercel and have no browser
    // session. handleUpload verifies them; only token generation needs a user.
    if (body.type !== 'blob.upload-completed') {
      const session = await getServerSession();
      if (!session?.user) {
        return NextResponse.json(
          { error: 'Authentification requise' },
          { status: 401 }
        );
      }
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Le stockage des médias n’est pas configuré.' },
        { status: 503 }
      );
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await getServerSession();
        if (!session?.user) throw new Error('Authentification requise');
        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'video/mp4',
            'video/quicktime',
            'video/webm',
            'video/x-msvideo',
          ],
          maximumSizeInBytes: 500 * 1024 * 1024, // 500MB
        };
      },
      onUploadCompleted: async () => {
        // Pas de traitement post-upload nécessaire
      },
    });

    return NextResponse.json(jsonResponse);
  } catch {
    return NextResponse.json({ error: 'Upload échoué' }, { status: 500 });
  }
}
