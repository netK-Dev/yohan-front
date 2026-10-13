'use client';

import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';

interface AdminPageLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: React.ReactNode;
}

export default function AdminPageLayout({
  children,
  title,
  breadcrumbs,
  action,
}: AdminPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#000002] text-white">
      <AdminHeader />
      <main
        id="admin-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl px-4 py-6 outline-none sm:px-6 sm:py-8 lg:px-8"
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Fil d’Ariane" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/65">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex min-w-0 items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-white/40">
                      /
                    </span>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="inline-flex min-h-11 items-center hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current="page"
                      className="break-words text-white/85"
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-medium tracking-widest text-white/55 uppercase">
              Administration
            </p>
            <h1 className="text-2xl font-semibold break-words sm:text-3xl">
              {title}
            </h1>
          </div>
          {action && (
            <div className="flex shrink-0 flex-wrap gap-2">{action}</div>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
