"use client";
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "../Card";
import CardBody from "../Card/CardBody";

const SmallCard = ({ title, amount, icon }) => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card minH="83px">
      <CardBody>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat me="auto">
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
              textTransform={'uppercase'}
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg" color={textColor}>
                {amount}
              </StatNumber>
            </Flex>
          </Stat>
          <Flex
            as="box"
            h={"45px"}
            w={"45px"}
            bg={iconTeal}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"12px"}
          >
            {icon}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default SmallCard;
