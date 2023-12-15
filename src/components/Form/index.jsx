import { FormHelperText, FormControl } from "@chakra-ui/react";
import { Field } from "formik";
import TextField from "../TextField";
import { PatternFormat } from "react-number-format";
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
  return (
    <>
      {formFields.map(
        ({ id, name, isRequired, flexBasis, numberField, ...props }, index) => (
          <FormControl
            key={index}
            id={id}
            isRequired={isRequired}
            flexBasis={flexBasis}
            mb={4}
          >
            {numberField ? (
              <>
                <TextField
                  as={PatternFormat}
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
            ) : (
              <>
                <Field
                  as={TextField}
                  name={name}
                  onBlur={handleBlur}
                  onChange={
                    name === "name" || name === "father"
                      ? changeHandle(name)
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
