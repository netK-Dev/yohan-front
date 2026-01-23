'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
}

const MenuButton = ({
  onClick,
  isActive,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#ff0015] text-white'
        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
    } disabled:cursor-not-allowed disabled:opacity-50`}
  >
    {children}
  </button>
);

const Divider = () => <div className="mx-1 h-8 w-px bg-white/20" />;

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Décrivez le projet en détail...',
  disabled = false,
  error = false,
  maxLength = 5000,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#ff0015] underline hover:text-[#cc0011]',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const textLength = editor.getText().length;
      if (textLength <= maxLength) {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[150px] px-3 py-2',
      },
    },
  });

  // Synchroniser le contenu externe
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  // Mettre à jour l'état editable
  React.useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  const setLink = React.useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL du lien:', previousUrl || 'https://');

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="h-[200px] animate-pulse rounded-md border border-white/10 bg-black/60" />
    );
  }

  const charCount = editor.getText().length;

  return (
    <div
      className={`overflow-hidden rounded-md border transition-colors ${
        error
          ? 'border-red-500'
          : 'border-white/10 focus-within:border-white/30'
      }`}
    >
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-black/80 p-2">
        {/* Formatage texte */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          disabled={disabled}
          title="Gras (Ctrl+B)"
        >
          <strong>B</strong>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          disabled={disabled}
          title="Italique (Ctrl+I)"
        >
          <em>I</em>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          disabled={disabled}
          title="Souligné (Ctrl+U)"
        >
          <span className="underline">U</span>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          disabled={disabled}
          title="Barré"
        >
          <span className="line-through">S</span>
        </MenuButton>

        <Divider />

        {/* Titres */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          disabled={disabled}
          title="Titre H2"
        >
          H2
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          disabled={disabled}
          title="Titre H3"
        >
          H3
        </MenuButton>

        <Divider />

        {/* Listes */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          disabled={disabled}
          title="Liste à puces"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 4a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 5a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 5a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM3 5a1 1 0 100-2 1 1 0 000 2zm0 5a1 1 0 100-2 1 1 0 000 2zm0 5a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          disabled={disabled}
          title="Liste numérotée"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4.5a.5.5 0 01.5-.5H4a.5.5 0 01.5.5v2H5a.5.5 0 010 1H3a.5.5 0 010-1h.5v-2zM7 5a1 1 0 011-1h9a1 1 0 110 2H8a1 1 0 01-1-1zm0 5a1 1 0 011-1h9a1 1 0 110 2H8a1 1 0 01-1-1zm0 5a1 1 0 011-1h9a1 1 0 110 2H8a1 1 0 01-1-1zM3 9a1 1 0 011-1h.5a1 1 0 01.8 1.6L4 11h.5a.5.5 0 010 1H3a.5.5 0 01-.4-.8L4.5 9H4a1 1 0 01-1-1zm0 5.5a.5.5 0 01.5-.5H4a.5.5 0 01.4.8L3.5 16h.5a.5.5 0 01.4.8l-1 1.2a.5.5 0 01-.8-.6l.5-.6-.1-.1a.5.5 0 01.1-.7z" />
          </svg>
        </MenuButton>

        <Divider />

        {/* Lien */}
        <MenuButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          disabled={disabled}
          title="Lien hypertexte"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clipRule="evenodd"
            />
          </svg>
        </MenuButton>

        {/* Compteur de caractères */}
        <div className="ml-auto flex items-center text-xs text-white/50">
          <span className={charCount > maxLength * 0.9 ? 'text-amber-400' : ''}>
            {charCount}
          </span>
          <span className="mx-1">/</span>
          <span>{maxLength}</span>
        </div>
      </div>

      {/* Zone d'édition */}
      <EditorContent
        editor={editor}
        className="rich-text-editor bg-black/60 text-sm text-white"
      />
    </div>
  );
}
