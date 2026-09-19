import React from 'react';
import { useTenant } from '../../context/TenantContext';
import { StorefrontView } from '../../types';
import { ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms';
  onNavigate: (view: StorefrontView) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, onNavigate }) => {
  const { tenant } = useTenant();

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          {/* Header */}
          <div className="pb-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {tenant.businessName} Compliance & Policy
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                {type === 'privacy' ? 'Patient Privacy & HIPAA Safeguards' : 'Terms of Telehealth Care & Fulfillment'}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Last updated: January 2026 • Governed by federal telemedicine regulations
              </p>
            </div>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
          </div>

          {/* Legal Content */}
          {type === 'privacy' ? (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <section className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  1. HIPAA Compliance & Protected Health Information (PHI)
                </h3>
                <p>
                  At {tenant.businessName}, safeguarding patient medical confidentiality is our highest imperative. All protected health information (PHI) submitted through this storefront and subsequent clinical intakes is encrypted at rest and in transit utilizing 256-bit AES encryption compliant with the Health Insurance Portability and Accountability Act of 1996 (HIPAA).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  2. Telehealth Clinical Infrastructure Handoff
                </h3>
                <p>
                  To deliver highest standards of clinical governance, medical questionnaires, laboratory records, and prescribing evaluations are processed exclusively by LeanBloom / MyDose and its network of licensed physicians. {tenant.businessName} does not retain or sell raw clinical diagnostic records for third-party commercial marketing.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  3. Discreet Patient Packaging
                </h3>
                <p>
                  All pharmaceutical shipments arrive in non-descript, unmarked thermal cartons with no external indication of medications or medical conditions to ensure complete residential privacy.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <section className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  1. Storefront Portal & Physician Relationship
                </h3>
                <p>
                  This storefront represents {tenant.businessName} as an authorized wellness affiliate. Accessing or purchasing a program does not create a physician-patient relationship until an asynchronous or live clinical evaluation is conducted and formally approved by a licensed healthcare provider within the LeanBloom / MyDose medical network.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  2. 100% Medical Eligibility Refund Policy
                </h3>
                <p>
                  Patient clinical safety is paramount. If our reviewing medical provider determines that the requested compounded peptide or GLP-1 therapy is medically contraindicated or unsuitable for your health profile, 100% of all charged fees are immediately refunded to your original payment method with zero penalty.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  3. Compounded Pharmaceuticals Disclaimer
                </h3>
                <p>
                  Compounded medications are customized by state-licensed 503A or 503B facilities pursuant to specific patient prescriptions. They are not commercially mass-manufactured drugs approved by the FDA, but are prepared strictly according to USP pharmaceutical standards under medical guidance.
                </p>
              </section>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <button
              onClick={() => onNavigate('home')}
              className="font-semibold text-slate-700 hover:underline"
            >
              Return to Storefront
            </button>
            <button
              onClick={() => onNavigate(type === 'privacy' ? 'terms' : 'privacy')}
              className="font-semibold text-sky-600 hover:underline"
            >
              View {type === 'privacy' ? 'Terms of Care' : 'Privacy Policy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
