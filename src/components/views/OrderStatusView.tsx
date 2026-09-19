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
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Patient Portal Tracking
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mt-1">
            Track Program & Consultation
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Inspect your order fulfillment and clinical telehealth evaluation progress.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. LB-123456) or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-300"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xs transition-all hover:brightness-105 shrink-0"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              Lookup Order
            </button>
          </form>

          {/* Quick Demo Pre-fill Links if saved orders exist */}
          {savedOrders.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 overflow-x-auto">
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
                  className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded hover:bg-slate-200"
                >
                  {o.orderNumber}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order Details Result */}
        {searchedOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Top Order Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Order Number</span>
                <span className="font-mono font-bold text-lg sm:text-xl text-slate-900">
                  {searchedOrder.orderNumber}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Affiliate Storefront</span>
                <span className="font-semibold text-xs text-slate-700">
                  {searchedOrder.affiliateBusinessName}
                </span>
              </div>
            </div>

            {/* Status Visual Timeline */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>Clinical & Dispensing Progress</span>
                </h4>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  Under Provider Review
                </span>
              </div>

              {/* Progress bars */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-emerald-600" />
                  <span className="text-[10px] font-semibold text-slate-700 block">Submitted</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-sky-500" />
                  <span className="text-[10px] font-semibold text-slate-700 block">Doctor Review</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-slate-200" />
                  <span className="text-[10px] text-slate-400 block">Compounding</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-slate-200" />
                  <span className="text-[10px] text-slate-400 block">Delivered</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Your medical history intake has been forwarded to the LeanBloom / MyDose physician network. A licensed clinician is currently evaluating contraindications and dosing parameters.
              </p>
            </div>

            {/* Items Ordered */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-slate-900">
                Prescribed Programs ({searchedOrder.items.length})
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-xs text-slate-900">{item.product.name}</h5>
                        <p className="text-[11px] text-slate-500">
                          Qty: {item.quantity} • {item.product.supplyDuration}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-slate-900">
                      ${item.totalPrice}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800">Destination:</div>
              <div>{searchedOrder.patient.fullName}</div>
              <div>{searchedOrder.patient.shippingAddress}</div>
              <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                Expedited Temperature-Monitored Cold Packaging (Signature Optional)
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onNavigate('handoff')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: tenant.primaryColor }}
              >
                Access Clinical Questionnaire
              </button>

              <button
                onClick={() => onNavigate('support')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Contact Support Desk
              </button>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-800 mb-1">
              No matching order record found
            </h3>
            <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
              Please check your confirmation email for your Order Reference (e.g. LB-123456) or verify the email entered.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
