import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { FAQS } from '../../data/faqs';
import { StorefrontView } from '../../types';
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Mail,
  Search,
  MessageCircleQuestion,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FaqViewProps {
  onNavigate: (view: StorefrontView) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'telehealth', label: 'Telehealth & Review' },
    { key: 'treatment', label: 'Compounding & Peptides' },
    { key: 'shipping', label: 'Cold-Chain Delivery' },
    { key: 'billing', label: 'Pricing & Refunds' },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Patient Support & Answers
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Understand how {tenant.businessName} and LeanBloom orchestrate medical consultations, pharmacy compounding, and discreet fulfillment.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-slate-900 bg-slate-100' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dedicated Support Card */}
        <div className="mt-14 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Have a clinical or order inquiry?
            </h3>
            <p className="text-xs text-slate-500">
              Our clinical coordination desk is available Monday through Friday.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{tenant.supportPhone}</span>
            </a>

            <button
              onClick={() => onNavigate('support')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
