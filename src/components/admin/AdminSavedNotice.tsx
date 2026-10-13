'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SavedNotice({ resource }: { resource: 'project' | 'media' }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const saved = searchParams.get('saved');
  if (saved !== 'created' && saved !== 'updated') return null;
  const subject = resource === 'project' ? 'Le projet' : 'Le média';
  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-md border border-white/20 bg-white/5 px-4">
      <p role="status" className="py-3 text-sm text-white/90">
        {subject} a été {saved === 'created' ? 'créé' : 'mis à jour'}.
      </p>
      <button
        type="button"
        aria-label="Fermer le message de confirmation"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-xl text-white/65 hover:bg-white/10 hover:text-white"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.delete('saved');
          router.replace(`${pathname}${params.size ? `?${params}` : ''}`, {
            scroll: false,
          });
        }}
      >
        ×
      </button>
    </div>
  );
}

export default function AdminSavedNotice({
  resource,
}: {
  resource: 'project' | 'media';
}) {
  return (
    <Suspense fallback={null}>
      <SavedNotice resource={resource} />
    </Suspense>
  );
}
