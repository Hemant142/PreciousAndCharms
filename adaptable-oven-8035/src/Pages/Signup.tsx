import React, { useState } from 'react';
import { styled } from 'styled-components';
import B1 from "../Images/B2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { SignUp } from '../Redux/AuthReducer/action';
import { useToast } from '@chakra-ui/react';

const Signup = () => {
  const toast = useToast();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newUser = { ...user, [name]: value };
    setUser(newUser);
  }

  const handleSubmit = async () => {
    if (user.email === "" || user.password === "" || user.name === "") {
      toast({
        title: 'Please fill all fields!',
        description: 'can not leave email and password blank.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await dispatch(SignUp(user));
      setUser({ name: "", email: "", password: "" });
      toast({
        title: 'Signup Success',
        description: 'your registration is successful.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        'Could not create account. Email may already be registered.';
      toast({
        title: 'Signup failed',
        description: Array.isArray(message) ? message.join(', ') : message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }
  return (<>

    <Div>
      <h1>PRECIOUS CHARMS</h1>
      <h2>JEWELLERY SHOP</h2>
      <div>
        <h2>SIGNUP PAGE</h2>

        <input type="text" name="name" placeholder='Full Name' value={user.name} onChange={handleChange} required />
        <br />
        <input type="email" name="email" value={user.email} placeholder='Email' onChange={handleChange} required />
        <br />
        <input type="password" name="password" value={user.password} placeholder='Password' onChange={handleChange} required />
        <br />


        <input type="submit" value="SIGNUP" onClick={handleSubmit} />
        <br />
        <br />
        <span><Link to="/login">Login</Link></span>
      </div>
    </Div>
  </>
  );
}

export default Signup;


const Div = styled.div`
padding-top:70px;
text-align: center;
  background-image: url(${B1});
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 130vh;
  margin-top: 0;
  border: 1px solid black;
  color: black;

  h1{
   margin-top:20px;
   margin-bottom:20px;
   font-size:30px;
   font-weight:bold;
  }
  h2{
   margin-top:20px;
   margin-bottom:20px;
   font-size:20px;
   font-weight:bold;
  }

  div {
   
    margin :auto;
    width: 500px;
    height: 400px;

    h2 {
      margin-left: 10px;
    }

    input[type="text"],[type="email"],[type="password"] {
      width: 80%;
      height: 40px;
      margin: auto;
      margin-bottom: 20px;
      box-shadow: rgb(246, 248, 250) 0px 20px 30px -10px;
    }

    input[type="text"],[type="email"],[type="password"]::placeholder {
      padding-left: 20px;
      color: #999999; /* Placeholder text color */
      font-style: italic; /* Placeholder text style */
    }

    input[type="submit"] {
      width: 80%;
      height: 40px;
      font-weight: bold;
      background-color: #f6f8f6;
      color: #090909;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    input[type="submit"]:hover {
      border: 2px solid black;
    }

    span {
      margin: 20px;
      cursor: pointer;
      color: black;
      text-decoration: none;

      a {
        color: black;
        border: none;
      }
    }

    span:hover{
   background-color:white;
  }
  
  }
  :hover{
   box-shadow: rgba(255, 253, 253, 0.966) 0px 54px 55px, rgba(250, 249, 249, 0.966) 0px -12px 30px, rgba(251, 250, 250, 0.943) 0px 4px 6px, rgba(253, 252, 252, 0.916) 0px 12px 13px, rgba(249, 248, 248, 0.961) 0px -3px 5px;
   }
`;