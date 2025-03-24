// src/components/NewsSlider.tsx

"use client"; // Директива для клиентского компонента

import { useState } from 'react';
import Image from 'next/image';

type Slide = {
  videoSrc: string;
  imageSrc: string;
  title: string;
  description: string;
};

export default function NewsSlider() {
  const slides: Slide[] = [
    {
      videoSrc: '/videos/slide1.mp4',
      imageSrc: '/images/overlay1.png',
      title: 'Early Dawn',
      description: 'A new beginning to the day.',
    },
    {
      videoSrc: '/videos/slide2.mp4',
      imageSrc: '/images/slide/text2.png',
      title: 'The Autumn Allure',
      description: 'Feel the charm of autumn.',
    },
    {
      videoSrc: '/videos/slide3.mp4',
      imageSrc: '/images/overlay3.png',
      title: 'Grand Prix',
      description: 'Excitement on the race track.',
    },
    {
      videoSrc: '/videos/slide4.mp4',
      imageSrc: '/images/overlay4.png',
      title: 'Winter Wonderland',
      description: 'A magical winter moment.',
    },
  ];

  return (
    <div className="w-full h-auto">
      {/* Контейнер слайдера */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            <div className="relative w-full h-full">
              <video
                src={slide.videoSrc}
                autoPlay
                loop
                muted
                className="object-cover w-full h-full"
              />
              {/* Наложение PNG сверху видео */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
                <Image
                  src={slide.imageSrc}
                  alt={slide.title}
                  width={200}
                  height={200}
                  className="absolute z-20"
                />
                <div className="mt-20 z-20">
                  <h2 className="text-2xl font-bold">{slide.title}</h2>
                  <p className="text-lg">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
