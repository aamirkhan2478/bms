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
  helperColorText,
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
              errorBorderColor="red.300"
              focusBorderColor="teal.500"
              {...rest}
            />
            {rightElement}
            {helperText && (
              <FormHelperText color={helperColorText} ml={3}>
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
            errorBorderColor="red.300"
            focusBorderColor="teal.500"
            {...rest}
          />
          {helperText && (
            <FormHelperText color={helperColorText} ml={3}>
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
            errorBorderColor="red.300"
            focusBorderColor="teal.500"
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
            }}
            focusBorderColor="teal.500"
            errorBorderColor="red.300"
            {...rest}
          />
          {helperText && (
            <FormHelperText color={helperColorText} ml={3}>
              {helperText}
            </FormHelperText>
          )}
        </>
      )}
    </>
  );
};

export default TextField;
