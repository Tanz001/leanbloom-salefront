import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { Product, ProductCategory, StorefrontView } from '../../types';
import { Search } from 'lucide-react';
import { Container } from '../ui/Container';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProductsViewProps {
  onNavigate: (view: StorefrontView) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onNavigate, onSelectProduct }) => {
  const { tenant } = useTenant();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All programs' },
    { key: 'glp1', label: 'GLP-1' },
    { key: 'longevity', label: 'Longevity' },
    { key: 'oral', label: 'Oral / needle-free' },
    { key: 'metabolic', label: 'Metabolic' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenDetail = (product: Product) => {
    onSelectProduct(product);
    onNavigate('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="surface-dark min-h-screen">
      <div className="border-b border-white/8">
        <Container className="py-12 sm:py-16">
          <Badge tone="gold" className="mb-3">
            {tenant.businessName}
          </Badge>
          <h1 className="font-display text-3xl sm:text-5xl text-white tracking-tight max-w-2xl">
            Programs & treatments
          </h1>
          <p className="mt-4 text-white/50 text-base max-w-2xl leading-relaxed">
            Browse {PRODUCTS.length} protocols with transparent pricing. After checkout, clinical
            review continues through LeanBloom / MyDose.
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-1.5 p-1 card-dark rounded-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#c9a227] text-[#07111f]'
                      : 'text-white/55 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative flex-1 max-w-md lg:ml-auto">
            <Search className="w-4 h-4 text-white/35 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              placeholder="Search programs…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/12 bg-[#0d1a2e] text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40"
            />
          </div>
        </div>

        <p className="text-sm text-white/40 mb-6">
          Showing {filteredProducts.length} program{filteredProducts.length === 1 ? '' : 's'}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="card-dark rounded-2xl p-12 text-center max-w-md mx-auto">
            <Search className="w-8 h-8 text-white/25 mx-auto mb-3" />
            <h3 className="font-display text-lg text-white">No matches</h3>
            <p className="text-sm text-white/45 mt-1 mb-5">Try another category or search term.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.24) }}
              >
                <ProductCard
                  product={product}
                  onOpen={() => handleOpenDetail(product)}
                  onQuickAdd={() => addItem(product, 1)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
