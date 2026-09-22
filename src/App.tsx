import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TenantProvider, useTenant } from './context/TenantContext';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { CartDrawer } from './components/cart/CartDrawer';
import { Toast } from './components/ui/Toast';
import { HomeView } from './components/views/HomeView';
import { ProductsView } from './components/views/ProductsView';
import { ProductDetailView } from './components/views/ProductDetailView';
import { HowItWorksView } from './components/views/HowItWorksView';
import { FaqView } from './components/views/FaqView';
import { CheckoutView } from './components/views/CheckoutView';
import { MedicalHandoffView } from './components/views/MedicalHandoffView';
import { OrderStatusView } from './components/views/OrderStatusView';
import { SupportView } from './components/views/SupportView';
import { LegalView } from './components/views/LegalView';
import { StorefrontView, Product } from './types';
import { PRODUCTS } from './data/products';

const StorefrontMain: React.FC = () => {
  const { isSwitchingTenant } = useTenant();
  const [activeView, setActiveView] = useState<StorefrontView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  const handleNavigate = (view: StorefrontView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07111f] text-white relative">
      <SiteHeader activeView={activeView} onNavigate={handleNavigate} />

      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          {isSwitchingTenant ? (
            <motion.div
              key="tenant-switching-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="w-10 h-10 border-2 border-white/10 border-t-[#c9a227] rounded-full animate-spin mb-4" />
              <p className="text-xs font-semibold text-white/45 uppercase tracking-wider">
                Loading storefront…
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {activeView === 'home' && (
                <HomeView
                  onNavigate={handleNavigate}
                  onSelectProduct={handleSelectProduct}
                />
              )}

              {activeView === 'products' && (
                <ProductsView
                  onNavigate={handleNavigate}
                  onSelectProduct={handleSelectProduct}
                />
              )}

              {activeView === 'product-detail' && (
                <ProductDetailView
                  product={selectedProduct}
                  onNavigate={handleNavigate}
                  onSelectProduct={handleSelectProduct}
                />
              )}

              {activeView === 'how-it-works' && (
                <HowItWorksView onNavigate={handleNavigate} />
              )}

              {activeView === 'faqs' && <FaqView onNavigate={handleNavigate} />}

              {activeView === 'checkout' && (
                <CheckoutView onNavigate={handleNavigate} />
              )}

              {activeView === 'handoff' && (
                <MedicalHandoffView onNavigate={handleNavigate} />
              )}

              {activeView === 'order-status' && (
                <OrderStatusView onNavigate={handleNavigate} />
              )}

              {activeView === 'support' && (
                <SupportView onNavigate={handleNavigate} />
              )}

              {activeView === 'privacy' && (
                <LegalView type="privacy" onNavigate={handleNavigate} />
              )}

              {activeView === 'terms' && (
                <LegalView type="terms" onNavigate={handleNavigate} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cart Drawer Overlay */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Toast Feedback Notification */}
      <Toast />

      {/* Site Footer with Affiliate Contact & LeanBloom Telehealth Disclosures */}
      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <TenantProvider>
      <CartProvider>
        <CheckoutProvider>
          <StorefrontMain />
        </CheckoutProvider>
      </CartProvider>
    </TenantProvider>
  );
}
