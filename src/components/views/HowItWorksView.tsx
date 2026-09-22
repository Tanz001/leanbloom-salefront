import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { HOW_IT_WORKS_STEPS } from '../../data/faqs';
import { StorefrontView } from '../../types';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface HowItWorksViewProps {
  onNavigate: (view: StorefrontView) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();
  const [activeStep, setActiveStep] = useState(1);
  const current = HOW_IT_WORKS_STEPS.find((s) => s.stepNumber === activeStep) || HOW_IT_WORKS_STEPS[0];

  return (
    <div className="min-h-screen py-14 sm:py-20 surface-dark">
      <Container className="max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge tone="gold" className="mb-3">
            Care pathway
          </Badge>
          <h1 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
            How it works
          </h1>
          <p className="mt-3 text-white/50 text-sm sm:text-base leading-relaxed">
            From {tenant.businessName} to LeanBloom clinical review — a clear path without clinic wait
            times.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {HOW_IT_WORKS_STEPS.map((step) => {
            const selected = activeStep === step.stepNumber;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStep(step.stepNumber)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                  selected
                    ? 'bg-[#c9a227] text-[#07111f]'
                    : 'card-dark text-white/55 hover:text-white'
                }`}
              >
                Step {step.stepNumber}
              </button>
            );
          })}
        </div>

        <motion.div
          key={current.stepNumber}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-dark rounded-2xl p-8 sm:p-10"
        >
          <div className="flex items-start gap-4">
            <span className="font-display text-4xl tabular-nums text-[#c9a227]/40 leading-none">
              {String(current.stepNumber).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-2xl text-white">{current.title}</h2>
              {'subtitle' in current && current.subtitle && (
                <p className="mt-2 text-xs font-medium text-white/40">{current.subtitle}</p>
              )}
              <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
                {current.description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {activeStep < HOW_IT_WORKS_STEPS.length ? (
              <Button variant="gold" onClick={() => setActiveStep(activeStep + 1)}>
                Next step
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="gold" onClick={() => onNavigate('products')}>
                Browse programs
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            <Button variant="outline" onClick={() => onNavigate('faqs')}>
              Read FAQs
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};
