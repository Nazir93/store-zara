"use client"; // Директива для клиентского компонента

import ProductCard from "./ProductCard"; // Подключаем компонент ProductCard

// Интерфейс для описания структуры каждого продукта
export interface Product {
  name: string;
  price: string;
  description: string;
  category: string;
  imageSrc: string | string[]; // Может быть строкой или массивом строк
  composition?: string; // Дополнительно: состав продукта
  availableSizes?: string[]; // Дополнительно: доступные размеры
  videoSrc?: string; // Ссылка на видео товара
  threeDSrc?: string; // Ссылка на 3D модель товара
}

// Типизация пропса для списка продуктов
interface ProductGridProps {
  products: Product[]; // Массив продуктов, каждый из которых соответствует интерфейсу Product
}

export default function ProductGrid({ products }: ProductGridProps) {
  // Проверяем, есть ли продукты, которые можно отображать
  if (products.length === 0) {
    return <div className="text-center p-6 text-gray-500">No products available</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}
