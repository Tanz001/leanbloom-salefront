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
  Truck
} from 'lucide-react';
import { Button } from '../ui/Button';

interface CartDrawerProps {
  onNavigate: (view: StorefrontView) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, subtotal, totalCount } =
    useCart();
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#0d1a2e] shadow-2xl flex flex-col border-l border-white/10"
            >
              <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/40">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white">Your cart</h3>
                    <p className="text-xs text-white/45">
                      {totalCount} {totalCount === 1 ? 'program' : 'programs'} selected
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/35 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-white text-lg mb-1">Your cart is empty</h4>
                    <p className="text-sm text-white/45 max-w-xs mb-6">
                      Explore physician-guided weight management and longevity protocols.
                    </p>
                    <Button variant="gold" onClick={handleContinueBrowsing}>
                      Browse programs
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="p-3 rounded-xl border border-[#c9a227]/25 bg-[#c9a227]/8 flex items-center gap-2.5 text-xs text-white/70">
                      <Truck className="w-4 h-4 text-[#c9a227] shrink-0" />
                      <span>
                        <strong className="text-[#c9a227]">Free cold-chain delivery</strong> included
                        for all orders.
                      </span>
                    </div>

                    <div className="divide-y divide-white/8 space-y-3">
                      {items.map((item) => (
                        <div key={item.productId} className="pt-3 first:pt-0 flex gap-3.5">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-18 h-18 rounded-xl object-cover border border-white/10 shrink-0 bg-[#07111f]"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-semibold text-sm text-white line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.productId)}
                                  className="text-white/35 hover:text-rose-400 p-1 transition-colors"
                                  title="Remove program"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-white/40 font-medium">
                                {item.product.supplyDuration}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-white/12 rounded-lg overflow-hidden bg-[#07111f]">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="px-2 py-1 text-white/45 hover:text-white hover:bg-white/5"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 text-xs font-semibold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="px-2 py-1 text-white/45 hover:text-white hover:bg-white/5"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="text-right">
                                <span className="font-bold text-sm text-white">
                                  ${item.price * item.quantity}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="block text-[10px] text-white/35">
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

              {items.length > 0 && (
                <div className="p-6 border-t border-white/8 bg-black/25 space-y-4">
                  <div className="space-y-2 text-xs text-white/50">
                    <div className="flex justify-between">
                      <span>Program subtotal</span>
                      <span className="font-semibold text-white">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#c9a227]/90">
                      <span>Cold-chain shipping</span>
                      <span className="font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-[#c9a227]/90">
                      <span>Physician evaluation</span>
                      <span className="font-semibold">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span>Total due today</span>
                      <span className="text-lg text-[#c9a227]">${subtotal}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-white/10 bg-[#07111f] flex items-center gap-2 text-[11px] text-white/55">
                    <ShieldCheck className="w-4 h-4 text-[#c9a227] shrink-0" />
                    <span>
                      Guaranteed refund if our reviewing physician determines you are ineligible.
                    </span>
                  </div>

                  <Button
                    id="cart-proceed-checkout-btn"
                    fullWidth
                    size="lg"
                    variant="gold"
                    onClick={handleCheckoutClick}
                  >
                    Proceed to checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <p className="text-[11px] text-center text-white/35">
                    Purchasing through{' '}
                    <span className="font-medium text-white/55">{tenant.businessName}</span>. Clinical
                    review by LeanBloom/MyDose.
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
