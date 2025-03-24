"use client"; // Указываем, что это клиентский компонент

import './globals.css';
import { Montserrat } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import React, { useEffect } from 'react';
import Modal from 'react-modal';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement(document.body); // Выполняем только один раз для всего приложения
    }
  }, []);

  return (
    <html lang="ru" className={montserrat.className}>
      <body>
        <CartProvider>
          <FavoritesProvider>
            <main className="min-h-screen">{children}</main>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
