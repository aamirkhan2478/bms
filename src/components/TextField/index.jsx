import { FormLabel, Input, InputGroup} from "@chakra-ui/react";

const TextField = ({
  label,
  groupField,
  leftElement,
  rightElement,
  onClick,
  inputGroupSize,
  ...rest
}) => {
  return (
    <>
      {groupField ? (
        <>
          <InputGroup size={inputGroupSize}>
            {leftElement}
            <Input
              borderRadius="15px"
              mb="24px"
              fontSize="sm"
              size="lg"
              _focus={{ outlineColor: "teal.300" }}
              _placeholder={{ color: "gray.500" }}
              {...rest}
            />
            {rightElement}
          </InputGroup>
        </>
      ) : (
        <>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            {label}
          </FormLabel>
          <Input
            borderRadius="15px"
            mb="24px"
            fontSize="sm"
            size="lg"
            outline={"none"}
            _focus={{ outlineColor: "teal.300" }}
            _placeholder={{ color: "gray.500" }}
            {...rest}
          />
        </>
      )}
    </>
  );
};

export default TextField;
