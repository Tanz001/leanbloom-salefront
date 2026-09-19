import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, getProductPriceForAffiliate } from '../../data/products';
import { Product, ProductCategory, StorefrontView } from '../../types';
import {
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface ProductsViewProps {
  onNavigate: (view: StorefrontView) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onNavigate, onSelectProduct }) => {
  const { tenant } = useTenant();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All Protocols' },
    { key: 'glp1', label: 'GLP-1 Incretins' },
    { key: 'longevity', label: 'Longevity & Peptides' },
    { key: 'oral', label: 'Needle-Free Oral' },
    { key: 'metabolic', label: 'Metabolic Support' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenDetail = (product: Product) => {
    onSelectProduct(product);
    onNavigate('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {tenant.businessName} Catalog
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-1">
            Clinical Wellness Programs
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Compounded medications formulated in accredited 503A/503B pharmacies. Pricing includes physician telehealth review, syringes, and cold shipping.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white shadow-xs'
                      : 'text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  style={isActive ? { backgroundColor: tenant.primaryColor } : {}}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search treatments or peptides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 mb-1">
              No matching programs found
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              We couldn't find any treatments matching your criteria. Try adjusting your search query or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const price = getProductPriceForAffiliate(product, tenant.id);
              return (
                <div
                  key={product.id}
                  onClick={() => handleOpenDetail(product)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  {/* Top Image Section */}
                  <div>
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.badge && (
                        <div
                          className="absolute top-3 left-3 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider"
                          style={{ backgroundColor: tenant.primaryColor }}
                        >
                          {product.badge}
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-2xs">
                        {product.form}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold uppercase tracking-wider">
                          {product.categoryLabel}
                        </span>
                        <span>{product.supplyDuration}</span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-slate-800 leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      <div className="pt-2 space-y-1.5">
                        {product.benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Affiliate Retail</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-bold text-2xl text-slate-900">
                          ${price}
                        </span>
                        <span className="text-xs text-slate-500">/ protocol</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Quick Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenDetail(product)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:brightness-105 active:scale-98 flex items-center gap-1"
                        style={{ backgroundColor: tenant.primaryColor }}
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Telehealth Safety Note */}
        <div className="mt-16 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 rounded-xl bg-sky-50 text-sky-700 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-slate-900">
              Physician-Governed Treatment Eligibility
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              All treatments require asynchronous clinical evaluation through the LeanBloom / MyDose telehealth portal. If our medical director or reviewing physician determines that a selected therapy is contraindicated for your medical history, your payment is promptly refunded 100%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
