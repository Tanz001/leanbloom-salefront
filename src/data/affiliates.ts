import { AffiliateBranding } from '../types';

export const DEMO_AFFILIATES: AffiliateBranding[] = [
  {
    id: 'apex-metabolic',
    name: 'Apex Metabolic & Longevity',
    slug: 'apex',
    subdomain: 'apex.leanbloom.health',
    customDomain: 'care.apexmetabolic.com',
    primaryColor: '#0E4A56',
    secondaryColor: '#2A9D8F',
    primaryColorSoft: 'rgba(14, 74, 86, 0.08)',
    businessName: 'Apex Metabolic & Longevity',
    tagline: 'Physician-guided weight optimization & restorative cellular medicine',
    welcomeMessage: 'Personalized metabolic protocols tailored by board-certified clinical specialists.',
    supportEmail: 'care@apexmetabolic.com',
    supportPhone: '(888) 492-APEX',
    hidePoweredBy: false,
    clinicAddress: '450 Sutter Health Suite 1200, San Francisco, CA 94108',
    businessHours: 'Mon - Fri: 8:00 AM - 6:00 PM PST',
    clinicalPartnerNote: 'Clinical review, telehealth evaluations, and pharmacy fulfillment operated through LeanBloom/MyDose licensed physician network.',
    trustBadgeText: 'Licensed Telehealth Partner • 50-State Physician Network'
  },
  {
    id: 'verdant-vitality',
    name: 'Verdant Vitality Clinic',
    slug: 'verdant',
    subdomain: 'verdant.leanbloom.health',
    customDomain: 'shop.verdantvitality.health',
    primaryColor: '#1D4E38',
    secondaryColor: '#38761D',
    primaryColorSoft: 'rgba(29, 78, 56, 0.08)',
    businessName: 'Verdant Vitality Clinic',
    tagline: 'Sustainable metabolic transformation through proven clinical therapies',
    welcomeMessage: 'Gentle, scientifically proven peptide and weight wellness therapies tailored to your biology.',
    supportEmail: 'support@verdantvitality.health',
    supportPhone: '(800) 582-7711',
    hidePoweredBy: true,
    clinicAddress: '1120 Highland Ave, Austin, TX 78701',
    businessHours: 'Mon - Sat: 9:00 AM - 5:00 PM CST',
    clinicalPartnerNote: 'Telemedicine examinations & sterile compounding overseen by licensed medical providers.',
    trustBadgeText: 'Accredited Sterile Compounding • Cold-Chain Delivery'
  },
  {
    id: 'aura-life',
    name: 'Aura Life Medical',
    slug: 'aura',
    subdomain: 'aura.leanbloom.health',
    customDomain: 'rx.auralifemedical.com',
    primaryColor: '#1B2B65',
    secondaryColor: '#4361EE',
    primaryColorSoft: 'rgba(27, 43, 101, 0.08)',
    businessName: 'Aura Life Medical',
    tagline: 'Modern clinical wellness, peptide optimization & metabolic vigor',
    welcomeMessage: 'Precision peptide medicine delivered directly to your doorstep with asynchronous physician oversight.',
    supportEmail: 'help@auralifemedical.com',
    supportPhone: '(855) 902-AURA',
    hidePoweredBy: false,
    clinicAddress: '240 Central Park South, New York, NY 10019',
    businessHours: '7 Days a Week: 8:00 AM - 8:00 PM EST',
    clinicalPartnerNote: 'Physician intake, safety evaluation, and prescription dispensing administered through LeanBloom/MyDose.',
    trustBadgeText: 'Discreet Express Shipping • Dedicated Care Team'
  },
  {
    id: 'leanbloom-default',
    name: 'LeanBloom Health (Default)',
    slug: 'default',
    subdomain: 'store.leanbloom.health',
    customDomain: 'leanbloom.health',
    primaryColor: '#12345F',
    secondaryColor: '#2D82C4',
    primaryColorSoft: 'rgba(18, 52, 95, 0.08)',
    businessName: 'LeanBloom Health',
    tagline: 'Modern telehealth, physician-guided metabolic care & peptide medicine',
    welcomeMessage: 'Direct access to evidence-backed weight management and longevity therapies with clinical review.',
    supportEmail: 'patientcare@leanbloom.health',
    supportPhone: '(800) 412-BLOOM',
    hidePoweredBy: false,
    clinicAddress: '600 Congress Ave, Austin, TX 78701',
    businessHours: 'Mon - Fri: 8:00 AM - 7:00 PM CST',
    clinicalPartnerNote: 'Official LeanBloom Health patient portal. Prescriptions subject to medical review by licensed clinicians.',
    trustBadgeText: 'LegitScript Certified • 100% HIPAA Compliant'
  }
];

export const DEFAULT_AFFILIATE = DEMO_AFFILIATES[0]; // Default to Apex Metabolic for rich demo experience

/**
 * Resolves tenant based on hostname in production, or returns fallback.
 * Can be swapped in production without rewriting UI components!
 */
export function resolveAffiliateByHostname(hostname: string): AffiliateBranding {
  const cleanHost = hostname.toLowerCase().trim();
  
  const matched = DEMO_AFFILIATES.find(
    (affiliate) =>
      affiliate.customDomain.toLowerCase() === cleanHost ||
      affiliate.subdomain.toLowerCase() === cleanHost ||
      cleanHost.startsWith(`${affiliate.slug}.`)
  );

  return matched || DEFAULT_AFFILIATE;
}
