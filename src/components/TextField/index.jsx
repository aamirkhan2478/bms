import {
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import ArrayPhoneNumber from "../ArrayPhoneNumber";

const TextField = ({
  label,
  leftElement,
  rightElement,
  onClick,
  inputGroupSize,
  fieldType,
  data,
  placeHolder,
  helperText,
  lml,
  lmr,
  lmx,
  lmy,
  ...rest
}) => {
  return (
    <>
      {fieldType === "group" ? (
        <>
          <InputGroup size={inputGroupSize}>
            {leftElement}
            <Input
              borderRadius="15px"
              placeholder={placeHolder}
              fontSize="sm"
              size="lg"
              _focus={{ outlineColor: "teal.300" }}
              _placeholder={{ color: "gray.500" }}
              {...rest}
            />
            {rightElement}
            {helperText && (
              <FormHelperText color={"gray.500"} ml={3}>
                {helperText}
              </FormHelperText>
            )}
          </InputGroup>
        </>
      ) : fieldType === "input" ? (
        <>
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="normal"
            ml={lml}
            mr={lmr}
            mx={lmx}
            my={lmy}
          >
            {label}
          </FormLabel>
          <Input
            borderRadius="15px"
            placeholder={placeHolder}
            fontSize="sm"
            size="lg"
            outline={"none"}
            _focus={{ outlineColor: "teal.300" }}
            _placeholder={{ color: "gray.500" }}
            {...rest}
          />
          {helperText && (
            <FormHelperText color={"gray.500"} ml={3}>
              {helperText}
            </FormHelperText>
          )}
        </>
      ) : fieldType === "textArea" ? (
        <>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            {label}
          </FormLabel>
          <Textarea
            placeholder={placeHolder}
            borderRadius="15px"
            fontSize="sm"
            size="lg"
            _focus={{ outlineColor: "teal.300" }}
            _placeholder={{ color: "gray.500" }}
            {...rest}
          />
        </>
      ) : fieldType === "array" ? (
        <ArrayPhoneNumber label={label} data={data} {...rest} />
      ) : (
        <>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            {label}
          </FormLabel>
          <Select
            placeholder={placeHolder}
            size="lg"
            options={data}
            chakraStyles={{
              borderRadius: "15px",
              fontSize: "sm",
              _focus: { outlineColor: "teal.300" },
              _placeholder: { color: "gray.500" },
            }}
            focusBorderColor="teal.300"
            colorScheme="teal"
            {...rest}
          />
          {helperText && (
            <FormHelperText color={"gray.500"} ml={3}>
              {helperText}
            </FormHelperText>
          )}
        </>
      )}
    </>
  );
};

export default TextField;
