import { Button } from "@chakra-ui/react";

const CustomButton = ({ text, ...rest }) => {
  return (
    <Button
      fontSize="10px"
      type="submit"
      bg="teal.300"
      w="100%"
      h="45"
      mb="20px"
      color="white"
      mt="20px"
      _hover={{
        bg: "teal.200",
      }}
      _active={{
        bg: "teal.400",
      }}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;