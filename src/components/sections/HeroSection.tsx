'use client';

import { useState } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import { getMediaPreview } from '@/lib/utils/media-preview';
import { useSliderMedia } from '@/lib/hooks/useSliderMedia';
import type { HeroContent } from '@/lib/types/page-content';
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_SERVICES_CONTENT,
} from '@/lib/defaults/home-defaults';

function HeroActions({ content }: { content: HeroContent }) {
  return (
    <>
      <Link href="/realisations" className="button-primary">
        {content.ctaPrimaryText}
        <span aria-hidden="true">↗</span>
      </Link>
      <Link href="/contact" className="button-secondary">
        {content.ctaSecondaryText}
      </Link>
    </>
  );
}

export default function HeroSection({ content }: { content?: HeroContent }) {
  const c = content ?? DEFAULT_HERO_CONTENT;
  const { sliderMedia } = useSliderMedia(true);
  const [selected, setSelected] = useState(0);
  const media = sliderMedia.length
    ? sliderMedia.map((item) => ({
        id: String(item.id),
        src: item.mediaUrl,
        title: item.title,
        category: item.category || '',
      }))
    : DEFAULT_SERVICES_CONTENT.services.map((service) => ({
        id: service.categorySlug,
        src: service.image,
        title: service.title,
        category: '',
      }));
  const index = selected % media.length;
  const featured = media[index];

  return (
    <section className="border-b border-white/15" aria-labelledby="hero-title">
      <div className="site-container grid items-start gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-x-12 lg:gap-y-6 lg:py-16">
        <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[#ff0015]" />
            {c.badge}
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.04] font-semibold tracking-[-0.045em]"
          >
            {c.title}{' '}
            <span className="block text-[#ff5865]">{c.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {c.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
            <HeroActions content={c} />
          </div>
        </div>
        <div className="order-2 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <figure className="border border-white/20 bg-[#111113]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <SafeImage
                src={featured.src}
                alt={featured.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 560px"
              />
            </div>
            <figcaption
              className="flex min-h-16 items-center justify-between gap-4 px-4 py-3"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="min-w-0 break-words">
                <p className="text-sm font-medium">{featured.title}</p>
                {featured.category && (
                  <p className="mt-1 text-xs text-white/60">
                    {featured.category}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-xs text-white/50 tabular-nums">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(media.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
          {media.length > 1 && (
            <div
              className="mt-3 flex gap-3 overflow-x-auto p-1"
              aria-label="Choisir un visuel"
            >
              {media.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelected(i)}
                  aria-label={`Afficher : ${item.title}`}
                  aria-pressed={index === i}
                  className={`relative aspect-[3/2] w-24 shrink-0 overflow-hidden border-2 sm:w-28 ${index === i ? 'border-[#ff5865]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <SafeImage
                    src={getMediaPreview(item.src)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
          <p className="max-w-lg text-sm leading-7 text-white/60 sm:text-base">
            {c.description}
          </p>
          <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
            <HeroActions content={c} />
          </div>
          {c.stats.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
              {c.stats.map((stat, i) => (
                <div key={i}>
                  <dt className="text-xs text-white/60">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-medium tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
