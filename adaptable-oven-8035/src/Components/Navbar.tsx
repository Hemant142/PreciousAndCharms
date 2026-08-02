import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import logo from "../home-image/logo-white.png";
import blackLogo from "../home-image/logo-black.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/layout";
import { LOGOUT } from "../Redux/AuthReducer/actionType";
import "./Navbar.css";
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList,Heading } from "@chakra-ui/react";

interface CustomNavLinkProps {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  onClick,
  children,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li
      className={`navbar__item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dispatch: any = useDispatch();
  const isAuth = useSelector((store: any) => store.authReducer.isAuth);
  const name = useSelector((store: any) => store.authReducer.ActiveUser.name);
 
  // console.log(id,"id h bay")
  const navigate=useNavigate()
  // console.log("nav",isAuth)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 200) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  const handleLogin=()=>{
    navigate('/login')
  }
  const handleLogout=()=>{
    dispatch({ type: LOGOUT })
  }
  const handleSignUp=()=>{
    navigate('/signup')
  }
  // console.log(isAuth,"name")
  const handleYourOrder=()=>{
    navigate("/your_order")
  }
  return (
    <DIV>


    {/* //  */}
    <nav className={colorChange ? 'navbar colorChange' : 'navbar'}>
      {/* <div className="navbar__logo">

            <img src={logo} alt="" width="200px" />

      </div> */}

        <div className="mobileNav">
          <div
            className={`navbar__mobile-toggle ${
              isMobileMenuOpen ? "active" : ""
            }`}
            onClick={handleMobileMenuToggle}
          >
            {isMobileMenuOpen ? (
              <MdClose color="#adacac" />
            ) : (
              <MdMenu color="#adacac" />
            )}
          </div>

          <Link to="/">
            <div className="mobile-logo">
              <img src={colorChange ? blackLogo : logo} alt="" />
            </div>
          </Link>
        </div>

       
          <header className="header">
           
            <nav>
              <ul className="menu-items">
              <ul className={`navbar__menu ${isMobileMenuOpen ? "active" : ""}`}>

                <li>
                  <CustomNavLink to="/product/Jewelry">Jewellery</CustomNavLink>
                  <div className="mega-menu">
                    <div className="content">
                      <div className="col">
                        <section>
                          <h2 className="item-1-heading">
                            C A T E G O R I E S
                          </h2>
                          <ul className="mega-links">
                            <li>
                              <Link to="/product/Jewelry?category=Rings">Rings</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?category=Brecelets">Bracelets</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?category=Earrning">Earrings</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?category=Necklaces+%26+Pendants">Necklaces & Pendants</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?category=Accessories">Accessories</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?category=Men's jewelry">Men's Jewelry</Link>
                            </li>
                          </ul>
                        </section>
                      </div>

                      <div className="col ">
                        <section>
                          <h2 className="item-1-heading">B R A N D S</h2>
                          <ul className="mega-links">
                            <li>
                              <Link to="/product/Jewelry?brand=Messika">Messika</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=Cartier">Cartier</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=Garrard">Garrard</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=David+Yurman">David Yurman</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=John+Hardy&">Johan Hardy</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=Graff">Graff</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=Reborto+Coin">Roberto Coin</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=Mikimoto">Mikimoto</Link>
                            </li>
                            <li>
                              <Link to="/product/Jewelry?brand=Tiffani">Tiffani</Link>
                            </li>
                          </ul>
                        </section>
                      </div>

                      <div className=" col col_1">
                        <section>
                          <img
                            className="navimage"
                            src="https://i.pinimg.com/736x/36/3b/fd/363bfd5d90d23927d03b8caa488c5c7b.jpg"
                            alt="Jewellery collection"
                          ></img>
                        </section>
                      </div>
                    </div>
                  </div>
                </li>


                <li>
                <CustomNavLink to="/product/Watches" onClick={closeMobileMenu}>
          Watches
        </CustomNavLink>
          <div className="mega-menu">
            <div className="content">
              <div className="col">
                <section>
                  <h2 className="item-1-heading">B R A N D S</h2>
                  <ul className="mega-links">
                    <li><Link to="/product/Watches?brand=Rolex">Rolex</Link></li>
                    <li><Link to="/product/Watches?brand=OMEGA">Omega</Link></li>
                    
                    <li><Link to="/product/Watches?brand=MEISTERSINGER">Meistersinger </Link></li>
                    <li><Link to="/product/Watches?brand=LOUIS+MOINET">Louis Moinet</Link></li>
                    <li><Link to="/product/Watches?brand=GRAND+SEIKO">Grand Seiko</Link></li>
                    <li><Link to="/product/Watches?brand=FREDERIQUE+CONSTANT">Frederique Constant</Link></li>
                    <li><Link to="/product/Watches?brand=BOVET">Bovet</Link></li>
                    <li><Link to="/product/Watches?brand=ALPINA">Alpina</Link></li>

                  </ul>
                </section>
              </div>
            
              <div className="col col_1">
                <section >
                   <img className='navimage' src='https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9sZXh8ZW58MHx8MHx8fDA%3D&w=1000&q=80' alt="Luxury watches"></img>
                   </section>
              </div>
            </div>
          </div>
        </li>

                
          <CustomNavLink to="/gift" onClick={closeMobileMenu}>
            Gifts
          </CustomNavLink>

          <Link to="/">
            <div className="navbar__logo">
              <img src={colorChange ? blackLogo : logo} alt="" />
            </div>
          </Link>

          <CustomNavLink to="/about" onClick={closeMobileMenu}>
            About Us
          </CustomNavLink>

          {/* {isAuth ? (
          
            <Box
              display="inline-block"
              position="relative"
              _hover={{
                "& button": { display: "block" },
              }}
            >
              <Avatar name={name} size="xs" src="https://bit.ly/dan-abramov" />
              <Button
                display="none"
                position="absolute"
                top="100%"
                right="0"
                onClick={() => {
                  dispatch({ type: LOGOUT });
                }}
              >
                Logout
              </Button>
             
              

            </Box>

            
          ) : (
            <CustomNavLink to="/login" onClick={closeMobileMenu}>
              Account
            </CustomNavLink>
          )} */}
          <Box className="Profile">
          <Menu >
            <CustomNavLink to="" onClick={toggleMobileMenu}>
            <MenuButton fontWeight={isAuth?'bold':'normal'}  marginTop={'-20px'}>
            {isAuth?name:' Profile'}
            </MenuButton>
            </CustomNavLink>
            <MenuList className={isMobileMenuOpen ? 'mobile-menu-open' : ''}>
              <MenuGroup color={isAuth?'red':'black'} fontWeight={'bold'} title={isAuth?`Welcome back ${name} !!`:' Profile'}>
                <MenuItem color={'#51504f'} onClick={isAuth?handleLogout:handleLogin}>{isAuth?'LogOut':'LogIn'}</MenuItem>
              </MenuGroup>
              <MenuDivider />
              {isAuth?  <Box>
              <Heading  size={'xs'} style={{marginLeft:'10px'}}>Order Placed</Heading>
              <MenuItem color={'#51504f'} onClick={handleYourOrder}>Your Order</MenuItem>
              </Box>:  <MenuItem color={'#51504f'} onClick={handleSignUp}>Sign Up</MenuItem>}
             
           </MenuList>
        </Menu>
        </Box>
        <Box className="Login">
          {isAuth?<Box>
            <CustomNavLink to="/your_order" >
              Your Order 
            </CustomNavLink>
            <CustomNavLink to=""  onClick={handleLogout}>
              {name}
            </CustomNavLink>

            {/* <CustomNavLink to="" onClick={toggleMobileMenu}>
            <MenuButton fontWeight={isAuth?'bold':'normal'}  marginTop={'-20px'}>
            {isAuth?name:' Profile'}
            </MenuButton>
            </CustomNavLink> */}

          </Box>:
          <CustomNavLink to="/login" >
              LogIn
            </CustomNavLink>}
        
        

        </Box>

          <CustomNavLink to="/cart" onClick={closeMobileMenu}>
            Bag
          </CustomNavLink>
              </ul>
              </ul>
            </nav>
          </header>

         
        {/* </ul> */}
      </nav>
    </DIV>
  );
};

export default Navbar;

const DIV = styled.section`
  .navbar__logo img,
  .mobile-logo img {
    width: 120px;
  }

  .mobile-logo {
    width: 60%;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 100%;
    position: fixed;
    z-index: 9999;
  }
  .colorChange {
    background-color: #fff;
    color: #2e2d2d;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .colorChange a {
    color: #2e2d2d !important;
  }

  .navbar__logo {
    font-weight: bold;
    font-size: 24px;
  }

  .navbar__mobile-toggle {
    width: 40%;
    font-size: 24px;
    cursor: pointer;
    display: none; /* Hide by default */
  }

  .navbar__menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    justify-content: space-around;
  }

