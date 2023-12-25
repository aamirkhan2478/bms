import { Button } from "@chakra-ui/react";

const CustomButton = ({ text, ...rest }) => {
  return (
    <Button
      colorScheme="teal"
      type="submit"
      fontSize="10px"
      w="100%"
      h="45px"
      mb="20px"
      mt="20px"
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
