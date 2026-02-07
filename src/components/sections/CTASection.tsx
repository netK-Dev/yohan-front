import Link from 'next/link';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export default function CTASection() {
  return (
    <section className={`relative ${COLOR_COMBINATIONS.page.background} py-20`}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#ff0015]/5 blur-3xl" />
        <div className="bg-white/3 absolute -right-32 bottom-0 h-64 w-64 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto max-w-2xl">
            <h2
              className={`mb-4 text-3xl font-bold ${COLOR_COMBINATIONS.page.text} sm:text-4xl`}
            >
              Prêt à donner vie à{' '}
              <span className="bg-gradient-to-r from-[#ff0015] to-[#e6000c] bg-clip-text text-transparent">
                votre vision
              </span>
              ?
            </h2>
            <p
              className={`mb-8 text-lg ${COLOR_COMBINATIONS.page.text} opacity-80`}
            >
              {"Collaborons pour créer quelque chose d'exceptionnel ensemble."}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff1a2a] via-[#ff3340] to-[#e6000c] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#ff0015]/25 focus:outline-none focus:ring-2 focus:ring-[#ff0015]/50"
            >
              <span>Démarrer un projet</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h12.69l-4.22-4.22a.75.75 0 111.06-1.06l5.5 5.5a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 11-1.06-1.06l4.22-4.22H4.5a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
