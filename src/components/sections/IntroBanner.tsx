import clsx from 'clsx';

type IntroBannerProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function IntroBanner({
  title,
  subtitle,
  className,
}: IntroBannerProps) {
  return (
    <section
      className={clsx(
        'border-b border-white/15 py-12 sm:py-16 lg:py-20',
        className
      )}
    >
      <div className="site-container">
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#ff0015]" aria-hidden="true" />
          Doens Production
        </p>
        <h1 className="max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
