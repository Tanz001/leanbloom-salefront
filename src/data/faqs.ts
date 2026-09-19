export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'treatment' | 'telehealth' | 'shipping' | 'billing';
}

export interface StepItem {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  timing: string;
  iconName: string;
  details: string[];
}

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    stepNumber: 1,
    title: 'Choose Your Treatment Program',
    subtitle: 'Transparent pricing with no hidden clinic membership fees',
    description: 'Select the physician-designed metabolic, peptide, or longevity protocol that aligns with your personal wellness targets.',
    timing: '2 Minutes',
    iconName: 'PackageCheck',
    details: [
      'Evidence-informed therapies formulated by licensed compounding pharmacies',
      'Affiliate retail pricing includes full supply, syringes, alcohol pads & shipping',
      'Select program duration or monthly continuous protocols'
    ]
  },
  {
    stepNumber: 2,
    title: 'Complete Secure Checkout Intake',
    subtitle: 'HIPAA-compliant, encrypted patient profile',
    description: 'Provide your shipping destination, contact details, and basic demographic info. Your order initiation reserves medication allocation at our partner pharmacy.',
    timing: '3 Minutes',
    iconName: 'ShieldCheck',
    details: [
      'Bank-grade 256-bit SSL encryption',
      'Zero surprise subscription lock-ins or unannounced billing',
      'State-specific licensing verification for your residential address'
    ]
  },
  {
    stepNumber: 3,
    title: 'Medical Review via LeanBloom / MyDose',
    subtitle: 'Asynchronous evaluation by board-certified clinical providers',
    description: 'After checkout, you are seamlessly handed off to the LeanBloom / MyDose medical telehealth intake. A US-licensed physician or nurse practitioner carefully evaluates your health history, BMI, and lab records.',
    timing: 'Within 24 Hours',
    iconName: 'Stethoscope',
    details: [
      'Comprehensive asynchronous medical screening — no awkward waiting rooms',
      'Direct secure portal messaging with your assigned clinician',
      'Full refund guarantee if your clinician determines treatment is not medically indicated'
    ]
  },
  {
    stepNumber: 4,
    title: 'Compounding & Pharmacy Dispensing',
    subtitle: 'FDA-registered 503A / 503B state-licensed facilities',
    description: 'Upon medical approval, your personalized prescription is routed directly to an accredited US compounding pharmacy for sterile preparation and quality potency testing.',
    timing: '1–2 Business Days',
    iconName: 'Pill',
    details: [
      'Sterility testing and potency certificates on every batch',
      'Includes calibrated administration supplies and injection guide',
      'Prescription labeling under your legal patient name'
    ]
  },
  {
    stepNumber: 5,
    title: 'Discreet Temperature-Monitored Delivery',
    subtitle: 'Insulated cold-chain shipping directly to your doorstep',
    description: 'Medication arrives in unmarked, tamper-evident insulated packaging with cold packs to guarantee pharmaceutical integrity from pharmacy to refrigerator.',
    timing: '2–3 Business Days',
    iconName: 'Truck',
    details: [
      '100% Discreet external packaging with no medical markings',
      'Real-time tracking link with delivery signature protection',
      'Ongoing refill and dosage adjustments supported by LeanBloom clinical team'
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does the medical review process work?',
    answer: 'After you select your protocol and complete checkout on our storefront, you are immediately guided into LeanBloom / MyDose clinical telehealth intake. A board-certified physician licensed in your state reviews your submitted health history, contraindications, and wellness goals. If approved, they issue your prescription electronically to our accredited partner pharmacy.',
    category: 'telehealth'
  },
  {
    id: 'faq-2',
    question: 'What happens if the physician determines I am not eligible?',
    answer: 'Patient safety is paramount. If your reviewing clinician determines that the requested therapy is not medically safe or appropriate for your specific health history, your payment is promptly refunded 100% with no consultation cancellation penalty.',
    category: 'telehealth'
  },
  {
    id: 'faq-3',
    question: 'What is the relationship between this affiliate clinic and LeanBloom?',
    answer: 'This storefront represents your local affiliate wellness practice. To ensure the highest standard of regulatory compliance and patient safety, all telemedicine evaluations, clinical prescribing, and sterile pharmacy fulfillment are powered by LeanBloom / MyDose clinical infrastructure.',
    category: 'treatment'
  },
  {
    id: 'faq-4',
    question: 'How is compounded Semaglutide or Tirzepatide prepared?',
    answer: 'Compounded medications are customized pharmaceutical preparations produced in licensed 503A or 503B compounding pharmacies adhering to stringent United States Pharmacopeia (USP) guidelines for sterility and potency testing. They are formulated with high-purity active pharmaceutical ingredients (APIs).',
    category: 'treatment'
  },
  {
    id: 'faq-5',
    question: 'Are needles and injection supplies included in my package?',
    answer: 'Yes! All injectable protocols come with everything necessary for your 30-day course: sterile insulin micro-syringes, alcohol preparation wipes, a detailed administration guide, and access to an instructional video.',
    category: 'shipping'
  },
  {
    id: 'faq-6',
    question: 'How is the medication shipped to maintain temperature?',
    answer: 'Temperature-sensitive peptides are packaged inside pharmaceutical-grade thermal insulated mailers with frozen gel cooling packs. Shipments travel via expedited priority courier to guarantee arrival within appropriate cold-chain specifications.',
    category: 'shipping'
  },
  {
    id: 'faq-7',
    question: 'Are there long-term contracts or cancellation fees?',
    answer: 'No. We operate with complete transparency. There are no mandatory multi-month lock-in contracts, initiation fees, or hidden cancellation penalties. You order your month-by-month supply when you are ready.',
    category: 'billing'
  },
  {
    id: 'faq-8',
    question: 'Can I message my healthcare provider after receiving my order?',
    answer: 'Yes. Once your order has been authorized, you have direct two-way secure messaging access with your LeanBloom clinical team through the patient portal for dosage titration questions, mild side-effect management, and ongoing support.',
    category: 'telehealth'
  }
];

