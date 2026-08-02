import React, { useState } from 'react'
import { styled } from 'styled-components'
import B1 from "../Images/B2.jpg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { Login } from '../Redux/AuthReducer/action'
import { Dispatch } from 'redux'
import { ADMIN_SUCCESS } from '../Redux/AuthReducer/actionType'
import { useToast } from '@chakra-ui/react'

const DEMO_ADMIN_EMAIL = 'admin123@gmail.com'
const DEMO_ADMIN_PASSWORD = 'admin123'

const Loginpage = () => {
   const toast = useToast();
   const [credentials, setCredentials] = useState({ email: "", password: "" });
   const dispatch: Dispatch<any> = useDispatch();

   const navigate = useNavigate()
   const location = useLocation();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let newCredentials = { ...credentials, [name]: value }
      setCredentials(newCredentials);
   };

   const handleSubmit = async () => {
      if (credentials.email === "" || credentials.password === "") {
         toast({
            title: 'Invalid Credentials!',
            description: 'Please fill all fields.',
            status: 'warning',
            duration: 2000,
            isClosable: true,
         });
         return;
      }

      try {
         // Always login via API so localStorage gets a real JWT.
         // Demo admin (admin123@gmail.com / admin123) is seeded by the Nest API on startup.
         const user = await (dispatch as any)(Login(credentials));
         const isAdmin =
            user?.role === 'admin' ||
            (credentials.email === DEMO_ADMIN_EMAIL &&
               credentials.password === DEMO_ADMIN_PASSWORD);

         toast({
            title: isAdmin ? 'welcome Admin to admin panel' : 'Login Success',
            description: isAdmin
               ? 'Admin Login successful.'
               : ' successfully logged In.',
            status: 'success',
            duration: 2000,
            isClosable: true,
         });

         if (isAdmin) {
            dispatch({ type: ADMIN_SUCCESS });
            navigate('/a/dashboard');
         } else if (location.state == null) {
            navigate("/")
         } else {
            navigate(location.state, { replace: true });
         }
         setCredentials({ email: "", password: "" })
      } catch {
         toast({
            title: 'Wrong credentials',
            description:
               credentials.email === DEMO_ADMIN_EMAIL
                  ? 'Admin login failed. Restart the API so the demo admin can be seeded, then try again.'
                  : 'wrong email address or Password.',
            status: 'error',
            duration: 3000,
            isClosable: true,
         });
         setCredentials({ email: "", password: "" })
      }
   }
   return (<>

      <Div>
         <div className='form'>
            <h1>PRECIOUS CHARMS</h1>
            <h2>JWELLARY SHOP</h2>

            <h2>LOGIN PAGE</h2>
            <input type="email" name="email" placeholder='email'
               onChange={handleChange}
               required
            />
            <br />
            <input type="password" name="password" placeholder='Password' onChange={handleChange} required />
            <br />
            <input type="submit" value="LOGIN" onClick={handleSubmit} required />
            <br />
            <br />
            <span><Link to="/signup"><b>Create An Account</b> </Link> </span>
         </div>

      </Div>
   </>
   )
}

export default Loginpage



const Div = styled.div`
padding-top:90px;
 background-image: url(${B1});
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  margin-top:0; 
  border:1px solid black;
  color: black;
  text-align: center;

.form{
   width:40%;
   margin:0 auto;
   padding: 10px;
    background-color: #ffffff8c;
    border: 1px solid #d3d3d3;
}
input{
   border: 1px solid #a1a1a1;
}

  h1{
  
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
 
   h2 {
      margin-left:10px;
   }
   input[type="email"],[type="password"]{
   width:80%;
   height :40px;
  
margin:auto;
margin-bottom:20px;
   box-shadow: rgb(246, 248, 250) 0px 20px 30px -10px;
  }
  input[type="email"],[type="password"]::placeholder {
   padding-left:20px;
  color: #2d2c2c; /* Placeholder text color */
  font-style: italic; /* Placeholder text style */
}
   /* border:1px solid white; */

  input[type="submit"]{
   width: 80%;
  height: 40px;
  font-weight: bold;
  background-color: #333533;
  color: #dcd7d7;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  }
  input[type="submit"]:hover{
   border:2px solid black;
  }
  span {
   margin:20px;
   cursor: pointer;
   color:black;
   text-decoration: none;
   Link{
      color:black;
      border:none;
   }
  }
  span:hover{
   background-color:white;
  }



   @media screen and (min-device-width: 320px) and (max-device-width: 767px) { 
    /* STYLES HERE */
    .form{
      width:100%;
    }
}

 `
