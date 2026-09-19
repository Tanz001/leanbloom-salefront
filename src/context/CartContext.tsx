import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import { getProductPriceForAffiliate } from '../data/products';
import { useTenant } from './TenantContext';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tenant } = useTenant();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage whenever active tenant changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`leanbloom_cart_${tenant.id}`);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        // Refresh prices with active affiliate pricing
        const updated = parsed.map((item) => ({
          ...item,
          price: getProductPriceForAffiliate(item.product, tenant.id)
        }));
        setItems(updated);
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    }
  }, [tenant.id]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(`leanbloom_cart_${tenant.id}`, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to persist cart:', e);
    }
  }, [items, tenant.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addItem = (product: Product, quantity = 1) => {
    const price = getProductPriceForAffiliate(product, tenant.id);
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.productId === product.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity,
          price
        };
        return copy;
      } else {
        return [...prev, { productId: product.id, product, quantity, price }];
      }
    });

    showToast(`Added ${product.name} to your program selection`);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        dismissToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
