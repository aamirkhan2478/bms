"use client";
import CustomBox from "@/components/CustomBox";
import Layout from "@/components/Layout";
import { useShowInventory } from "@/hooks/useInventory";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import dateFormat from "@/utils/dateFormat";
import { Box, Divider, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React from "react";

const ShowInventory = () => {
  const { id } = useParams();
  const { data, isLoading } = useShowInventory(id);
  const inventory = data?.data?.data?.inventory;

  return (
    <Layout>
      <CustomBox heading={"Inventory Details"} maxW={800}>
        <Divider mb={6} />
        {isLoading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h={"50vh"}>
            <Spinner size={"xl"} color="teal" />
          </Flex>
        ) : (
          <>
            <Text mb={4}>
              <strong>Inventory Type:</strong> {inventory?.inventoryType}
            </Text>
            <Text mb={4}>
              <strong>Floor:</strong> {inventory?.floor}
            </Text>
            <Text mb={4}>
              <strong>Flat No:</strong> {inventory?.flatNo}
            </Text>

            <Divider my={6} />
            {inventory?.status === "sold" && (
              <>
                <Heading size="md" mb={4}>
                  Owners Details
                </Heading>

                {inventory?.sellInventory.map((sell, index) => (
                  <>
                    {sell.isActive && (
                      <Box key={index} mb={4}>
                        <Text>
                          <strong>Sold Date:</strong>{" "}
                          {dateFormat(sell.purchaseDate)}
                        </Text>
                        <Text>
                          <strong>Owner Name:</strong> {sell.ownerName}
                        </Text>
                      </Box>
                    )}
                  </>
                ))}
              </>
            )}
          </>
        )}
      </CustomBox>
    </Layout>
  );
};

export default ShowInventory;
