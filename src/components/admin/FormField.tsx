'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ReactNode,
  type ReactElement,
} from 'react';

/** Associates the first native field with its visible label and help text. */
export default function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  const id = useId();
  const items = Children.toArray(children);
  const fieldIndex = items.findIndex(
    (child) =>
      isValidElement(child) &&
      ['input', 'textarea', 'select'].includes(String(child.type))
  );
  const labelled = fieldIndex !== -1;
  const fields = items.map((child, index) => {
    if (index !== fieldIndex) return child;
    const field = child as ReactElement<{
      id?: string;
      'aria-describedby'?: string;
      required?: boolean;
    }>;
    return cloneElement(field, {
      id,
      'aria-describedby':
        [field.props['aria-describedby'], hint ? `${id}-help` : undefined]
          .filter(Boolean)
          .join(' ') || undefined,
    });
  });
  return (
    <div className="min-w-0 space-y-2">
      {labelled ? (
        <label htmlFor={id} className="block text-sm font-medium text-white/90">
          {label}
        </label>
      ) : (
        <p className="text-sm font-medium text-white/90">{label}</p>
      )}
      {hint && (
        <p id={`${id}-help`} className="text-xs leading-5 text-white/65">
          {hint}
        </p>
      )}
      {fields}
    </div>
  );
}
