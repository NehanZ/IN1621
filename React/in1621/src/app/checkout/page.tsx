'use client';

import React, { useState } from 'react';

export default function Checkout() {
  const [promoCode, setPromoCode] = useState('');
  const [orderItems, setOrderItems] = useState([
    { name: 'Espresso', quantity: 1, price: 362 },
  ]);
  const [deliveryFee, setDeliveryFee] = useState(260);
  const [selectedMethod, setSelectedMethod] = useState('');


  const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0) + deliveryFee;
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const label = event.nativeEvent.submitter.value;
    setSelectedLabel(label);
    console.log('Submitted label:', label);
  };


  return (
    <div style={{ display: 'flex', padding: '40px 5%', gap: '40px', flexWrap: 'wrap' }}>
      {/* Left: Delivery Info */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h2>Delivery Information</h2>
        <form style={{ display: 'grid', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="form-group" style={{ flex: 1 }}>
             <label htmlFor="fullName">Full Name</label>
             <input type="text" id="fullName" placeholder="Enter your first and last name" />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
             <label htmlFor="province">Province</label>
             <select id="province" name="province">
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
          <div style={{ display: 'flex', gap: '10px' }}>
             <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" placeholder="Enter your phone number" />
             </div>

             <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="district">District</label>
              <select id="district" name="district">
               <option value="">Choose District</option>
               <option value="gampaha">Gampaha</option>
               <option value="colombo">Colombo</option>
               <option value="kaluthara">Kaluthara</option>
               <option value="kurunegala">Kurunegala</option>
               <option value="puttalam">Puttalam</option>
               <option value="ampara">Ampara</option>
               <option value="rathnapura">Rathnapura</option>
               <option value="mathale">Mathale</option>
               <option value="kandy">Kandy</option>
               <option value="nuwaraeliya">Nuwaraeliya</option>
               <option value="kegalle">Kegalle</option>
               <option value="matara">Mathara</option>
               <option value="galle">Galle</option>
               <option value="badulla">Badulla</option>
               <option value="monaragala">Monaragala</option>
               <option value="hambantota">Hambantota</option>
               <option value="jaffna">Jaffna</option>
               <option value="anuradhapura">anuradhapura</option>
               <option value="polonnaruwa">polonnaruwa</option>
      
              </select>
             </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
           <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="address">Building / House No / Floor / Street</label>
            <input type="text" id="address" placeholder="Please enter" />
           </div>

           <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="city">City</label>
            <select id="city" name="city">
              <option value="">Choose City</option>
      
            </select>
           </div>
         </div>
          <div style={{ display: 'flex', gap: '10px' }}>
           <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="address">Colony/Locality/Landmark</label>
            <input type="text" id="address" placeholder="Please enter" />
           </div>

           <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="Enter address" />
           </div>
         </div>
         <p>Select a label for effective delivery:</p>
          <div className="delivery-label-wrapper">
           <div className="delivery-label-box">
            <button type="submit" name="deliveryLabel" value="office">
            🏢 OFFICE
            </button>
           </div> 
           <div className="delivery-label-box">
            <button type="submit" name="deliveryLabel" value="home">
            🏠 HOME
            </button>
           </div>
          </div>
          <p>Select a payment method:</p>
          <div className="payment-methods">
  
           <div className="payment-buttons">
            <button
            className={`payment-button ${selectedMethod === 'cod' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('cod')}
            >
            <img src="/cash.jpeg" alt="Cash on Delivery" className="payment-icon" />
      
            </button>
    <button
      className={`payment-button ${selectedMethod === 'visa' ? 'selected' : ''}`}
      onClick={() => setSelectedMethod('visa')}
    >
      <img src="/visa.png" alt="Visa" className="payment-icon" />
      
    </button>
    <button
      className={`payment-button ${selectedMethod === 'mastercard' ? 'selected' : ''}`}
      onClick={() => setSelectedMethod('mastercard')}
    >
      <img src="/master.jpg" alt="MasterCard" className="payment-icon" />
      
    </button>
  </div>
</div>



          <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff' }}>SAVE</button>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div style={{ flex: 0.5, minWidth: '250px', background: '#f8f8f8', padding: '20px', borderRadius: '10px' }}>
        <h3>Promotion</h3>
        <div className="promo-container">
         <div className="promo-input-box">
          <input
           type="text"
           value={promoCode}
           onChange={(e) => setPromoCode(e.target.value)}
           placeholder="Enter store/code"
           className="promo-input"
          />
         </div>
         <form>
           <button type="submit" className='promo-button'>APPLY</button>
         </form>
         
        </div>

        {/*<p style={{ color: 'red', fontSize: '14px' }}>Sorry, this voucher is not valid.</p>*/}

        <hr />
        {/*<h3>Order Summary</h3>
        <p>Items Total ({orderItems.length} Items): Rs. {orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}</p>
        <p>Delivery Fee: Rs. {deliveryFee}</p>
        <h2>Total: Rs. {total}</h2>*/}
        <h3>Order Summary</h3>

        <div className="summary-row">
         <span>Items Total ({orderItems.length} Items):</span>
         <span>Rs. {orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}</span>
        </div>

        <div className="summary-row">
         <span>Delivery Fee:</span>
         <span>Rs. {deliveryFee}</span>
        </div>

        <div className="summary-row total-row">
         <span>Total:</span>
         <span>Rs. {total}</span>
        </div>

        <p style={{ fontSize: '12px' }}>VAT included, where applicable</p>

        <button style={{ padding: '10px 20px', width: '100%', background: '#ccc' }} disabled>Proceed to Pay</button>
      </div>
    </div>
  );
}
