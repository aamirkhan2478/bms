"use client";
import { Box, useStyleConfig } from "@chakra-ui/react";
function CardBody(props) {
  const { variant, children, ...rest } = props;
  //   const styles = useStyleConfig("CardBody", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={{ display: "flex", width: "100%" }} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
