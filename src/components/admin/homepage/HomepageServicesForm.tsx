'use client';

import { useState, useEffect } from 'react';
import type { ServicesContent, ServiceItem } from '@/lib/types/page-content';
import { COLOR_COMBINATIONS } from '@/lib/colors';
import SafeImage from '@/components/ui/SafeImage';
import FileUploader from '@/components/ui/FileUploader';

interface HomepageServicesFormProps {
  initialContent: ServicesContent;
  onSave: (content: ServicesContent) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
}

export default function HomepageServicesForm({
  initialContent,
  onSave,
  onReset,
  saveStatus,
}: HomepageServicesFormProps) {
  const [form, setForm] = useState<ServicesContent>(initialContent);
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    setForm(initialContent);
    setHasChanges(false);
  }, [initialContent]);

  function updateHeader<K extends keyof Omit<ServicesContent, 'services'>>(
    key: K,
    value: ServicesContent[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }

  function updateService(index: number, updates: Partial<ServiceItem>) {
    const newServices = [...form.services];
    newServices[index] = { ...newServices[index], ...updates };
    setForm((prev) => ({ ...prev, services: newServices }));
    setHasChanges(true);
  }

  function updateTag(serviceIndex: number, tagIndex: number, value: string) {
    const newServices = [...form.services];
    const newTags = [...newServices[serviceIndex].tags];
    newTags[tagIndex] = value;
    newServices[serviceIndex] = { ...newServices[serviceIndex], tags: newTags };
    setForm((prev) => ({ ...prev, services: newServices }));
    setHasChanges(true);
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
    const success = await onSave(form);
    if (success) setHasChanges(false);
  }

  async function handleReset() {
    if (!confirm('Rétablir les valeurs par défaut pour la section Services ?'))
      return;
    const success = await onReset();
    if (success) setHasChanges(false);
  }

  const isSaving = saveStatus === 'saving';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* En-tête de section */}
      <div className="rounded-lg border border-white/5 bg-white/5 p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          En-tête de la section
        </h4>
        <div className="space-y-4">
          <FieldGroup label="Badge">
            <input
              type="text"
              value={form.badge}
              onChange={(e) => updateHeader('badge', e.target.value)}
              className="admin-input"
              maxLength={50}
              disabled={isSaving}
            />
          </FieldGroup>

          <div className="grid gap-4 sm:grid-cols-2">
            <FieldGroup label="Titre">
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateHeader('title', e.target.value)}
                className="admin-input"
                maxLength={50}
                disabled={isSaving}
              />
            </FieldGroup>
            <FieldGroup label="Titre accentué">
              <input
                type="text"
                value={form.titleHighlight}
                onChange={(e) => updateHeader('titleHighlight', e.target.value)}
                className="admin-input"
                maxLength={50}
                disabled={isSaving}
              />
            </FieldGroup>
          </div>

          <FieldGroup label="Sous-titre">
            <textarea
              value={form.subtitle}
              onChange={(e) => updateHeader('subtitle', e.target.value)}
              className="admin-input min-h-[60px] resize-y"
              maxLength={300}
              rows={2}
              disabled={isSaving}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Cartes de services */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
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
              onClick={() =>
                setExpandedCard(expandedCard === index ? null : index)
              }
              className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                {service.image && (
                  <div className="relative h-8 w-8 overflow-hidden rounded">
                    <SafeImage
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                )}
                <span className="text-sm font-medium text-white/90">
                  {service.title || `Service ${index + 1}`}
                </span>
              </div>
              <svg
                className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
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
            {expandedCard === index && (
              <div className="space-y-4 border-t border-white/10 px-4 py-4">
                <FieldGroup label="Titre du service">
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) =>
                      updateService(index, { title: e.target.value })
                    }
                    className="admin-input"
                    maxLength={60}
                    disabled={isSaving}
                  />
                </FieldGroup>

                <FieldGroup label="Description">
                  <textarea
                    value={service.description}
                    onChange={(e) =>
                      updateService(index, { description: e.target.value })
                    }
                    className="admin-input min-h-[80px] resize-y"
                    maxLength={500}
                    rows={3}
                    disabled={isSaving}
                  />
                  <p className="mt-1 text-xs text-white/40">
                    {service.description.length}/500 caractères
                  </p>
                </FieldGroup>

                <FieldGroup label="Slug catégorie" hint="Utilisé dans le lien (ex: 3d-vfx)">
                  <input
                    type="text"
                    value={service.categorySlug}
                    onChange={(e) =>
                      updateService(index, { categorySlug: e.target.value })
                    }
                    className="admin-input"
                    disabled={isSaving}
                  />
                </FieldGroup>

                {/* Image */}
                <FieldGroup label="Image">
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
                    accept="image/*"
                    maxSizeMb={5}
                    onUploaded={(url) =>
                      updateService(index, { image: url })
                    }
                  />
                </FieldGroup>

                {/* Tags */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-white/90">
                      Tags
                    </label>
                    {service.tags.length < 6 && (
                      <button
                        type="button"
                        onClick={() => addTag(index)}
                        disabled={isSaving}
                        className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80 transition hover:bg-white/20 disabled:opacity-50"
                      >
                        + Ajouter
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <div key={tagIndex} className="flex items-center gap-1">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) =>
                            updateTag(index, tagIndex, e.target.value)
                          }
                          className="admin-input w-32 text-center text-xs"
                          maxLength={30}
                          disabled={isSaving}
                          placeholder="Tag"
                        />
                        {service.tags.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTag(index, tagIndex)}
                            disabled={isSaving}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-red-400 transition hover:bg-red-600/20 disabled:opacity-50"
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
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSaving}
          className="rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 disabled:opacity-50"
        >
          Réinitialiser par défaut
        </button>
        <button
          type="submit"
          disabled={isSaving || !hasChanges}
          className={`rounded-md px-6 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow}`}
        >
          {isSaving ? 'Sauvegarde...' : 'Enregistrer la section Services'}
        </button>
      </div>
    </form>
  );
}

function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/90">{label}</label>
      {hint && <p className="text-xs text-white/40">{hint}</p>}
      {children}
    </div>
  );
}
