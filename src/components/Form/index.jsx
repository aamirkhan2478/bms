import {
  FormHelperText,
  FormControl,
  Checkbox,
  Flex,
  RadioGroup,
  FormLabel,
  Stack,
  Radio,
  Thead,
  Th,
  Tr,
  Table,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { Field } from "formik";
import TextField from "../TextField";
import { NumericFormat, PatternFormat } from "react-number-format";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const Form = ({
  formFields,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const changeHandle = (name) => (event) => {
    let value = event.target.value;
    if (name === "name" || name === "father") {
      value = capitalizeFirstLetter(value);
    }
    setFieldValue(name, value);
  };

  const changeSelect = (name) => (event) => {
    setFieldValue(name, event);
  };

  return (
    <>
      {formFields.map(
        (
          {
            id,
            name,
            isRequired,
            flexBasis,
            numberField,
            selectChange,
            comboSelect,
            isCheckbox,
            checkboxData,
            radioData,
            isRadio,
            numberFormat,
            ...props
          },
          index
        ) => (
          <FormControl
            key={index}
            id={id}
            isRequired={isRequired}
            flexBasis={flexBasis}
            mb={4}
          >
            {numberField || numberFormat ? (
              <>
                <TextField
                  as={numberField ? PatternFormat : NumericFormat}
                  format="#####-#######-#"
                  mask="_"
                  name={name}
                  onBlur={handleBlur}
                  onChange={handleChange(name)}
                  isInvalid={Boolean(errors[name]) && Boolean(touched[name])}
                  {...props}
                />
                <FormHelperText color="red">
                  {Boolean(touched[name]) && errors[name]}
                </FormHelperText>
              </>
            ) : isCheckbox ? (
              <Flex gap={"1rem"} wrap={"wrap"}>
                {checkboxData && (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Office(s)/Shop(s)/Flat(s)</Th>
                        <Th>Owner(s)</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {checkboxData &&
                        checkboxData.map((item, index) => {
                          return (
                            <Tr>
                              <Td>
                                <Checkbox
                                  key={index}
                                  colorScheme={item.colorScheme}
                                  value={item.value}
                                  name={name}
                                  onChange={handleChange(name)}
                                  defaultChecked={item.defaultChecked}
                                  {...props}
                                >
                                  {item.label}
                                </Checkbox>
                              </Td>
                              <Td>
                                {item.owners ? item.owners.join(", ") : "N/A"}
                              </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                )}
              </Flex>
            ) : isRadio ? (
              <RadioGroup my={4}>
                <FormLabel>{props.label}</FormLabel>
                <Stack spacing={5} direction="row">
                  {radioData &&
                    radioData.map((item, index) => {
                      return (
                        <Radio
                          key={index}
                          colorScheme={item.colorScheme}
                          value={item.value}
                          name={name}
                          onChange={handleChange(name)}
                          defaultChecked={item.defaultChecked}
                          {...props}
                        >
                          {item.label}
                        </Radio>
                      );
                    })}
                </Stack>
              </RadioGroup>
            ) : (
              <>
                <Field
                  as={TextField}
                  name={name}
                  onBlur={handleBlur}
                  onChange={
                    name === "name" || name === "father"
                      ? changeHandle(name)
                      : selectChange ||
                        name === "tenants" ||
                        name === "agents" ||
                        name === "inventory"
                      ? changeSelect(name)
                      : handleChange(name)
                  }
                  isInvalid={Boolean(errors[name]) && Boolean(touched[name])}
                  {...props}
                />
                <FormHelperText color="red">
                  {Boolean(touched[name]) && errors[name]}
                </FormHelperText>
              </>
            )}
          </FormControl>
        )
      )}
    </>
  );
};

export default Form;