export const TRUST_SIGNALS = [
  {
    title: 'US Licensed Providers',
    description: 'Every protocol evaluated by 50-state board-certified clinicians',
    icon: 'UserCheck'
  },
  {
    title: 'Accredited Compounding',
    description: 'Formulated in sterile 503A / 503B state-regulated pharmacies',
    icon: 'Award'
  },
  {
    title: 'Discreet Express Shipping',
    description: 'Cold-chain packaging delivered in unmarked containers',
    icon: 'Shield'
  },
  {
    title: '100% Refund Guarantee',
    description: 'Full refund if the clinician determines you are not medically eligible',
    icon: 'RefreshCw'
  }
];

export const PATIENT_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sarah M.',
    location: 'Austin, TX',
    program: 'Compounded Semaglutide + B12',
    rating: 5,
    quote: 'The intake was so straightforward, and my physician review was completed within 14 hours. The cold-pack delivery was discreet and arrived with everything pre-measured.',
    duration: '4 months on program'
  },
  {
    id: 't-2',
    name: 'David K.',
    location: 'Denver, CO',
    program: 'Tirzepatide Dual-Incretin',
    rating: 5,
    quote: 'I was hesitant about online telemedicine, but the medical questions were thorough and thoughtful. Appetite noise completely quieted within 48 hours of my first dose.',
    duration: '10 weeks on program'
  },
  {
    id: 't-3',
    name: 'Elena R.',
    location: 'Miami, FL',
    program: 'Oral Semaglutide Troches',
    rating: 5,
    quote: 'I have a fear of needles, so finding sublingual troches with doctor oversight was a game changer. Friendly support whenever I had a dosage question!',
    duration: '3 months on program'
  }
];
