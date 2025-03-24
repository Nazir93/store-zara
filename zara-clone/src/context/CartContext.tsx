"use client"; // Указываем, что это клиентский компонент

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/types";

// Интерфейс для товара в корзине
interface CartItem extends Product {
  quantity: number;
  size?: string; // Добавляем свойство size для хранения размера товара
}

// Интерфейс для типа контекста корзины
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (name: string) => void;
  updateCartItemQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
}

// Изначальное состояние корзины
const defaultCartState: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
};

// Создаем контекст корзины
const CartContext = createContext<CartContextType>(defaultCartState);

// Поставщик контекста корзины
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Добавление товара в корзину
  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.name === product.name && item.size === size
      );
      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, обновляем его количество
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Если товара нет в корзине, добавляем новый
        return [...prevItems, { ...product, size, quantity }];
      }
    });
  };

  // Удаление товара из корзины
  const removeFromCart = (name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  // Обновление количества товара в корзине
  const updateCartItemQuantity = (name: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Очистка корзины
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста корзины
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
