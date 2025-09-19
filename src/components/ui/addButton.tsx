import React from 'react';
import { COLOR_COMBINATIONS } from '@/lib/colors';

interface AddButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({
  size = 'md',
  onClick,
  disabled = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${sizeClasses[size]} ${COLOR_COMBINATIONS.primaryButton.background} ${COLOR_COMBINATIONS.primaryButton.text} ${COLOR_COMBINATIONS.primaryButton.hover} ${COLOR_COMBINATIONS.primaryButton.shadow} ${COLOR_COMBINATIONS.primaryButton.focus} flex transform items-center justify-center rounded-lg border-0 font-semibold transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100 ${className} `}
      aria-label="Ajouter"
    >
      <svg
        className={iconSizeClasses[size]}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};

export default AddButton;
