export async function uploadToBlob(
  file: File
): Promise<{ url: string; pathname: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/blob/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Échec upload');
  return res.json();
}

export async function deleteFromBlob(pathname: string): Promise<void> {
  // Utiliser l'API Vercel Blob directement au lieu d'un fetch interne
  const { del } = await import('@vercel/blob');

  try {
    // Construire l'URL complète si c'est juste un pathname
    const blobUrl = pathname.startsWith('http')
      ? pathname
      : `https://blob.vercel-storage.com${pathname}`;

    await del(blobUrl);
  } catch (error) {
    console.warn(`Échec suppression blob ${pathname}:`, error);
    // Ne pas faire échouer l'opération pour des problèmes de nettoyage
  }
}

// Extraire le pathname d'une URL Blob Vercel
export function extractBlobPathname(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('blob.vercel-storage.com')) {
      return urlObj.pathname;
    }
    return null;
  } catch {
    return null;
  }
}

// Supprimer plusieurs fichiers Blob
export async function deleteManyFromBlob(urls: string[]): Promise<void> {
  const pathnames = urls
    .map(extractBlobPathname)
    .filter((pathname): pathname is string => pathname !== null);

  if (pathnames.length === 0) return;

  const results = await Promise.allSettled(
    pathnames.map(pathname => deleteFromBlob(pathname))
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
