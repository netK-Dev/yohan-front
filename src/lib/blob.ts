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
  const res = await fetch('/api/blob/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pathname }),
  });
  if (!res.ok) throw new Error('Échec suppression');
}
