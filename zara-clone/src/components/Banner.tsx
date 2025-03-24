"use client"; // Директива для клиентского компонента

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Для перехода на страницы

type Slide = {
  type: 'image' | 'video';
  src: string;
  alt: string;
};

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState<number>(0); // Инициализируем состояние текущего слайда
  const router = useRouter(); // Для навигации

  const slides: Slide[] = [
    {
      type: 'image',
      src: '/images/slide1.jpg',
      alt: 'Slide 1',
    },
    {
      type: 'video',
      src: '/videos/slide2.mp4',
      alt: 'Slide 2 Video',
    },
    {
      type: 'image',
      src: '/images/slide3.jpg',
      alt: 'Slide 3',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Переход к следующему слайду
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Переход к предыдущему слайду
  };

  // Функция для перехода на страницу каталога
  const navigateToCatalog = () => {
    router.push('/catalog'); // Переход на страницу каталога
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Кнопки навигации слайдера */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-20"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-20"
      >
        &#8250;
      </button>

      {/* Контент слайдера */}
      <div className="w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'image' ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Текст на баннере */}
      <div className="absolute bottom-20 left-10 text-white z-20">
        <h2 className="text-4xl font-bold">Festive Collection</h2>
        <p className="mt-2 text-lg">View all</p>

        {/* Кнопка перехода на каталог */}
        <button
          onClick={navigateToCatalog}
          className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-300"
        >
          Explore Catalog
        </button>
      </div>
    </div>
  );
}
