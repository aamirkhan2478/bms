import React from "react";
import Form from "../Form";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import ImageUploader from "../ImageUploader";

export const PersonalInfoForm = ({
  handleBlur,
  handleChange,
  errors,
  touched,
  values,
  setFieldValue,
  formHolder,
}) => {
  const formFields = [
    {
      id: "name",
      label: `${formHolder} Name`,
      name: "name",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Name`,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "father",
      label: "Father Name",
      name: "father",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Father/Husband Name`,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "cnic",
      label: "CNIC N0.",
      name: "cnic",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} CNIC No.`,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
      numberField: true,
      defaultValue: values?.cnic,
    },
    {
      id: "cnic-expiry",
      label: "CNIC Expiry Date",
      type: "date",
      name: "cnicExpiry",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Cnic Expiry Date`,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "phone-number",
      label: "Phone Number",
      data: values,
      setData: setFieldValue,
      onBlur: handleBlur,
      fieldType: "array",
      value: "phoneNumber",
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
      name: "phoneNumber",
    },
    {
      id: "emergency-number",
      label: "Emergency Number",
      data: values,
      setData: setFieldValue,
      onBlur: handleBlur,
      fieldType: "array",
      value: "emergencyNumber",
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
      name: "emergencyNumber",
    },
    {
      id: "whatsapp-number",
      label: "Whatsapp Number",
      data: values,
      setData: setFieldValue,
      onBlur: handleBlur,
      fieldType: "array",
      value: "whatsapp",
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
      name: "whatsapp",
    },
    {
      id: "email",
      label: "Email Address",
      name: "email",
      type: "email",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Email Address`,
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "permanent-address",
      label: "Permanent Address",
      name: "permanentAddress",
      fieldType: "textArea",
      placeHolder: `Enter ${formHolder} Permanent Address`,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "current-address",
      label: "Current Address",
      name: "currentAddress",
      fieldType: "textArea",
      placeHolder: `Enter ${formHolder} Current Address`,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
    },
  ];

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Personal Info
      </Heading>
      <Flex flexWrap={"wrap"} justifyContent={"space-between"}>
        <Form
          formFields={formFields}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      </Flex>
    </>
  );
};

export const JobInfoForm = ({
  handleBlur,
  handleChange,
  errors,
  touched,
  formHolder,
}) => {
  const formFields = [
    {
      id: "title",
      label: `Title`,
      name: "jobTitle",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Job Title`,
      isRequired: false,
      flexBasis: "100%",
    },
    {
      id: "jobOrganization",
      label: `Organization Name`,
      name: "jobOrganization",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Organization Name`,
      isRequired: false,
      flexBasis: "100%",
    },
    {
      id: "job-location",
      label: `Organization Location`,
      name: "jobLocation",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Organization Location`,
      isRequired: false,
      flexBasis: "100%",
    },
  ];
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Job Details
      </Heading>
      <Flex flexWrap={"wrap"} justifyContent={"space-between"}>
        <Form
          formFields={formFields}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Flex>
    </>
  );
};

export const BankInfoForm = ({
  handleBlur,
  handleChange,
  errors,
  touched,
  formHolder,
}) => {
  const formFields = [
    {
      id: "bank-name",
      label: `Bank Name`,
      name: "bankName",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Bank Name`,
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "bank-branch-address",
      label: `Branch Address`,
      name: "bankBranchAddress",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Bank Branch Address`,
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "bank-title",
      label: `Title`,
      name: "bankTitle",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Bank Title`,
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "bank-account-number",
      label: `Bank Account Number`,
      name: "bankAccountNumber",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} Bank Account Number`,
      isRequired: false,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "ibn-number",
      label: `IBN Number`,
      name: "bankIbnNumber",
      fieldType: "input",
      placeHolder: `Enter ${formHolder} IBN Number`,
      isRequired: false,
      flexBasis: "100%",
    },
    {
      id: "remarks",
      label: `Remarks`,
      fieldType: "textArea",
      name: "remarks",
      placeHolder: `Enter Remarks`,
      isRequired: false,
      flexBasis: "100%",
    },
  ];
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Bank Details
      </Heading>
      <Flex flexWrap={"wrap"} justifyContent={"space-between"}>
        <Form
          formFields={formFields}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Flex>
    </>
  );
};

export const ImageUploadForm = ({
  handleBlur,
  errors,
  touched,
  setFieldValue,
  values,
  label,
}) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Attachments
      </Heading>
      <FormControl mb={5} id="images">
        <FormLabel>{label}</FormLabel>
        <ImageUploader
          name={"images"}
          onBlur={handleBlur}
          values={values}
          setFieldValue={setFieldValue}
        />
        <FormHelperText color="red">
          {Boolean(touched.images) && errors.images}
        </FormHelperText>
      </FormControl>
    </>
  );
};
