'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedGridBackground from '@/components/sections/AnimatedGridBackground';
import { COLOR_COMBINATIONS } from '@/lib/colors';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    services: [
      { name: '3D/VFX', href: '/realisations?category=3d-vfx' },
      { name: 'Motion Design', href: '/realisations?category=motion-design' },
      { name: 'Court Métrage', href: '/realisations?category=court-metrage' },
    ],
    pages: [
      { name: 'À propos', href: '/about' },
      { name: 'Réalisations', href: '/realisations' },
      { name: 'Contact', href: '/contact' },
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

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#ff0015]/5 blur-3xl" />
        <div className="bg-white/3 absolute -right-32 bottom-0 h-64 w-64 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content - Horizontal Layout */}
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="group mb-6 inline-flex items-center gap-3"
            >
              <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/img/logo_yohan.png"
                  alt="Doens Production"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-[#ff0015] transition-colors group-hover:text-[#ff3340]">
                  Doens
                </div>
                <div className="text-sm text-white/70">Production</div>
              </div>
            </Link>
            <p
              className={`text-sm leading-relaxed ${COLOR_COMBINATIONS.page.text} opacity-70`}
            >
              Créateur visuel spécialisé en 3D/VFX, Motion Design et Courts
              Métrages.
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3
              className={`mb-4 text-sm font-semibold uppercase tracking-wider ${COLOR_COMBINATIONS.page.text} opacity-90`}
            >
              Services
            </h3>
            <ul className="space-y-2">
              {navigation.services.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm ${COLOR_COMBINATIONS.page.text} opacity-70 transition-all duration-200 hover:translate-x-1 hover:opacity-100`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div className="lg:col-span-1">
            <h3
              className={`mb-4 text-sm font-semibold uppercase tracking-wider ${COLOR_COMBINATIONS.page.text} opacity-90`}
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigation.pages.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm ${COLOR_COMBINATIONS.page.text} opacity-70 transition-all duration-200 hover:translate-x-1 hover:opacity-100`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-1">
            <h3
              className={`mb-4 text-sm font-semibold uppercase tracking-wider ${COLOR_COMBINATIONS.page.text} opacity-90`}
            >
              Contact
            </h3>
            <div className="mb-4 space-y-2">
              <p
                className={`text-sm ${COLOR_COMBINATIONS.page.text} opacity-70`}
              >
                contact@doensproduction.com
              </p>
              <p
                className={`text-sm ${COLOR_COMBINATIONS.page.text} opacity-70`}
              >
                France
              </p>
            </div>
            <div className="flex gap-3">
              {navigation.social.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#ff0015]/20 hover:text-white"
                  aria-label={item.name}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className={`text-xs ${COLOR_COMBINATIONS.page.text} opacity-50`}>
              © {currentYear} Doens Production. Tous droits réservés.
            </p>
            <p className={`text-xs ${COLOR_COMBINATIONS.page.text} opacity-50`}>
              Créé avec passion ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
