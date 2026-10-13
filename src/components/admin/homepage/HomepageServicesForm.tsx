'use client';

import { useState, useId, useRef } from 'react';
import type { ServicesContent, ServiceItem } from '@/lib/types/page-content';
import { ServicesContentSchema } from '@/lib/types/page-content';
import FormField from '@/components/admin/FormField';
import SafeImage from '@/components/ui/SafeImage';
import FileUploader from '@/components/ui/FileUploader';

interface HomepageServicesFormProps {
  initialContent: ServicesContent;
  onSave: (content: ServicesContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  errorMessage?: string;
  onDirty?: () => void;
}

export default function HomepageServicesForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
  errorMessage,
  onDirty,
}: HomepageServicesFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [validationError, setValidationError] = useState('');
  const accordionId = useId();
  const [previousContent, setPreviousContent] = useState(initialContent);
  const [form, setForm] = useState<ServicesContent>(initialContent);
  const [uploading, setUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  if (previousContent !== initialContent) {
    setPreviousContent(initialContent);
    setForm(initialContent);
    setHasChanges(false);
  }

  function updateHeader<K extends keyof Omit<ServicesContent, 'services'>>(
    key: K,
    value: ServicesContent[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
    onDirty?.();
  }

  function updateService(index: number, updates: Partial<ServiceItem>) {
    const newServices = [...form.services];
    newServices[index] = { ...newServices[index], ...updates };
    setForm((prev) => ({ ...prev, services: newServices }));
    setHasChanges(true);
    onDirty?.();
  }

  function updateTag(serviceIndex: number, tagIndex: number, value: string) {
    const newServices = [...form.services];
    const newTags = [...newServices[serviceIndex].tags];
    newTags[tagIndex] = value;
    newServices[serviceIndex] = { ...newServices[serviceIndex], tags: newTags };
    setForm((prev) => ({ ...prev, services: newServices }));
    setHasChanges(true);
    onDirty?.();
  }

  function addTag(serviceIndex: number) {
    const service = form.services[serviceIndex];
    if (service.tags.length >= 6) return;
    updateService(serviceIndex, { tags: [...service.tags, ''] });
  }

  function removeTag(serviceIndex: number, tagIndex: number) {
    const service = form.services[serviceIndex];
    if (service.tags.length <= 1) return;
    updateService(serviceIndex, {
      tags: service.tags.filter((_, i) => i !== tagIndex),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSaving) return;
    const result = ServicesContentSchema.safeParse(form);
    if (!result.success) {
      const issue = result.error.issues[0];
      const serviceIndex =
        issue.path[0] === 'services' && typeof issue.path[1] === 'number'
          ? issue.path[1]
          : null;
      if (serviceIndex !== null) setExpandedCard(serviceIndex);
      setValidationError(
        serviceIndex !== null
          ? `Vérifiez les champs obligatoires du service ${serviceIndex + 1}, son image et ses tags.`
          : 'Vérifiez les champs obligatoires de l’en-tête.'
      );
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(':invalid')?.focus()
      );
      return;
    }
    setValidationError('');
    const success = await onSave(form);
    if (success) setHasChanges(false);
  }

  async function handleReset() {
    if (isSaving) return;
    if (!confirm('Rétablir les valeurs par défaut pour la section Services ?'))
      return;
    const success = await onReset();
    if (success) setHasChanges(false);
  }

  const isSaving = saveStatus === 'saving' || uploading;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-busy={isSaving}
      className="space-y-6"
    >
      <p className="text-xs text-white/65">
        Les champs marqués * sont obligatoires. Enregistrez chaque section pour
        publier vos modifications.
      </p>
      {validationError && (
        <p role="alert" className="text-sm text-red-300">
          {validationError}
        </p>
      )}
      <fieldset disabled={isSaving} className="min-w-0 space-y-6">
        {/* En-tête de section */}
        <div className="rounded-lg border border-white/5 bg-white/5 p-4">
          <h4 className="mb-3 text-xs font-semibold tracking-wider text-white/65 uppercase">
            En-tête de la section
          </h4>
          <div className="space-y-4">
            <FormField label="Badge *">
              <input
                type="text"
                value={form.badge}
                required
                onChange={(e) => updateHeader('badge', e.target.value)}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                maxLength={50}
                disabled={isSaving}
              />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Titre *">
                <input
                  type="text"
                  value={form.title}
                  required
                  onChange={(e) => updateHeader('title', e.target.value)}
                  className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                  maxLength={50}
                  disabled={isSaving}
                />
              </FormField>
              <FormField label="Titre accentué *">
                <input
                  type="text"
                  value={form.titleHighlight}
                  required
                  onChange={(e) =>
                    updateHeader('titleHighlight', e.target.value)
                  }
                  className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                  maxLength={50}
                  disabled={isSaving}
                />
              </FormField>
            </div>

            <FormField label="Sous-titre *">
              <textarea
                value={form.subtitle}
                required
                onChange={(e) => updateHeader('subtitle', e.target.value)}
                className="min-h-[60px] w-full min-w-0 resize-y rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                maxLength={300}
                rows={2}
                disabled={isSaving}
              />
            </FormField>
          </div>
        </div>

        {/* Cartes de services */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold tracking-wider text-white/65 uppercase">
            Cartes de services ({form.services.length})
          </h4>

          {form.services.map((service, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
            >
              {/* Header de carte */}
              <button
                type="button"
                id={`${accordionId}-${index}-trigger`}
                aria-expanded={expandedCard === index}
                aria-controls={`${accordionId}-${index}-panel`}
                onClick={() =>
                  setExpandedCard(expandedCard === index ? null : index)
                }
                className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {service.image && (
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded">
                      <SafeImage
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium break-words text-white/90">
                    {service.title || `Service ${index + 1}`}
                  </span>
                </div>
                <svg
                  className={`h-4 w-4 shrink-0 text-white/65 transition-transform duration-200 ${
                    expandedCard === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Contenu de la carte */}
              {
                <fieldset
                  disabled={isSaving || expandedCard !== index}
                  hidden={expandedCard !== index}
                  id={`${accordionId}-${index}-panel`}
                  role="region"
                  aria-labelledby={`${accordionId}-${index}-trigger`}
                  className="space-y-4 border-t border-white/10 px-4 py-4"
                >
                  <FormField label="Titre du service *">
                    <input
                      type="text"
                      required
                      value={service.title}
                      onChange={(e) =>
                        updateService(index, { title: e.target.value })
                      }
                      className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                      maxLength={60}
                      disabled={isSaving}
                    />
                  </FormField>

                  <FormField label="Description *">
                    <textarea
                      required
                      value={service.description}
                      onChange={(e) =>
                        updateService(index, { description: e.target.value })
                      }
                      className="min-h-[80px] w-full min-w-0 resize-y rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                      maxLength={500}
                      rows={3}
                      disabled={isSaving}
                    />
                    <p className="mt-1 text-xs text-white/65">
                      {service.description.length}/500 caractères
                    </p>
                  </FormField>

                  <FormField
                    label="Identifiant de catégorie *"
                    hint="Utilisé dans le lien (ex: 3d-vfx)"
                  >
                    <input
                      type="text"
                      required
                      value={service.categorySlug}
                      onChange={(e) =>
                        updateService(index, { categorySlug: e.target.value })
                      }
                      className="min-h-11 w-full min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                      disabled={isSaving}
                    />
                  </FormField>

                  {/* Image */}
                  <FormField label="Image *">
                    {service.image && (
                      <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg">
                        <SafeImage
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <FileUploader
                      disabled={isSaving}
                      onBusyChange={setUploading}
                      accept="image/*"
                      maxSizeMb={5}
                      label={`Image du service ${index + 1}`}
                      onUploaded={(url) => updateService(index, { image: url })}
                    />
                  </FormField>

                  {/* Tags */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium break-words text-white/90">
                        Tags *
                      </h3>
                      {service.tags.length < 6 && (
                        <button
                          type="button"
                          onClick={() => addTag(index)}
                          disabled={isSaving}
                          className="min-h-11 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80 transition hover:bg-white/20 disabled:opacity-50"
                        >
                          + Ajouter
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className="flex items-center gap-1">
                          <label className="block min-w-0">
                            <span className="sr-only">
                              Tag {tagIndex + 1} du service {index + 1}
                            </span>
                            <input
                              type="text"
                              required
                              value={tag}
                              onChange={(e) =>
                                updateTag(index, tagIndex, e.target.value)
                              }
                              className="min-h-11 w-32 min-w-0 rounded-md border border-white/20 bg-black/30 px-3 py-2.5 text-center text-xs text-white outline-none placeholder:text-white/65 focus:border-white/60 focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                              maxLength={30}
                              disabled={isSaving}
                              placeholder="Tag"
                            />
                          </label>
                          {service.tags.length > 1 && (
                            <button
                              type="button"
                              aria-label={`Supprimer le tag ${tagIndex + 1} du service ${index + 1}`}
                              onClick={() => removeTag(index, tagIndex)}
                              disabled={isSaving}
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded text-red-400 transition hover:bg-red-600/20 disabled:opacity-50"
                            >
                              <svg
                                className="h-3.5 w-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </fieldset>
              }
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="min-h-11 rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 disabled:opacity-50"
          >
            Réinitialiser par défaut
          </button>
          <button
            type="submit"
            disabled={isSaving || !hasChanges}
            className={`min-h-11 rounded-md bg-[#cc0009] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b30006] disabled:opacity-50`}
          >
            {uploading
              ? 'Import en cours…'
              : isSaving
                ? 'Enregistrement…'
                : 'Enregistrer la section Services'}
          </button>
        </div>
      </fieldset>
      <p
        role={saveStatus === 'error' ? 'alert' : 'status'}
        className="text-sm text-white/80"
      >
        {saveStatus === 'saving'
          ? 'Enregistrement en cours…'
          : saveStatus === 'success'
            ? 'Section enregistrée.'
            : saveStatus === 'error'
              ? errorMessage ||
                'La section n’a pas été enregistrée. Vérifiez les champs et réessayez.'
              : hasChanges
                ? 'Modifications non enregistrées.'
                : ''}
      </p>
    </form>
  );
}
