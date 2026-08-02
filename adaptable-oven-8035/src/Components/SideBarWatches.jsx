import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import "./Sidebar.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button
} from '@chakra-ui/react'
export default function SideBarWatches() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialBrand = searchParams.getAll("brand");
    const initalOrder = searchParams.get("order");
    // const [gender, setGender] = useState(initialGender || []);
    const [brand, setBrand] = useState(initialBrand|| []);
    const [order, setOrder] = useState(initalOrder || "");
    const [search,setSearch]=useState("")
    const{name}=useParams()
    console.log(name,"NAme")
    const { isOpen, onOpen, onClose } = useDisclosure()
  // console.log(order,"Category")
  console.log(search)
    useEffect(() => {
      const params = {
        brand,
        order,
      };
   if(search){
    params.search=search
   }
  
      setSearchParams(params);
    }, [ brand, order, search, setSearchParams]);
  
   
  
    const handleBrand = (e) => {
      const { value } = e.target;
      let newBrand = [...brand];
      if (newBrand.includes(value)) {
        newBrand = newBrand.filter((el) => el !== value);
      } else {
        newBrand.push(value);
      }
      setBrand(newBrand);
    };
    const handleSearch=(e)=>{
      setSearch(e.target.value)
    }
  
    const handleOrder = (e) => {
      setOrder(e.target.value);
    };
  
    const handleReset = () => {
      setBrand([]);
      setOrder("");
      
    };
  return (<>
   <div className="Laptop_Sidebar">
    <SidebarContainer>

<input
        style={{width:"90%",height:"35px",marginTop:"0",marginLeft:"5px",backgroundColor:"lightgray",padding:"3px 3px"}}
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
          <Section>
            <h3>Filter By Brands</h3>
            <CheckboxGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"Rolex"}
                  onChange={handleBrand}
                  checked={brand.includes("Rolex")}
                />
                Rolex
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"OMEGA"}
                  onChange={handleBrand}
                  checked={brand.includes("OMEGA")}
                />
                Omega
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"MEISTERSINGER"}
                  onChange={handleBrand}
                  checked={brand.includes("MEISTERSINGER")}
                />
                Meistersinger
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"LOUIS MOINET"}
                  onChange={handleBrand}
                  checked={brand.includes("LOUIS MOINET")}
                />
                Louis Moinet
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"GRAND SEIKO"}
                  onChange={handleBrand}
                  checked={brand.includes("GRAND SEIKO")}
                />
                Grand Seiko
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"FREDERIQUE CONSTANT"}
                  onChange={handleBrand}
                  checked={brand.includes("FREDERIQUE CONSTANT")}
                />
                Frederique Constant
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"BOVET"}
                  onChange={handleBrand}
                  checked={brand.includes("BOVET")}
                />
                Bovet
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"ALPINA"}
                  onChange={handleBrand}
                  checked={brand.includes("ALPINA")}
                />
                Alpina
              </CheckboxLabel>
    
            </CheckboxGroup>
          </Section>
    
          <Section>
            <h3>Sort By Discount</h3>
            <RadioGroup onChange={handleOrder}>
              <div className="radio">
              <RadioButton>
              <RadioLabel>
                <input  type="radio"
                name="sort"
                value={"asc"}
                checked={order === "asc"}/>
                <h3>Ascending</h3></RadioLabel>
              </RadioButton>
              
              </div>
    
              <div className="radio">
                <RadioButton>
                <RadioLabel>
                <input type="radio"
                name="sort"
                value={"desc"}
                checked={order === "desc"} />
                <h3>Descending</h3></RadioLabel>
                </RadioButton>
              
              </div>
            </RadioGroup>
          </Section>
    
          <Button onClick={handleReset} w={"100%"} backgroundColor={"black"} color={"white"}>Reset</Button>
        </SidebarContainer>
        </div>


        {/* <===========================================When Screen is smalll ==============================> */}
<div className="Mobile_Sidebar">

<Button colorScheme='teal' onClick={onOpen}>
 Filter
</Button>

<Drawer
  isOpen={isOpen}
  placement='left'
  onClose={onClose}
  // finalFocusRef={btnRef}
  // finalFocusRef={btnRef}
  
>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Filter</DrawerHeader>

    <DrawerBody>

    <SidebarContainer>

