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
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Dedicated Patient Support
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-1">
            We're Here to Assist You
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Contact the {tenant.businessName} care coordination team for program inquiries, order adjustments, and clinical navigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Contact Information */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Clinic & Care Desk
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-xl text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone Support</span>
                    <a
                      href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
                      className="text-slate-700 hover:underline font-semibold"
                    >
                      {tenant.supportPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-xl text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries</span>
                    <a
                      href={`mailto:${tenant.supportEmail}`}
                      className="text-slate-700 hover:underline font-semibold"
                    >
                      {tenant.supportEmail}
                    </a>
                  </div>
                </div>

                {tenant.clinicAddress && (
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-xl text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Practice Location</span>
                      <span>{tenant.clinicAddress}</span>
                    </div>
                  </div>
                )}

                {tenant.businessHours && (
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-xl text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: tenant.primaryColor }}
                    >
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Operating Hours</span>
                      <span>{tenant.businessHours}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency Banner */}
              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200/80 text-rose-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Medical Emergency?</strong> If you are experiencing chest pain, severe shortness of breath, or an allergic anaphylactic emergency, immediately call <strong>911</strong> or visit the nearest hospital.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="md:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900">
                    Message Received
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our patient care team for {tenant.businessName} will respond via email to <strong>{formData.email}</strong> within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', orderNumber: '', category: 'general', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <MessageSquare className="w-5 h-5 text-slate-500" />
                    <h3 className="font-display font-bold text-base text-slate-900">
                      Submit a Patient Inquiry
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Order # (If Applicable)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LB-123456"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white"
                      >
                        <option value="general">General Program Information</option>
                        <option value="telehealth">Medical Intake & Clinician Review</option>
                        <option value="shipping">Cold-Chain Delivery & Tracking</option>
                        <option value="billing">Billing & Refund Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      How can we assist you? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please provide details about your question or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all hover:brightness-105 flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: tenant.primaryColor }}
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
