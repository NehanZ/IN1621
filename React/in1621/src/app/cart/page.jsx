'use client';

import { useCart } from '../../components/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { status } = useSession();

  const {
    cartItems = [],
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
    totalItems,
  } = useCart();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/login');
    } else if (status === 'authenticated') {
      router.replace('/cart');
    }
  }, [status, router]);

  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#E5E5CB]">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-[#3C2A21] mb-8">
          Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-[#3C2A21] mb-4">Your cart is empty</h2>
            <Link href="/menu">
              <span className="inline-block bg-[#3C2A21] text-[#E5E5CB] px-6 py-3 rounded-lg hover:bg-[#1A120B] transition-colors">
                Browse Menu
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-[#D5CEA3] p-4">
                  <div className="col-span-5 font-medium text-[#3C2A21]">Item</div>
                  <div className="col-span-2 font-medium text-[#3C2A21] text-right">Price</div>
                  <div className="col-span-3 font-medium text-[#3C2A21] text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-[#3C2A21] text-right">Total</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.option || 'noopt'}`} className="p-4">
                      <div className="grid grid-cols-12 items-center gap-4">
                        {/* Item */}
                        <div className="col-span-12 md:col-span-5">
                          <div className="flex items-center">
                            <div className="w-16 h-16 relative mr-4">
                              <Image
                                src={item.image || '/placeholder-image.jpg'}
                                alt={item.name}
                                fill
                                className="object-cover rounded-md"
                                sizes="(max-width: 768px) 100px, 150px"
                              />
                            </div>
                            <span className="font-medium text-[#3C2A21]">
                              {item.name}
                              {item.option && (
                                <em className="ml-2 text-sm text-gray-600">({item.option})</em>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-4 md:col-span-2 text-right">
                          <span className="md:hidden text-sm text-gray-500">Price: </span>
                          <span>LKR {item.price.toLocaleString()}</span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-5 md:col-span-3">
                          <div className="flex items-center justify-end md:justify-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.option)}
                              className="p-2 text-[#3C2A21] hover:bg-[#E5E5CB] rounded"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.option)}
                              className="p-2 text-[#3C2A21] hover:bg-[#E5E5CB] rounded"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-3 md:col-span-2 text-right font-semibold">
                          LKR {(item.price * item.quantity).toLocaleString()}
                        </div>

                        {/* Remove */}
                        <div className="col-span-2 hidden md:flex justify-end">
                          <button
                            onClick={() => removeFromCart(item.id, item.option)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Clear Cart
                  </button>
                  <Link
                    href="/menu"
                    className="text-[#3C2A21] hover:text-[#1A120B] font-semibold"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#3C2A21] mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee:</span>
                <span>LKR {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-300 mt-2 pt-2 font-bold flex justify-between">
                <span>Total:</span>
                <span>LKR {total.toLocaleString()}</span>
              </div>

              <button
                disabled={cartItems.length === 0}
                className={`mt-6 w-full py-3 rounded-lg font-semibold text-white ${
                  cartItems.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#3C2A21] hover:bg-[#1A120B]'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}