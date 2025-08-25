'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { COLOR_COMBINATIONS } from '@/lib/colors';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const SUBJECTS = [
  { value: 'quote', label: 'Demande de devis' },
  { value: 'project', label: 'Nouveau projet' },
  { value: 'collab', label: 'Collaboration' },
  { value: 'other', label: 'Autre' },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get('type');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<string>('project');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pré-remplissage selon ?type=quote
  useEffect(() => {
    if (typeFromUrl && SUBJECTS.some(s => s.value === typeFromUrl)) {
      setSubject(typeFromUrl);
    }
  }, [typeFromUrl]);

  const isSubmitting = state === 'submitting';

  const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) nextErrors.fullName = 'Votre nom est requis';
    if (!email.trim() || !isValidEmail(email))
      nextErrors.email = 'Email invalide (ex. nom@domaine.com)';
    if (!message.trim() || message.trim().length < 10)
      nextErrors.message = 'Merci de préciser votre besoin (10+ caractères)';
    if (subject === 'quote' && !budget.trim())
      nextErrors.budget = 'Indiquez une fourchette de budget';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState('submitting');
    try {
      // Simulation d'envoi – à brancher sur un endpoint/API route plus tard
      await new Promise(resolve => setTimeout(resolve, 900));
      setState('success');
      setFullName('');
      setEmail('');
      setMessage('');
      setBudget('');
    } catch (err) {
      setState('error');
    }
  }

  const inputBase =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff0015]/30 focus:border-[#ff0015]/60';
  const errorText = 'mt-1 text-xs text-[#ff666c]';

  return (
    <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/80">
            Nom complet
          </label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className={inputBase}
            placeholder="Ex. Yohan Doens"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <p className={errorText}>{errors.fullName}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputBase}
            placeholder="vous@exemple.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className={errorText}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/80">Sujet</label>
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className={inputBase}
          >
            {SUBJECTS.map(s => (
              <option key={s.value} value={s.value} className="bg-[#000002]">
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/80">
            Budget (optionnel)
          </label>
          <input
            type="text"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            className={inputBase}
            placeholder="Ex. 2 000 - 5 000 €"
            aria-invalid={!!errors.budget}
          />
          {errors.budget && <p className={errorText}>{errors.budget}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/80">Message</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={`${inputBase} min-h-[140px]`}
          placeholder="Décrivez votre besoin, vos objectifs et vos références."
        />
        {errors.message && <p className={errorText}>{errors.message}</p>}
      </div>

      <div className="flex items-center justify-between gap-3">
        {state === 'success' && (
          <span className="text-sm text-green-400">
            Message envoyé avec succès !
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
          <span className="relative z-10">
            {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#e6000c] to-[#cc0009] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      </div>
    </form>
  );
}
