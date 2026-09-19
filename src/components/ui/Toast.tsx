import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTenant } from '../../context/TenantContext';

export const Toast: React.FC = () => {
  const { toastMessage, dismissToast } = useCart();
  const { tenant } = useTenant();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-700/80 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: tenant.secondaryColor }}
            >
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-100 truncate">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={dismissToast}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
