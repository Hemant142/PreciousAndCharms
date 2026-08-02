import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductObject } from "../constrain";
import { styled } from "styled-components";
import { Button, useToast } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS } from "../Redux/AuthReducer/actionType";
import { api } from "../api/axios";

import Footer from "../Components/Footer";

const SingleProductPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const dispatch: any = useDispatch();
  const ActiveUser = useSelector((store: any) => store.authReducer.ActiveUser);
  const isAuth = useSelector((store: any) => store.authReducer.isAuth);
  const cartItem = useSelector(
    (store: any) => store.authReducer.ActiveUser.addToCart
  );
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductObject>({
    id: 0,
    name: "",
    price: 0,
    about: "",
    category: "",
    brand: "",
    rating: 0,
    avatar: "",
  });
  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddToCart = async (product: ProductObject) => {
    if (!isAuth) {
      toast({
        title: "Please login first",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    const alreadyInCart = (cartItem || []).some(
      (item: ProductObject) => String(item.id) === String(product.id)
    );

    if (alreadyInCart) {
      toast({
        title: `Product Is Already In The Cart.`,
        description: "Same Product you cant add two time.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await api.post(`/cart`, { productId: product.id, quantity: 1 });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...ActiveUser, addToCart: res.data },
      });
      toast({
        title: `Product added to cart.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to add product to cart", error);
      toast({
        title: "Failed to add to cart",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <NavDiv>
        {/* <Navbar2/>
         */}
        <Navbar />
        <img
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/006/660/777/small/3d-rendering-many-size-diamonds-on-a-black-surface-with-reflection-free-photo.jpg"
          }
          alt=""
          style={{ width: "100%", height: "220px", objectFit: "fill" }}
        />
      </NavDiv>

      <Div>
        <div>
          <img src={product.avatar} alt="ring" />
        </div>
        <div>
          <h1>Precious Charms Love Collection</h1>
          <p>
            {Number(product.id) % 2 === 0
              ? "Elegance Redefined, Precious Charms Jewelry. Timeless Beauty, Captivating Hearts. Embrace Luxury, Cherish Forever."
              : "Radiate Brilliance, Adorn Yourself with Exquisite Jewelry Crafted to Perfection"}
          </p>
          <h1>{product.about}</h1>
          <p>{product.brand}</p>
          <p>₹{product.price}</p>
          <p>{product.rating}★</p>
          <Button
            bg="black"
            color="white"
            padding="30px"
            mr={6}
            w="200px"
            _hover={{ backgroundColor: '#a0abbd',color:'black' }}
            onClick={() => handleAddToCart(product)}
          >
            ADD TO BAG
          </Button>
          <Button
            bg="white"
            color="black"
            padding="30px"
            mr={5}
            w="200px"
            _hover={{ backgroundColor: '#e0ddbf', color: 'black' }}
            onClick={() => {
              handleAddToCart(product);
              navigate("/cart");
            }}
          >
            BUY NOW
          </Button>
        </div>
      </Div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default SingleProductPage;

const NavDiv = styled.div``;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 70px;
  /* border:10px solid red; */
  div >img{
    margin:auto  
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column; 
    padding-left:150px;    
    
  }

  div {
    width: 50%;
    img {
      width: 50%;
      height: auto;
      box-shadow: 0px 9px 30px rgba(255, 149, 5, 0.3);

      height: auto;
    }
  }
  div {
    width: 50%;
    padding: 30px;
    /* margin:auto; */
    
    
    h1 {
      text-align: left;
      margin-bottom: 20px;
      font-size: 25px;
      font-weight: bold;
    }
    p {
      margin-bottom: 10px;
    }
    :hover {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
  }
`;
