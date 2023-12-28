"use client";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const CustomBox = ({ children, heading, icon, ...rest }) => {
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      p={6}
      m="10px auto"
      bg={useColorModeValue("white", "dark")}
      {...rest}
    >
      <Heading
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        display={"flex"}
        justifyContent={"center"}
      >
        {icon}
        {heading}
      </Heading>
      {children}
    </Box>
  );
};

export default CustomBox;
