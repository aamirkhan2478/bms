"use client";
import CustomBox from "@/components/CustomBox";
import Layout from "@/components/Layout";
import { useShowInventory } from "@/hooks/useInventory";
import dateFormat from "@/utils/dateFormat";
import { Box, Divider, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import inventoryImage from "@/../public/inventory.png";
import {
  BiCalendar,
  BiSolidBuildingHouse,
  BiSolidUser,
  BiUser,
} from "react-icons/bi";

const ShowInventory = () => {
  const { id } = useParams();
  const { data, isLoading } = useShowInventory(id);
  const inventory = data?.data?.data?.inventory;

  return (
    <Layout>
      <CustomBox
        icon={
          <Box
            as={BiSolidBuildingHouse}
            display={{ base: "none", sm: "flex" }}
            color={"teal.300"}
          />
        }
        heading={"Inventory Details"}
        maxW={800}
      >
        <Divider mb={6} />
        {isLoading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h={"50vh"}>
            <Spinner size={"xl"} color="teal" />
          </Flex>
        ) : (
          <>
            <Flex
              direction={{ base: "column", sm: "row" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box mb={4}>
                <Image
                  src={inventoryImage}
                  width={300}
                  height={400}
                  alt="inventory"
                />
              </Box>
              <Box>
                <Text mb={4} fontSize={24}>
                  <strong>Inventory Type:</strong> {inventory?.inventoryType}
                </Text>
                <Text mb={4} fontSize={24}>
                  <strong>Floor:</strong> {inventory?.floor}
                </Text>
                <Text mb={4} fontSize={24}>
                  <strong>Flat No:</strong> {inventory?.flatNo}
                </Text>
              </Box>
            </Flex>
            <Divider my={6} />
            <Heading
              w="100%"
              textAlign={"center"}
              fontWeight="normal"
              mb="2%"
              display={"flex"}
              justifyContent={"center"}
            >
              <Box
                as={BiSolidUser}
                color={"teal.300"}
                display={{ base: "none", sm: "flex" }}
              />
              Owners Details
            </Heading>
            <Divider mb={6} />
            {inventory?.status === "sold" ? (
              <>
                {inventory?.sellInventory.map((sell, index) => (
                  <>
                    {sell.isActive && (
                      <Box
                        key={index}
                        mb={4}
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <Box display={"flex"} gap={2} alignItems={"center"}>
                          <Box
                            as={BiCalendar}
                            fontSize={24}
                            color={"blue.300"}
                          />
                          <Text fontSize={24}>
                            <strong>Sold Date:</strong>{" "}
                            {dateFormat(sell.purchaseDate)}
                          </Text>
                        </Box>
                        <Box display={"flex"} gap={2} alignItems={"center"}>
                          <Box as={BiUser} fontSize={24} color={"blue.300"} />
                          <Text fontSize={24}>
                            <strong>Owner Name:</strong> {sell.ownerName}
                          </Text>
                        </Box>
                        <Divider my={6} />
                      </Box>
                    )}
                  </>
                ))}
              </>
            ) : (
              <Text textAlign={"center"} color={"orange.500"} fontSize={20}>
                No Owners Found, This Inventory is for sell.
              </Text>
            )}
          </>
        )}
      </CustomBox>
    </Layout>
  );
};

export default ShowInventory;
