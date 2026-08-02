// import { Img } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { ProductObject } from "../constrain";
import B4 from "../Images/B4.jpg";
import {
  Box,
  Image,
  Text,
  Heading,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { LOGIN_SUCCESS } from "../Redux/AuthReducer/actionType";
import { refreshUserData } from "../Redux/AuthReducer/action";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

import Footer from "../Components/Footer";

import Navbar2 from "../Components/Navbar2";

const AddToCard = () => {
  const toast = useToast();
  const dispatch: any = useDispatch();
  const ActiveUser = useSelector((store: any) => store.authReducer.ActiveUser);
  const rawCart = useSelector(
    (store: any) => store.authReducer.ActiveUser.addToCart
  );
  const cartItem = useMemo(() => rawCart ?? [], [rawCart]);
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  useEffect(() => {
    dispatch(refreshUserData());
  }, [dispatch]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartItem.length; i++) {
      sum += cartItem[i].price * (cartItem[i].quantity || 1);
    }
    setTotal(sum);
    let taxcut = sum / 10;
    setTax(taxcut);
  }, [cartItem]);

  const handleDelete = (id: number | string) => {
    api
      .delete(`/cart/${id}`)
      .then((response) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...ActiveUser, addToCart: response.data },
        });
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    toast({
      title: ` product removed from bag.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // console.log(cartItem)
  return (
    <>
      <div>
        <Navbar2 />
      </div>

      <Div>
        <div className="List">
          <div className="free">
            <h1>GET FREE SHIPPING ON EVERY ORDER, EVERY TIME</h1>
            <p>Non member get free shipping on the purchse above the ₹99999</p>
          </div>
          <div className="cart">
            <h1>YOUR CART({cartItem.length})</h1>
          </div>
          <div className="cartItem">
            {cartItem === undefined || cartItem.length === 0 ? (
              <div className="emptycart">YOUR BAG IS EMPTY</div>
            ) : (
              cartItem?.map((el: ProductObject) => {
                return (
                  <Box
                    key={el.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    bg="#f6f5ef"
                    p={3}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Box width="300px" p="10px">
                        <Image
                          src={el.avatar}
                          alt={el.name}
                          boxSize="200px"
                          paddingBottom="10px"
                          bg="white"
                          objectFit="cover"
                          mr={4}
                          boxShadow="0px 9px 30px 0px rgba(0,0,0,1);"
                        />
                      </Box>

                      <Box mt={4} width="200px" p="10px" bg="white" textAlign="center">
                        <Heading as="h1" mt="10px" size="lg">
                          {el.about}
                        </Heading>
                        <Text fontSize="md" mt="10px">
                          {el.name}
                        </Text>
                        <Text fontSize="md" mt="10px">
                          {el.brand}
                        </Text>
                        <Text fontSize="md" mt="10px">
                          ₹{el.price}
                        </Text>
                        <Text fontSize="md" mt="10px">
                          {el.rating}★
                        </Text>

                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          aria-label="Delete"
                          onClick={() => handleDelete(el.id)}
                        />
                      </Box>
                    </div>
                  </Box>
                );
              })
            )}
          </div>
        </div>
        <div className="checkout">
          <div>
            <h1>SUMMARY</h1>
          </div>
          <div>
            <h1>DO YOU HAVE A PROMO CODE</h1>
          </div>
          <div id="IK">
            <div>SUBTOTAL</div>
            <div>₹{total}</div>
          </div>
          <div id="IK">
            <div>ESTIMATED SHIPPING CHARGES</div>
            <div>₹ 0.00</div>
          </div>
          <div id="IK">
            <div>TAX</div>
            <div>₹ {tax}</div>
          </div>
          <div id="IK">
            <div>TOTAL</div>
            <div>₹ {total + tax}</div>
          </div>
          <div>
            <Link to={"/address"}>
              <button className="btn">CHECKOUT</button>
            </Link>
          </div>
        </div>
      </Div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default AddToCard;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-top: 70px;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
  .emptycart {
    border-radius: 10px;
    background-image: url(${B4});
    height: 600px;
    font-size: 25px;
    text-align: center;
  }
  .cartItem{
    width: 100%;
    
  }

  #IK {
    /* border:1px solid; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .List {
    width: 80%;
    margin-top: 20px;
  }
  .checkout {
    padding: 23px;
    border-radius: 10px;
    background-image: url(${B4});
    margin-left: 5px;
    margin-top: 20px;
    height: 785px;
  }
  .free {
    width: 100%;
    background-color: #e5dfdf;
    border-radius: 10px;
    padding: 20px;
  }
  .cart {
    width: 100%;
    background-color: #e5dfdf;
    border-radius: 10px;
    padding: 20px;
    
  }
  h1 {
    font-size: 20px;
    font-weight: bold;
  }

  p {
    font-size: 16px;
    color: #555;
  }

  button {
    width: 100%;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: black;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #9b9494;
    color: black;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  div > div {
    margin-bottom: 10px;
  }
`;
