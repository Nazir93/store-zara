"use client"; // Указываем, что это клиентский компонент

import React from "react";
import Modal from "react-modal";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface CartModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onRequestClose }) => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();

  // Суммируем стоимость всех товаров в корзине
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.replace(/[^0-9.-]+/g, "")),
    0
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart"
      className="relative max-w-5xl mx-auto my-20 bg-white p-8 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Список товаров в корзине */}
        <div className="flex-1 overflow-auto max-h-[600px]">
          <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>
          {cartItems.length > 0 ? (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-4 text-gray-700">Product</th>
                    <th className="py-4 text-gray-700">Price</th>
                    <th className="py-4 text-gray-700">Quantity</th>
                    <th className="py-4 text-gray-700">Total</th>
                    <th className="py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.name} className="border-b">
                      <td className="py-4 flex items-center">
                        <Image
                          src={Array.isArray(item.imageSrc) ? item.imageSrc[0] : item.imageSrc}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-md mr-4"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          {item.size && (
                            <p className="text-gray-500 text-sm">Size: {item.size}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-gray-700">{item.price}</td>
                      <td className="py-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
                            onClick={() => updateCartItemQuantity(item.name, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
                            onClick={() => updateCartItemQuantity(item.name, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-gray-700">
                        {(item.quantity * parseFloat(item.price.replace(/[^0-9.-]+/g, ""))).toFixed(2)} EUR
                      </td>
                      <td className="py-4">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.name)}
                          aria-label="Remove item"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-gray-500 mt-4">Your cart is empty.</p>
          )}
        </div>

        {/* Подсчет итоговой стоимости и действия с корзиной */}
        <div className="w-full lg:w-1/3 p-6 bg-gray-50 rounded-lg shadow-md self-start">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-600">Subtotal:</span>
              <span className="text-2xl font-semibold text-gray-800">{subtotal.toFixed(2)} EUR</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              The prices on our website are displayed in the local currency for each country. However, you will be charged in AED when making a purchase, so the final price may differ slightly due to the exchange rate.
            </p>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-md mb-4 font-semibold hover:bg-gray-800 transition">
            Checkout
          </button>
          <button
            className="w-full border border-black text-black py-4 rounded-md font-semibold hover:bg-gray-100 transition"
            onClick={onRequestClose}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
