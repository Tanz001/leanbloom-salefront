import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'brand' | 'soft' | 'success' | 'neutral' | 'gold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, tone = 'gold', className = '' }) => {
  const tones = {
    brand: 'bg-[var(--brand-secondary)] text-[#07111f]',
    soft: 'bg-[var(--brand-secondary)]/15 text-[var(--brand-secondary)]',
    gold: 'bg-[var(--brand-secondary)]/15 text-[var(--brand-secondary)]',
    success: 'bg-emerald-500/15 text-emerald-300',
    neutral: 'bg-white/8 text-white/70'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-md ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};
