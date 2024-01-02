"use client";
import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Box,
} from "@chakra-ui/react";

import { BiChevronDown } from "react-icons/bi";

const Accordion = ({ mainText, data }) => {
  return (
    <ChakraAccordion allowMultiple width="100%" maxW="lg" rounded="lg">
      <AccordionItem border={"none"}>
        <AccordionButton
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          _hover={{ bg: "teal.300", color: "white" }}
          _expanded={{ bg: "teal.300", color: "white" }}
          _focus={{ boxShadow: "none" }}
          bg="white"
          color="gray.600"
          border="none"
          rounded="lg"
        >
          <Text>
            <strong>{mainText}</strong>
          </Text>
          <Box as={BiChevronDown} fontSize="24px" />
        </AccordionButton>
        <AccordionPanel>
          {data.length === 0 ? (
            <Text fontSize={18}>No data found</Text>
          ) : (
            data.map((item, index) => (
              <Text key={index} fontSize={18}>
                +{item}
              </Text>
            ))
          )}
        </AccordionPanel>
      </AccordionItem>
    </ChakraAccordion>
  );
};

export default Accordion;
