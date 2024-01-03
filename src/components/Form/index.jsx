import {
  FormControl,
  RadioGroup,
  FormLabel,
  Stack,
  Radio,
  UnorderedList,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { Field } from "formik";
import TextField from "../TextField";
import { NumericFormat, PatternFormat } from "react-number-format";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { MdPerson } from "react-icons/md";

const Form = ({
  formFields,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setOwnerNames,
}) => {
  const changeHandle = (name) => (event) => {
    let value = event.target.value;
    if (name === "name" || name === "father") {
      value = capitalizeFirstLetter(value);
    }
    setFieldValue(name, value);
  };

  const changeSelect = (name) => (event) => {
    if (name === "inventory") {
      setOwnerNames(event.value.ownerNames);
      setFieldValue(name, event);
    }
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
            isListView,
            listData,
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
                  helperText={Boolean(touched[name]) && errors[name]}
                  helperColorText={"red"}
                  {...props}
                />
              </>
            ) : isListView ? (
              <>
                <UnorderedList listStyleType={"none"}>
                  {listData &&
                    listData.map((item, index) => {
                      return (
                        <ListItem key={index}>
                          <ListIcon as={MdPerson} color="green.500" />
                          {item}
                        </ListItem>
                      );
                    })}
                </UnorderedList>
              </>
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
                        name === "inventory" ||
                        name === "inventoryType"
                      ? changeSelect(name)
                      : handleChange(name)
                  }
                  isInvalid={Boolean(errors[name]) && Boolean(touched[name])}
                  helperText={Boolean(touched[name]) && errors[name]}
                  helperColorText={"red"}
                  {...props}
                />
              </>
            )}
          </FormControl>
        )
      )}
    </>
  );
};

export default Form;
