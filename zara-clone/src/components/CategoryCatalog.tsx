"use client"; // Директива для клиентского компонента

import ProductGrid from "./ProductGrid"; // Подключаем ProductGrid компонент
import { Product } from "./ProductGrid"; // Импортируем интерфейс Product

// Типизация для CategoryCatalog пропсов
interface CategoryCatalogProps {
  selectedCategory: string;
  sortBy: string;
}

export default function CategoryCatalog({ selectedCategory, sortBy }: CategoryCatalogProps) {
  // Пример товаров с категориями
  const products: Product[] = [
    { 
      name: "Trench coat", 
      price: "€334", 
      description: "A classic trench coat.", 
      category: "Coats", 
      imageSrc: ["/images/slide3.jpg", "/images/slide3_alternate.jpg"], // Можно использовать массив изображений
      videoSrc: "/videos/slide2.mp4", // Путь к видео
      threeDSrc: "/models/trench_coat.glb" // Путь к 3D модели
    },
    { 
      name: "Ribbed cotton cropped top", 
      price: "€58", 
      description: "A comfy cropped top.", 
      category: "Tops", 
      imageSrc: "/images/product2.jpg",
      videoSrc: "/videos/ribbed_top.mp4", // Путь к видео для продукта
      threeDSrc: "/models/ribbed_top.glb" // Путь к 3D модели продукта
    },
    { 
      name: "Mesh pumps", 
      price: "€296", 
      description: "Stylish black mesh pumps.", 
      category: "Footwear", 
      imageSrc: "/images/product3.jpg" 
    },
    { 
      name: "Leather belt", 
      price: "€103", 
      description: "Premium leather belt.", 
      category: "Accessories", 
      imageSrc: "/images/product4.jpg" 
    },
    // добавьте еще товары по аналогии
  ];

  // Фильтрация товаров на основе выбранной категории
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  // Сортировка товаров, если это требуется
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return parseFloat(a.price.replace("€", "")) - parseFloat(b.price.replace("€", ""));
      case "Price: High to Low":
        return parseFloat(b.price.replace("€", "")) - parseFloat(a.price.replace("€", ""));
      case "Newest":
        // Здесь можно добавить логику для сортировки по новизне, если есть поле даты
        return 0; 
      default:
        return 0; // Default sorting (Relevance)
    }
  });

  return (
    <div className="w-full p-0 bg-white">
      {sortedProducts.length > 0 ? (
        <ProductGrid products={sortedProducts} />
      ) : (
        <div className="text-center p-6 text-gray-500">No products available</div>
      )}
    </div>
  );
}
