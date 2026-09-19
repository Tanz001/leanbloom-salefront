import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { getProductPriceForAffiliate } from '../../data/products';
import { Product, StorefrontView } from '../../types';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  HeartPulse
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  onNavigate: (view: StorefrontView) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, onNavigate }) => {
  const { tenant } = useTenant();
  const { addItem, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const price = getProductPriceForAffiliate(product, tenant.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsCartOpen(true);
  };

  const handleInstantCheckout = () => {
    addItem(product, quantity);
    onNavigate('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-8 sm:py-12 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Programs</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Product Visuals & Trust Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs relative overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div
                    className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
                  {product.form}
                </div>
              </div>

              {/* Pharmacy & Cold-Chain Badges */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Insulated cold-chain pack</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>503A Sterile Accredited</span>
                </div>
              </div>
            </div>

            {/* What's Included Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500" />
                <span>What's Included in this 30-Day Kit</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {product.whatsIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Program Information & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              {/* Category & Title */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                  <span>{product.categoryLabel}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Physician Evaluated
                  </span>
                </div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    {tenant.businessName} Program Rate
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-display font-black text-3xl text-slate-900">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500">/ 30-Day Course</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                    Includes Consultation
                  </span>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2.5">
                <h3 className="font-display font-bold text-sm text-slate-900">
                  Key Protocol Benefits
                </h3>
                <div className="space-y-2">
                  {product.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dosage & Administration */}
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Clinical Schedule & Administration</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Frequency:</strong> {product.frequency}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Protocol Note:</strong> {product.dosageInfo}
                </p>
              </div>

              {/* Actions: Quantity & Start Treatment */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Program Cart</span>
                  </button>
                </div>

                {/* Direct Get Started CTA */}
                <button
                  id="product-detail-get-started-btn"
                  onClick={handleInstantCheckout}
                  className="w-full py-4 px-6 rounded-xl font-bold text-base text-white shadow-lg transition-all hover:brightness-105 active:scale-98 flex items-center justify-center gap-2"
                  style={{ backgroundColor: tenant.primaryColor }}
                >
                  <span>Get Started — Continue to Intake (${price * quantity})</span>
                </button>
              </div>

              {/* Clinical Contraindication Disclaimer */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2.5 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block mb-0.5">Clinical Safety Note:</strong>
                  {product.clinicalGuidelines}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Total</span>
          <span className="font-display font-extrabold text-lg text-slate-900">
            ${price * quantity}
          </span>
        </div>

        <button
          onClick={handleInstantCheckout}
          className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white shadow-md text-center"
          style={{ backgroundColor: tenant.primaryColor }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
