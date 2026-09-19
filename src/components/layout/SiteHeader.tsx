import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { StorefrontView } from '../../types';
import {
  ShoppingBag,
  Menu,
  X,
  PhoneCall,
  Activity,
  ShieldCheck,
  Search,
  ArrowRight
} from 'lucide-react';

interface SiteHeaderProps {
  activeView: StorefrontView;
  onNavigate: (view: StorefrontView) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ activeView, onNavigate }) => {
  const { tenant } = useTenant();
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: StorefrontView }[] = [
    { label: 'Programs & Treatments', view: 'products' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Clinical FAQs', view: 'faqs' },
    { label: 'Track Order', view: 'order-status' },
    { label: 'Patient Support', view: 'support' },
  ];

  const handleNavClick = (view: StorefrontView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors shadow-xs">
      {/* Top micro-banner for affiliate trust */}
      <div
        className="py-1 px-4 text-xs font-medium text-center text-white transition-colors duration-300 flex items-center justify-center gap-2"
        style={{ backgroundColor: tenant.primaryColor }}
      >
        <ShieldCheck className="w-3.5 h-3.5 opacity-90" />
        <span>{tenant.trustBadgeText || 'Licensed Telehealth Partner • 50-State Physician Review Network'}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <div
            id="brand-logo-trigger"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Custom stylized medical emblem themed to affiliate */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${tenant.primaryColor} 0%, ${tenant.secondaryColor} 100%)`,
              }}
            >
              <Activity className="w-6 h-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:opacity-90">
                {tenant.businessName}
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                Patient Storefront & Care
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-slate-900 font-semibold bg-slate-100 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  style={isActive ? { color: tenant.primaryColor } : {}}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Phone support chip (hidden on smallest screens) */}
            <a
              href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              title="Call clinical care support"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
              <span>{tenant.supportPhone}</span>
            </a>

            {/* Cart Button with Count Badge */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[11px] font-bold text-white flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-150"
                  style={{ backgroundColor: tenant.secondaryColor }}
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Primary CTA (Quick Start) */}
            <button
              id="header-cta-start"
              onClick={() => handleNavClick('products')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-98"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="pb-2 mb-2 border-b border-slate-100">
            <p className="text-xs text-slate-500 font-medium">{tenant.tagline}</p>
          </div>

          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                }`}
                style={isActive ? { color: tenant.primaryColor } : {}}
              >
                <span>{item.label}</span>
                {isActive && <ArrowRight className="w-4 h-4" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('products')}
              className="w-full py-3 rounded-xl text-sm font-bold text-white text-center shadow-sm"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              Get Started with a Program
            </button>

            <a
              href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
              className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl border border-slate-200 text-slate-700"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Support: {tenant.supportPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
