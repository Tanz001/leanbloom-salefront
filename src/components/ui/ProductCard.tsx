import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Product } from '../../types';
import { useTenant } from '../../context/TenantContext';
import { getProductPriceForAffiliate } from '../../data/products';
import { Button } from './Button';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  onOpen: () => void;
  onQuickAdd?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen, onQuickAdd }) => {
  const { tenant } = useTenant();
  const price = getProductPriceForAffiliate(product, tenant.id);

  return (
    <article className="group flex flex-col h-full rounded-2xl overflow-hidden card-dark transition-all duration-300 hover:border-[#c9a227]/35 hover:shadow-[0_20px_50px_-30px_rgba(201,162,39,0.45)]">
      <button type="button" onClick={onOpen} className="text-left flex flex-col flex-1">
        <div className="relative aspect-[5/4] overflow-hidden bg-[#0a1525]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent" />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge tone="gold">{product.badge}</Badge>
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c9a227]/80">
            {product.categoryLabel}
          </p>
          <h3 className="mt-1.5 font-display text-xl text-white leading-snug group-hover:text-[#c9a227] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-white/50 leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
          <ul className="mt-4 space-y-1.5 flex-1">
            {product.benefits.slice(0, 2).map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-xs text-white/55">
                <Check className="w-3.5 h-3.5 text-[#c9a227] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </button>

      <div className="px-5 pb-5">
        <div className="flex items-end justify-between gap-3 border-t border-white/8 pt-4">
          <div>
            <p className="text-[11px] font-medium text-white/40">From</p>
            <p className="font-display text-2xl text-white tabular-nums">
              ${price}
              <span className="text-xs font-sans font-medium text-white/40 ml-1">/mo</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onQuickAdd && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickAdd();
                }}
              >
                Add
              </Button>
            )}
            <Button size="sm" variant="ghost" className="text-[#c9a227] hover:text-[#d4af37]" onClick={onOpen}>
              View
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
