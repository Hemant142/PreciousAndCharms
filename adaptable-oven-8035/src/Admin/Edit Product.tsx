import React, { useEffect, useState } from 'react'
import Navbar from './AdminNavbar'
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Card,
  Divider,
  CardBody,
  Heading,
  Stack,
  Image,
  Text
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useToast } from '@chakra-ui/react'
import {EditIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
const EditPage = () => {
  let { id } = useParams();
  const toast=useToast();
  const navigate =useNavigate();
  const data = useSelector((state: any) => state.data.data);
  const [avatar, setavatar] = useState("")
  const [price, setPrice] = useState(0);
  const [about, setabout] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("")

  //console.log("avatar", avatar, data)
  useEffect(() => {
    let Data = data.find((el: any) => String(el.id) === String(id));
    if (!Data) return;
    setavatar(Data.avatar)
    setPrice(Data.price);
    setabout(Data.about);
    setCategory(Data.category);
    setBrand(Data.brand);
    setRating(Data.rating);
    setName(Data.name)
  }, [data, id])

  const handleUpdate = () => {
    const newData = { price: +price, name: name, avatar: avatar, category: category, brand: brand, rating: +rating, about };
    api
      .patch(`/products/${id}`, newData)
      .then((res) => {
        toast({
          title: 'Save Success',
          description: 'Product Changed successfully',
          status: 'success', 
          duration: 2000,  
          isClosable: true, 
        });
        navigate("/a/AllProduct")
      })
      .catch(() => {
        toast({
          title: 'Update failed',
          description: 'Could not save product. Please login with a backend admin account.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
    console.log(newData, "NewData")
  }
  // handleUpdate
  

  return (
    <div style={{ backgroundColor: "rgb(54, 69, 79)", }}>
      <Navbar />
      <div style={{display:"flex",}}>

        <div style={{paddingTop:"60px",paddingLeft:"100px", width: "800px"}}>
          <Card maxW='sm' style={{borderRadius: "20px",height:"620px"}}>
            <CardBody>
              <Image style={{ width: "300px", height: "200px",  }}
                src={avatar}
                alt='Green double couch with wooden legs'
                borderRadius='sm'
              />
              <hr/>
              <Heading style={{ textAlign: "center" }} size='md'>Id: {id}</Heading>
              <Stack mt='6' spacing='3'>
                <Heading style={{ textAlign: "center" }} size='sm'>Name: {name}</Heading>
                <Heading style={{ textAlign: "center" }} size='sm'> Category:  {category}</Heading>
                <Heading style={{ textAlign: "center" }} size='sm'>Brand:   {brand}</Heading>

                <Text style={{ textAlign: "center" }}>
                  About: {about}
                </Text>
                <Text color='blue.600' fontSize='sm' style={{ textAlign: "center" }}>
                  Price:  ₹{price}
                </Text>
                <Text color='blue.600' fontSize='sm' style={{ textAlign: "center" }}>
                  Rating :{rating}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
          </Card>

        </div>

        {/* <p>{price}</p> */}
        <div style={{ paddingTop: "50px", width: "500px",  }}>

          <FormControl isRequired style={{ paddingLeft: "100px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", backgroundColor: "white" ,marginBottom:"50px"}}>
              <Heading style={{marginLeft:"80px",paddingBottom:"20px",color:"DodgerBlue",paddingTop:"20px"}} size='sm'>EDIT PRODUCT FORM <EditIcon/></Heading>
            <FormLabel>Image</FormLabel>
            <Input placeholder='Url' width='20.5rem' value={avatar} name='avatar' onChange={(e) => setavatar(e.target.value)} />
            <FormLabel>Name</FormLabel>
            <Select placeholder='Select Name' width='20.5rem' value={name} name='name' onChange={(e) => setName(e.target.value)}>
              <option value="Jewelry">Jewelry</option>
              <option value="Watches">Watches</option>
            </Select>
            <br />

            <FormLabel>Category</FormLabel>
            <Select placeholder='Select Category' width='20.5rem' value={category} name='category' onChange={(e) => setCategory(e.target.value)}>
              <option value="Rings">Rings</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Earrning">Earrning</option>
              <option value="Necklaces & Pendants">Necklaces & Pendants</option>
              <option value="Accessories">Accessories</option>
              <option value="Men's jewelry">Men's Jewelry</option>
            </Select>
            <br />

            <FormLabel>Brands</FormLabel>
            <Select placeholder='Select Brands' width='20.5rem' value={brand} name='brand' onChange={(e) => setBrand(e.target.value)}>
              <option value="Messica">Messica</option>
              <option value="Cartier">Cartier</option>
              <option value="Garrand">Garrand</option>
              <option value="David Yurman">David Yuman</option>
              <option value="Johan Hardy">Johan Hardy</option>
              <option value="Graff">Graff</option>
              <option value="Roberto Coin">Roberto Coin</option>
              <option value="Mikimoto">Mikimoto</option>
              <option value="Tiffani">Tiffani</option>
            </Select>
            <br />

            <FormLabel>About</FormLabel>
            <Input placeholder='about' width='20.5rem' value={about} name='about' onChange={(e) => setabout(e.target.value)} />
            <br />
            <br />
            <FormLabel>Price</FormLabel>
            <Input placeholder='Price' width='20.5rem' value={price} name='price' onChange={(e: any) => setPrice(e.target.value)} />

            <br />

            <FormLabel>Rating</FormLabel>
            <Input placeholder='rating' width='20.5rem' value={rating} name='rating' onChange={(e: any) => setRating(e.target.value)} />

            <Button  variant='solid' colorScheme='blue' onClick={handleUpdate}   style={{marginLeft:"100px",marginTop:"5px",margin:"10px"}}>Save Changes</Button>
          </FormControl>

        </div>
      </div>
    </div>
  )
}

export default EditPage
