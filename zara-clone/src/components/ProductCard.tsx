"use client"; // Директива для клиентского компонента

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/data/types"; // Импортируем интерфейс Product (проверьте правильность пути)

interface ProductCardProps {
  product: Product; // Указываем тип для пропса product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  // Преобразуем `imageSrc` в массив, чтобы работать с ним одинаково
  const images = Array.isArray(product.imageSrc) ? product.imageSrc : [product.imageSrc];
  const validImageSrc = images.find((src) => src && src.trim() !== ""); // Найдем первое валидное изображение

  const handleCardClick = () => {
    const productSlug = product.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/catalog/${productSlug}`);
  };

  return (
    <div
      className="group relative cursor-pointer p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-300"
      onClick={handleCardClick} // Добавляем возможность перехода при клике
    >
      {/* Изображение товара */}
      <div className="relative w-full h-[300px] flex justify-center items-center">
        {validImageSrc ? (
          <Image
            src={validImageSrc}
            alt={product.name}
            fill
            className="object-contain w-auto h-auto max-w-full max-h-full rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          // Если изображения нет, показываем заглушку
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>

      {/* Кнопка добавления товара (значок "+") */}
      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-opacity duration-300 group-hover:opacity-100 opacity-0"
        aria-label="Add to Wishlist"
      >
        +
      </button>

      {/* Информация о товаре */}
      <div className="mt-2 text-center">
        {/* Название и цена товара */}
        <h4 className="text-md font-semibold text-gray-800">{product.name}</h4>
        <p className="text-sm text-gray-700">{product.price}</p>

        {/* Дополнительная информация, если она есть (например, количество доступных вариантов цвета) */}
        {product.availableSizes && product.availableSizes.length > 0 && (
          <div className="mt-1 text-xs text-gray-500">
            Available in {product.availableSizes.length} sizes
          </div>
        )}
        {Array.isArray(product.imageSrc) && product.imageSrc.length > 1 && (
          <div className="mt-1 text-xs text-gray-500">
            +{product.imageSrc.length - 1} more images
          </div>
        )}
      </div>
    </div>
  );
}
