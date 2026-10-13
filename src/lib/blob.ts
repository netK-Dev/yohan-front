import { upload } from '@vercel/blob/client';

export type UploadProgressEvent = {
  loaded: number;
  total: number;
  percentage: number;
};

export async function uploadToBlob(
  file: File,
  options?: {
    onUploadProgress?: (event: UploadProgressEvent) => void;
  }
): Promise<{ url: string; pathname: string }> {
  const filename = `${Date.now()}-${file.name}`.toLowerCase();

  const blob = await upload(filename, file, {
    access: 'public',
    handleUploadUrl: '/api/blob/upload',
    multipart: true,
    onUploadProgress: options?.onUploadProgress,
  });

  return { url: blob.url, pathname: blob.pathname };
}

export async function deleteFromBlob(pathname: string): Promise<void> {
  // Utiliser l'API Vercel Blob directement au lieu d'un fetch interne
  const { del } = await import('@vercel/blob');

  try {
    // The SDK accepts a full URL or a pathname in the configured store.
    // Do not invent a hostname: each Blob store has its own hostname.
    await del(pathname.startsWith('/') ? pathname.slice(1) : pathname);
  } catch (error) {
    console.warn(`Échec suppression blob ${pathname}:`, error);
    // Ne pas faire échouer l'opération pour des problèmes de nettoyage
  }
}

// Extraire le pathname d'une URL Blob Vercel
export function extractBlobPathname(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (
      urlObj.protocol === 'https:' &&
      urlObj.hostname.endsWith('.public.blob.vercel-storage.com')
    ) {
      return urlObj.pathname;
    }
    return null;
  } catch {
    return null;
  }
}

// Supprimer plusieurs fichiers Blob
export async function deleteManyFromBlob(urls: string[]): Promise<void> {
  const pathnames = urls.filter((url) => extractBlobPathname(url) !== null);

  if (pathnames.length === 0) return;

  const results = await Promise.allSettled(
    pathnames.map((pathname) => deleteFromBlob(pathname))
  );

  // Log les erreurs mais ne pas faire échouer l'opération
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.warn(
        `Échec suppression blob ${pathnames[index]}:`,
        result.reason
      );
    }
  });
}