  .navbar__item {
    margin-left: 20px;
  }

  .navbar__item a {
    text-decoration: none;
    color: #f3f2f2;
  }

  .navbar__item a.active {
    border: 1px solid #8b80806b;
    padding: 4px 7px 4px 7px;
  }


  .mobile-menu-open {
  display: block;
  /* border: 2px solid red; */
}

.Login{
  display: none;
}
/* Initially hide the menu on larger screens */
@media (max-width: 767px) {
  .menu-list.mobile-menu-open {
    display: block;
  }
}


  @media (max-width: 768px) {
    .col_1 {
    display: none;
  }
  .Profile{
    display: none;
  }
  .Login{
    display: block;
  }
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      /* bor
      der: 2px solid red; */
    }

    .navbar__menu {
      display: flex;
      flex-direction: column;
      background-color: #2a2929;
      padding: 10px;
      transition: transform 0.3s ease-in-out;
      /* transform: translateY(-50%); */
      opacity: 0;
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      z-index: 1;
      color: #fff;
    }

    .navbar__menu.active {
      transform: translateY(0);
      opacity: 1;
    }

    .navbar__mobile-toggle {
      display: block;
    }
  }
  @media screen and (min-device-width: 310px) and (max-device-width: 480px) {
    .navbar__logo {
      display: none;
    }
    .navbar__item {
      margin-left: 20px;
      text-align: center;
      border-bottom: 1px solid #3c3a3a52;
      padding: 5px 0;
    }

    .mobileNav {
      width: 100%;
      display: flex;
      /* border: 2px solid red; */
    }
    .colorChange a {
      color: #ddd9d9 !important;
    }
  }
  @media screen and (min-device-width: 481px) and (max-device-width: 768px) {
    .navbar__logo {
      display: none;
    }
    .navbar__item {
      margin-left: 20px;
      text-align: center;
      border-bottom: 1px solid #3c3a3a52;
      padding: 5px 0;
    }
    .mobileNav {
      width: 100%;
      display: flex;
    }
    .colorChange a {
      color: #ddd9d9 !important;
    }
  }
  @media screen and (min-device-width: 769px) {
    .mobile-logo {
      display: none;
    }
  }
`;
