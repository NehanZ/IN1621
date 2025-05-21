// app/cart/page.tsx
'use client';
import { useCart } from '../../components/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems = [],
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
    totalItems,
  } = useCart();

  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#E5E5CB]">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-[#3C2A21] mb-8">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-[#3C2A21] mb-4">
              Your cart is empty
            </h2>
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
                    <div key={item.id} className="p-4">
                      <div className="grid grid-cols-12 items-center gap-4">
                        {/* Item */}
                        <div className="col-span-12 md:col-span-5">
                          <div className="flex items-center">
                            <div className="w-16 h-16 relative mr-4">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-md"
                                sizes="(max-width: 768px) 100px, 150px"
                              />
                            </div>
                            <span className="font-medium text-[#3C2A21]">{item.name}</span>
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-[#3C2A21] hover:bg-[#E5E5CB] rounded"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-[#3C2A21] hover:bg-[#E5E5CB] rounded"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="col-span-3 md:col-span-2 flex justify-end items-center">
                          <span className="md:hidden text-sm text-gray-500">Total: </span>
                          <span className="font-medium">
                            LKR {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700 p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Link
                  href="/menu"
                  className="text-[#3C2A21] hover:text-[#1A120B] font-medium"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-[#3C2A21] hover:text-[#1A120B] font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
              <h2 className="text-xl font-semibold text-[#3C2A21] mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span>LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>LKR {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#3C2A21]">
                    LKR {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#3C2A21] text-[#E5E5CB] text-center py-3 rounded-lg hover:bg-[#1A120B] transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}