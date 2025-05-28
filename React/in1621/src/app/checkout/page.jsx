// app/checkout/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';
import { useCart } from '../../components/context/CartContext';
import { useRouter } from 'next/navigation';
import Toast from '../../components/Toast';
import { SessionProvider, useSession } from 'next-auth/react';

export default function Checkout() {
  const router = useRouter();
  const { status } = useSession();
  const { cartItems = [], clearCart, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [deliveryFee] = useState(260);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    province: '',
    district: '',
    address: '',
    city: '',
    landmark: ''
  });

  const [errors, setErrors] = useState({});

   useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/login");
        } else if (status === "authenticated") {
            router.replace('/checkout');
        }
    }, [status, router]);

  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!selectedMethod) newErrors.payment = 'Payment method is required';
    if (!selectedLabel) newErrors.label = 'Delivery label is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      setToastMessage('Please fill all required fields correctly');
      setShowToast(true);
      return;
    }

    setIsProcessing(true);

    try {
      // In a real app, you would send this to your backend
      const orderData = {
        customer: {
          ...formData,
          deliveryLabel: selectedLabel
        },
        items: cartItems,
        paymentMethod: selectedMethod,
        subtotal,
        deliveryFee,
        total,
        promoCode: promoCode || null
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and redirect on success
      clearCart();
      router.push(`/order-confirmation?orderId=BRTN-${Math.floor(Math.random() * 10000)}`);
      
    } catch (error) {
      console.error('Checkout error:', error);
      setToastMessage('Failed to place order. Please try again.');
      setShowToast(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#E5E5CB] py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-[#3C2A21] mb-8">Checkout</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12 bg-[#e9e9db] rounded-lg">
              <h2 className="text-2xl font-semibold text-[#3C2A21] mb-4">Your cart is empty</h2>
              <Link
                href="/menu"
                className="inline-block bg-[#3C2A21] text-[#E5E5CB] px-6 py-3 rounded-lg hover:bg-[#1A120B] transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Delivery Information */}
              <div className="flex-1 bg-[#e9e9db] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-[#3C2A21] mb-6">Delivery Information</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-[#3C2A21] mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your first and last name"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.fullName ? 'border-red-500 focus:ring-red-300' : 'border-[#D5CEA3] focus:ring-[#3C2A21]'
                        }`}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="province" className="block text-[#3C2A21] mb-1">Province *</label>
                      <select 
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 bg-[#e9e9db] ${
                          errors.province ? 'border-red-500 focus:ring-red-300' : 'border-[#D5CEA3] focus:ring-[#3C2A21]'
                        }`}
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
                      {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-[#3C2A21] mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your 10-digit phone number"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.phone ? 'border-red-500 focus:ring-red-300' : 'border-[#D5CEA3] focus:ring-[#3C2A21]'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="district" className="block text-[#3C2A21] mb-1">District *</label>
                      <select 
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 bg-[#e9e9db] ${
                          errors.district ? 'border-red-500 focus:ring-red-300' : 'border-[#D5CEA3] focus:ring-[#3C2A21]'
                        }`}
                      >
                        <option value="">Choose District</option>
                        <option value="gampaha">Gampaha</option>
                        <option value="colombo">Colombo</option>
                        <option value="kaluthara">Kaluthara</option>
                        <option value="kandy">Kandy</option>
                      </select>
                      {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-[#3C2A21] mb-1">Building / House No / Floor / Street *</label>
                      <input 
                        type="text" 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Please enter"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.address ? 'border-red-500 focus:ring-red-300' : 'border-[#D5CEA3] focus:ring-[#3C2A21]'
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-[#3C2A21] mb-1">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.city ? 'border-red-500 focus:ring-red-300' : 'border-[#D5CEA3] focus:ring-[#3C2A21]'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="landmark" className="block text-[#3C2A21] mb-1">Colony/Locality/Landmark</label>
                    <input 
                      type="text" 
                      id="landmark"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="Please enter"
                      className="w-full p-3 border border-[#D5CEA3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                    />
                  </div>
                  
                  <div>
                    <p className="text-[#3C2A21] mb-2">Select a label for effective delivery *</p>
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setSelectedLabel('office')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${
                          selectedLabel === 'office' 
                            ? 'bg-[#3C2A21] text-[#E5E5CB] border-[#3C2A21]' 
                            : 'bg-[#e9e9db] text-[#3C2A21] border-[#3C2A21]'
                        }`}
                      >
                        🏢 OFFICE
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedLabel('home')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${
                          selectedLabel === 'home' 
                            ? 'bg-[#3C2A21] text-[#E5E5CB] border-[#3C2A21]' 
                            : 'bg-[#e9e9db] text-[#3C2A21] border-[#3C2A21]'
                        }`}
                      >
                        � HOME
                      </button>
                    </div>
                    {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
                  </div>
                  
                  <div>
                    <p className="text-[#3C2A21] mb-2">Select a payment method *</p>
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
                    {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-[#3C2A21] text-[#E5E5CB] py-3 rounded-lg hover:bg-[#1A120B] transition-colors flex justify-center items-center"
                    disabled={isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        PROCESSING...
                      </>
                    ) : (
                      'PLACE ORDER'
                    )}
                  </button>
                </form>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-96 bg-[#e9e9db] p-6 rounded-lg shadow-md h-fit sticky top-4">
                <h3 className="text-xl font-bold text-[#3C2A21] mb-4">Promotion</h3>
                <div className="flex mb-6">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter store/code"
                    className="flex-1 p-3 border border-[#D5CEA3] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                  />
                  <button 
                    type="button"
                    className="bg-[#3C2A21] text-[#E5E5CB] px-4 rounded-r-lg hover:bg-[#1A120B] transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                
                <hr className="border-[#D5CEA3] my-4" />
                
                <h3 className="text-xl font-bold text-[#3C2A21] mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.option || 'default'}`} className="flex justify-between">
                      <span>{item.name} {item.option && `(${item.option})`} × {item.quantity}</span>
                      <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>Rs. {deliveryFee.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t border-[#D5CEA3] pt-4 mb-2">
                  <span>Total:</span>
                  <span className="text-[#3C2A21]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-6">VAT included, where applicable</p>
                
                <Link 
                  href="/cart"
                  className="block w-full text-center bg-[#D5CEA3] text-[#3C2A21] py-3 rounded-lg hover:bg-[#c5be93] transition-colors"
                >
                  Edit Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}