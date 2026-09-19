import React from 'react';
import { useTenant } from '../../context/TenantContext';
import { StorefrontView } from '../../types';
import {
  Activity,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
  HeartHandshake,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (view: StorefrontView) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();

  const handleLink = (view: StorefrontView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Affiliate Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{
                  background: `linear-gradient(135deg, ${tenant.primaryColor} 0%, ${tenant.secondaryColor} 100%)`,
                }}
              >
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight">
                  {tenant.businessName}
                </span>
                <p className="text-xs text-slate-400">{tenant.tagline}</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Evidence-based metabolic optimization, peptide medicine, and medical weight management. Dedicated to personalized, physician-monitored health transformations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                HIPAA-Compliant Encrypted Portal
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                256-Bit SSL Checkout
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Patient Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-white transition-colors text-left"
                >
                  All Treatment Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('how-it-works')}
                  className="hover:text-white transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('faqs')}
                  className="hover:text-white transition-colors text-left"
                >
                  Clinical & Billing FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('order-status')}
                  className="hover:text-white transition-colors text-left"
                >
                  Track Order & Consult
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Clinical Support */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {tenant.supportPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${tenant.supportEmail}`} className="hover:text-white transition-colors truncate">
                  {tenant.supportEmail}
                </a>
              </li>
              {tenant.clinicAddress && (
                <li className="flex items-start gap-2 text-xs text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{tenant.clinicAddress}</span>
                </li>
              )}
              {tenant.businessHours && (
                <li className="flex items-start gap-2 text-xs text-slate-400">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{tenant.businessHours}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Col 5: Telehealth Architecture */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Telehealth Handoff
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Medical reviews, asynchronous physician assessments, and sterile compounding are powered by the LeanBloom & MyDose clinical infrastructure.
            </p>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-medium text-emerald-400 mb-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Asynchronous Clinical Handoff</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Patients complete intake after checkout to consult with a licensed doctor.
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer Box */}
        <div className="my-8 p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">Important Medical & Regulatory Disclaimer:</p>
          <p>
            The content provided on this storefront portal is for informational purposes and does not constitute formal medical diagnosis or advice. Prescription therapies require online evaluation and approval by a licensed healthcare provider within the LeanBloom / MyDose clinical provider network. Compounded medications are customized by state-licensed 503A and 503B compounding pharmacies; they have not been directly evaluated or approved by the FDA for specific outcomes. Results may vary depending on adherence, metabolic baseline, and diet.
          </p>
        </div>

        {/* Bottom bar with copyright and "Powered by LeanBloom" */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-4">
          <div>
            © {new Date().getFullYear()} {tenant.businessName}. All rights reserved.
          </div>

          {/* Powered by LeanBloom badge (Hidden if hidePoweredBy is true!) */}
          {!tenant.hidePoweredBy && (
            <div className="flex items-center gap-2 bg-slate-800/70 px-3 py-1.5 rounded-full border border-slate-700/80 text-slate-300">
              <span className="text-[11px] text-slate-400">Powered by</span>
              <span className="font-bold tracking-tight text-white flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span>
                LeanBloom Health
              </span>
            </div>
          )}

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLink('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleLink('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Telehealth Care
            </button>
            <span>•</span>
            <button
              onClick={() => handleLink('support')}
              className="hover:text-slate-300 transition-colors"
            >
              Patient Inquiries
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
