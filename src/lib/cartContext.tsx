'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem, Offer } from './types';

interface CartContextType {
  cart: OrderItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, qty: number) => void;
  clearCart: () => void;
  appliedOffer: Offer | null;
  applyCoupon: (code: string, availableOffers: Offer[]) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('mm_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedOffer = localStorage.getItem('mm_applied_offer');
      if (savedOffer) setAppliedOffer(JSON.parse(savedOffer));
    } catch (e) {}
  }, []);

  const saveCartToStorage = (updatedCart: OrderItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('mm_cart', JSON.stringify(updatedCart));
    } catch (e) {}
  };

  const addToCart = (item: OrderItem) => {
    const existingIndex = cart.findIndex(
      (i) => i.productId === item.productId && i.selectedSize === item.selectedSize
    );

    let updatedCart: OrderItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += item.quantity;
    } else {
      updatedCart = [...cart, item];
    }

    saveCartToStorage(updatedCart);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    const updated = cart.filter(
      (i) => !(i.productId === productId && i.selectedSize === selectedSize)
    );
    saveCartToStorage(updated);
  };

  const updateQuantity = (productId: string, selectedSize: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    const updated = cart.map((i) => {
      if (i.productId === productId && i.selectedSize === selectedSize) {
        return { ...i, quantity: qty };
      }
      return i;
    });
    saveCartToStorage(updated);
  };

  const clearCart = () => {
    setCart([]);
    setAppliedOffer(null);
    try {
      localStorage.removeItem('mm_cart');
      localStorage.removeItem('mm_applied_offer');
    } catch (e) {}
  };

  const applyCoupon = (code: string, availableOffers: Offer[]) => {
    const found = availableOffers.find(
      (o) => o.code.toUpperCase() === code.trim().toUpperCase() && o.active
    );
    if (found) {
      setAppliedOffer(found);
      try {
        localStorage.setItem('mm_applied_offer', JSON.stringify(found));
      } catch (e) {}
      return { success: true, message: `Coupon "${found.code}" applied! (${found.discountPercentage}% OFF)` };
    }
    return { success: false, message: 'Invalid or expired coupon code' };
  };

  const removeCoupon = () => {
    setAppliedOffer(null);
    try {
      localStorage.removeItem('mm_applied_offer');
    } catch (e) {}
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedOffer
    ? (subtotal * appliedOffer.discountPercentage) / 100
    : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedOffer,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        discountAmount,
        totalAmount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
