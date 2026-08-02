import React from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../Pages/YourOrder.module.css";

import { Container, HStack, Heading } from "@chakra-ui/layout";
import { Card, CardBody } from "@chakra-ui/card";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { SingleUserFetch } from "../Redux/AdminReducer/action";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { formatAddress } from "../api/orderHelpers";

export default function YourOrder() {
  const single = useSelector((state: any) => state.data.singleUser);
  const isload = useSelector((state: any) => state.data.singleuserLoad);
  const id = useSelector((store: any) => store.authReducer.ActiveUser.id);
  const activeUser = useSelector((store: any) => store.authReducer.ActiveUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(SingleUserFetch(id));
    }
  }, [id, dispatch]);

  const name = single?.name || activeUser?.name || "";
  const orderPlaced =
    (single?.orderPlaced?.length ? single.orderPlaced : activeUser?.orderPlaced) ||
    [];
  const address =
    (single?.address?.length ? single.address : activeUser?.address) || [];

  const latestAddress = address.length > 0 ? address[address.length - 1] : null;
  const latestAddressText = formatAddress(latestAddress);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleHover = () => {
    onOpen();
  };

  return (
    <div>
      <Navbar />
      <img
        src={
          "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?cs=srgb&dl=pexels-dima-valkov-3266700.jpg&fm=jpg"
        }
        alt=""
        style={{ width: "100%", height: "400px", objectFit: "fill" }}
      />

      {isload && !orderPlaced.length ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Container maxW={"100%"} style={{ margin: "0 auto" }}>
          <HStack spacing="24px">
            <Card
              width={"50%"}
              style={{ backgroundColor: "#d2f8d7", width: "100%" }}
            >
              <CardBody>
                <Heading as="h4" size="md"></Heading>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {orderPlaced && orderPlaced.length > 0 ? (
                    orderPlaced.map((el: any) => (
                      <div
                        key={`${el.orderId || el.id}-${el.id}`}
                        style={{
                          backgroundColor: "#b2b6b7",
                          borderRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "10px",
                            marginTop: "10px",
                            display: "flex",
                          }}
                        >
                          <div
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                          >
                            <p>ORDER PLACED</p>
                            {el.orderDate}
                          </div>
                          <div
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                          >
                            <p>TOTAL</p>
                            <p>₹{el.price}</p>
                          </div>

                          <div
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                          >
                            <p>SHIP TO </p>
                            <p>
                              <button
                                className="name_address"
                                onMouseEnter={handleHover}
                              >
                                {name} <ChevronDownIcon />
                              </button>
                              <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                  <ModalHeader>{name}</ModalHeader>
                                  <ModalCloseButton />
                                  <ModalBody>
                                    {el.shippingAddress || latestAddressText}
                                  </ModalBody>
                                </ModalContent>
                              </Modal>
                            </p>
                          </div>
                        </div>

                        <br />

                        <div key={el.id} className={Styles.mainSub}>
                          <div style={{ height: "250px" }}>
                            <img
                              className={Styles.orderimg}
                              src={el.avatar}
                              alt=""
                            />
                          </div>
                          <table className={Styles.table}>
                            <tbody>
                              <tr>
                                <td>Product type </td>
                                <td>:{el.name}</td>
                              </tr>
                              <tr>
                                <td>Price</td>
                                <td>:{el.price}</td>
                              </tr>
                              <tr>
                                <td>Category</td>
                                <td>:{el.category || "—"}</td>
                              </tr>
                              <tr>
                                <td>About</td>
                                <td>:{el.about || "—"}</td>
                              </tr>
                              <tr>
                                <td>Address</td>
                                <td>
                                  :
                                  {el.shippingAddress ||
                                    latestAddressText ||
                                    "No Address added"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items in the cart.</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </HStack>
        </Container>
      )}
    </div>
  );
}
