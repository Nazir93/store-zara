"use client"; // Указываем, что это клиентский компонент

import { usePathname } from 'next/navigation'; // Хук для получения текущего пути
import Image from 'next/image';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react'; // Импортируем useEffect и useState
import { useCart } from "@/context/CartContext"; // Импортируем useCart для доступа к корзине
import CartModal from "./CartModal"; // Импортируем компонент для модального окна корзины

export default function Header() {
  const pathname = usePathname(); // Получаем текущий путь
  const [isClient, setIsClient] = useState(false); // Состояние для проверки рендера на клиенте
  const [isCartOpen, setIsCartOpen] = useState(false); // Состояние для открытия корзины
  const { cartItems } = useCart(); // Доступ к корзине через контекст

  useEffect(() => {
    setIsClient(true); // Устанавливаем состояние на true, когда компонент монтируется
  }, []);

  // Не отображаем Header на главной странице
  if (!isClient || pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-10 text-white p-3 flex justify-between items-center z-50">
      {/* Левый блок с меню */}
      <button className="text-2xl" aria-label="Меню">
        &#9776;
      </button>

      {/* Логотип по центру */}
      <div className="text-4xl font-bold">
        <Image src="/logo.png" alt="Logo" width={200} height={100} />
      </div>

      {/* Правый блок с иконками */}
      <div className="flex items-center space-x-4">
        {/* Переключатель языка */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <span className="text-sm">EN</span>
          <Image src="/icons/flag-icon.png" alt="Flag" width={16} height={16} />
        </div>

        {/* Иконка поиска */}
        <button className="text-2xl" aria-label="Поиск">
          <AiOutlineSearch />
        </button>

        {/* Иконка избранного */}
        <button className="text-2xl" aria-label="Избранное">
          <AiOutlineHeart />
        </button>

        {/* Иконка корзины */}
        <button
          className="text-2xl relative"
          aria-label="Корзина"
          onClick={() => setIsCartOpen(true)}
        >
          <AiOutlineShoppingCart />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* Иконка профиля */}
        <button className="text-2xl" aria-label="Профиль">
          <AiOutlineUser />
        </button>
      </div>

      {/* Модальное окно корзины */}
      <CartModal isOpen={isCartOpen} onRequestClose={() => setIsCartOpen(false)} />
    </div>
  );
}
