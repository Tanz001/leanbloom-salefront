import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckoutDraft, OrderSummary, CartItem } from '../types';
import { useTenant } from './TenantContext';
import { useCart } from './CartContext';

interface CheckoutContextType {
  draft: CheckoutDraft;
  updateDraft: (updates: Partial<CheckoutDraft>) => void;
  activeOrder: OrderSummary | null;
  submitOrder: () => OrderSummary | null;
  lookupOrder: (query: string) => OrderSummary | null;
  savedOrders: OrderSummary[];
  clearActiveOrder: () => void;
  setActiveOrder: (order: OrderSummary | null) => void;
}

const INITIAL_DRAFT: CheckoutDraft = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  state: 'CA',
  shippingAddress: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'CA',
    zipCode: ''
  },
  consents: {
    telehealthConsent: true,
    asynchronousReviewConsent: true,
    termsAndPrivacyConsent: true
  },
  cardHolderName: '',
  lastFour: '4242'
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'leanbloom_patient_orders_history';

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tenant } = useTenant();
  const { items, clearCart } = useCart();
  const [draft, setDraft] = useState<CheckoutDraft>(INITIAL_DRAFT);
  const [activeOrder, setActiveOrder] = useState<OrderSummary | null>(null);
  const [savedOrders, setSavedOrders] = useState<OrderSummary[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(savedOrders));
    } catch {
      // ignore
    }
  }, [savedOrders]);

  const updateDraft = (updates: Partial<CheckoutDraft>) => {
    setDraft((prev) => ({
      ...prev,
      ...updates,
      shippingAddress: {
        ...prev.shippingAddress,
        ...(updates.shippingAddress || {})
      },
      consents: {
        ...prev.consents,
        ...(updates.consents || {})
      }
    }));
  };

  const submitOrder = (): OrderSummary | null => {
    if (items.length === 0) return null;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderNum = `LB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderSummary = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      affiliateId: tenant.id,
      affiliateBusinessName: tenant.businessName,
      items: items.map((i) => ({
        product: i.product,
        quantity: i.quantity,
        unitPrice: i.price,
        totalPrice: i.price * i.quantity
      })),
      subtotal,
      shipping: 0, // Free cold chain priority
      medicalReviewFee: 0, // Included in affiliate program
      total: subtotal,
      status: 'submitted',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      patient: {
        fullName: draft.fullName || 'Valued Patient',
        email: draft.email || 'patient@example.com',
        phone: draft.phone || '(555) 019-2834',
        state: draft.state || 'CA',
        shippingAddress: `${draft.shippingAddress.addressLine1 || '123 Health Ave'}, ${
          draft.shippingAddress.city || 'San Francisco'
        }, ${draft.shippingAddress.state || 'CA'} ${draft.shippingAddress.zipCode || '94102'}`
      }
    };

    setActiveOrder(newOrder);
    setSavedOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const lookupOrder = (query: string): OrderSummary | null => {
    const clean = query.trim().toLowerCase();
    if (!clean) return null;
    return (
      savedOrders.find(
        (o) =>
          o.orderNumber.toLowerCase() === clean ||
          o.id.toLowerCase() === clean ||
          o.patient.email.toLowerCase() === clean
      ) || null
    );
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        draft,
        updateDraft,
        activeOrder,
        submitOrder,
        lookupOrder,
        savedOrders,
        clearActiveOrder,
        setActiveOrder
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export function useCheckout(): CheckoutContextType {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
