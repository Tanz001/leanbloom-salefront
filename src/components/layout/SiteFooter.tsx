import React from 'react';
import { useTenant } from '../../context/TenantContext';
import { StorefrontView } from '../../types';
import { Mail, Phone } from 'lucide-react';
import { Container } from '../ui/Container';

interface SiteFooterProps {
  onNavigate: (view: StorefrontView) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();

  const link = (view: StorefrontView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initials = tenant.businessName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <footer className="bg-black/40 border-t border-white/8 pt-14 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-[#c9a227]/50 flex items-center justify-center text-[#c9a227] font-display text-lg font-bold">
                {initials}
              </div>
              <span className="font-display text-2xl text-white">{tenant.businessName}</span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed max-w-md">
              White-label patient care powered by LeanBloom. Medical decisions are made by licensed providers through MyDose — not this storefront alone.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9a227] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-white/55">
              {(
                [
                  ['products', 'Programs'],
                  ['how-it-works', 'How it works'],
                  ['faqs', 'FAQs'],
                  ['support', 'Support']
                ] as const
              ).map(([view, label]) => (
                <li key={view}>
                  <button type="button" onClick={() => link(view)} className="hover:text-white transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9a227] mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <a href={`mailto:${tenant.supportEmail}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-[#c9a227]" />
                  {tenant.supportEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c9a227]" />
                  {tenant.supportPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/35">
          <p>
            © {new Date().getFullYear()} {tenant.businessName}
          </p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => link('privacy')} className="hover:text-white/60">
              Privacy
            </button>
            <button type="button" onClick={() => link('terms')} className="hover:text-white/60">
              Terms
            </button>
            {!tenant.hidePoweredBy && <span>Powered by LeanBloom</span>}
          </div>
        </div>
      </Container>
    </footer>
  );
};
