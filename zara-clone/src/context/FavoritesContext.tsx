"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/types";

interface FavoritesContextType {
  favoriteItems: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productName: string) => void;
  isFavorite: (productName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);

  // Загрузка данных из localStorage при загрузке
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavoriteItems(JSON.parse(storedFavorites));
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении избранного
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  const addToFavorites = (product: Product) => {
    setFavoriteItems((prevFavorites) => {
      if (!prevFavorites.some((item) => item.name === product.name)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (productName: string) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.filter((item) => item.name !== productName)
    );
  };

  const isFavorite = (productName: string) => {
    return favoriteItems.some((item) => item.name === productName);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
