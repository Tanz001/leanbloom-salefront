import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useTenant } from '../../context/TenantContext';
import { StorefrontView } from '../../types';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (view: StorefrontView) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, subtotal, totalCount } = useCart();
  const { tenant } = useTenant();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigate('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueBrowsing = () => {
    setIsCartOpen(false);
    onNavigate('products');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Your Treatment Cart
                    </h3>
                    <p className="text-xs text-slate-500">
                      {totalCount} {totalCount === 1 ? 'program' : 'programs'} selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List or Empty State */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-bold text-slate-800 text-lg mb-1">
                      Your cart is empty
                    </h4>
                    <p className="text-sm text-slate-500 max-w-xs mb-6">
                      Explore our physician-formulated weight management and peptide longevity protocols.
                    </p>
                    <button
                      onClick={handleContinueBrowsing}
                      className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white shadow-sm transition-all hover:brightness-105"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      Browse Programs
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Free shipping banner */}
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-900">
                      <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong>Free Expedited Cold-Chain Delivery</strong> included for all orders.
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 space-y-3">
                      {items.map((item) => (
                        <div key={item.productId} className="pt-3 first:pt-0 flex gap-3.5">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-18 h-18 rounded-xl object-cover border border-slate-100 shrink-0 bg-slate-50"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => removeItem(item.productId)}
                                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                                  title="Remove program"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-slate-500 font-medium">
                                {item.product.supplyDuration}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity controls */}
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="px-2 py-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 text-xs font-semibold text-slate-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="px-2 py-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <span className="font-bold text-sm text-slate-900">
                                  ${item.price * item.quantity}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="block text-[10px] text-slate-400">
                                    (${item.price} each)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Footer / Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Program Subtotal:</span>
                      <span className="font-semibold text-slate-900">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Expedited Cold-Chain Shipping:</span>
                      <span className="font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Physician Telehealth Evaluation:</span>
                      <span className="font-semibold">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Due Today:</span>
                      <span className="text-lg" style={{ color: tenant.primaryColor }}>
                        ${subtotal}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Guaranteed refund if our reviewing physician determines you are ineligible.
                    </span>
                  </div>

                  <button
                    id="cart-proceed-checkout-btn"
                    onClick={handleCheckoutClick}
                    className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:brightness-105 active:scale-99 flex items-center justify-center gap-2"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    Purchasing through <span className="font-medium text-slate-600">{tenant.businessName}</span>. Clinical review by LeanBloom/MyDose.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
