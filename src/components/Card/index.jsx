"use client";
import { Box, useColorModeValue } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, ...rest } = props;
  return (
    <Box
      __css={{
        p: "22px",
        display: "flex",
        flexDirection: "row",
        width: "80%",
        position: "relative",
        minWidth: "0px",
        wordWrap: "break-word",
        backgroundClip: "border-box",
        bg: useColorModeValue("white", "gray.700"),
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
        borderRadius: "15px",
      }}
      shadow={useColorModeValue("lg", "dark-lg")}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Card;
