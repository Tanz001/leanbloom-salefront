import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import { StorefrontView } from '../../types';
import {
  ShieldCheck,
  Lock,
  Truck,
  CheckCircle2,
  CreditCard,
  User,
  MapPin,
  FileCheck,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface CheckoutViewProps {
  onNavigate: (view: StorefrontView) => void;
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const inputBase =
  'w-full px-3.5 py-2.5 rounded-xl border text-xs text-white placeholder:text-white/35 bg-[#0d1a2e] focus:outline-none focus:ring-2';

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();
  const { items, subtotal } = useCart();
  const { draft, updateDraft, submitOrder } = useCheckout();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const inputClass = (field?: string) =>
    `${inputBase} ${
      field && errors[field]
        ? 'border-rose-400 focus:ring-rose-400/30'
        : 'border-white/12 focus:ring-[#c9a227]/40'
    }`;

  // Validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!draft.fullName.trim()) errs.fullName = 'Full patient name is required';
    if (!draft.email.trim() || !draft.email.includes('@')) errs.email = 'Valid email is required for medical records';
    if (!draft.phone.trim()) errs.phone = 'Phone number is required for clinician contact';
    if (!draft.shippingAddress.addressLine1.trim()) errs.addressLine1 = 'Street address is required';
    if (!draft.shippingAddress.city.trim()) errs.city = 'City is required';
    if (!draft.shippingAddress.zipCode.trim()) errs.zipCode = 'ZIP code is required';
    if (!draft.consents.telehealthConsent) errs.telehealth = 'You must consent to telehealth evaluation';
    if (!draft.consents.asynchronousReviewConsent) errs.asynchronous = 'You must agree to asynchronous provider review';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const order = submitOrder();
      setIsProcessing(false);
      if (order) {
        onNavigate('handoff');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] surface-dark flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full card-dark p-8 rounded-3xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#0d1a2e] border border-white/10 flex items-center justify-center text-white/35 mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-xl text-white mb-2">
            No Active Programs in Cart
          </h2>
          <p className="text-xs text-white/50 mb-6">
            Please select a medical wellness protocol before starting the clinical intake process.
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#c9a227] text-[#07111f] shadow-xs hover:brightness-110 transition-all"
          >
            Explore Treatments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen surface-dark py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-[#c9a227] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Patient Intake Form */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Patient Details */}
              <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#c9a227] text-[#07111f]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">
                      1. Patient Identity & Contact
                    </h2>
                    <p className="text-xs text-white/50">
                      Required for medical prescribing and physician licensure compliance
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Legal Full Name (Matches Government ID) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={draft.fullName}
                      onChange={(e) => updateDraft({ fullName: e.target.value })}
                      className={inputClass('fullName')}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Email Address (For Consult Notes) *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. eleanor@example.com"
                      value={draft.email}
                      onChange={(e) => updateDraft({ email: e.target.value })}
                      className={inputClass('email')}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Mobile Phone (Provider SMS Updates) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 019-2834"
                      value={draft.phone}
                      onChange={(e) => updateDraft({ phone: e.target.value })}
                      className={inputClass('phone')}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Date of Birth (Must be 18+)
                    </label>
                    <input
                      type="date"
                      value={draft.dateOfBirth}
                      onChange={(e) => updateDraft({ dateOfBirth: e.target.value })}
                      className={`${inputBase} border-white/12 focus:ring-[#c9a227]/40`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      State of Residence *
                    </label>
                    <select
                      value={draft.state}
                      onChange={(e) => updateDraft({ state: e.target.value })}
                      className={`${inputBase} border-white/12 focus:ring-[#c9a227]/40`}
                    >
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st} - Licensed Coverage
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Destination */}
              <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#c9a227] text-[#07111f]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">
                      2. Cold-Chain Delivery Address
                    </h2>
                    <p className="text-xs text-white/50">
                      Discreet refrigerated packaging delivered directly to your doorstep
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Street Address (No P.O. Boxes for Cold Shipping) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 742 Evergreen Terrace"
                      value={draft.shippingAddress.addressLine1}
                      onChange={(e) =>
                        updateDraft({
                          shippingAddress: { ...draft.shippingAddress, addressLine1: e.target.value }
                        })
                      }
                      className={inputClass('addressLine1')}
                    />
                    {errors.addressLine1 && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.addressLine1}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apt 4B"
                      value={draft.shippingAddress.addressLine2 || ''}
                      onChange={(e) =>
                        updateDraft({
                          shippingAddress: { ...draft.shippingAddress, addressLine2: e.target.value }
                        })
                      }
                      className={`${inputBase} border-white/12 focus:ring-[#c9a227]/40`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Springfield"
                      value={draft.shippingAddress.city}
                      onChange={(e) =>
                        updateDraft({
                          shippingAddress: { ...draft.shippingAddress, city: e.target.value }
                        })
                      }
                      className={inputClass('city')}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 97477"
                      value={draft.shippingAddress.zipCode}
                      onChange={(e) =>
                        updateDraft({
                          shippingAddress: { ...draft.shippingAddress, zipCode: e.target.value }
                        })
                      }
                      className={inputClass('zipCode')}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Telehealth Consents */}
              <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#c9a227] text-[#07111f]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">
                      3. Clinical Consents & Acknowledgements
                    </h2>
                    <p className="text-xs text-white/50">
                      Regulatory telemedicine agreements for LeanBloom / MyDose care
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.consents.telehealthConsent}
                      onChange={(e) =>
                        updateDraft({
                          consents: { ...draft.consents, telehealthConsent: e.target.checked }
                        })
                      }
                      className="mt-1 rounded text-[#c9a227] focus:ring-[#c9a227]/40 w-4 h-4"
                    />
                    <span className="text-xs text-white/55 leading-relaxed">
                      I agree to receive telehealth evaluation from a US-licensed clinical provider. I understand medication is prescribed only if clinically appropriate.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.consents.asynchronousReviewConsent}
                      onChange={(e) =>
                        updateDraft({
                          consents: { ...draft.consents, asynchronousReviewConsent: e.target.checked }
                        })
                      }
                      className="mt-1 rounded text-[#c9a227] focus:ring-[#c9a227]/40 w-4 h-4"
                    />
                    <span className="text-xs text-white/55 leading-relaxed">
                      I understand that after completing checkout, I will be handed off to the LeanBloom / MyDose medical intake to complete my clinical history questionnaire.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.consents.termsAndPrivacyConsent}
                      onChange={(e) =>
                        updateDraft({
                          consents: { ...draft.consents, termsAndPrivacyConsent: e.target.checked }
                        })
                      }
                      className="mt-1 rounded text-[#c9a227] focus:ring-[#c9a227]/40 w-4 h-4"
                    />
                    <span className="text-xs text-white/55 leading-relaxed">
                      I accept {tenant.businessName}'s storefront terms and the 100% full refund policy in the event of physician non-approval.
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 4: Demo Secure Payment */}
              <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#c9a227] text-[#07111f]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-white">
                        4. Secure Payment (Demo Mode)
                      </h2>
                      <p className="text-xs text-white/50">
                        256-bit encrypted checkout simulator
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-[#c9a227] bg-[#c9a227]/10 px-2.5 py-1 rounded-full border border-[#c9a227]/30">
                    Test Mode Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#07111f] border border-white/10 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Card Number (Simulated)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value="•••• •••• •••• 4242 (Stripe Demo Card)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/12 bg-[#0d1a2e] font-mono text-xs text-white/70"
                      />
                      <CreditCard className="w-4 h-4 text-white/35 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">
                        Expires
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="12 / 28"
                        className="w-full px-3.5 py-2 rounded-xl border border-white/12 bg-[#0d1a2e] font-mono text-xs text-white/70"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="888"
                        className="w-full px-3.5 py-2 rounded-xl border border-white/12 bg-[#0d1a2e] font-mono text-xs text-white/70"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  id="checkout-submit-order-btn"
                  className="w-full py-4 px-6 rounded-xl font-bold text-base bg-[#c9a227] text-[#07111f] shadow-xl transition-all hover:brightness-110 active:scale-98 flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#07111f]/30 border-t-[#07111f] rounded-full animate-spin" />
                      Initiating Order Allocation...
                    </span>
                  ) : (
                    <>
                      <span>Complete Checkout & Continue to Clinical Intake</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Affiliate Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-dark p-6 sm:p-8 rounded-3xl space-y-6 sticky top-28">
              <div>
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-1">
                  Affiliate Order Summary
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  Purchasing through {tenant.businessName}
                </h3>
              </div>

              {/* Items List */}
              <div className="divide-y divide-white/8 space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 bg-[#07111f]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-white/50">
                        Qty: {item.quantity} • {item.product.supplyDuration}
                      </p>
                    </div>
                    <span className="font-bold text-xs text-[#c9a227]">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial calculations */}
              <div className="space-y-2.5 pt-4 border-t border-white/8 text-xs">
                <div className="flex justify-between text-white/55">
                  <span>Program Subtotal:</span>
                  <span className="font-semibold text-white">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[#c9a227]/90">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Cold-Chain Priority Shipping:</span>
                  </span>
                  <span className="font-bold">FREE ($0)</span>
                </div>
                <div className="flex justify-between text-[#c9a227]/90">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Physician Telehealth Evaluation:</span>
                  </span>
                  <span className="font-bold">INCLUDED</span>
                </div>
                <div className="flex justify-between text-white/55">
                  <span>Administration Kit (Syringes & Swabs):</span>
                  <span className="font-bold">INCLUDED</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-display font-bold text-base text-white">
                    Total Due Today:
                  </span>
                  <span className="font-display font-extrabold text-2xl text-[#c9a227]">
                    ${subtotal}
                  </span>
                </div>
              </div>

              {/* Trust Callouts */}
              <div className="bg-[#07111f] p-4 rounded-2xl border border-white/10 space-y-2 text-[11px] text-white/55">
                <div className="flex items-center gap-2 text-[#c9a227] font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>100% Full Refund if Medically Ineligible</span>
                </div>
                <p className="leading-relaxed">
                  If the LeanBloom board-certified doctor determines therapy is not medically indicated, your payment is promptly reversed.
                </p>
              </div>

              <div className="text-[11px] text-center text-white/40">
                Support: <a href={`tel:${tenant.supportPhone}`} className="underline text-[#c9a227]">{tenant.supportPhone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
