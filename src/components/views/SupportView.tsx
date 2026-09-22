import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { StorefrontView } from '../../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface SupportViewProps {
  onNavigate: (view: StorefrontView) => void;
}

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-white/12 bg-[#0d1a2e] text-xs text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40';

export const SupportView: React.FC<SupportViewProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen surface-dark py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50">
            Dedicated Patient Support
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mt-1">
            We're Here to Assist You
          </h1>
          <p className="text-white/55 text-sm sm:text-base mt-3">
            Contact the {tenant.businessName} care coordination team for program inquiries, order adjustments, and clinical navigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Information */}
          <div className="md:col-span-5 space-y-6">
            <div className="card-dark p-6 sm:p-7 rounded-3xl space-y-5">
              <h3 className="font-display font-bold text-lg text-white">
                Clinic & Care Desk
              </h3>

              <div className="space-y-4 text-xs text-white/55">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#c9a227] text-[#07111f] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Phone Support</span>
                    <a
                      href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
                      className="text-[#c9a227] hover:underline font-semibold"
                    >
                      {tenant.supportPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#c9a227] text-[#07111f] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Email Inquiries</span>
                    <a
                      href={`mailto:${tenant.supportEmail}`}
                      className="text-[#c9a227] hover:underline font-semibold"
                    >
                      {tenant.supportEmail}
                    </a>
                  </div>
                </div>

                {tenant.clinicAddress && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#c9a227] text-[#07111f] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">Practice Location</span>
                      <span>{tenant.clinicAddress}</span>
                    </div>
                  </div>
                )}

                {tenant.businessHours && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#c9a227] text-[#07111f] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">Operating Hours</span>
                      <span>{tenant.businessHours}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency Banner */}
              <div className="p-3.5 bg-rose-950/40 rounded-2xl border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Medical Emergency?</strong> If you are experiencing chest pain, severe shortness of breath, or an allergic anaphylactic emergency, immediately call <strong>911</strong> or visit the nearest hospital.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="md:col-span-7">
            <div className="card-dark p-6 sm:p-8 rounded-3xl">
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Message Received
                  </h3>
                  <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our patient care team for {tenant.businessName} will respond via email to <strong className="text-white/70">{formData.email}</strong> within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', orderNumber: '', category: 'general', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#c9a227] text-[#07111f] shadow-xs hover:brightness-110 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/8">
                    <MessageSquare className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-display font-bold text-base text-white">
                      Submit a Patient Inquiry
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">
                        Order # (If Applicable)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LB-123456"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={inputClass}
                      >
                        <option value="general">General Program Information</option>
                        <option value="telehealth">Medical Intake & Clinician Review</option>
                        <option value="shipping">Cold-Chain Delivery & Tracking</option>
                        <option value="billing">Billing & Refund Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      How can we assist you? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please provide details about your question or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#c9a227] text-[#07111f] shadow-md transition-all hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message to Care Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
