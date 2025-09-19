'use client';
import React from 'react';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import { uploadToBlob } from '@/lib/blob';

interface FileUploaderProps {
  onUploaded?: (url: string, pathname: string) => void;
  accept?: string;
  maxSizeMb?: number;
}

export default function FileUploader({
  onUploaded,
  accept = 'image/*',
  maxSizeMb = 10,
}: FileUploaderProps) {
  const [isDragging, setDragging] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  async function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    const file = files[0];
    if (file.size > maxSizeMb * 1024 * 1024) {
      alert(`Fichier trop volumineux (max ${maxSizeMb}MB)`);
      return;
    }
    setLoading(true);
    try {
      const { url, pathname } = await uploadToBlob(file);
      onUploaded?.(url, pathname);
    } catch (e) {
      alert("Échec de l'upload");
    } finally {
      setLoading(false);
      setDragging(false);
    }
  }

  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/40 p-4 text-center ${isDragging ? 'ring-2 ring-[#ff0015]' : ''}`}
      onDragOver={e => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />

      <div className="mb-3 text-sm text-white/70">
        Glissez-déposez un fichier ou
      </div>
      <button
        type="button"
        onClick={openPicker}
        disabled={isLoading}
        className={`rounded-md px-3 py-2 text-sm ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} disabled:opacity-50`}
      >
        {isLoading ? 'Envoi...' : 'Choisir un fichier'}
      </button>
    </div>
  );
}
