import React from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, getProductPriceForAffiliate } from '../../data/products';
import { TRUST_SIGNALS, PATIENT_TESTIMONIALS } from '../../data/faqs';
import { StorefrontView, Product } from '../../types';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Award,
  Truck,
  RefreshCw,
  Star,
  Clock,
  ChevronRight,
  Package,
  HeartHandshake
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: StorefrontView) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProduct }) => {
  const { tenant } = useTenant();
  const { addItem } = useCart();

  const featuredProducts = PRODUCTS.slice(0, 3);

  const handleStartProduct = (p: Product) => {
    onSelectProduct(p);
    onNavigate('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTrustIcon = (name: string) => {
    switch (name) {
      case 'UserCheck':
        return <Stethoscope className="w-5 h-5 text-emerald-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-sky-600" />;
      case 'Shield':
        return <Truck className="w-5 h-5 text-indigo-600" />;
      default:
        return <RefreshCw className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200/60 bg-gradient-to-b from-white via-white to-slate-50/50">
        {/* Soft background accents */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: tenant.secondaryColor }}
        />
        <div
          className="absolute top-1/2 -left-40 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: tenant.primaryColor }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Partner Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800 shadow-2xs">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tenant.secondaryColor }}
                />
                <span className="text-slate-600">{tenant.businessName}</span>
                <span className="text-slate-400">•</span>
                <span className="font-bold text-slate-900">Physician-Supervised Telehealth</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.12]">
                Physician-guided weight loss & vitality,{' '}
                <span
                  className="relative inline-block underline decoration-2 underline-offset-8"
                  style={{ color: tenant.primaryColor, textDecorationColor: tenant.secondaryColor }}
                >
                  tailored to your biology.
                </span>
              </h1>

              {/* Supporting Line */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {tenant.welcomeMessage ||
                  'Access compounded GLP-1 peptide therapy and cellular longevity protocols. Formulated by accredited 503A/503B pharmacies with asynchronous physician review.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-view-programs-btn"
                  onClick={() => onNavigate('products')}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-base text-white shadow-lg transition-all hover:brightness-105 active:scale-98 flex items-center justify-center gap-2 group"
                  style={{ backgroundColor: tenant.primaryColor }}
                >
                  <span>View Treatment Programs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  id="hero-how-it-works-btn"
                  onClick={() => onNavigate('how-it-works')}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-base text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  How It Works
                </button>
              </div>

              {/* Micro-guarantees list */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No waiting rooms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>50-State licensed doctors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Discreet cold shipping</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Card with Medical Trust Overlays */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
                  alt="Clinical Care and Medical Telehealth"
                  className="w-full h-[400px] sm:h-[460px] object-cover"
                />

                {/* Glassmorphic Trust Card Floating Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/70 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      LeanBloom / MyDose Clinical Review
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      503A Sterile
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    Prescriptions evaluated asynchronously by board-certified physicians licensed in your state.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Row Section */}
      <section className="py-10 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_SIGNALS.map((signal, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start gap-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-xl bg-white shadow-2xs shrink-0">
                  {getTrustIcon(signal.icon)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 mb-0.5">
                    {signal.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2 text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Evidence-Backed Protocols</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Featured Clinical Programs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Select your personalized treatment. Every order includes medical consultation, full injection supplies, and insulated priority cold delivery.
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 font-semibold text-sm hover:underline self-start md:self-auto"
            style={{ color: tenant.primaryColor }}
          >
            <span>Explore All 6 Programs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => {
            const price = getProductPriceForAffiliate(product, tenant.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Image & Badge */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div
                      className="absolute top-3 left-3 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-2xs">
                    {product.supplyDuration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-display font-bold text-xl text-slate-900 mt-1 mb-2 leading-snug group-hover:text-slate-800">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    <div className="mt-4 space-y-1.5">
                      {product.benefits.slice(0, 2).map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Program Rate</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-bold text-2xl text-slate-900">
                          ${price}
                        </span>
                        <span className="text-xs text-slate-500">/ 30 days</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartProduct(product)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-98 flex items-center gap-1.5"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Teaser */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-400">
              Streamlined Patient Journey
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 tracking-tight">
              From storefront to physician review in minutes
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              We eliminated bureaucratic clinic barriers. Seamlessly transition from product selection to your personalized medical intake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4"
                style={{ backgroundColor: tenant.secondaryColor }}
              >
                1
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                1. Select Treatment Program
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Browse our customized compounded GLP-1, peptide, and longevity formulations with transparent affiliate pricing.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4"
                style={{ backgroundColor: tenant.secondaryColor }}
              >
                2
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                2. LeanBloom Clinical Intake
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete your asynchronous medical questionnaire. A licensed provider evaluates your contraindications and approves medication.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4"
                style={{ backgroundColor: tenant.secondaryColor }}
              >
                3
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                3. Pharmacy Cold-Chain Delivery
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sterile pharmacy compounding with refrigerated express dispatch directly to your front door in discreet packaging.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <span>Explore the comprehensive 5-step clinical protocol</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials / Patient Social Proof */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Real Patient Experiences
          </span>
          <h2 className="font-display font-bold text-3xl text-slate-900 mt-2">
            Trusted by patients pursuing genuine metabolic wellness
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PATIENT_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                  <span className="text-xs text-slate-500">{t.location}</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  {t.program}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final High-Conversion CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8"
          style={{
            background: `linear-gradient(135deg, ${tenant.primaryColor} 0%, ${tenant.secondaryColor} 100%)`,
          }}
        >
          <div className="space-y-3 max-w-xl">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-xs">
              Take the Next Step
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
              Begin your physician-reviewed wellness journey with {tenant.businessName}
            </h2>
            <p className="text-white/90 text-sm leading-relaxed">
              No hidden subscriptions. Free cold-chain priority shipping and complete injection kits included.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('products')}
              className="px-8 py-4 rounded-xl font-bold text-slate-900 bg-white shadow-lg hover:bg-slate-100 transition-all active:scale-98 text-sm"
            >
              Explore All Treatments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
