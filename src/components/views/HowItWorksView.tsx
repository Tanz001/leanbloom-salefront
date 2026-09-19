import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { HOW_IT_WORKS_STEPS } from '../../data/faqs';
import { StorefrontView } from '../../types';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Pill,
  Truck,
  PackageCheck,
  Award,
  Lock
} from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (view: StorefrontView) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (name: string) => {
    switch (name) {
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5 text-white" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-white" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-white" />;
      case 'Pill':
        return <Pill className="w-5 h-5 text-white" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-white" />;
      default:
        return <Award className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Care Pathway & Clinical Process
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-1">
            How Telehealth Care Works
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From selecting your compounded wellness protocol to doctor evaluation and doorstep cold-chain delivery — every step is designed for maximum safety, speed, and discretion.
          </p>
        </div>

        {/* Step Progress Visual Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-10">
          <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 scrollbar-none gap-2">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const isSelected = activeStep === step.stepNumber;
              const isPassed = activeStep > step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'text-white shadow-xs'
                      : isPassed
                      ? 'text-slate-900 bg-slate-100'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                  style={isSelected ? { backgroundColor: tenant.primaryColor } : {}}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? 'bg-white text-slate-900'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPassed ? '✓' : step.stepNumber}
                  </span>
                  <span>Step {step.stepNumber}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Stepper List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-slate-200">
          {HOW_IT_WORKS_STEPS.map((step) => {
            const isCurrent = activeStep === step.stepNumber;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveStep(step.stepNumber)}
                className={`relative flex items-start gap-4 sm:gap-6 p-6 rounded-3xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-white shadow-lg border-2'
                    : 'bg-white/80 hover:bg-white border border-slate-200/90 shadow-2xs'
                }`}
                style={isCurrent ? { borderColor: tenant.primaryColor } : {}}
              >
                {/* Step Icon Badge */}
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm relative z-10 transition-transform"
                  style={{
                    backgroundColor: isCurrent ? tenant.primaryColor : tenant.secondaryColor,
                  }}
                >
                  {getStepIcon(step.iconName)}
                </div>

                {/* Step Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Step 0{step.stepNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {step.timing}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-950">
                    {step.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500">
                    {step.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {step.description}
                  </p>

                  {/* Bullet points */}
                  <div className="pt-3 space-y-1.5 border-t border-slate-100">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clinical Partnership Banner */}
        <div className="mt-14 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                LeanBloom / MyDose Clinical Partnership
              </h3>
              <p className="text-xs text-slate-400">
                Regulatory compliance, physician oversight, and pharmacy safety
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {tenant.businessName} partners with LeanBloom and MyDose to ensure that all patient evaluations are conducted by licensed clinical practitioners. There is no automated dispensing: every intake is reviewed asynchronously against contraindications, lab history, and state regulatory guidelines.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:brightness-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <span>Explore Programs & Start Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('faqs')}
              className="px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              View Clinical FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
