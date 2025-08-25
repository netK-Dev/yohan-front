'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    services: [
      { name: '3D/VFX et Compositing', href: '/realisation/3d-vfx' },
      { name: 'Motion Design', href: '/realisation/motion-design' },
      { name: 'Court Métrage', href: '/realisation/court-metrage' },
    ],
    company: [
      { name: 'À propos', href: '/about' },
      { name: 'Portfolio', href: '/projects' },
      { name: 'Contact', href: '/contact' },
      { name: 'Devis gratuit', href: '/contact?type=quote' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Politique de confidentialité', href: '/privacy' },
      { name: 'Conditions générales', href: '/terms' },
    ],
    social: [
      {
        name: 'LinkedIn',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
      {
        name: 'Instagram',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C8.396 0 7.989.013 6.756.072 5.524.131 4.718.307 4.005.598c-.748.3-1.381.701-2.014 1.334C1.358 2.565.957 3.198.657 3.946c-.291.713-.467 1.519-.526 2.751C.072 7.930.058 8.337.058 11.958c0 3.621.014 4.028.073 5.261.059 1.232.235 2.038.526 2.75.3.748.701 1.381 1.334 2.014.633.633 1.266 1.034 2.014 1.334.712.291 1.518.467 2.75.526 1.233.059 1.64.072 5.261.072 3.621 0 4.028-.013 5.261-.072 1.232-.059 2.038-.235 2.75-.526.748-.3 1.381-.701 2.014-1.334.633-.633 1.034-1.266 1.334-2.014.291-.712.467-1.518.526-2.75.059-1.233.072-1.64.072-5.261 0-3.621-.013-4.028-.072-5.261-.059-1.232-.235-2.038-.526-2.75-.3-.748-.701-1.381-1.334-2.014C16.382 1.358 15.749.957 15.001.657c-.712-.291-1.518-.467-2.75-.526C11.028.013 10.621 0 7.000 0h5.017zm-.481 2.162c3.549 0 3.969.014 5.372.072 1.297.059 2.003.275 2.474.457.621.242 1.065.532 1.531.998.466.466.756.91.998 1.531.182.471.398 1.177.457 2.474.058 1.403.072 1.823.072 5.372 0 3.549-.014 3.969-.072 5.372-.059 1.297-.275 2.003-.457 2.474-.242.621-.532 1.065-.998 1.531-.466.466-.91.756-1.531.998-.471.182-1.177.398-2.474.457-1.403.058-1.823.072-5.372.072-3.549 0-3.969-.014-5.372-.072-1.297-.059-2.003-.275-2.474-.457-.621-.242-1.065-.532-1.531-.998-.466-.466-.756-.91-.998-1.531-.182-.471-.398-1.177-.457-2.474-.058-1.403-.072-1.823-.072-5.372 0-3.549.014-3.969.072-5.372.059-1.297.275-2.003.457-2.474.242-.621.532-1.065.998-1.531.466-.466.91-.756 1.531-.998.471-.182 1.177-.398 2.474-.457 1.403-.058 1.823-.072 5.372-.072z" />
            <path d="M12.017 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
      },
      {
        name: 'YouTube',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
      },
      {
        name: 'Behance',
        href: '#',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h7.686c-.48-3.593-3.784-3.358-4.613-.207-.374.665-.753 1.47-.609 2.207H14.314c-.05-2 2.029-2 2.029-2zm-10.726 4h7.686c-.48-3.593-3.784-3.358-4.613-.207-.374.665-.753 1.47-.609 2.207H6.314c-.05-2 2.029-2 2.029-2z" />
          </svg>
        ),
      },
    ],
  };

  return (
    <footer
      className={`relative ${COLOR_COMBINATIONS.page.background} border-t border-white/10`}
    >
      {/* Background Animated Grid */}
      <AnimatedGridBackground
        className="pointer-events-none absolute inset-0"
        density={0.4}
        speed={1}
      />

      {/* Background decorative elements (conservés) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-accent/5 absolute -left-40 bottom-0 h-80 w-80 rounded-full blur-3xl" />
        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand section */}
          <div className="lg:col-span-4">
            <Link href="/" className="group flex items-center space-x-4">
              <div className="relative h-12 w-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/img/logo_yohan.png"
                  alt="Doens Production Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-accent group-hover:text-accent-400 text-2xl font-bold transition-colors duration-300">
                  Doens
                </h3>
                <span className="text-lg font-light text-white/90">
                  Production
                </span>
              </div>
            </Link>

            <p
              className={`mt-6 max-w-md text-base leading-relaxed ${COLOR_COMBINATIONS.page.text} opacity-80`}
            >
              Spécialiste en <strong className="text-accent">3D/VFX</strong>,{' '}
              <strong className="text-accent">Motion Design</strong> et{' '}
              <strong className="text-accent">Courts Métrages</strong>.
              Transformons vos idées en créations visuelles exceptionnelles.
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 flex h-8 w-8 items-center justify-center rounded-full">
                  <svg
                    className="text-accent h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className={`${COLOR_COMBINATIONS.page.text} opacity-80`}>
                  contact@doensproduction.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-accent/20 flex h-8 w-8 items-center justify-center rounded-full">
                  <svg
                    className="text-accent h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className={`${COLOR_COMBINATIONS.page.text} opacity-80`}>
                  France
                </span>
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-3">
            {/* Services */}
            <div>
              <h4
                className={`mb-6 text-lg font-semibold ${COLOR_COMBINATIONS.page.text}`}
              >
                Nos Services
              </h4>
              <ul className="space-y-3">
                {footerSections.services.map(service => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className={`${COLOR_COMBINATIONS.page.text} hover:text-accent opacity-80 transition-all duration-300 hover:opacity-100`}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4
                className={`mb-6 text-lg font-semibold ${COLOR_COMBINATIONS.page.text}`}
              >
                Entreprise
              </h4>
              <ul className="space-y-3">
                {footerSections.company.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`${COLOR_COMBINATIONS.page.text} hover:text-accent opacity-80 transition-all duration-300 hover:opacity-100`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4
                className={`mb-6 text-lg font-semibold ${COLOR_COMBINATIONS.page.text}`}
              >
                Légal
              </h4>
              <ul className="space-y-3">
                {footerSections.legal.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`${COLOR_COMBINATIONS.page.text} hover:text-accent opacity-80 transition-all duration-300 hover:opacity-100`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-2">
            <h4
              className={`mb-6 text-lg font-semibold ${COLOR_COMBINATIONS.page.text}`}
            >
              Restez connecté
            </h4>

            {/* Newsletter */}
            <div className="mb-8">
              <p
                className={`mb-4 text-sm ${COLOR_COMBINATIONS.page.text} opacity-80`}
              >
                Recevez nos dernières créations
              </p>
              <form className="flex flex-col gap-3" suppressHydrationWarning>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="focus:border-accent focus:ring-accent/20 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-700 focus:ring-accent rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  S&apos;abonner
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <p
                className={`mb-4 text-sm ${COLOR_COMBINATIONS.page.text} opacity-80`}
              >
                Suivez-nous
              </p>
              <div className="flex gap-3">
                {footerSections.social.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:text-white"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
              <p
                className={`text-sm ${COLOR_COMBINATIONS.page.text} opacity-60`}
              >
                © {currentYear} Doens Production. Tous droits réservés.
              </p>
              <div className="flex gap-4 text-xs">
                <Link
                  href="/mentions-legales"
                  className={`${COLOR_COMBINATIONS.page.text} hover:text-accent opacity-60 transition-colors hover:opacity-100`}
                >
                  Mentions légales
                </Link>
                <Link
                  href="/privacy"
                  className={`${COLOR_COMBINATIONS.page.text} hover:text-accent opacity-60 transition-colors hover:opacity-100`}
                >
                  Confidentialité
                </Link>
                <Link
                  href="/terms"
                  className={`${COLOR_COMBINATIONS.page.text} hover:text-accent opacity-60 transition-colors hover:opacity-100`}
                >
                  CGU
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs ${COLOR_COMBINATIONS.page.text} opacity-60`}
              >
                Créé avec passion
              </span>
              <div className="text-accent h-4 w-4 animate-pulse">❤️</div>
              <span
                className={`text-xs ${COLOR_COMBINATIONS.page.text} opacity-60`}
              >
                par Doens Production
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
