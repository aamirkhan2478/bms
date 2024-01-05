"use client";
// Chakra imports
import {
  Flex,
  Skeleton,
  SkeletonText,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "../Card";
import CardBody from "../Card/CardBody";

const SmallCard = ({ title, amount, icon, isLoading }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex justifyContent={"center"}>
      <Card minH="83px">
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <SkeletonText
                as={StatLabel}
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
                textTransform={"uppercase"}
                noOfLines={1}
                w={isLoading ? "160px" : ""}
                isLoaded={!isLoading}
              >
                {isLoading ? "Heading" : title}
              </SkeletonText>
              <Flex>
                <SkeletonText
                  as={StatNumber}
                  fontSize="lg"
                  color={textColor}
                  mt={isLoading ? "0.5rem" : ""}
                  h={isLoading ? "12px" : ""}
                  noOfLines={1}
                  isLoaded={!isLoading}
                >
                  {isLoading ? 22 : amount}
                </SkeletonText>
              </Flex>
            </Stat>
            <Skeleton
              h={"45px"}
              w={"45px"}
              bg={iconTeal}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={"12px"}
              isLoaded={!isLoading}
            >
              {icon}
            </Skeleton>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default SmallCard;
