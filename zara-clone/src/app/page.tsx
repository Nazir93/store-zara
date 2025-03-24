"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";

export default function HomePage() {
  const [country, setCountry] = useState(""); 
  const [language, setLanguage] = useState(""); 
  const [showBanner, setShowBanner] = useState(false); 
  const [showHeader, setShowHeader] = useState(false); 

  const router = useRouter(); 

  const handleGoClick = () => {
    console.log("Selected Country:", country);
    console.log("Selected Language:", language);

    if (country === "DUBAI / ДУБАЙ" && language === "ENGLISH") {
      setShowBanner(true);
      setShowHeader(true);

      // Перенаправление на страницу с баннером
      router.push("/en/");
    } else {
      setShowHeader(false); 
    }
  };

  return (
    <div className="relative h-screen w-full">
      {showHeader && <Header />}
      {showBanner ? (
        <Banner />
      ) : (
        <>
          <div className="relative w-full h-screen">
            <Image
              src="/background.jpg"
              alt="ZARA Background"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white">
            <Image
              src="/logo.png"
              alt="ARSAEVY Logo"
              width={500}
              height={300}
              className="mb-10"
            />

            <div className="mt-10 space-y-4 w-80">
              <div className="border-b border-white pb-2">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-transparent text-white text-center outline-none w-full"
                >
                  <option value="">Выберите страну</option>
                  <option value="DUBAI / ДУБАЙ">DUBAI / ДУБАЙ</option>
                  <option value="RUSSIA / РОССИЯ">РОССИЯ / РОССИЯ</option>
                </select>
              </div>

              <div className="border-b border-white pb-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-white text-center outline-none w-full"
                >
                  <option value="">Выберите язык</option>
                  <option value="ENGLISH">ENGLISH</option>
                  <option value="RUSSIAN">РУССКИЙ</option>
                </select>
              </div>

              <button
                onClick={handleGoClick}
                className="border border-white px-20 py-2 mt-8 text-lg hover:bg-white hover:text-black transition"
              >
                GO
              </button>
            </div>

            <p className="absolute bottom-10 text-sm underline cursor-pointer">
              НАСТРОЙКИ ФАЙЛОВ COOKIE
            </p>
          </div>
        </>
      )}
    </div>
  );
}
