import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TenantProvider, useTenant } from './context/TenantContext';
import { CatalogProvider, useCatalog } from './context/CatalogContext';
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

const StorefrontMain: React.FC = () => {
  const { isSwitchingTenant, tenantError } = useTenant();
  const { products, isLoading, error } = useCatalog();
  const [activeView, setActiveView] = useState<StorefrontView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products.length && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
    if (
      selectedProduct &&
      products.length &&
      !products.find((p) => p.id === selectedProduct.id)
    ) {
      setSelectedProduct(products[0] || null);
    }
  }, [products, selectedProduct]);

  const handleNavigate = (view: StorefrontView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const showLoader = isSwitchingTenant || isLoading;

  return (
    <div className="min-h-screen flex flex-col bg-[#07111f] text-white relative">
      <SiteHeader activeView={activeView} onNavigate={handleNavigate} />

      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          {showLoader ? (
            <motion.div
              key="tenant-switching-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="w-10 h-10 border-2 border-white/10 border-t-[var(--brand-secondary)] rounded-full animate-spin mb-4" />
              <p className="text-xs font-semibold text-white/45 uppercase tracking-wider">
                Loading storefront…
              </p>
            </motion.div>
          ) : tenantError || error ? (
            <motion.div
              key="storefront-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 flex flex-col items-center justify-center text-center px-4"
            >
              <p className="text-sm text-rose-300 max-w-md">
                {tenantError || error}
              </p>
              <p className="mt-2 text-xs text-white/40">
                Ensure the API is running and at least one Active affiliate exists.
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

              {activeView === 'product-detail' && selectedProduct && (
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

      <CartDrawer onNavigate={handleNavigate} />
      <Toast />
      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <TenantProvider>
      <CatalogProvider>
        <CartProvider>
          <CheckoutProvider>
            <StorefrontMain />
          </CheckoutProvider>
        </CartProvider>
      </CatalogProvider>
    </TenantProvider>
  );
}
