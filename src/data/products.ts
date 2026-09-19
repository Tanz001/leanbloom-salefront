import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-semaglutide-b12',
    name: 'Compounded Semaglutide + B12 Program',
    category: 'glp1',
    categoryLabel: 'GLP-1 Weight Management',
    description: 'Weekly subcutaneous GLP-1 receptor agonist enhanced with Cyanocobalamin (Vitamin B12) to support metabolic energy while suppressing appetite and caloric cravings.',
    shortDescription: 'Once-weekly subcutaneous injection with Vitamin B12 for smooth appetite regulation.',
    benefits: [
      'Clinically studied peptide for sustained satiety and appetite reduction',
      'Synergistic Vitamin B12 to sustain daily metabolic cellular energy',
      'Physician-prescribed dosing tailored to your clinical response',
      'Includes complete syringe kit, alcohol prep pads & sharps safety guide'
    ],
    basePrice: 249,
    affiliatePricing: {
      'apex-metabolic': 279,
      'verdant-vitality': 269,
      'aura-life': 299,
      'leanbloom-default': 249
    },
    supplyDuration: '30-Day Protocol',
    form: 'Subcutaneous Multi-Dose Vial',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    status: 'in_stock',
    popular: true,
    badge: 'Most Popular Program',
    clinicalGuidelines: 'Subject to asynchronous physician evaluation. Contraindicated for individuals with personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).',
    whatsIncluded: [
      '1x Multi-dose sterile compounded vial (Semaglutide + B12)',
      '10x Ultra-fine sterile insulin syringes with micro-needles',
      'Alcohol prep swabs (30 count)',
      'Physician telehealth review and ongoing clinical dosage titration',
      'Cold-chain insulated overnight packaging'
    ],
    dosageInfo: 'Starting dose: 0.25mg subcutaneous once weekly for weeks 1–4, titrating up under medical supervision.',
    frequency: 'Once weekly'
  },
  {
    id: 'prod-tirzepatide-synergy',
    name: 'Compounded Tirzepatide Dual-Incretin Program',
    category: 'glp1',
    categoryLabel: 'Dual Incretin (GIP/GLP-1)',
    description: 'Next-generation dual glucose-dependent insulinotropic polypeptide (GIP) and GLP-1 receptor agonist targeting multiple hormonal pathways for pronounced metabolic optimization.',
    shortDescription: 'Dual GIP & GLP-1 receptor agonist for comprehensive metabolic and appetite management.',
    benefits: [
      'Dual pathway activation for enhanced metabolic sensitivity',
      'Supports healthy blood sugar equilibrium and steady body composition shift',
      'Minimal food noise and enhanced nutritional mindfulness',
      'Compounded in FDA-registered 503A/503B accredited sterile facilities'
    ],
    basePrice: 349,
    affiliatePricing: {
      'apex-metabolic': 389,
      'verdant-vitality': 369,
      'aura-life': 399,
      'leanbloom-default': 349
    },
    supplyDuration: '30-Day Protocol',
    form: 'Subcutaneous Multi-Dose Vial',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80',
    status: 'in_stock',
    popular: true,
    badge: 'Advanced Incretin Therapy',
    clinicalGuidelines: 'Requires thorough medical history disclosure. Prescribed exclusively by licensed telehealth clinicians following comprehensive intake analysis.',
    whatsIncluded: [
      '1x Sterile compounded vial (Tirzepatide)',
      'Precision subcutaneous micro-syringes',
      'Alcohol prep wipes & clinical administration guide',
      'Direct provider messaging access through LeanBloom portal',
      'Temperature-monitored refrigerated delivery'
    ],
    dosageInfo: 'Starting dose: 2.5mg once weekly, evaluated monthly for dosage adjustment based on tolerance.',
    frequency: 'Once weekly'
  },
  {
    id: 'prod-oral-semaglutide',
    name: 'Sublingual Oral Semaglutide Troches',
    category: 'oral',
    categoryLabel: 'Needle-Free Oral Care',
    description: 'Formulated for needle-averse patients seeking the metabolic benefits of GLP-1 therapy. Quick-dissolve sublingual lozenges facilitate direct mucosal absorption bypass.',
    shortDescription: 'Needle-free daily sublingual formulation for gentle, steady appetite balance.',
    benefits: [
      '100% Needle-free daily administration',
      'Formulated with mucosal permeation enhancers for bioavailability',
      'Convenient blister packaging ideal for travel and active schedules',
      'Smooth digestive tolerance compared to traditional oral capsules'
    ],
    basePrice: 229,
    affiliatePricing: {
      'apex-metabolic': 259,
      'verdant-vitality': 249,
      'aura-life': 269,
      'leanbloom-default': 229
    },
    supplyDuration: '30-Day Supply (30 Troches)',
    form: 'Sublingual Rapid-Dissolve Troches',
    image: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?auto=format&fit=crop&w=900&q=80',
    status: 'in_stock',
    popular: false,
    badge: 'Needle-Free Option',
    clinicalGuidelines: 'Designed to be placed under the tongue or in buccal pouch and allowed to dissolve completely without swallowing immediately.',
    whatsIncluded: [
      '30x Individually sealed sublingual troches',
      'Daily administration protocol card',
      'Clinician prescription and asynchronous health review',
      'Discreet tamper-evident packaging'
    ],
    dosageInfo: 'Take 1 troche sublingually once daily in the morning on an empty stomach.',
    frequency: 'Daily in morning'
  },
  {
    id: 'prod-nad-plus-cellular',
    name: 'NAD+ Cellular Longevity & Vitality Protocol',
    category: 'longevity',
    categoryLabel: 'Cellular Medicine',
    description: 'High-potency Nicotinamide Adenine Dinucleotide (NAD+) supporting mitochondrial ATP production, cellular DNA repair, cognitive clarity, and sustained physical endurance.',
    shortDescription: 'Mitochondrial coenzyme therapy for cellular rejuvenation and metabolic endurance.',
    benefits: [
      'Directly elevates intracellular NAD+ pools vital for mitochondrial respiration',
      'Enhances mental sharpness, focus, and reduces daily fatigue',
      'Promotes cellular resilience and natural DNA repair pathways',
      'Pure pharmaceutical-grade sterile formulation'
    ],
    basePrice: 199,
    affiliatePricing: {
      'apex-metabolic': 229,
      'verdant-vitality': 219,
      'aura-life': 249,
      'leanbloom-default': 199
    },
    supplyDuration: '30-Day Cycle',
    form: 'Subcutaneous Multi-Dose Vial',
    image: 'https://images.unsplash.com/photo-1576073719676-aa955ec6b2cb?auto=format&fit=crop&w=900&q=80',
    status: 'in_stock',
    popular: false,
    badge: 'Longevity & Cellular',
    clinicalGuidelines: 'Non-habit forming peptide precursor. Best combined with hydration and regular circadian sleep cycles.',
    whatsIncluded: [
      '1x Sterile multi-dose vial of compounded NAD+ (500mg/5mL)',
      'Subcutaneous syringe bundle with sterile needle tips',
      'Clinical titration schedule for gradual micro-dosing',
      'Telehealth clinician asynchronous evaluation'
    ],
    dosageInfo: 'Administer 25mg–50mg subcutaneously 2 to 3 times per week based on clinical recommendations.',
    frequency: '2–3 times weekly'
  },
  {
    id: 'prod-sermorelin-growth',
    name: 'Sermorelin Bio-Identical Nightly Protocol',
    category: 'longevity',
    categoryLabel: 'Peptide Optimization',
    description: 'Bio-identical peptide analogue consisting of 29 amino acids that stimulates the anterior pituitary gland to naturally produce and release endogenous Growth Hormone.',
    shortDescription: 'Natural pituitary secretagogue promoting deep restorative sleep and lean tone.',
    benefits: [
      'Stimulates body’s own natural growth hormone production without shutdown',
      'Supports deeper Stage IV restorative sleep and morning refreshed feeling',
      'Aids in lean muscle tone retention during calorie-restricted phases',
      'Improves skin elasticity, recovery from workouts, and metabolic tone'
    ],
    basePrice: 219,
    affiliatePricing: {
      'apex-metabolic': 249,
      'verdant-vitality': 239,
      'aura-life': 259,
      'leanbloom-default': 219
    },
    supplyDuration: '30-Day Protocol',
    form: 'Lyophilized Powder + Bacteriostatic Water',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80',
    status: 'in_stock',
    popular: false,
    badge: 'Rest & Recovery',
    clinicalGuidelines: 'Taken immediately prior to bedtime on an empty stomach to harmonize with nocturnal GH surge.',
    whatsIncluded: [
      '1x Lyophilized Sermorelin vial',
      '1x Sterile Bacteriostatic Water for reconstitution',
      'Reconstitution mixing syringe & subcutaneous syringes',
      'Video guide QR link for easy 2-minute reconstitution'
    ],
    dosageInfo: 'Inject 0.2mg–0.3mg subcutaneously nightly at bedtime, 5 nights on, 2 nights off.',
    frequency: 'Nightly at bedtime'
  },
  {
    id: 'prod-lipo-trim-synergy',
    name: 'Lipo-Trim Metabolic Synergy Sublingual Spray',
    category: 'metabolic',
    categoryLabel: 'Metabolic Support',
    description: 'A concentrated sublingual blend of lipotropic nutrients, amino acids, and methylated B-vitamins formulated to optimize liver fat metabolism and nutrient utilization.',
    shortDescription: 'Convenient sublingual lipotropic spray with Methionine, Inositol, Choline & B12.',
    benefits: [
      'Supports hepatic fat emulsification and liver lipid clearance',
      'Rapid sublingual absorption within 30 seconds',
      'Zero jitter, caffeine-free natural cellular metabolic activation',
      'Perfect standalone or companion therapy to GLP-1 programs'
    ],
    basePrice: 119,
    affiliatePricing: {
      'apex-metabolic': 139,
      'verdant-vitality': 129,
      'aura-life': 149,
      'leanbloom-default': 119
    },
    supplyDuration: '30-Day Supply (60mL Spray)',
    form: 'Sublingual Metered Dose Spray',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=900&q=80',
    status: 'in_stock',
    popular: false,
    badge: 'Metabolic Companion',
    clinicalGuidelines: 'Formulated with pharmaceutical grade USP ingredients. Safe for daily continuous usage.',
    whatsIncluded: [
      '1x 60mL Amber glass bottle with metered micro-mist sprayer',
      '30-day recommended protocol guide',
      'Telehealth clinician intake review'
    ],
    dosageInfo: 'Spray 6 pumps under the tongue daily, hold for 30 seconds before swallowing.',
    frequency: 'Daily'
  }
];

export function getProductPriceForAffiliate(product: Product, affiliateId: string): number {
  if (product.affiliatePricing && product.affiliatePricing[affiliateId] !== undefined) {
    return product.affiliatePricing[affiliateId];
  }
  return product.basePrice;
}