<input
        style={{width:"90%",height:"35px",marginTop:"0",marginLeft:"5px",backgroundColor:"lightgray",padding:"3px 3px"}}
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
          <Section>
            <h3>Filter By Brands</h3>
            <CheckboxGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"Rolex"}
                  onChange={handleBrand}
                  checked={brand.includes("Rolex")}
                />
                Rolex
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"OMEGA"}
                  onChange={handleBrand}
                  checked={brand.includes("OMEGA")}
                />
                Omega
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"MEISTERSINGER"}
                  onChange={handleBrand}
                  checked={brand.includes("MEISTERSINGER")}
                />
                Meistersinger
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"LOUIS MOINET"}
                  onChange={handleBrand}
                  checked={brand.includes("LOUIS MOINET")}
                />
                Louis Moinet
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"GRAND SEIKO"}
                  onChange={handleBrand}
                  checked={brand.includes("GRAND SEIKO")}
                />
                Grand Seiko
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"FREDERIQUE CONSTANT"}
                  onChange={handleBrand}
                  checked={brand.includes("FREDERIQUE CONSTANT")}
                />
                Frederique Constant
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"BOVET"}
                  onChange={handleBrand}
                  checked={brand.includes("BOVET")}
                />
                Bovet
              </CheckboxLabel>
    
              <CheckboxLabel>
                <input
                  type="checkbox"
                  value={"ALPINA"}
                  onChange={handleBrand}
                  checked={brand.includes("ALPINA")}
                />
                Alpina
              </CheckboxLabel>
    
            </CheckboxGroup>
          </Section>
    
          <Section>
            <h3>Sort By Discount</h3>
            <RadioGroup onChange={handleOrder}>
              <div className="radio">
              <RadioButton>
              <RadioLabel>
                <input  type="radio"
                name="sort"
                value={"asc"}
                checked={order === "asc"}/>
                <h3>Ascending</h3></RadioLabel>
              </RadioButton>
              
              </div>
    
              <div className="radio">
                <RadioButton>
                <RadioLabel>
                <input type="radio"
                name="sort"
                value={"desc"}
                checked={order === "desc"} />
                <h3>Descending</h3></RadioLabel>
                </RadioButton>
              
              </div>
            </RadioGroup>
          </Section>
    
          {/* <Button onClick={handleReset} >Reset</Button> */}
        </SidebarContainer>

    </DrawerBody>

    <DrawerFooter>
      <Button variant='outline' mr={3} onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleReset}>Reset</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

</div>


        
        </>
      );
    };
    
//     const SidebarContainer = styled.div`
 
//   .radio{
//     display: flex;
   
//   }
// `;

// const Section = styled.div`
//   margin-bottom: 10px;
//   h3{
//     font-weight:bold;
//     margin-bottom:5px
//   }

// `;

// const CheckboxGroup = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   font-size:13px;
//   gap:5px
// `;

// const RadioGroup = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const RadioLabel =styled.div`
// display: flex;
// flex-direction:row;
// gap:5px
// `;

// const RadioButton =styled.div`
// display: flex;
// flex-direction: column;

// `;


// const Button = styled.button`
//   background-color:black;
//   color: white;
//   border: none;
//   padding: 5px;
//   width: 170px;
//   font-weight: bold;
//   cursor: pointer;
//   border-radius:5px;
//   margin-top:10px;


//   &:hover {
//     background-color:white;
//     color:black;
//     border: 2px solid black;
//   }
// `;



/* ======================================================================================== */



const SidebarContainer = styled.div`
  background-color: white;
  input{
    margin-right: 3%
  }
`;

const Section = styled.div`
  margin-bottom: 10px;
  padding-left: 10px;
  h3{
    font-weight:bold;
    margin-bottom:5px
  }

`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  background-color: white;
 
`;

const CheckboxLabel = styled.label`
`;



const RadioGroup = styled.div`
width:90%;
`;


const RadioLabel =styled.div`
background-color: white;
width:90%;
display: flex;
margin:auto;

input{
  margin-top:5px;
}
`;

const RadioButton =styled.div`
margin:auto;
`;


// const Button = styled.button`
//   background-color:black;
//   color: white;
//   border: none;
//   padding: 5px;
//   width: 170px;
//   font-weight: bold;
//   cursor: pointer;
//   border-radius:5px;
//   margin-top:10px;
//   margin-left:5px;

//   &:hover {
//     background-color:white;
//     color:black;
//     border: 2px solid grey;
//   }
// `;
