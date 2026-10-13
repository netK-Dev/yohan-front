import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';
import type { ServicesContent } from '@/lib/types/page-content';
import { DEFAULT_SERVICES_CONTENT } from '@/lib/defaults/home-defaults';

export default function ServicesSection({
  content,
}: {
  content?: ServicesContent;
}) {
  const c = content ?? DEFAULT_SERVICES_CONTENT;
  return (
    <section
      className="section-space border-t border-white/15"
      aria-labelledby="services-title"
    >
      <div className="site-container">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow mb-4">{c.badge}</p>
            <h2 id="services-title" className="section-title">
              {c.title}{' '}
              <span className="text-white/55">{c.titleHighlight}</span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-white/65">
            {c.subtitle}
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {c.services.map((service, index) => (
            <article key={index} className="flex min-w-0 flex-col">
              <Link
                href={`/realisations?category=${service.categorySlug}`}
                aria-label={`Découvrir ${service.title}`}
                className="group relative mb-5 block aspect-[4/3] overflow-hidden bg-[#111113]"
              >
                <SafeImage
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
              </Link>
              <p className="eyebrow mb-3 text-white/45">0{index + 1}</p>
              <h3 className="text-xl font-medium tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {service.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/55">
                {service.tags.map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <Link
                  href={`/realisations?category=${service.categorySlug}`}
                  className="text-link border-t border-white/20 pt-4"
                  aria-label={`Voir les réalisations : ${service.title}`}
                >
                  Découvrir ce domaine <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
