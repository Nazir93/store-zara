"use client"; // Директива для клиентского компонента

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ParallaxSection() {
  const [scrollY, setScrollY] = useState(0);
  const [logoColor, setLogoColor] = useState('white');
  const [isPlaying, setIsPlaying] = useState(true); // Состояние для включения/выключения музыки

  // Отслеживаем скролл страницы
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Меняем цвет логотипа при прокрутке
      if (scrollY > 100) {
        setLogoColor('black');
      } else {
        setLogoColor('white');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Переключение музыки
  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      {/* Фиксированное меню */}
      <div className="fixed top-20 left-0 w-full bg-transparent z-50 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <span className="text-white text-xl">WOMAN</span>
          <span className="text-white text-xl">MAN</span>
          <span className="text-white text-xl">KIDS</span>
          <span className="text-white text-xl">ZARA SRPLS</span>
          <span className="text-white text-xl">Z3D</span>
          <span className="text-white text-xl">HOME</span>
          <span className="text-white text-xl">BEAUTY</span>
          <span className="text-white text-xl">ZARA PRE-OWNED</span>
        </div>
      </div>

      {/* Раздел 1 с параллаксовым эффектом */}
      <div
        className="relative h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/paralax1.jpg)' }}
      >
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold">Section 1</h2>
          <p className="text-lg">Description of section 1</p>
        </div>
      </div>

      {/* Раздел 2 с параллаксовым эффектом */}
      <div
        className="relative h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/paralax2.jpg)' }}
      >
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold">Section 2</h2>
          <p className="text-lg">Description of section 2</p>
        </div>
      </div>

      {/* Раздел 3 с параллаксовым эффектом */}
      <div
        className="relative h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/paralax3.jpg)' }}
      >
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold">Section 3</h2>
          <p className="text-lg">Description of section 3</p>
        </div>
      </div>

      {/* Кнопка для управления музыкой */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={toggleMusic}
          className="p-4 bg-white text-black rounded-full"
        >
          {isPlaying ? '🔊' : '🔇'} {/* Изменяется значок в зависимости от состояния музыки */}
        </button>
      </div>

      {/* Звук */}
      <audio autoPlay loop muted={!isPlaying}>
        <source src="/sounds/fon.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

