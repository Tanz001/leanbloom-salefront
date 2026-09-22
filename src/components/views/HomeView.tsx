import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { PRODUCTS } from '../../data/products';
import { StorefrontView, Product } from '../../types';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Stethoscope,
  Lock,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { ProductCard } from '../ui/ProductCard';
import { PATIENT_TESTIMONIALS } from '../../data/faqs';
import { useCart } from '../../context/CartContext';

interface HomeViewProps {
  onNavigate: (view: StorefrontView) => void;
  onSelectProduct: (product: Product) => void;
}

const CATEGORY_CARDS = [
  {
    key: 'glp1' as const,
    title: 'Weight & GLP-1 programs',
    meta: 'Semaglutide · Tirzepatide · Oral options',
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    countLabel: (n: number) => `${n} programs · physician reviewed`
  },
  {
    key: 'longevity' as const,
    title: 'Longevity & peptides',
    meta: 'NAD+ · Sermorelin · Metabolic support',
    image:
      'https://images.unsplash.com/photo-1576073719676-aa955ec6b2cb?auto=format&fit=crop&w=1200&q=80',
    countLabel: (n: number) => `${n} protocols · discreet delivery`
  }
];

function HorizontalScroller({
  children,
  label
}: {
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="hidden sm:flex absolute -top-14 right-0 gap-2 z-10">
        <button
          type="button"
          aria-label={`Scroll ${label} left`}
          onClick={() => scrollBy(-1)}
          className="w-10 h-10 rounded-full border border-white/15 text-white/70 hover:text-[#c9a227] hover:border-[#c9a227]/50 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label={`Scroll ${label} right`}
          onClick={() => scrollBy(1)}
          className="w-10 h-10 rounded-full border border-white/15 text-white/70 hover:text-[#c9a227] hover:border-[#c9a227]/50 flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProduct }) => {
  const { tenant } = useTenant();
  const { addItem } = useCart();

  const openProduct = (p: Product) => {
    onSelectProduct(p);
    onNavigate('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = () => {
    onNavigate('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const glpCount = PRODUCTS.filter((p) => p.category === 'glp1' || p.category === 'oral').length;
  const longCount = PRODUCTS.filter(
    (p) => p.category === 'longevity' || p.category === 'metabolic'
  ).length;

  return (
    <div className="surface-dark">
      {/* Hero — typography first like DT Peptide */}
      <section className="pt-14 sm:pt-20 pb-8 sm:pb-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#c9a227] mb-4">
              {tenant.businessName}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] text-white leading-[1.08]">
              Physician-guided wellness programs
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/50 max-w-xl leading-relaxed">
              GLP-1 therapies · Longevity peptides · Clinical review via LeanBloom / MyDose
            </p>
          </motion.div>

          {/* Category cards — 2 large like template */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {CATEGORY_CARDS.map((card, i) => {
              const count = card.key === 'glp1' ? glpCount : longCount;
              return (
                <motion.button
                  key={card.key}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08 }}
                  onClick={openCategory}
                  className="group relative text-left rounded-2xl overflow-hidden border border-white/10 min-h-[280px] sm:min-h-[320px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227]"
                >
                  <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/55 to-[#07111f]/20" />
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <h2 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-white/55">
                      {card.countLabel(count)}
                    </p>
                    <p className="mt-1 text-xs text-white/40">{card.meta}</p>
                    <span className="mt-5 inline-flex items-center gap-2.5 text-sm font-semibold text-[#c9a227]">
                      View products
                      <span className="w-8 h-8 rounded-full border border-[#c9a227]/70 flex items-center justify-center group-hover:bg-[#c9a227] group-hover:text-[#07111f] transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Purchase with confidence — gold frame like template */}
      <section className="py-10 sm:py-14">
        <Container>
          <div className="gold-frame rounded-2xl px-6 py-8 sm:px-10 sm:py-10 bg-[#0d1a2e]/60">
            <h2 className="font-display text-2xl sm:text-3xl text-[#c9a227] text-center mb-8">
              Purchase with confidence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Stethoscope, title: 'Licensed review', desc: 'Clinicians evaluate every intake before prescribing.' },
                { icon: Truck, title: 'Discreet shipping', desc: 'Cold-chain packaging delivered to your door.' },
                { icon: Lock, title: 'Secure checkout', desc: 'Encrypted patient details and payment flow.' },
                { icon: ShieldCheck, title: 'Eligibility refund', desc: 'Full refund if you are not medically eligible.' }
              ].map((item) => (
                <div key={item.title} className="text-center sm:text-left">
                  <item.icon className="w-5 h-5 text-[#c9a227] mx-auto sm:mx-0 mb-3" />
                  <h3 className="font-display text-lg text-white">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-white/45 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Products horizontal */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:pr-28">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#c9a227] mb-2">
                Catalog
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-white">Featured programs</h2>
              <p className="mt-2 text-sm text-white/45 max-w-md">
                Transparent pricing for {tenant.businessName}. Swipe to explore.
              </p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('products')}>
              View all
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <HorizontalScroller label="programs">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[85vw] max-w-[300px] sm:w-[300px]"
              >
                <ProductCard
                  product={product}
                  onOpen={() => openProduct(product)}
                  onQuickAdd={() => addItem(product, 1)}
                />
              </div>
            ))}
          </HorizontalScroller>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16 border-y border-white/8">
        <Container>
          <div className="max-w-xl mb-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#c9a227] mb-2">
              Process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white">How care works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: '01', title: 'Choose a program', body: 'Select GLP-1 or longevity protocols with clear pricing.' },
              { n: '02', title: 'Complete intake', body: 'Share details so a licensed clinician can review safely.' },
              { n: '03', title: 'Clinical review', body: 'LeanBloom / MyDose evaluates — usually within 24–48 hours.' },
              { n: '04', title: 'Ship if approved', body: 'Pharmacy compounds and ships in discreet packaging.' }
            ].map((step) => (
              <div key={step.n} className="card-dark rounded-2xl p-5 sm:p-6">
                <span className="font-display text-3xl text-[#c9a227]/50">{step.n}</span>
                <h3 className="mt-2 font-display text-xl text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="ghost" className="text-[#c9a227]" onClick={() => onNavigate('how-it-works')}>
              Full care pathway
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-xl mb-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#c9a227] mb-2">
              Patients
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white">Trusted experiences</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 gold-frame rounded-2xl p-7 sm:p-9 bg-[#0d1a2e]">
              <Quote className="w-8 h-8 text-[#c9a227]/50 mb-4" />
              <p className="font-display text-xl sm:text-2xl text-white leading-snug">
                &ldquo;{PATIENT_TESTIMONIALS[0].quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a227]/20 text-[#c9a227] text-xs font-bold flex items-center justify-center">
                  {PATIENT_TESTIMONIALS[0].avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{PATIENT_TESTIMONIALS[0].name}</p>
                  <p className="text-xs text-white/40">
                    {PATIENT_TESTIMONIALS[0].location} · {PATIENT_TESTIMONIALS[0].program}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <HorizontalScroller label="testimonials">
                {PATIENT_TESTIMONIALS.slice(1).map((t) => (
                  <div
                    key={t.id}
                    className="snap-start shrink-0 w-[280px] card-dark rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-1 text-[#c9a227] mb-3">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-[#c9a227]" />
                      ))}
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed line-clamp-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-5 pt-4 border-t border-white/8">
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/40">{t.program}</p>
                    </div>
                  </div>
                ))}
              </HorizontalScroller>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="gold-frame rounded-2xl px-6 py-12 sm:px-12 text-center bg-gradient-to-b from-[#12233a] to-[#0d1a2e]">
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              Ready to begin with {tenant.businessName}?
            </h2>
            <p className="mt-3 text-sm text-white/45 max-w-lg mx-auto">
              Choose a program, complete intake, and continue into LeanBloom clinical review.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" variant="gold" onClick={() => onNavigate('products')}>
                Browse programs
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('support')}>
                Contact support
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/40">
              {['Licensed review', 'Discreet shipping', 'Secure checkout'].map((line) => (
                <li key={line} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a227]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
};
