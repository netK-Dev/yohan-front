'use client';

import { useState } from 'react';
import SafeImage from '@/components/ui/SafeImage';
import Modal from '@/components/ui/Modal';

interface ImageSliderProps {
  images: string[];
  title: string;
}

export default function ImageSlider({ images, title }: ImageSliderProps) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  if (!images.length) return null;
  const index = selected % images.length;
  const controls = (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <button
        type="button"
        className="button-secondary"
        disabled={images.length === 1}
        onClick={() => setSelected((index - 1 + images.length) % images.length)}
        aria-label="Image précédente"
      >
        ← <span className="hidden sm:inline">Précédente</span>
      </button>
      <span className="text-xs text-white/65" aria-live="polite">
        Image {index + 1} / {images.length}
      </span>
      <button
        type="button"
        className="button-secondary"
        disabled={images.length === 1}
        onClick={() => setSelected((index + 1) % images.length)}
        aria-label="Image suivante"
      >
        <span className="hidden sm:inline">Suivante</span> →
      </button>
    </div>
  );
  return (
    <section className="mb-12" aria-label={`Galerie du projet ${title}`}>
      <h2 className="mb-5 text-xl font-medium">Galerie</h2>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-haspopup="dialog"
        aria-label={`Agrandir l’image ${index + 1} de ${title}`}
        className="group relative block aspect-video w-full overflow-hidden bg-[#111113]"
      >
        <SafeImage
          src={images[index]}
          alt={`${title} — image ${index + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1200px) 100vw, 1120px"
          priority={index === 0}
        />
        <span className="absolute right-3 bottom-3 border border-white/30 bg-black/80 px-3 py-2 text-xs text-white">
          Agrandir ↗
        </span>
      </button>
      {controls}
      {images.length > 1 && (
        <div
          className="flex gap-3 overflow-x-auto p-1"
          aria-label="Choisir une image"
        >
          {images.map((src, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setSelected(i)}
              aria-label={`Afficher l’image ${i + 1}`}
              aria-pressed={i === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden border-2 ${i === index ? 'border-[#ff5865]' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <SafeImage
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
      <Modal
        isOpen={expanded}
        onClose={() => setExpanded(false)}
        title={`${title} — galerie`}
        maxWidth="screen"
      >
        <div className="relative h-[min(60dvh,650px)]">
          <SafeImage
            src={images[index]}
            alt={`${title} — image ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
        {controls}
      </Modal>
    </section>
  );
}
