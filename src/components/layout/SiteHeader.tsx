import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { StorefrontView } from '../../types';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';

interface SiteHeaderProps {
  activeView: StorefrontView;
  onNavigate: (view: StorefrontView) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ activeView, onNavigate }) => {
  const { tenant } = useTenant();
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: StorefrontView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Programs', view: 'products' },
    { label: 'How it works', view: 'how-it-works' },
    { label: 'FAQs', view: 'faqs' },
    { label: 'Support', view: 'support' }
  ];

  const go = (view: StorefrontView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
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
    <header className="sticky top-0 z-40">
      {/* Utility bar */}
      <div className="bg-black/80 border-b border-white/5 text-[11px] text-white/55">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <p className="hidden sm:block">
            Licensed provider review · Discreet shipping · Secure checkout
          </p>
          <p className="sm:hidden">Licensed care · Discreet shipping</p>
          <p>Clinical review via LeanBloom / MyDose</p>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[#07111f]/95 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[4.25rem]">
            <button type="button" onClick={() => go('home')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg border border-[#c9a227]/50 flex items-center justify-center text-[#c9a227] font-display text-lg font-bold bg-[#c9a227]/10">
                {initials}
              </div>
              <span className="font-display text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#c9a227] transition-colors">
                {tenant.businessName}
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active =
                  activeView === item.view ||
                  (item.view === 'products' && activeView === 'product-detail');
                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => go(item.view)}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                      active ? 'text-white' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 bg-[#c9a227] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
                className="hidden xl:inline-flex items-center gap-2 text-xs font-medium text-white/55 hover:text-white px-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#c9a227]" />
                {tenant.supportPhone}
              </a>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a227]/70 text-sm font-semibold text-white hover:bg-[#c9a227]/10 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#c9a227]" />
                <span className="hidden sm:inline">Cart</span>
                <span className="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-[#c9a227] text-[#07111f] text-[11px] font-bold flex items-center justify-center">
                  {totalCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full border border-white/15 text-white/80"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0d1a2e] border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => go(item.view)}
                  className={`w-full text-left px-3 py-3 rounded-xl text-sm font-semibold ${
                    activeView === item.view
                      ? 'text-[#c9a227] bg-[#c9a227]/10'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
