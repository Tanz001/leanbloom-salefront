import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTenant } from '../../context/TenantContext';
import { useCheckout } from '../../context/CheckoutContext';
import { StorefrontView } from '../../types';
import {
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Truck,
  Pill,
  Clock,
  ExternalLink,
  ClipboardList,
  FileCheck,
  AlertCircle,
  HelpCircle,
  X,
  Sparkles
} from 'lucide-react';

interface MedicalHandoffViewProps {
  onNavigate: (view: StorefrontView) => void;
}

const modalInputClass =
  'px-3 py-2 rounded-xl border border-white/12 bg-[#0d1a2e] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 text-xs';

export const MedicalHandoffView: React.FC<MedicalHandoffViewProps> = ({ onNavigate }) => {
  const { tenant } = useTenant();
  const { activeOrder } = useCheckout();
  const [showSimulatedIntakeModal, setShowSimulatedIntakeModal] = useState<boolean>(false);
  const [intakeCompleted, setIntakeCompleted] = useState<boolean>(false);

  // Fallback demo order if patient navigated directly
  const orderNumber = activeOrder?.orderNumber || 'LB-892415';
  const patientName = activeOrder?.patient.fullName || 'Valued Patient';
  const orderItems = activeOrder?.items || [];
  const totalAmount = activeOrder?.total || 279;

  return (
    <div className="min-h-screen surface-dark py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-dark rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 text-center"
        >
          {/* Animated Green Check Badge */}
          <div className="relative inline-block mx-auto">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#c9a227] text-[#07111f] shadow-lg mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="absolute -inset-2 rounded-full bg-[#c9a227]/20 opacity-40 animate-ping pointer-events-none" />
          </div>

          {/* Heading and Order Reference */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider bg-[#0d1a2e] px-3 py-1 rounded-full border border-white/10">
              Order Reference: {orderNumber}
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Order Initiated with {tenant.businessName}
            </h1>
            <p className="text-sm sm:text-base text-white/55 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{patientName}</strong>. Your payment allocation has been initiated.
            </p>
          </div>

          {/* CRITICAL Clinical Telehealth Disclosure Notice Box */}
          <div className="bg-[#c9a227]/8 border-2 border-[#c9a227]/30 rounded-2xl p-5 sm:p-6 text-left space-y-3">
            <div className="flex items-center gap-2.5 text-[#c9a227] font-bold text-sm sm:text-base">
              <Stethoscope className="w-5 h-5 shrink-0" />
              <span>Next Mandatory Step: LeanBloom / MyDose Medical Evaluation</span>
            </div>

            <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
              Your visit to this storefront begins your care, but <strong className="text-white/80">does not replace direct medical evaluation</strong>. Prescriptions are legally authorized and dispensed exclusively through the <strong className="text-white/80">LeanBloom & MyDose clinical telehealth network</strong>.
            </p>

            <div className="p-3 bg-[#0d1a2e] rounded-xl border border-white/10 text-xs text-white/55 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white/80">Physician Requirement:</strong> A licensed board-certified practitioner must evaluate your health profile, BMI, and any contraindications before medication can be compounded.
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="text-left space-y-4 pt-2">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c9a227]" />
              <span>What Happens Next (Patient Care Timeline)</span>
            </h3>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-white/10">
              {/* Step 1: Placed */}
              <div className="relative flex items-start gap-3.5 pl-1">
                <div className="w-7 h-7 rounded-full bg-[#c9a227] text-[#07111f] flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">1. Order Placed & Pharmacy Reserved</h4>
                    <span className="text-[11px] font-semibold text-[#c9a227] bg-[#c9a227]/10 px-2 py-0.5 rounded-full border border-[#c9a227]/30">
                      Complete
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">
                    Your allocation for {tenant.businessName}'s program is locked with partner pharmacy.
                  </p>
                </div>
              </div>

              {/* Step 2: Intake Questionnaire */}
              <div className="relative flex items-start gap-3.5 pl-1">
                <div className="w-7 h-7 rounded-full bg-[#c9a227] text-[#07111f] flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ring-4 ring-[#c9a227]/15">
                  2
                </div>
                <div className="flex-1 bg-[#07111f] p-3 rounded-xl border border-[#c9a227]/25">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">
                      2. Complete Clinical Health Intake (Immediate Next Step)
                    </h4>
                    <span className="text-[11px] font-bold bg-[#c9a227] text-[#07111f] px-2.5 py-0.5 rounded-full">
                      Action Required
                    </span>
                  </div>
                  <p className="text-xs text-white/55 mt-1">
                    Fill out the 3-minute medical history questionnaire via the LeanBloom/MyDose clinical interface.
                  </p>
                </div>
              </div>

              {/* Step 3: Provider Review */}
              <div className="relative flex items-start gap-3.5 pl-1">
                <div className="w-7 h-7 rounded-full bg-[#12233a] border border-white/10 text-white/50 flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-white/70">3. Board-Certified Doctor Review</h4>
                    <span className="text-[11px] text-white/40">Within 24 Hours</span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">
                    Clinician reviews intake asynchronously. If approved, prescription is electronically transmitted.
                  </p>
                </div>
              </div>

              {/* Step 4: Compounding & Delivery */}
              <div className="relative flex items-start gap-3.5 pl-1">
                <div className="w-7 h-7 rounded-full bg-[#12233a] border border-white/10 text-white/50 flex items-center justify-center text-xs font-bold shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-white/70">4. Sterile Compounding & Cold-Chain Shipping</h4>
                    <span className="text-[11px] text-white/40">2–3 Days</span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">
                    Medication is freshly prepared in an accredited 503A pharmacy and delivered with frozen gel packs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Button to Continue to Clinical Review */}
          <div className="pt-4 space-y-3">
            <button
              id="continue-to-clinical-intake-btn"
              onClick={() => setShowSimulatedIntakeModal(true)}
              className="w-full py-4 px-6 rounded-xl font-bold text-base bg-[#c9a227] text-[#07111f] shadow-xl transition-all hover:brightness-110 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Stethoscope className="w-5 h-5" />
              <span>Continue to Medical Consultation (LeanBloom / MyDose)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('order-status')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:bg-white/5 transition-colors"
              >
                Track Order Status
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-white/50 hover:text-white transition-colors"
              >
                Return to Storefront Home
              </button>
            </div>
          </div>

          {/* Support line */}
          <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <span>Questions about your order?</span>
            <span>
              Contact {tenant.businessName} Care Team:{' '}
              <a href={`tel:${tenant.supportPhone}`} className="text-[#c9a227] font-semibold underline">
                {tenant.supportPhone}
              </a>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Simulated LeanBloom / MyDose Clinical Portal Modal */}
      <AnimatePresence>
        {showSimulatedIntakeModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07111f]/80 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-dark rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-left"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c9a227] text-[#07111f] flex items-center justify-center font-bold text-xs">
                    LB
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">
                      LeanBloom / MyDose Clinical Telehealth
                    </h3>
                    <p className="text-[11px] text-white/50">
                      Licensed Physician Intake Protocol • Order #{orderNumber}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowSimulatedIntakeModal(false)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-5 space-y-4 text-xs sm:text-sm text-white/55 leading-relaxed">
                {intakeCompleted ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/40 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">
                      Clinical Intake Successfully Submitted!
                    </h4>
                    <p className="text-xs text-white/50 max-w-sm mx-auto">
                      Your medical records and responses are now queued for asynchronous review by a board-certified physician licensed in your state. You will receive an SMS and email notification upon prescription authorization.
                    </p>
                    <button
                      onClick={() => {
                        setShowSimulatedIntakeModal(false);
                        onNavigate('order-status');
                      }}
                      className="mt-3 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#c9a227] text-[#07111f] hover:brightness-110 transition-all"
                    >
                      View Live Order Status
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3.5 rounded-xl bg-[#07111f] border border-white/10 text-xs text-white/55 space-y-1">
                      <div className="font-semibold text-white">
                        Affiliate Referrer: {tenant.businessName}
                      </div>
                      <div>
                        Patient: <strong className="text-white/80">{patientName}</strong> • Telehealth state: <strong className="text-white/80">{activeOrder?.patient.state || 'CA'}</strong>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold text-white/70 mb-1">
                          1. What is your current height and weight (BMI baseline)?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            defaultValue="5 ft 8 in"
                            placeholder="Height"
                            className={modalInputClass}
                          />
                          <input
                            type="text"
                            defaultValue="188 lbs"
                            placeholder="Weight"
                            className={modalInputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-white/70 mb-1">
                          2. Do you or immediate family have history of medullary thyroid carcinoma (MTC) or MEN2?
                        </label>
                        <div className="flex gap-4 pt-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="mtc" defaultChecked className="text-[#c9a227]" />
                            <span>No, neither myself nor family</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="mtc" className="text-[#c9a227]" />
                            <span>Yes, there is a history</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-white/70 mb-1">
                          3. Are you currently pregnant, nursing, or planning to become pregnant?
                        </label>
                        <div className="flex gap-4 pt-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="preg" defaultChecked className="text-[#c9a227]" />
                            <span>No</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="preg" className="text-[#c9a227]" />
                            <span>Yes</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-white/70 mb-1">
                          4. Please list any known pharmaceutical allergies or current medications:
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. No known drug allergies (NKDA). Currently taking daily multivitamin."
                          defaultValue="No known drug allergies (NKDA)."
                          className={`w-full ${modalInputClass}`}
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setIntakeCompleted(true)}
                        className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#c9a227] text-[#07111f] shadow-md transition-all hover:brightness-110"
                      >
                        Submit Medical Answers to Reviewing Physician
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
