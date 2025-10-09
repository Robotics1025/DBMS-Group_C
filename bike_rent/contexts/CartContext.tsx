"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  bikeId: number;
  bikeName: string;
  bikeType: string;
  bikeImage: string;
  price: number;
  location: string;
  duration: string;
  hours: number;
  totalPrice: number;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'id' | 'addedAt'>) => string;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, hours: number) => void;
  clearCart: () => void;
  getCartItem: (id: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: Omit<CartItem, 'id' | 'addedAt'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: CartItem = {
      ...item,
      id,
      addedAt: new Date(),
    };

    setItems(prev => [...prev, newItem]);
    return id;
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, hours: number) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, hours, totalPrice: item.price * hours }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartItem = useCallback((id: string) => {
    return items.find(item => item.id === id);
  }, [items]);

  const totalItems = items.length;
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};