'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';

export default function Checkout() {
  const [promoCode, setPromoCode] = useState('');
  const [orderItems] = useState([
    { name: 'Espresso', quantity: 1, price: 362 },
  ]);
  const [deliveryFee] = useState(260);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');

  const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0) + deliveryFee;

  const handleSubmit = (event) => {
    event.preventDefault();
    const label = event.nativeEvent.submitter.value;
    setSelectedLabel(label);
  };

  return (
    <div>
    < Header />
    <div className="min-h-screen bg-[#E5E5CB] py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#3C2A21] mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Delivery Information */}
          <div className="flex-1 bg-[#e9e9db] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#3C2A21] mb-6">Delivery Information</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-[#3C2A21] mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Enter your first and last name"
                    className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                  />
                </div>
                
                <div>
                  <label htmlFor="province" className="block text-[#3C2A21] mb-1">Province</label>
                  <select 
                    id="province" 
                    className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21] bg-[#e9e9db]"
                  >
                    <option value="">Choose Province</option>
                    <option value="central">Central</option>
                    <option value="eastern">Eastern</option>
                    <option value="northern">Northern</option>
                    <option value="southern">Southern</option>
                    <option value="western">Western</option>
                    <option value="north-central">North Central</option>
                    <option value="north-western">North Western</option>
                    <option value="uva">Uva</option>
                    <option value="sabaragamuwa">Sabaragamuwa</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-[#3C2A21] mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    id="phone" 
                    placeholder="Enter your phone number"
                    className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                  />
                </div>
                
                <div>
                  <label htmlFor="district" className="block text-[#3C2A21] mb-1">District</label>
                  <select 
                    id="district" 
                    className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21] bg-[#e9e9db]"
                  >
                    <option value="">Choose District</option>
                    <option value="gampaha">Gampaha</option>
                    <option value="colombo">Colombo</option>
                    <option value="kaluthara">Kaluthara</option>
                    <option value="kandy">Kandy</option>
                    {/* Add other districts */}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address" className="block text-[#3C2A21] mb-1">Building / House No / Floor / Street</label>
                  <input 
                    type="text" 
                    id="address" 
                    placeholder="Please enter"
                    className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-[#3C2A21] mb-1">City</label>
                  <select 
                    id="city" 
                    className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21] bg-[#e9e9db]"
                  >
                    <option value="">Choose City</option>
                    {/* Add cities */}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="landmark" className="block text-[#3C2A21] mb-1">Colony/Locality/Landmark</label>
                <input 
                  type="text" 
                  id="landmark" 
                  placeholder="Please enter"
                  className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                />
              </div>
              
              <div>
                <p className="text-[#3C2A21] mb-2">Select a label for effective delivery:</p>
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedLabel('office')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 border border-[#3C2A21] ${
                      selectedLabel === 'office' 
                        ? 'bg-[#3C2A21] text-[#E5E5CB]' 
                        : 'bg-[#e9e9db] text-[#3C2A21]'
                    }`}
                  >
                    🏢 OFFICE
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLabel('home')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 border border-[#3C2A21] ${
                      selectedLabel === 'home' 
                        ? 'bg-[#3C2A21] text-[#E5E5CB]' 
                        : 'bg-[#e9e9db] text-[#3C2A21]'
                    }`}
                  >
                    🏠 HOME
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-[#3C2A21] mb-2">Select a payment method:</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('cod')}
                    className={`p-3 border rounded-lg flex flex-col items-center w-24 ${
                      selectedMethod === 'cod' 
                        ? 'border-[#3C2A21] bg-[#3C2A21] text-[#E5E5CB]' 
                        : 'border-[#D5CEA3]'
                    }`}
                  >
                    <img src="/cash.jpeg" alt="Cash" className="w-10 h-10 mb-1" />
                    <span className="text-xs">Cash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('visa')}
                    className={`p-3 border rounded-lg flex flex-col items-center w-24 ${
                      selectedMethod === 'visa' 
                        ? 'border-[#3C2A21] bg-[#3C2A21] text-[#E5E5CB]' 
                        : 'border-[#D5CEA3]'
                    }`}
                  >
                    <img src="/visa.png" alt="Visa" className="w-10 h-10 mb-1" />
                    <span className="text-xs">Visa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('mastercard')}
                    className={`p-3 border rounded-lg flex flex-col items-center w-24 ${
                      selectedMethod === 'mastercard' 
                        ? 'border-[#3C2A21] bg-[#3C2A21] text-[#E5E5CB]' 
                        : 'border-[#D5CEA3]'
                    }`}
                  >
                    <img src="/master.jpg" alt="Mastercard" className="w-10 h-10 mb-1" />
                    <span className="text-xs">Mastercard</span>
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#3C2A21] text-[#E5E5CB] py-3 rounded-lg hover:bg-[#1A120B] transition-colors"
              >
                SAVE
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96 bg-[#e9e9db] p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-bold text-[#3C2A21] mb-4">Promotion</h3>
            <div className="flex mb-6">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter store/code"
                className="flex-1 p-3 border border-[#D5CEA3] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
              />
              <button className="bg-[#3C2A21] text-[#E5E5CB] px-4 rounded-r-lg hover:bg-[#1A120B] transition-colors">
                APPLY
              </button>
            </div>
            
            <hr className="border-[#D5CEA3] my-4" />
            
            <h3 className="text-xl font-bold text-[#3C2A21] mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items Total ({orderItems.length} Items):</span>
                <span>Rs. {orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>Rs. {deliveryFee}</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold text-lg border-t border-[#D5CEA3] pt-4 mb-2">
              <span>Total:</span>
              <span>Rs. {total}</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">VAT included, where applicable</p>
            
            <button 
              className={`w-full py-3 rounded-lg ${
                selectedMethod 
                  ? 'bg-[#3C2A21] text-[#E5E5CB] hover:bg-[#1A120B]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-colors`}
              disabled={!selectedMethod}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
    < Footer />
    </div>
  );
}