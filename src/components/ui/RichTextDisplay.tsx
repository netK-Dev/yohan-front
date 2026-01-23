'use client';

import { sanitizeHtml } from '@/lib/utils/sanitize';

interface RichTextDisplayProps {
  html: string;
  className?: string;
}

export default function RichTextDisplay({
  html,
  className = '',
}: RichTextDisplayProps) {
  const sanitizedHtml = sanitizeHtml(html);

  return (
    <div
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
