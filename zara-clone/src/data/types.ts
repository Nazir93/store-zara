// Интерфейс для продукта
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
  