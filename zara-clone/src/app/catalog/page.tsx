"use client"; // Директива для клиентского компонента

import { useState } from "react"; // Импортируем useState
import CategoryCatalog from '../../components/CategoryCatalog'; // Импортируем компонент каталога
import Filters from '../../components/Filters'; // Импортируем компонент фильтров
import Header from '../../components/Header'; // Импортируем компонент Header

// Типизация для состояния
interface CatalogPageProps {
  categories: string[];
  selectedCategory: string;
  sortBy: string;
}

export default function CatalogPage() {
  const categories: string[] = [
    "Abayas", "Dresses", "Suits", "Swimwear", "Headwear", "Coats", 
    "Hoodies", "Jeans", "Accessories", "Trousers", "Footwear", "Skirts", "Blazers",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Состояние выбранной категории
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [selectedSize, setSelectedSize] = useState<string>(""); // Состояние выбранного размера
  const [selectedColor, setSelectedColor] = useState<string>(""); // Состояние выбранного цвета

  return (
    <div className="bg-white">
      {/* Хедер страницы */}
      <Header />

      <div className="p-6 text-gray-600 mt-16">
            <span>Home / </span>
            <span>Catalog / </span>
            <span className="font-semibold">View All</span>
        </div>

      <div className="flex">
        {/* Левая панель с категориями */}
        <div className="w-1/4 p-4">
          <Filters
            categories={categories} 
            onCategorySelect={setSelectedCategory} 
            sortBy={sortBy} 
            onSortChange={setSortBy} 
          />
        </div>

        {/* Правая часть с товарами и дополнительными фильтрами сверху */}
        <div className="w-3/4 p-4">
          {/* Фильтры сверху страницы */}
          <div className="flex justify-between items-center mb-0 gap-4">
            
            <div className="flex gap-4">
              <div>
                <label htmlFor="size" className="text-lg font-semibold">Size:</label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Sizes</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div>
                <label htmlFor="color" className="text-lg font-semibold">Color:</label>
                <select
                  id="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Colors</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Red">Red</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="sort" className="text-lg font-semibold">Sort By:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Relevance">Relevance</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Вставляем компонент каталога */}
          <CategoryCatalog
            selectedCategory={selectedCategory}
            sortBy={sortBy}
          />

          {/* Хлебные крошки снизу */}
          
        </div>
      </div>
    </div>
  );
}
