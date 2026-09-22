import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { useCheckout } from '../../context/CheckoutContext';
import { StorefrontView, OrderSummary } from '../../types';
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  Stethoscope,
  Truck,
  ShieldCheck,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface OrderStatusViewProps {
  onNavigate: (view: StorefrontView) => void;
}

export const OrderStatusView: React.FC<OrderStatusViewProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();
  const { activeOrder, lookupOrder, savedOrders } = useCheckout();
  const [searchQuery, setSearchQuery] = useState<string>(activeOrder?.orderNumber || '');
  const [searchedOrder, setSearchedOrder] = useState<OrderSummary | null>(activeOrder || (savedOrders[0] ?? null));
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = lookupOrder(searchQuery);
    setSearchedOrder(found);
  };

  return (
    <div className="min-h-screen surface-dark py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50">
            Patient Portal Tracking
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-1">
            Track Program & Consultation
          </h1>
          <p className="text-white/55 text-sm mt-2">
            Inspect your order fulfillment and clinical telehealth evaluation progress.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="card-dark p-6 rounded-3xl mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/35 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. LB-123456) or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/12 bg-[#0d1a2e] text-xs sm:text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#c9a227] text-[#07111f] shadow-xs transition-all hover:brightness-110 shrink-0"
            >
              Lookup Order
            </button>
          </form>

          {/* Quick Demo Pre-fill Links if saved orders exist */}
          {savedOrders.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/8 flex items-center gap-2 text-[11px] text-white/50 overflow-x-auto">
              <span>Recent Demo Orders:</span>
              {savedOrders.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setSearchQuery(o.orderNumber);
                    setSearchedOrder(o);
                    setHasSearched(true);
                  }}
                  className="font-mono text-[#c9a227] bg-[#c9a227]/10 border border-[#c9a227]/25 px-2 py-0.5 rounded hover:bg-[#c9a227]/20 transition-colors"
                >
                  {o.orderNumber}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order Details Result */}
        {searchedOrder ? (
          <div className="card-dark rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Top Order Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/8">
              <div>
                <span className="text-xs text-white/40 block font-medium">Order Number</span>
                <span className="font-mono font-bold text-lg sm:text-xl text-white">
                  {searchedOrder.orderNumber}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-white/40 block font-medium">Affiliate Storefront</span>
                <span className="font-semibold text-xs text-white/70">
                  {searchedOrder.affiliateBusinessName}
                </span>
              </div>
            </div>

            {/* Status Visual Timeline */}
            <div className="p-5 rounded-2xl bg-[#07111f] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c9a227]" />
                  <span>Clinical & Dispensing Progress</span>
                </h4>
                <span className="text-[11px] font-bold text-[#c9a227] bg-[#c9a227]/10 px-2.5 py-0.5 rounded-full border border-[#c9a227]/30">
                  Under Provider Review
                </span>
              </div>

              {/* Progress bars */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-[#c9a227]" />
                  <span className="text-[10px] font-semibold text-white/70 block">Submitted</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-[#c9a227]/60" />
                  <span className="text-[10px] font-semibold text-white/70 block">Doctor Review</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-white/10" />
                  <span className="text-[10px] text-white/40 block">Compounding</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-white/10" />
                  <span className="text-[10px] text-white/40 block">Delivered</span>
                </div>
              </div>

              <p className="text-xs text-white/55 leading-relaxed pt-1">
                Your medical history intake has been forwarded to the LeanBloom / MyDose physician network. A licensed clinician is currently evaluating contraindications and dosing parameters.
              </p>
            </div>

            {/* Items Ordered */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-white">
                Prescribed Programs ({searchedOrder.items.length})
              </h4>
              <div className="divide-y divide-white/8 border border-white/10 rounded-2xl overflow-hidden">
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#0d1a2e] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0 bg-[#07111f]"
                      />
                      <div>
                        <h5 className="font-semibold text-xs text-white">{item.product.name}</h5>
                        <p className="text-[11px] text-white/50">
                          Qty: {item.quantity} • {item.product.supplyDuration}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-[#c9a227]">
                      ${item.totalPrice}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Summary */}
            <div className="p-4 bg-[#07111f] rounded-2xl border border-white/10 text-xs text-white/55 space-y-1">
              <div className="font-semibold text-white/80">Destination:</div>
              <div>{searchedOrder.patient.fullName}</div>
              <div>{searchedOrder.patient.shippingAddress}</div>
              <div className="text-[11px] text-[#c9a227] font-semibold pt-1">
                Expedited Temperature-Monitored Cold Packaging (Signature Optional)
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onNavigate('handoff')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-[#c9a227] text-[#07111f] shadow-xs hover:brightness-110 transition-all"
              >
                Access Clinical Questionnaire
              </button>

              <button
                onClick={() => onNavigate('support')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:bg-white/5 transition-colors"
              >
                Contact Support Desk
              </button>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="card-dark rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#0d1a2e] border border-white/10 flex items-center justify-center text-white/35 mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-white mb-1">
              No matching order record found
            </h3>
            <p className="text-xs text-white/50 mb-4 max-w-sm mx-auto">
              Please check your confirmation email for your Order Reference (e.g. LB-123456) or verify the email entered.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
