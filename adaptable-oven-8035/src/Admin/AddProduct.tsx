import React, { useState } from "react";
import Navbar from "./AdminNavbar";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { postProduct } from "../Redux/AdminReducer/action";
import { Center, Heading, useToast } from "@chakra-ui/react";
import {
  Card,
  Divider,
  CardBody,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  interface productObj {
    name: string;
    price: string;
    about: string;
    category: string;
    brand: string;
    rating: string;
    avatar: string;
    info: string;
  }

  const initialState: productObj = {
    name: "",
    price: "",
    about: "",
    category: "",
    brand: "",

    rating:"" ,
    avatar:"",
    info:"",
    
}
const [productData,setProductData]=useState(initialState)
const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    const { name, value}=e.target
    setProductData((prev)=>{
      return {...prev,[name]:value}
    })
    
}

const handleTextChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value}=e.target
    setProductData((prev)=>{
        return { ...prev, [name]: name === "price" || name === "rating" ? +value : value };
    })
}

console.log(productData);
const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    dispatch(postProduct(productData));
    toast({
      title: "Adding Success",
      description: "Product Added successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setProductData(initialState);
  };

  return (
    <div>

        <Navbar/>

        <DIV>
            <div className='useFlex'>
       <div className='leftBox' >
       <Card maxW='sm' style={{borderRadius: "20px",height:"620px"}}>
            <CardBody>

              
              <Heading style={{ textAlign: "center" }} size='md'>Id: </Heading>
              <Stack mt='6' spacing='3'>
                <Heading style={{ textAlign: "center" }} size='sm'>Name:{productData.name} </Heading>
                

                
                <Heading size='sm' style={{ textAlign: "center" }}>
                  Price:  ₹{productData.price}
                </Heading>
                <Text style={{ textAlign: "center" }}>
                  Description: {productData.about}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Category: {productData.category}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Brand: {productData.brand}
                </Text>
                <Text color='blue.600' fontSize='sm' style={{ textAlign: "center" }}>
                  Rating :{productData.rating}
                </Text>
              </Stack>
              <hr/>
              <hr/>
              <Image style={{ width: "300px", height: "200px",  }}
                src={productData.avatar}
                alt='Please Add Image'
                borderRadius='sm'
              />
            </CardBody>
            <Divider />
          </Card>

       </div>
       <div className='rightBox' >
            <form className='formclass' onSubmit={handleSubmit}>

            <Center  h='50px' >
                    <Heading as='h4' size='md' style={{color:'white'}} >
                            Add Products

                </Heading>
              </Center>

              <br />
              <select
                name="name"
                value={productData.name}
                onChange={handleChange}
              >
                <option value="">Select Product Name</option>
                <option value="Jewelry">Jewellery</option>
                <option value="Watches">Watches</option>
              </select>

              <input
                type="text"
                name="price"
                placeholder="Enter Product Price"
                value={productData.price}
                onChange={handleTextChange}
              />
              <input
                type="text"
                name="about"
                placeholder="Enter Product Description"
                value={productData.about}
                onChange={handleTextChange}

                />

        {
            productData.name==="Watches" && (
                <select name="category"  value={productData.category}  onChange={handleChange}>
                        <option value="">Select Product Category for watch</option>

                <option value="Men's watch">Men's watch</option>
                <option value="Women's watch">Women's watch</option>
            </select>
            )
        }

{
    productData.name==="Jewelry" && (
        <select name="category"  value={productData.category}  onChange={handleChange}>
        <option value="">Select Product Category for jewellery</option>
        <option value="Rings">Rings</option>
        <option value="Brecelets">Brecelets</option>
        <option value="Earrning">Earrning</option>
        <option value="Necklaces & Pendants">Necklaces & Pendants</option>
        <option value="Accessories">Accessories</option>
        <option value="Men's jewelry">Men's jewelry</option>
    </select>
    )
}




                

           {
            productData.name==="Jewelry" && (
                <select name="brand"  value={productData.brand}  onChange={handleChange}>
                <option value="">Select Product Brand for Jewellery </option>
                <option value="Messika">Messika</option>
                <option value="Cartier">Cartier</option>
                <option value="Garrard">Garrard</option>
                <option value="David Yurman">David Yurman</option>
                <option value="John Hardy">John Hardy</option>
                <option value="Reborto Coin">Reborto Coin</option>
                <option value="Graff">Graff</option>
                <option value="Mikimoto">Mikimoto</option>
                <option value="Tiffani">Tiffani</option>
            </select>

            )
           }  



              {productData.name === "Watches" && (
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                >
                  <option value="Men's jewelry">Men's jewelry</option>
                </select>
              )}

              {productData.name === "Jewelry" && (
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Product Category for jewellery
                  </option>
                  <option value="Rings">Rings</option>
                  <option value="Brecelets">Brecelets</option>
                  <option value="Earrning">Earrning</option>
                  <option value="Necklaces & Pendants">
                    Necklaces & Pendants
                  </option>
                  <option value="Accessories">Accessories</option>
                  <option value="Men's jewelry">Men's jewelry</option>
                </select>
              )}

              {productData.name === "Jewelry" && (
                <select
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                >
                  <option value="">Select Product Brand for Jewellery </option>
                  <option value="Messika">Messika</option>
                  <option value="Cartier">Cartier</option>
                  <option value="Garrard">Garrard</option>
                  <option value="David Yurman">David Yurman</option>
                  <option value="John Hardy">John Hardy</option>
                  <option value="Reborto Coin">Reborto Coin</option>
                  <option value="Graff">Graff</option>
                  <option value="Mikimoto">Mikimoto</option>
                  <option value="Tiffani">Tiffani</option>
                </select>
              )}

              {productData.name === "Watches" && (
                <select
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                >
                  <option value="">Select Product Brand for Watches </option>
                  <option value="Rolex">Rolex</option>
                  <option value="OMEGA">OMEGA</option>
                  <option value="MEISTERSINGER">MEISTERSINGER</option>
                  <option value="LOUIS MOINET">LOUIS MOINET</option>
                  <option value="GRAND SEIKO">GRAND SEIKO</option>
                  <option value="FREDERIQUE CONSTANT">
                    FREDERIQUE CONSTANT
                  </option>
                  <option value="BOVET">BOVET</option>
                  <option value="ALPINA">ALPINA</option>
                </select>
              )}

              {productData.name === "Watches" && (
                <input
                  type="text"
                  name="info"
                  placeholder="Enter Product Info"
                  value={productData.info}
                  onChange={handleTextChange}
                />
              )}

              <input
                type="number"
                name="rating"
                placeholder="Enter Product Rating"
                value={productData.rating}
                onChange={handleTextChange}
              />

              <input
                type="text"
                placeholder="Enter Image URL"
                name="avatar"
                value={productData.avatar}
                onChange={handleTextChange}
              />

              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </DIV>
    </div>
  );
};

const DIV=styled.div`
.useFlex{

    display:flex;
    
    width:100%;
    height:100vh;
    border: 0px solid red;
    margin: auto;
    display: flex;
    background-color: lightblue;
    position: relative;
    background-image:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSh8KUI-WWQ5Novfaw0Yi4IZgTWzFDlWqcDw&usqp=CAU);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

}

.leftBox{
    padding-top:60px;
    padding-left:100px;
    width:800px;
}
.rightBox{
    padding-top:50px;
    width:800px
}
.formclass{
    width:50%;

    margin: 0 auto;
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    padding-left: 100px;
    padding: 10px;
  }
  input,
  select,
  textarea {
    border: 1px solid #cdcdcd;
    padding: 5px;
    font-size: 16px;
    margin-top: 10px;
    border-radius: 5px;
  }
  button {
    width: 100%;
    background-color: #a86535;
    padding: 8px;
    margin-top: 10px;
    border-radius: 5px;
    color: #fff;
  }
  button:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
    background-color: green;
  }
`;
