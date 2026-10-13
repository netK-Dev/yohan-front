'use client';

import React from 'react';
import { uploadToBlob } from '@/lib/blob';

interface FileUploaderProps {
  onUploaded?: (url: string, pathname: string) => void;
  onMultipleUploaded?: (
    files: Array<{ url: string; pathname: string }>
  ) => void;
  accept?: string;
  maxSizeMb?: number;
  multiple?: boolean;
  id?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  onBusyChange?: (busy: boolean) => void;
}

export default function FileUploader({
  onUploaded,
  onMultipleUploaded,
  accept = 'image/*',
  maxSizeMb = 10,
  multiple = false,
  id,
  label = 'Importer un média',
  disabled = false,
  required = false,
  errorMessage,
  onBusyChange,
}: FileUploaderProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [isDragging, setDragging] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploadingFile, setUploadingFile] = React.useState('');
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const busyRef = React.useRef(false);
  const message = error || errorMessage;

  function accepted(file: File) {
    return accept.split(',').some((token) => {
      const format = token.trim().toLowerCase();
      if (format.startsWith('.'))
        return file.name.toLowerCase().endsWith(format);
      if (format.endsWith('/*'))
        return file.type.toLowerCase().startsWith(format.slice(0, -1));
      return file.type.toLowerCase() === format;
    });
  }

  async function handleFiles(files: FileList | null) {
    if (disabled || busyRef.current || !files?.length) return;
    const selected = Array.from(files).slice(0, multiple ? undefined : 1);
    setError('');
    setStatus('');
    const rejected = selected.filter(
      (file) => !accepted(file) || file.size > maxSizeMb * 1024 * 1024
    );
    if (rejected.length) {
      setError(
        `Fichier${rejected.length > 1 ? 's' : ''} refusé${rejected.length > 1 ? 's' : ''} : ${rejected.map((file) => file.name).join(', ')}. Vérifiez le format et la limite de ${maxSizeMb} Mo par fichier. Aucun fichier envoyé.`
      );
      if (inputRef.current) inputRef.current.value = '';
      setDragging(false);
      return;
    }
    busyRef.current = true;
    setLoading(true);
    onBusyChange?.(true);
    const uploaded: Array<{ url: string; pathname: string }> = [];
    try {
      for (let index = 0; index < selected.length; index++) {
        const file = selected[index];
        setUploadingFile(`${file.name} (${index + 1}/${selected.length})`);
        setStatus(`Envoi du fichier ${index + 1} sur ${selected.length}.`);
        setProgress(0);
        const result = await uploadToBlob(file, {
          onUploadProgress: (event) =>
            setProgress(Math.round(event.percentage)),
        });
        uploaded.push(result);
      }
      setStatus(
        `${uploaded.length} fichier${uploaded.length > 1 ? 's' : ''} importé${uploaded.length > 1 ? 's' : ''}. Enregistrez le formulaire pour publier les modifications.`
      );
    } catch {
      setError(
        `L’envoi a échoué. ${uploaded.length ? `${uploaded.length} fichier(s) déjà importé(s) conservé(s).` : 'Aucun fichier importé.'} Vérifiez votre connexion et réessayez avec les fichiers restants.`
      );
      setStatus('');
    } finally {
      if (multiple && uploaded.length) onMultipleUploaded?.(uploaded);
      if (!multiple && uploaded[0])
        onUploaded?.(uploaded[0].url, uploaded[0].pathname);
      busyRef.current = false;
      setLoading(false);
      onBusyChange?.(false);
      setDragging(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div
      className={`rounded-lg border border-dashed p-4 ${isDragging ? 'border-white/60 bg-white/10' : 'border-white/20 bg-black/20'}`}
      aria-busy={isLoading}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled && !isLoading) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        void handleFiles(event.dataTransfer.files);
      }}
    >
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-white/90"
      >
        {label}
      </label>
      <input
        id={inputId}
        ref={inputRef}
        tabIndex={-1}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled || isLoading}
        className="sr-only"
        aria-describedby={`${inputId}-help${message ? ` ${inputId}-error` : ''}`}
        aria-required={required}
        aria-invalid={!!message}
        onChange={(event) => void handleFiles(event.target.files)}
      />
      <p
        id={`${inputId}-help`}
        className="mb-3 text-xs leading-5 text-white/65"
      >
        {multiple
          ? 'Glissez vos fichiers ici, ou choisissez-les.'
          : 'Glissez un fichier ici, ou choisissez-le.'}{' '}
        Formats :{' '}
        {accept
          .split(',')
          .map((format) =>
            format
              .trim()
              .replace('image/*', 'images')
              .replace('video/*', 'vidéos')
              .replace('image/', '')
              .replace('video/', '')
          )
          .join(', ')}{' '}
        · {maxSizeMb} Mo maximum par fichier.
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || isLoading}
        aria-controls={inputId}
        aria-describedby={`${inputId}-help${message ? ` ${inputId}-error` : ''}`}
        data-invalid={!!message}
        className="min-h-11 rounded-md border border-white/25 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-400"
      >
        {multiple ? 'Choisir des fichiers' : 'Choisir un fichier'}
      </button>
      {isLoading && (
        <div className="mt-4">
          <p className="mb-2 text-xs break-words text-white/70">
            {uploadingFile}
          </p>
          <progress
            max={100}
            value={progress}
            aria-label="Progression de l’envoi"
            className="h-2 w-full accent-[#ff0015]"
          />
          <p className="mt-1 text-sm text-white/70">
            {progress < 100 ? `Envoi… ${progress} %` : 'Finalisation…'}
          </p>
        </div>
      )}
      <p
        role="status"
        className={status ? 'mt-3 text-sm text-white/80' : 'sr-only'}
      >
        {status}
      </p>
      {message && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-3 text-sm break-words text-red-300"
        >
          {message}
        </p>
      )}
    </div>
  );
}
