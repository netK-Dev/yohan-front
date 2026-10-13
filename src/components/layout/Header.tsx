'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Modal from '@/components/ui/Modal';

const pages = [
  { label: 'Accueil', href: '/' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
const categories = [
  { label: '3D/VFX et Compositing', slug: '3d-vfx' },
  { label: 'Motion Design', slug: 'motion-design' },
  { label: 'Court Métrage', slug: 'court-metrage' },
];

export default function Header() {
  const pathname = usePathname();
  const category = useSearchParams().get('category');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const disclosure = useRef<HTMLDivElement>(null);
  const categoryButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!categoriesOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!disclosure.current?.contains(event.target as Node))
        setCategoriesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCategoriesOpen(false);
        categoryButton.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [categoriesOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const close = () => {
      if (media.matches) setMobileOpen(false);
    };
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);

  const isActive = (href: string) =>
    href === '/realisations' ? pathname.startsWith(href) : pathname === href;
  const closeMenus = () => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  };
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[120] -translate-y-24 bg-white px-5 py-3 font-medium text-black focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <header className="sticky top-0 z-40 border-b border-white/15 bg-[#000002]/95 backdrop-blur-md">
        <div className="site-container flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="Doens Production — accueil"
            className="flex min-h-11 shrink-0 items-center gap-3"
          >
            <Image
              src="/img/logo_yohan.png"
              alt=""
              width={42}
              height={37}
              style={{ height: 'auto' }}
              className="object-contain"
            />
            <span className="text-sm leading-tight font-semibold tracking-[0.08em] uppercase">
              Doens
              <span className="block text-[10px] font-normal tracking-[0.22em] text-white/60">
                Production
              </span>
            </span>
          </Link>
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-5 md:flex lg:gap-7"
          >
            {pages.map((page) => (
              <div key={page.href} className="flex items-center">
                <Link
                  href={page.href}
                  onClick={closeMenus}
                  aria-current={isActive(page.href) ? 'page' : undefined}
                  className={`flex min-h-11 items-center border-b text-sm transition-colors ${isActive(page.href) ? 'border-[#ff0015] text-white' : 'border-transparent text-white/65 hover:text-white'}`}
                >
                  {page.label}
                </Link>
                {page.href === '/realisations' && (
                  <div
                    ref={disclosure}
                    className="relative"
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget))
                        setCategoriesOpen(false);
                    }}
                  >
                    <button
                      ref={categoryButton}
                      type="button"
                      aria-label="Catégories de réalisations"
                      aria-expanded={categoriesOpen}
                      aria-controls="work-categories"
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      className="flex min-h-11 min-w-11 items-center justify-center text-white/70 hover:text-white"
                    >
                      <span aria-hidden="true">⌄</span>
                    </button>
                    {categoriesOpen && (
                      <div
                        id="work-categories"
                        className="absolute top-full left-0 w-64 border border-white/20 bg-[#111113] p-2"
                      >
                        {categories.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/realisations?category=${item.slug}`}
                            onClick={closeMenus}
                            aria-current={
                              pathname === '/realisations' &&
                              category === item.slug
                                ? 'page'
                                : undefined
                            }
                            className="block px-3 py-3 text-sm text-white/80 hover:bg-white/10"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button
            type="button"
            className="button-secondary px-4 md:hidden"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? 'mobile-navigation' : undefined}
            onClick={() => setMobileOpen(true)}
          >
            Menu <span aria-hidden="true">☰</span>
          </button>
        </div>
      </header>
      <Modal
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Navigation"
        drawer
      >
        <nav
          id="mobile-navigation"
          aria-label="Navigation mobile"
          className="flex flex-col"
        >
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              onClick={closeMenus}
              aria-current={isActive(page.href) ? 'page' : undefined}
              className={`border-b border-white/10 py-4 text-xl ${isActive(page.href) ? 'text-white' : 'text-white/65'}`}
            >
              {page.label}
            </Link>
          ))}
          <p className="eyebrow mt-8 mb-2">Par discipline</p>
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/realisations?category=${item.slug}`}
              onClick={closeMenus}
              aria-current={
                pathname === '/realisations' && category === item.slug
                  ? 'page'
                  : undefined
              }
              className="py-3 text-sm text-white/75"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Modal>
    </>
  );
}
