import React, { useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { styled } from 'styled-components';

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useToast } from "@chakra-ui/toast";
import { LOGIN_SUCCESS } from "../Redux/AuthReducer/actionType";
import { api } from "../api/axios";


interface InitialState {
  name: string;
  mobile_number: string;
  pincod: string;
  house_no: string;
  area: string;
  town: string;
}

const initialState: InitialState = {
  name: "",
  mobile_number: "",
  pincod: "",
  house_no: "",
  area: "",
  town: "",
};


export const Address = () => {
  const [areaData, setareaData] = useState(initialState);
  const [showCard, setShowCard] = useState(true)
  const userId = useSelector((store: any) => store.authReducer.ActiveUser.id);
  const ActiveUser = useSelector((store: any) => store.authReducer.ActiveUser);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setareaData((prev) => {
      return { ...prev, [name]: value }
    })

  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (areaData.house_no === "" || areaData.mobile_number === "" || areaData.name === "" || areaData.pincod === "" || areaData.town === "") {
      toast({
        title: 'Please fill all fields!',
        status: 'warning',
        duration: 2000,
        isClosable: true
      });
      return;
    }

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const { data: created } = await api.post(`/address`, areaData);
      const addresses = [...(ActiveUser.address || []), created];
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...ActiveUser, address: addresses },
      });
      localStorage.setItem('selectedAddressId', created.id);

      navigate("/payment")
      toast({
        title: 'Address Success',
        description: 'your address is added successful.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to add address to address", error);
      toast({
        title: 'Failed to save address',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    setareaData(initialState)
  }
  // console.log(areaData,"Area")
  // console.log(ActiveUser, "userId")


  useEffect(() => {
    const ad = ActiveUser.address || []
    if (ad.length !== 0) {
      setareaData(ad[ad.length - 1])
    }
  }, [ActiveUser.address])


  // console.log(ActiveUser.address.length !== 0 && ActiveUser.address[ActiveUser.address.length - 1].house_no, "AUser")

  const editUserDataHandler = () => {
    setShowCard(false)
  }

  return (

    <div>
      <Navbar />


      <DIV>

        <div className="background-image" style={{
          backgroundImage: `url("https://thegoldmarket.co.uk/wp-content/uploads/2017/01/jewellery-background.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "800px",
          border: "1px solid black",
        }}>

          {
            ActiveUser.address?.length !== 0 && showCard
              ?
              <div className="address-form form-card" >
                <h2>Want to continue with previous address ?</h2>
                <div className="address-card-details">
                  <h3>Full Name - {ActiveUser.address[ActiveUser.address.length - 1].name}</h3>
                  <p>Mobile - {ActiveUser.address[ActiveUser.address.length - 1].mobile_number || ActiveUser.address[ActiveUser.address.length - 1].mobileNumber}</p>
                  <p>Pin code - {ActiveUser.address[ActiveUser.address.length - 1].pincod || ActiveUser.address[ActiveUser.address.length - 1].pincode}</p>
                  <p>Address - {ActiveUser.address[ActiveUser.address.length - 1].house_no || ActiveUser.address[ActiveUser.address.length - 1].houseNo}</p>
                  <p>Area - {ActiveUser.address[ActiveUser.address.length - 1].area}</p>
                  <p>Town - {ActiveUser.address[ActiveUser.address.length - 1].town}</p>
                  <div>
                  </div>
                </div>

                <div className="address-card-btns">
                  <button className="payment-btn" onClick={() => {
                    const last = ActiveUser.address[ActiveUser.address.length - 1];
                    if (last?.id) localStorage.setItem('selectedAddressId', last.id);
                    navigate("/payment");
                  }}>Continue</button>
                  <button className="edit-btn" onClick={editUserDataHandler}>Edit</button>
                </div>
              </div> :

              <div className="address-form">
                <h2>Shipping Address</h2>
                <form>


                  <div className="form-group">
                    <label htmlFor="name" >Full Name</label>
                    <input type="text" id="name" name="name" value={areaData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Mobile number</label>
                    <input type="text" id="address" name="mobile_number" value={areaData.mobile_number} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Pincode</label>
                    <input type="text" id="city" name="pincod" value={areaData.pincod} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">Flat, House no., Building, Company, Apartment</label>
                    <input type="text" id="zip" name="house_no" value={areaData.house_no} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Area, Street, Sector, Village</label>
                    <input type="text" id="country" name="area" value={areaData.area} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Town/City</label>
                    <input type="text" id="country" name="town" value={areaData.town} onChange={handleChange} required />
                  </div>
                  <Link to={"/payment"}> <button type="submit" onClick={handleSubmit}>Proceed to Payment</button></Link>

                </form>
              </div>
          }


        </div>
      </DIV>


      <Footer />
    </div>
  )
}

const DIV = styled.div`

  .background-image {
  height: 1000px;
  margin-bottom: 1px;
  }


.address-form {
  padding: 20px;
  /* padding-left: 20px; */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  width: 500px;

  
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;

}



h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight:bold
}
.form-card {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.address-card-details{
 margin: auto;
 width: 70%;
 padding: 10px;
 box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.address-card-details,h3,p{
  font-weight: 700;
}
.address-card-btns{
  display: flex;
  width: 70%;
  margin: auto;
  margin-top: 10px;
}

.address-card-btns >button{
  margin: 8px;
} 
.form-group {

  margin-bottom:15px;

  width: 470px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #444;
}
`