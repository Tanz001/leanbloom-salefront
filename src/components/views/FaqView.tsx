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
    <div className="min-h-screen surface-dark py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50">
            Patient Support & Answers
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-white/55 text-sm sm:text-base mt-3">
            Understand how {tenant.businessName} and LeanBloom orchestrate medical consultations, pharmacy compounding, and discreet fulfillment.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="card-dark p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#c9a227] text-[#07111f] shadow-xs'
                      : 'text-white/55 bg-[#0d1a2e] border border-white/8 hover:text-white hover:border-white/15'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/35 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-white/12 bg-[#0d1a2e] text-xs text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40"
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
                className="card-dark rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg text-white/40 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#c9a227] bg-[#c9a227]/10' : ''
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
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-white/55 leading-relaxed border-t border-white/8">
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
        <div className="mt-14 card-dark rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-lg text-white">
              Have a clinical or order inquiry?
            </h3>
            <p className="text-xs text-white/50">
              Our clinical coordination desk is available Monday through Friday.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${tenant.supportPhone.replace(/\D/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:bg-white/5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>{tenant.supportPhone}</span>
            </a>

            <button
              onClick={() => onNavigate('support')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#c9a227] text-[#07111f] shadow-xs hover:brightness-110 transition-all"
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
