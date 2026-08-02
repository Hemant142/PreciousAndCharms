import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from '../Redux/AuthReducer/actionType';
import { api } from '../api/axios';
import {
  attachOrderAddresses,
  enrichOrderProducts,
} from '../api/orderHelpers';

export const Payment = () => {
  const [paymentOption, setPaymentOption] = useState<string>('cash');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch()
  const ActiveUser=useSelector((store:any)=>store.authReducer.ActiveUser);
  const navigte=useNavigate()

  const handleOpen = async () => {
    try {
      const addressId =
        localStorage.getItem('selectedAddressId') ||
        ActiveUser?.address?.[ActiveUser.address.length - 1]?.id;

      await api.post(`/orders`, { addressId });

      const [cartRes, ordersRes, addressRes] = await Promise.all([
        api.get(`/cart`).catch(() => ({ data: [] })),
        api.get(`/orders/products`).catch(() => ({ data: [] })),
        api.get(`/address`).catch(() => ({ data: [] })),
      ]);

      const enriched = await enrichOrderProducts(ordersRes.data || []);
      const orderPlaced = await attachOrderAddresses(enriched);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          ...ActiveUser,
          addToCart: cartRes.data || [],
          address: addressRes.data || ActiveUser.address || [],
          orderPlaced,
        },
      });
      setIsOpen(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  
  const handleClose = () => {
    setIsOpen(false);
    navigte("/")
  };

  const handlePaymentOptionChange = (option: string) => {
    setPaymentOption(option);
  };

  return (
    <div>

 <Navbar/>
    <DIV  className="background-image" style={{ backgroundImage: `url("https://thegoldmarket.co.uk/wp-content/uploads/2017/01/jewellery-background.jpg")`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    height:"800px",
     border:"1px solid black",
 }}>
    <div className="container">
      <h1><i>Payment Details</i></h1>
      
      <div className="payment-options">
        <button
        id='cash'
          className={paymentOption === 'cash' ? 'active' : ''}
          onClick={() => handlePaymentOptionChange('cash')}
        >
        <i>  Cash on Delivery </i>
        </button>
        <button
        id='net-banking'
          className={paymentOption === 'netbanking' ? 'active' : ''}
          onClick={() => handlePaymentOptionChange('netbanking')}
        >
         <i> Net Banking</i>
        </button>
        <button
        id='debit'
          className={paymentOption === 'card' ? 'active' : ''}
          onClick={() => handlePaymentOptionChange('card')}
        >
         <i> Debit or Credit Card</i>
        </button>
        </div>
      <div className="payment-content">
        {paymentOption === 'cash' && (
          <div>
       <p>Please keep the cash ready for delivery.</p>
       <button className='first' onClick={handleOpen}> <i>Confirm Payment Option </i></button>
       </div>
        )
          
            
       
       }
        {paymentOption === 'netbanking' && <p>Please select your bank for net banking.</p>}
        {paymentOption === 'card' && <p>Please enter your card details below.</p>}
        {paymentOption === 'card' && (
          <>
          <form>
            <div className="form-group"
            
            >
              <label >Card Number</label>
              <input type="text" id="cardNumber" placeholder="#### #### #### ####" />
            </div>
            <div className="form-group" >
              <label >Expiry Date</label>
              <input type="text" id="expiryDate" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label >CVV</label>
              <input type="text" id="cvv" placeholder="123" />
            </div>
      
          </form>
           <button  className='first' onClick={handleOpen} ><i> Confirm Payment </i></button>
           </>
        )}
      </div>
    </div>
    {isOpen && (
        <div className="popup">
           
          <div className="popup-content">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png"/>
           
            <h2>Order Successful</h2>
            <p>Continue shopping</p>
            <button className="cbutton"onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </DIV>
<Footer/>
    </div>
  );
}




const DIV=styled.div`


  font-family: Arial, sans-serif;
  margin: auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;


.container {
  margin: auto;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 20px;
  font-weight: bold;
}

.payment-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.payment-options button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  
 
}

.payment-options button.active {
  background-color: #0c0c0c;
  color: #fcfafa;
}

.payment-content {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width:100%
}
.form-group :hover{
-webkit-transform: scale(1.11);
    -ms-transform: scale(1.11);
    transform: scale(1.11);
    transition: 1s ease;
}
#debit:hover{
  -webkit-transform: scale(1.11);
    -ms-transform: scale(1.11);
    transform: scale(1.11);
    transition: 1s ease;
}
#cash:hover{
  -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    transition: 1s ease;
}
#net-banking:hover{
  -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    transition: 1s ease;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #666;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.first{
  color: white;
  background-color: black;
  height: 35px;
  width: 200px;
  border-radius: 2%;
  margin-top: 20px;
  
  font-size:20px;
}
.first:hover{
  -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    transition: 1s ease;
}
.popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.popup {
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.popup-content {
  text-align: center;
}

.cbutton {
  margin-top: 10px;
  background-color: #0c0c0c;
  color: white;
  width: 100%;
}
img{
  width: 90px;
  margin: auto;
}




`
