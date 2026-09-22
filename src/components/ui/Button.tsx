import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'white' | 'gold';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  fullWidth,
  className = '',
  children,
  style,
  ...props
}) => {
  const sizes = {
    sm: 'px-3.5 py-2 text-xs rounded-full gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-full gap-2',
    lg: 'px-7 py-3.5 text-[15px] rounded-full gap-2'
  };

  const variants: Record<ButtonVariant, string> = {
    primary: 'text-white font-semibold bg-[#12233a] border border-white/10 hover:bg-[#182b45]',
    secondary: 'text-[#07111f] font-semibold bg-[#c9a227] hover:bg-[#d4af37]',
    gold: 'text-[#07111f] font-semibold bg-[#c9a227] hover:bg-[#d4af37] shadow-[0_0_0_1px_rgba(201,162,39,0.3)]',
    outline:
      'font-semibold border border-[#c9a227]/70 text-[#c9a227] bg-transparent hover:bg-[#c9a227]/10',
    ghost: 'font-semibold text-white/70 hover:text-white hover:bg-white/5',
    white: 'font-semibold bg-white text-[#07111f] hover:bg-white/95'
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${sizes[size]} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
