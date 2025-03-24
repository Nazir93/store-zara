"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/types";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";

interface ProductDetailsProps {
  product: Product;
  enable3DView?: boolean; // Добавили пропс enable3DView
  enableVideoView?: boolean; // Добавили пропс enableVideoView
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, enable3DView, enableVideoView }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Для модального окна с размерами
  const { addToCart } = useCart();

  // Список изображений продукта
  const images = Array.isArray(product.imageSrc) ? product.imageSrc : [product.imageSrc];

  const handleAddToCart = () => {
    addToCart(product);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1fr] gap-8 mt-16">
        {/* Миниатюры изображений */}
        <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-[600px]">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`cursor-pointer w-20 h-28 relative ${
                index === selectedImageIndex ? "border-2 border-[#4b3621]" : "border"
              } rounded-md`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Основное изображение */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-3xl">
            <Image
              src={images[selectedImageIndex]}
              alt={`${product.name} - Image ${selectedImageIndex + 1}`}
              width={800}
              height={800}
              className="object-contain rounded-md"
            />
          </div>
        </div>

        {/* Информация о продукте */}
        <div className="flex flex-col items-start p-6 border rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold mb-4 text-black">{product.name}</h1>
          <p className="text-2xl text-gray-700 mb-4">{product.price}</p>

          {/* Кнопка добавления в корзину */}
          <button
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-semibold mb-6"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Описание продукта */}
          <p className="text-md text-gray-800 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Дополнительные ссылки */}
          <div className="text-sm text-gray-600 mb-4 cursor-pointer">
            <p className="hover:underline">Check in-store availability</p>
            <p className="hover:underline">Shipping, Exchanges and Returns</p>
            <p className="text-xs mt-2 text-gray-500">
              Due to Christmas Time, orders placed from the 15th of November can be returned until 30th of December.
            </p>
          </div>

          {/* Выбор размера */}
          <div className="mb-4">
            <h3 className="text-md text-gray-800 font-bold mb-2">MOSS GREEN | 6214/241</h3>
            <div className="grid grid-cols-2 gap-2">
              {["6-7 YEARS (120 CM)", "8-9 YEARS (130 CM)", "9-10 YEARS (140 CM)", "11-12 YEARS (152 CM)", "13-14 YEARS (164 CM)"].map((size) => (
                <button
                  key={size}
                  className="border py-2 px-4 text-center rounded hover:bg-gray-100 transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Кнопка для открытия модального окна с размерами */}
          <button
            className="mt-4 text-lg text-[#4b3621] underline hover:text-[#3b2b1b]"
            onClick={openModal}
          >
            Product Dimensions
          </button>
        </div>
      </div>

      {/* Собственное модальное окно для размеров */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-3xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Body Measurements</h2>
            <div className="relative w-full flex justify-center mb-6">
              <Image
                src="/path/to/child-measurement-image.jpg" // Замените на нужное изображение
                alt="Body measurements"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            <p className="text-gray-700 text-center">
              The measurements refer to body shape.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
