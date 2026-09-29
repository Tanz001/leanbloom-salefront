import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, ProductCategory } from '../types';
import { useTenant } from './TenantContext';
import { mediaUrl, storefrontApi, type StorefrontProductDto } from '../lib/api';

interface CatalogContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80';

function mapCategory(category: string): ProductCategory {
  switch (category) {
    case 'Medical Program':
      return 'glp1';
    case 'Prescription Refill':
      return 'oral';
    case 'Wellness Pack':
      return 'longevity';
    case 'Telehealth Consult':
      return 'metabolic';
    default:
      return 'metabolic';
  }
}

function mapStock(
  status: string
): Product['status'] {
  if (status === 'Backorder') return 'backorder';
  if (status === 'Compounding') return 'limited_allocation';
  return 'in_stock';
}

function mapProduct(dto: StorefrontProductDto, affiliateId: string): Product {
  const desc = dto.description || '';
  const short =
    desc.length > 140 ? `${desc.slice(0, 137).trim()}…` : desc || dto.name;
  const benefits = desc
    ? desc
        .split(/[.\n]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 20)
        .slice(0, 4)
    : ['Physician-guided protocol', 'Discreet cold-chain fulfillment'];

  return {
    id: dto.id,
    name: dto.name,
    category: mapCategory(dto.category),
    categoryLabel: dto.category,
    description: desc || dto.name,
    shortDescription: short,
    benefits:
      benefits.length > 0
        ? benefits
        : ['Clinician review included', 'Ships after medical approval'],
    basePrice: dto.price,
    affiliatePricing: { [affiliateId]: dto.price },
    supplyDuration: '30-Day Protocol',
    form: 'As prescribed',
    image: mediaUrl(dto.imageUrl) || PLACEHOLDER_IMAGE,
    status: mapStock(dto.stockStatus),
    clinicalGuidelines:
      'Subject to asynchronous physician evaluation and medical necessity review.',
    whatsIncluded: [
      'Clinical intake and provider review',
      'Discreet fulfillment when prescribed',
      'Ongoing care coordination through your clinic',
    ],
    dosageInfo: 'Dosing determined by your reviewing clinician.',
    frequency: 'As directed',
  };
}

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { tenant, isLoadingTenants } = useTenant();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (isLoadingTenants || !tenant.id) return;
    // Skip demo/placeholder ids until a real affiliate is resolved from the API
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tenant.id)) {
      setIsLoading(false);
      setProducts([]);
      return;
    }

    let cancelled = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { products: rows, tenant: catalogTenant } =
          await storefrontApi.listProducts(tenant.id);
        if (cancelled) return;
        setProducts(rows.map((r) => mapProduct(r, tenant.id)));
        // Keep CSS brand in sync if catalog returns fresher tenant branding
        if (catalogTenant?.primaryColor && catalogTenant?.secondaryColor) {
          const root = document.documentElement;
          root.style.setProperty('--brand-primary', catalogTenant.primaryColor);
          root.style.setProperty(
            '--brand-secondary',
            catalogTenant.secondaryColor
          );
        }
      } catch (err) {
        if (!cancelled) {
          setProducts([]);
          setError(
            err instanceof Error ? err.message : 'Failed to load catalog'
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tenant.id, isLoadingTenants, tick]);

  return (
    <CatalogContext.Provider
      value={{
        products,
        isLoading,
        error,
        refresh: () => setTick((n) => n + 1),
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export function useCatalog(): CatalogContextType {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return ctx;
}
