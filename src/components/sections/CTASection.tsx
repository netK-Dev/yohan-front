import Link from 'next/link';
import type { CTAContent } from '@/lib/types/page-content';
import { DEFAULT_CTA_CONTENT } from '@/lib/defaults/home-defaults';

export default function CTASection({ content }: { content?: CTAContent }) {
  const c = content ?? DEFAULT_CTA_CONTENT;
  return (
    <section className="border-t border-white/15 bg-[#101013]">
      <div className="site-container flex flex-col items-start justify-between gap-8 py-14 sm:py-20 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="section-title">
            {c.title} <span className="text-[#ff5865]">{c.titleHighlight}</span>
            {c.titleSuffix}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/65">{c.subtitle}</p>
        </div>
        <Link href="/contact" className="button-primary shrink-0">
          {c.ctaText}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
