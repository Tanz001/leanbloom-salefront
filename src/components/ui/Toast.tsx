import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, dismissToast } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full card-dark text-white p-4 rounded-2xl shadow-xl border border-[#c9a227]/40 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#c9a227] text-[#07111f]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-white/90 truncate">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={dismissToast}
            className="text-white/40 hover:text-white p-1 rounded transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
