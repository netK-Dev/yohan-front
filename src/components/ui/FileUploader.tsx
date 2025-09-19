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
      } catch {
        alert("Échec de l'upload");
    } finally {
      setLoading(false);
      setDragging(false);
    }
  }

  return (
    <div
      className={`rounded-xl border transition-all ${
        isDragging
          ? 'border-[#ff0015] bg-[#ff0015]/10 ring-2 ring-[#ff0015]/30'
          : 'border-white/10 bg-black/40'
      } p-6 text-center`}
      onDragOver={e => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => {
        setDragging(false);
      }}
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

      {isLoading ? (
        <div className="flex flex-col items-center">
          <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#ff0015]"></div>
          <div className="text-sm text-white/70">Envoi en cours...</div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div className="mb-4 text-sm text-white/70">
            {isDragging
              ? 'Relâchez pour uploader'
              : 'Glissez-déposez un fichier ici ou'}
          </div>
          <button
            type="button"
            onClick={openPicker}
            disabled={isLoading}
            className={`rounded-md px-4 py-2 text-sm font-medium ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} transition disabled:opacity-50`}
          >
            Choisir un fichier
          </button>
          <div className="mt-2 text-xs text-white/50">
            Max {maxSizeMb}MB •{' '}
            {accept
              .split(',')
              .map(a => a.trim().replace('/*', ''))
              .join(', ')}
          </div>
        </>
      )}
    </div>
  );
}
