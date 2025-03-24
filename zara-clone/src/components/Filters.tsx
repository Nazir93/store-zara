"use client";

import { Dispatch, SetStateAction } from "react";

interface FiltersProps {
  categories: string[];
  onCategorySelect: Dispatch<SetStateAction<string>>;
  sortBy: string;
  onSortChange: Dispatch<SetStateAction<string>>;
}

export default function Filters({
  categories,
  onCategorySelect,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">View All</h3>
      <div>
        {categories.map((category, index) => (
          <div key={index} className="mb-3">
            <button
              onClick={() => onCategorySelect(category)} // При нажатии выбираем категорию
              className="w-full text-left text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-300"
            >
              {category}
            </button>
          </div>
        ))}
      </div>

     
    </div>
  );
}
