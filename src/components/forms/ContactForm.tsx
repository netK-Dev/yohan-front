'use client';

// import
import { useState, useEffect } from 'react';
import { COLOR_COMBINATIONS } from '@/lib/colors';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({
    fullName: false,
    email: false,
    subject: false,
    message: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isSubmitting = state === 'submitting';

  const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

  const SUBJECT_MAX = 120;
  const MESSAGE_MAX = 1000;

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) nextErrors.fullName = 'Votre nom est requis';
    if (!email.trim() || !isValidEmail(email))
      nextErrors.email = 'Email invalide (ex. nom@domaine.com)';
    if (!subject.trim()) nextErrors.subject = 'Le sujet est requis';
    if (!message.trim() || message.trim().length < 10)
      nextErrors.message = 'Merci de préciser votre besoin (10+ caractères)';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Anti-spam: si le champ caché est rempli, on termine silencieusement
    if (honeypot.trim().length > 0) {
      setState('success');
      return;
    }
    if (!validate()) return;
    setState('submitting');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          subject,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setState('success');
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTouched({
        fullName: false,
        email: false,
        subject: false,
        message: false,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setState('error');
    }
  }

  const inputBase =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff0015]/30 focus:border-[#ff0015]/60';
  const errorText = 'mt-1 text-xs text-[#ff666c]';

  if (!isMounted) {
    return (
      <div className="space-y-5 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white/80">
              Nom complet
            </label>
            <div className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white/60 backdrop-blur-sm">
              Chargement...
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/80">Email</label>
            <div className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white/60 backdrop-blur-sm">
              Chargement...
            </div>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/80">Sujet</label>
          <div className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white/60 backdrop-blur-sm">
            Chargement...
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/80">Message</label>
          <div className="min-h-[140px] w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white/60 backdrop-blur-sm">
            Chargement...
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={isSubmitting}
      className="space-y-5 sm:space-y-6"
    >
      {/* Champ honeypot caché pour piéger les bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm text-white/80"
          >
            Nom complet
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={e => {
              setFullName(e.target.value);
              if (touched.fullName) validate();
            }}
            onBlur={() => {
              setTouched(prev => ({ ...prev, fullName: true }));
              validate();
            }}
            className={inputBase}
            placeholder="Ex. Yohan Doens"
            aria-invalid={!!errors.fullName}
            aria-describedby="fullName-help fullName-error"
            required
          />
          <p id="fullName-help" className="mt-1 text-xs text-white/60">
            Votre nom complet tel qu&apos;il apparaîtra dans nos échanges.
          </p>
          {errors.fullName && (
            <p id="fullName-error" className={errorText}>
              {errors.fullName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-white/80">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (touched.email) validate();
            }}
            onBlur={() => {
              setTouched(prev => ({ ...prev, email: true }));
              validate();
            }}
            className={inputBase}
            placeholder="vous@exemple.com"
            aria-invalid={!!errors.email}
            aria-describedby="email-help email-error"
            inputMode="email"
            autoComplete="email"
            required
          />
          <p id="email-help" className="mt-1 text-xs text-white/60">
            Nous ne partagerons jamais votre email.
          </p>
          {errors.email && (
            <p id="email-error" className={errorText}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm text-white/80">
          Sujet
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={e => {
            const value = e.target.value.slice(0, SUBJECT_MAX);
            setSubject(value);
            if (touched.subject) validate();
          }}
          onBlur={() => {
            setTouched(prev => ({ ...prev, subject: true }));
            validate();
          }}
          className={inputBase}
          placeholder="Ex. Demande de devis, Nouveau projet, Collaboration..."
          aria-invalid={!!errors.subject}
          aria-describedby="subject-help subject-counter subject-error"
          maxLength={SUBJECT_MAX}
          required
        />
        <div className="mt-1 flex items-center justify-between">
          <p id="subject-help" className="text-xs text-white/60">
            En quelques mots clairs.
          </p>
          <span id="subject-counter" className="text-xs text-white/50">
            {subject.length} / {SUBJECT_MAX}
          </span>
        </div>
        {errors.subject && (
          <p id="subject-error" className={errorText}>
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-white/80">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={e => {
            const value = e.target.value.slice(0, MESSAGE_MAX);
            setMessage(value);
            if (touched.message) validate();
          }}
          onBlur={() => {
            setTouched(prev => ({ ...prev, message: true }));
            validate();
          }}
          className={`${inputBase} min-h-[140px]`}
          placeholder="Décrivez votre besoin, vos objectifs et vos références."
          aria-invalid={!!errors.message}
          aria-describedby="message-help message-counter message-error"
          maxLength={MESSAGE_MAX}
          required
        />
        <div className="mt-1 flex items-center justify-between">
          <p id="message-help" className="text-xs text-white/60">
            Au moins 10 caractères. Liens bienvenus.
          </p>
          <span id="message-counter" className="text-xs text-white/50">
            {message.length} / {MESSAGE_MAX}
          </span>
        </div>
        {errors.message && (
          <p id="message-error" className={errorText}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        {state === 'success' && (
          <span className="text-sm text-green-400">
            Message envoyé avec succès ! Vous recevrez une confirmation par
            email.
          </span>
        )}
        {state === 'error' && (
          <span className="text-sm text-[#ff666c]">
            Une erreur est survenue. Réessayez.
          </span>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group relative ml-auto overflow-hidden rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow}`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting && (
              <svg
                className="h-4 w-4 animate-spin text-white"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#e6000c] to-[#cc0009] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      </div>
    </form>
  );
}
