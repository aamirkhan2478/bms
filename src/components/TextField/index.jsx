import {
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Select,
} from "@chakra-ui/react";

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
            {helperText && <FormHelperText color={'gray.500'} ml={3}>{helperText}</FormHelperText>}
          </InputGroup>
        </>
      ) : fieldType === "input" ? (
        <>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
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
          {helperText && <FormHelperText color={'gray.500'} ml={3}>{helperText}</FormHelperText>}
        </>
      ) : (
        <>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            {label}
          </FormLabel>
          <Select
            placeholder={placeHolder}
            borderRadius="15px"
            fontSize="sm"
            size="lg"
            _focus={{ outlineColor: "teal.300" }}
            _placeholder={{ color: "gray.500" }}
            {...rest}
          >
            {data.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Select>
          {helperText && <FormHelperText color={'gray.500'} ml={3}>{helperText}</FormHelperText>}
        </>
      )}
    </>
  );
};

export default TextField;
