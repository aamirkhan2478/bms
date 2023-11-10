import { FormControl } from "@chakra-ui/react";
import React from "react";
import TextField from "../TextField";
import { Form as FormikForm, Field } from "formik";

const Form = ({ formData }) => {
  return formData.map((data) => (
    <FormikForm key={data.label}>
      <FormControl id={data.label}>
        <Field
          as={TextField}
          data={data.selectData || []}
          label={data.label || ""}
          placeHolder={data.placeHolder || ""}
          fieldType={data.fieldType || ""}
          helperText={data.helperText || ""}
          inputGroupSize={data.inputGroupSize || ""}
          leftElement={data.leftElement || ""}
          onChange={data.onChange}
          rightElement={data.rightElement || ""}
          type={data.type || "text"}
          name={data.name || ""}
        />
      </FormControl>
    </FormikForm>
  ));
};

export default Form;
