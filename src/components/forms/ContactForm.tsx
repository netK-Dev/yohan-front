'use client';

import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type FormState = 'idle' | 'submitting' | 'success' | 'error';
type Fields = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};
type Field = keyof Fields;
const empty: Fields = { fullName: '', email: '', subject: '', message: '' };
const fieldOrder: Field[] = ['fullName', 'email', 'subject', 'message'];
const limits = { fullName: 150, email: 254, subject: 120, message: 1000 };

function fieldError(field: Field, value: string) {
  const text = value.trim();
  if (field === 'fullName' && !text) return 'Indiquez votre nom.';
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))
    return 'Indiquez une adresse email valide.';
  if (field === 'subject' && !text)
    return 'Précisez le sujet de votre demande.';
  if (field === 'message' && text.length < 10)
    return 'Décrivez votre besoin en au moins 10 caractères.';
  return '';
}

export default function ContactForm() {
  const quote = useSearchParams().get('type') === 'quote';
  return <ContactFields key={quote ? 'quote' : 'contact'} quote={quote} />;
}

function ContactFields({ quote }: { quote: boolean }) {
  const [values, setValues] = useState<Fields>(() => ({
    ...empty,
    subject: quote ? 'Demande de devis' : '',
  }));
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const pending = state === 'submitting';

  function change(field: Field, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (touched[field])
      setErrors((previous) => ({
        ...previous,
        [field]: fieldError(field, value),
      }));
    if (state === 'success' || state === 'error') setState('idle');
  }
  function blur(field: Field) {
    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors((previous) => ({
      ...previous,
      [field]: fieldError(field, values[field]),
    }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (honeypot.trim()) {
      setState('success');
      return;
    }
    const nextErrors: Partial<Record<Field, string>> = {};
    for (const field of fieldOrder) {
      const error = fieldError(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    setTouched({ fullName: true, email: true, subject: true, message: true });
    const invalid = fieldOrder.find((field) => nextErrors[field]);
    if (invalid) {
      const input = event.currentTarget.elements.namedItem(invalid);
      if (input instanceof HTMLElement) input.focus();
      return;
    }
    setState('submitting');
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error('Envoi impossible');
      setValues(empty);
      setErrors({});
      setTouched({});
      setState('success');
    } catch {
      setState('error');
    }
  }

  const fields: {
    key: Field;
    label: string;
    placeholder: string;
    help?: string;
    autocomplete: string;
  }[] = [
    {
      key: 'fullName',
      label: 'Nom complet',
      placeholder: 'Votre nom',
      autocomplete: 'name',
    },
    {
      key: 'email',
      label: 'Email',
      placeholder: 'vous@exemple.com',
      autocomplete: 'email',
    },
    {
      key: 'subject',
      label: 'Sujet',
      placeholder: 'Devis, nouveau projet, collaboration…',
      autocomplete: 'off',
    },
    {
      key: 'message',
      label: 'Message',
      placeholder: 'Vos objectifs, vos références et votre calendrier…',
      help: 'Au moins 10 caractères. Vous pouvez ajouter des liens.',
      autocomplete: 'off',
    },
  ];
  return (
    <form
      onSubmit={submit}
      noValidate
      aria-busy={pending}
      className="space-y-6"
    >
      <p className="text-xs text-white/60">
        Tous les champs sont obligatoires.
      </p>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const shared = {
            id: field.key,
            name: field.key,
            value: values[field.key],
            required: true,
            disabled: pending,
            maxLength: limits[field.key],
            autoComplete: field.autocomplete,
            onChange: (
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => change(field.key, event.target.value),
            onBlur: () => blur(field.key),
            'aria-invalid': Boolean(errors[field.key]),
            'aria-describedby':
              [
                field.help ? `${field.key}-help` : '',
                errors[field.key] ? `${field.key}-error` : '',
              ]
                .filter(Boolean)
                .join(' ') || undefined,
            placeholder: field.placeholder,
            className: 'public-input',
          };
          return (
            <div
              key={field.key}
              className={
                field.key === 'subject' || field.key === 'message'
                  ? 'sm:col-span-2'
                  : ''
              }
            >
              <label
                htmlFor={field.key}
                className="mb-2 block text-sm font-medium text-white/85"
              >
                {field.label}
              </label>
              {field.key === 'message' ? (
                <textarea
                  {...shared}
                  className="public-input min-h-40 resize-y"
                  rows={5}
                />
              ) : (
                <input
                  {...shared}
                  type={field.key === 'email' ? 'email' : 'text'}
                  inputMode={field.key === 'email' ? 'email' : 'text'}
                />
              )}
              {field.help && (
                <p
                  id={`${field.key}-help`}
                  className="mt-2 text-xs leading-5 text-white/55"
                >
                  {field.help}
                </p>
              )}
              {errors[field.key] && (
                <p
                  id={`${field.key}-error`}
                  className="mt-2 text-sm text-[#ff8992]"
                >
                  {errors[field.key]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="text-sm leading-6"
      >
        {pending && (
          <p className="text-white/70">Envoi de votre message en cours…</p>
        )}
        {state === 'success' && (
          <div className="border-l-2 border-green-400 pl-4 text-white/85">
            <p>
              Votre message a été envoyé. Une confirmation vous sera adressée
              par email.
            </p>
            <p className="mt-2">
              Vous pouvez maintenant{' '}
              <Link
                href="/realisations"
                className="underline underline-offset-4"
              >
                découvrir les réalisations
              </Link>{' '}
              en attendant notre échange.
            </p>
          </div>
        )}
        {state === 'error' && (
          <p className="text-[#ff8992]">
            Votre message n’a pas pu être envoyé. Vos informations sont
            conservées : réessayez ou écrivez à{' '}
            <a
              className="break-all underline underline-offset-4"
              href="mailto:contact@doensproduction.com"
            >
              contact@doensproduction.com
            </a>
            .
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="button-primary w-full sm:w-auto"
      >
        {pending ? 'Envoi…' : 'Envoyer le message'}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
