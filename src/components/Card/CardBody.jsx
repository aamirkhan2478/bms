"use client";
import { Box} from "@chakra-ui/react";
function CardBody(props) {
  const { variant, children, ...rest } = props;
  return (
    <Box __css={{ display: "flex", width: "100%" }} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
