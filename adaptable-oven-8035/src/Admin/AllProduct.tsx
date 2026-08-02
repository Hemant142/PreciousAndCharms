// src/App.tsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteData, fetchData, fetchPage } from "../Redux/AdminReducer/action";
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Stack,
  Heading,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import Navbar from "./AdminNavbar";
import { Link } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";
import { EditIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.data.data);
  const error = useSelector((state: any) => state.data.error);
  const totalP = useSelector((state: any) => state.data.totalP);
  console.log(data, "DATA");

  ///******************* */ totalPage******************* */

  const [page, setPage] = useState(1);
  let totalPage = Math.ceil(totalP.length / 20);
  useEffect(() => {
    dispatch(fetchPage());
  }, [data, dispatch]);
  console.log(data, "AllProducts");
  ///******************* */ totalPage******************* */

  useEffect(() => {
    dispatch(fetchData(page));
  }, [dispatch, page, data]);

  const handleDelete = (id: number): void => {
    // Dispatch the deleteData action with the item ID to delete the data
    dispatch(deleteData(id));
    // alert("")
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePagechange = (value: number) => {
    setPage((prev) => prev + value);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div>
        <Navbar />

        <div>
          {/******************  pagination *****************/}

          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "90%",
              margin: "0 auto",
              marginTop: "20px",
              justifyContent: "end",
            }}
          >
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => handlePagechange(-1)}
              isDisabled={page === 1}
            >
              <GrPrevious />
            </Button>

            <b>
              <h1>{page}</h1>
            </b>

            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => handlePagechange(1)}
              isDisabled={page === totalPage}
            >
              <GrNext />
            </Button>
          </div>
          {/******************  pagination-end *****************/}
        </div>

        <Box
          display="grid"
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap="20px"
          // paddingTop="50px"
          // marginRight="12x0px"
          // paddingLeft="50px"
          padding="60px"
        >
          {data.map((item: any) => (
            <div key={item.id}>
              <Card
                maxW="xs"
                maxHeight={"550px"}
                width={{ base: "100%", md: "auto" }}
                margin={{ base: "0 auto", md: "0" }}
                padding={{ base: "20px", md: "0" }}
                boxShadow=" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
              >
                <CardBody>
                  <Image
                    style={{ width: "300px", height: "200px" }}
                    src={item.avatar}
                    alt="Green double couch with wooden legs"
                    borderRadius="sm"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading style={{ textAlign: "center" }} size="md">
                      Name: {item.name}
                    </Heading>
                    <Heading style={{ textAlign: "center" }} size="sm">
                      {" "}
                      Category: {item.category}
                    </Heading>
                    <Heading style={{ textAlign: "center" }} size="sm">
                      Brand: {item.brand}
                    </Heading>

                    <Text style={{ textAlign: "center" }}>
                      About: {item.about}
                    </Text>
                    <Text
                      color="blue.600"
                      fontSize="sm"
                      style={{ textAlign: "center" }}
                    >
                      Price: ₹{item.price}
                    </Text>
                    <Text
                      color="blue.600"
                      fontSize="sm"
                      style={{ textAlign: "center" }}
                    >
                      Rating :{item.rating}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="20">
                    <Link to={`/a/Edit/${item.id}`}>
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        leftIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="solid"
                      colorScheme="red"
                      leftIcon={<DeleteIcon />}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default App;
