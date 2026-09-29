import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckoutDraft, OrderSummary } from '../types';
import { useTenant } from './TenantContext';
import { useCart } from './CartContext';
import { storefrontApi } from '../lib/api';

interface CheckoutContextType {
  draft: CheckoutDraft;
  updateDraft: (updates: Partial<CheckoutDraft>) => void;
  activeOrder: OrderSummary | null;
  submitOrder: () => Promise<OrderSummary | null>;
  lookupOrder: (query: string) => OrderSummary | null;
  savedOrders: OrderSummary[];
  clearActiveOrder: () => void;
  setActiveOrder: (order: OrderSummary | null) => void;
  submitError: string | null;
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
    zipCode: '',
  },
  consents: {
    telehealthConsent: true,
    asynchronousReviewConsent: true,
    termsAndPrivacyConsent: true,
  },
  cardHolderName: '',
  lastFour: '4242',
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

const ORDERS_STORAGE_KEY = 'leanbloom_patient_orders_history';

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { tenant } = useTenant();
  const { items, clearCart } = useCart();
  const [draft, setDraft] = useState<CheckoutDraft>(INITIAL_DRAFT);
  const [activeOrder, setActiveOrder] = useState<OrderSummary | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
        ...(updates.shippingAddress || {}),
      },
      consents: {
        ...prev.consents,
        ...(updates.consents || {}),
      },
    }));
  };

  const submitOrder = async (): Promise<OrderSummary | null> => {
    if (items.length === 0) return null;
    setSubmitError(null);

    try {
      const result = await storefrontApi.checkout({
        affiliateId: tenant.id,
        fullName: draft.fullName,
        email: draft.email,
        phone: draft.phone,
        state: draft.state || draft.shippingAddress.state,
        shippingAddress: draft.shippingAddress,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });

      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newOrder: OrderSummary = {
        id: result.orderIds[0] || `ord_${Date.now()}`,
        orderNumber: result.primaryOrderNumber,
        affiliateId: tenant.id,
        affiliateBusinessName: result.affiliateName || tenant.businessName,
        items: items.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          unitPrice: i.price,
          totalPrice: i.price * i.quantity,
        })),
        subtotal,
        shipping: 0,
        medicalReviewFee: 0,
        total: result.total,
        status: 'submitted',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        patient: {
          fullName: result.patient.fullName,
          email: result.patient.email,
          phone: result.patient.phone,
          state: result.patient.state,
          shippingAddress: result.patient.shippingAddress,
        },
      };

      setActiveOrder(newOrder);
      setSavedOrders((prev) => [newOrder, ...prev]);
      clearCart();
      return newOrder;
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Checkout failed'
      );
      return null;
    }
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
        setActiveOrder,
        submitError,
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
