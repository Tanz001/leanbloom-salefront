export interface AffiliateBranding {
  id: string;
  name: string;
  slug: string;
  subdomain: string;
  customDomain: string;
  logoUrl?: string;
  logoSymbol?: string;
  primaryColor: string;
  secondaryColor: string;
  primaryColorSoft?: string;
  businessName: string;
  tagline: string;
  welcomeMessage: string;
  supportEmail: string;
  supportPhone: string;
  hidePoweredBy: boolean;
  clinicAddress?: string;
  businessHours?: string;
  clinicalPartnerNote?: string;
  trustBadgeText?: string;
}

export type ProductCategory = 'all' | 'glp1' | 'longevity' | 'metabolic' | 'oral';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  basePrice: number;
  affiliatePricing: Record<string, number>; // maps affiliateId to retail price
  supplyDuration: string;
  form: string;
  image: string;
  status: 'in_stock' | 'limited_allocation' | 'backorder';
  popular?: boolean;
  badge?: string;
  clinicalGuidelines: string;
  whatsIncluded: string[];
  dosageInfo: string;
  frequency: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface CheckoutDraft {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  state: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  consents: {
    telehealthConsent: boolean;
    asynchronousReviewConsent: boolean;
    termsAndPrivacyConsent: boolean;
  };
  cardHolderName?: string;
  lastFour?: string;
}

export interface OrderItemSummary {
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  affiliateId: string;
  affiliateBusinessName: string;
  items: OrderItemSummary[];
  subtotal: number;
  shipping: number;
  medicalReviewFee: number;
  total: number;
  status: 'submitted' | 'intake_pending' | 'under_clinical_review' | 'approved' | 'pharmacy_dispensed' | 'delivered';
  createdAt: string;
  patient: {
    fullName: string;
    email: string;
    phone: string;
    state: string;
    shippingAddress: string;
  };
}

export type StorefrontView =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'how-it-works'
  | 'faqs'
  | 'checkout'
  | 'handoff'
  | 'order-status'
  | 'support'
  | 'terms'
  | 'privacy';
