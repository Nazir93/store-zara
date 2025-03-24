"use client"; // Директива для клиентского компонента

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Используем useParams для получения id
import ProductDetails from "@/components/ProductDetails"; // Компонент для отображения деталей продукта
import { productsData } from "@/data/products"; // Импортируем данные продуктов
import { Product } from "@/data/types"; // Импортируем интерфейс Product

export default function ProductDetailPage() {
  const { id } = useParams(); // Используем useParams для получения идентификатора продукта

  // Типизация состояния: product может быть Product или null
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      // Находим продукт по его id (slug)
      const foundProduct = productsData.find(
        (item) => item.name.toLowerCase().replace(/\s+/g, "-") === id
      );

      // Устанавливаем состояние product, если продукт найден
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  if (!product) {
    return <div>Product not found</div>; // Показ сообщения об отсутствии продукта, если он не найден
  }

  return (
    <div className="container mx-auto py-12">
      <ProductDetails product={product} enable3DView={true} enableVideoView={true} />
    </div>
  );
}
