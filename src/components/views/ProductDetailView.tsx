import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { getProductPriceForAffiliate, PRODUCTS } from '../../data/products';
import { Product, StorefrontView } from '../../types';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  ShoppingBag,
  AlertCircle,
  Calendar,
  Package,
  Stethoscope
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProductCard } from '../ui/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  onNavigate: (view: StorefrontView) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  onSelectProduct
}) => {
  const { tenant } = useTenant();
  const { addItem, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'included' | 'safety'>('overview');

  const price = getProductPriceForAffiliate(product, tenant.id);
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    addItem(product, quantity);
    onNavigate('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openRelated = (p: Product) => {
    onSelectProduct(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="surface-dark min-h-screen pb-28 sm:pb-16">
      <div className="border-b border-white/8">
        <Container className="py-4">
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-[#c9a227] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to programs
          </button>
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#0a1525] aspect-[4/3] border border-white/10">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/80 to-transparent" />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge tone="gold">{product.badge}</Badge>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl card-dark text-sm text-white/60">
                <Truck className="w-4 h-4 text-[#c9a227] shrink-0" />
                Cold-chain shipping
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl card-dark text-sm text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#c9a227] shrink-0" />
                Provider reviewed
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c9a227]/80">
              {product.categoryLabel}
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="mt-3 text-white/50 leading-relaxed">{product.shortDescription}</p>

            <div className="mt-6 p-5 rounded-2xl gold-frame bg-[#0d1a2e]/80">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-white/40">{tenant.businessName} rate</p>
                  <p className="font-display text-4xl text-white tabular-nums mt-0.5">
                    ${price}
                    <span className="text-sm font-sans font-medium text-white/40 ml-1.5">
                      /{' '}
                      {product.supplyDuration.toLowerCase().includes('day') ? 'protocol' : 'supply'}
                    </span>
                  </p>
                </div>
                <Badge tone="success">Includes consult</Badge>
              </div>
              <p className="mt-3 text-xs text-white/45 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-[#c9a227]" />
                Clinical review via LeanBloom / MyDose after checkout
              </p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/15 rounded-full overflow-hidden bg-[#0d1a2e]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-white/55 hover:bg-white/5"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-bold text-white tabular-nums min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-white/55 hover:bg-white/5"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="w-4 h-4" />
                  Add to cart
                </Button>
              </div>
              <Button size="lg" variant="gold" fullWidth onClick={handleCheckout}>
                Get started — ${price * quantity}
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c9a227]" /> {product.frequency}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#c9a227]" /> {product.form}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-px">
            {(
              [
                ['overview', 'Overview'],
                ['included', "What's included"],
                ['safety', 'Safety notes']
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  activeTab === id
                    ? 'border-[#c9a227] text-[#c9a227]'
                    : 'border-transparent text-white/45 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="py-8 max-w-3xl">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-white/55 leading-relaxed">{product.description}</p>
                <div className="p-4 rounded-xl card-dark text-sm text-white/55">
                  <strong className="text-white">Dosing note:</strong> {product.dosageInfo}
                </div>
              </div>
            )}
            {activeTab === 'included' && (
              <ul className="space-y-3">
                {product.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/55">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'safety' && (
              <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-100/90 leading-relaxed flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1 text-amber-200">Clinical safety</p>
                  <p>{product.clinicalGuidelines}</p>
                  <p className="mt-3 text-amber-200/70">
                    Prescriptions are only issued after LeanBloom / MyDose clinician review. This page
                    is not medical advice.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-8 pt-12 border-t border-white/8">
            <h2 className="font-display text-2xl text-white mb-6">Related programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpen={() => openRelated(p)}
                  onQuickAdd={() => addItem(p, 1)}
                />
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" onClick={() => onNavigate('products')}>
                Browse all programs
              </Button>
            </div>
          </div>
        )}
      </Container>

      <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#07111f]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center gap-3">
        <div>
          <p className="text-[10px] text-white/40 font-medium">Total</p>
          <p className="font-display text-lg text-white">${price * quantity}</p>
        </div>
        <Button className="flex-1" variant="gold" onClick={handleCheckout}>
          Get started
        </Button>
      </div>
    </div>
  );
};
