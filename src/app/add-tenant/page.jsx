"use client";

import { useEffect, useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  FormHelperText,
  IconButton,
} from "@chakra-ui/react";

import Layout from "@/components/Layout";
import CustomBox from "@/components/CustomBox";
import TextField from "@/components/TextField";
import ImageUploader from "@/components/ImageUploader";
import { Field, FieldArray, Formik } from "formik";
import { array, date, object, string } from "yup";
import { MdAdd, MdRemove } from "react-icons/md";
import { PatternFormat } from "react-number-format";

const Form1 = ({
  handleBlur,
  handleChange,
  errors,
  touched,
  values,
  setFieldValue,
}) => {
  const capitalizeFirstLetter = (value) => {
    return value && value.length > 0
      ? value
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : value;
  };

  const changeHandle = (name) => (event) => {
    let value = event.target.value;
    if (name === "name" || name === "father") {
      value = capitalizeFirstLetter(value);
    }
    setFieldValue(name, value);
  };
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Personal Info
      </Heading>
      <Flex flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="name" isRequired>
          <Field
            as={TextField}
            placeHolder="Enter Tenant Name"
            fieldType={"input"}
            label={"Tenant Name"}
            defaultValue={values.name}
            name="name"
            onBlur={handleBlur}
            onChange={changeHandle("name")}
            isInvalid={Boolean(errors.name) && Boolean(touched.name)}
          />
          <FormHelperText color="red">
            {Boolean(touched.name) && errors.name}
          </FormHelperText>
        </FormControl>

        <FormControl id="father" isRequired>
          <Field
            as={TextField}
            placeHolder="Enter Tenant Father/Husband Name"
            fieldType={"input"}
            label={"Father/Husband Name"}
            name="father"
            defaultValue={values.father}
            onBlur={handleBlur}
            onChange={changeHandle("father")}
            isInvalid={Boolean(errors.father) && Boolean(touched.father)}
          />
          <FormHelperText color="red">
            {Boolean(touched.father) && errors.father}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="cnic" isRequired>
          <TextField
            as={PatternFormat}
            format="#####-#######-#"
            mask="_"
            placeHolder="Enter Tenant CNIC No."
            fieldType={"input"}
            label={"CNIC N0."}
            name="cnic"
            defaultValue={values.cnic}
            onBlur={handleBlur}
            onChange={handleChange("cnic")}
            isInvalid={Boolean(errors.cnic) && Boolean(touched.cnic)}
          />
          <FormHelperText color="red">
            {Boolean(touched.cnic) && errors.cnic}
          </FormHelperText>
        </FormControl>
        <FormControl id="cnic-expiry" isRequired>
          <TextField
            placeHolder="Enter Tenant CNIC Expire Date"
            fieldType={"input"}
            type="date"
            TextField
            label={"CNIC Expire Date"}
            name="cnicExpiry"
            defaultValue={values.cnicExpiry}
            onBlur={handleBlur}
            onChange={handleChange("cnicExpiry")}
            isInvalid={
              Boolean(errors.cnicExpiry) && Boolean(touched.cnicExpiry)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.cnicExpiry) && errors.cnicExpiry}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex direction={"column"} mb={5}>
        <FieldArray name="contacts">
          {({ push, remove }) => (
            <>
              {values.contacts.map((_phoneNumber, index) => (
                <Flex
                  key={index}
                  gap={{ base: 0, sm: 3 }}
                  mb={2}
                  direction={{ base: "column", sm: "row" }}
                  justifyContent={{ base: "flex-start", sm: "center" }}
                  alignItems={{ base: "flex-start", sm: "center" }}
                >
                  <FormControl id="phoneNumber" isRequired>
                    <TextField
                      as={PatternFormat}
                      format="####-#######"
                      mask="_"
                      fieldType={"input"}
                      name={`contacts[${index}].phoneNumber`}
                      defaultValue={values.contacts[index]?.phoneNumber}
                      label={"Phone Number"}
                      onBlur={handleBlur}
                      onChange={handleChange(`contacts[${index}].phoneNumber`)}
                      placeHolder={"Enter Tenant Phone Number"}
                      isInvalid={
                        Boolean(
                          errors.contacts && errors.contacts[index]?.phoneNumber
                        ) &&
                        Boolean(
                          touched.contacts &&
                            touched.contacts[index]?.phoneNumber
                        )
                      }
                    />
                    <FormHelperText color="red">
                      {Boolean(
                        touched.contacts && touched.contacts[index]?.phoneNumber
                      ) &&
                        errors.contacts &&
                        errors.contacts[index]?.phoneNumber}
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="emergencyNumber">
                    <TextField
                      as={PatternFormat}
                      format="####-#######"
                      mask="_"
                      fieldType={"input"}
                      name={`contacts[${index}].emergencyNumber`}
                      defaultValue={values.contacts[index]?.emergencyNumber}
                      label={"Emergency Number"}
                      onBlur={handleBlur}
                      onChange={handleChange(
                        `contacts[${index}].emergencyNumber`
                      )}
                      placeHolder={"Enter Tenant Emergency Number"}
                      isInvalid={
                        Boolean(
                          errors.contacts &&
                            errors.contacts[index]?.emergencyNumber
                        ) &&
                        Boolean(
                          touched.contacts &&
                            touched.contacts[index]?.emergencyNumber
                        )
                      }
                    />
                    <FormHelperText color="red">
                      {Boolean(
                        touched.contacts &&
                          touched.contacts[index]?.emergencyNumber
                      ) &&
                        errors.contacts &&
                        errors.contacts[index]?.emergencyNumber}
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="landlineNumber">
                    <TextField
                      as={PatternFormat}
                      format="####-#######"
                      mask="_"
                      fieldType={"input"}
                      name={`contacts[${index}].landlineNumber`}
                      defaultValue={values.contacts[index]?.landlineNumber}
                      label={"Landline Number"}
                      onBlur={handleBlur}
                      onChange={handleChange(
                        `contacts[${index}].landlineNumber`
                      )}
                      placeHolder={"Enter Tenant Landline Number"}
                      isInvalid={
                        Boolean(
                          errors.contacts &&
                            errors.contacts[index]?.landlineNumber
                        ) &&
                        Boolean(
                          touched.contacts &&
                            touched.contacts[index]?.landlineNumber
                        )
                      }
                    />
                    <FormHelperText color="red">
                      {Boolean(
                        touched.contacts &&
                          touched.contacts[index]?.landlineNumber
                      ) &&
                        errors.contacts &&
                        errors.contacts[index]?.landlineNumber}
                    </FormHelperText>
                  </FormControl>
                  <IconButton
                    onClick={() =>
                      push({
                        phoneNumber: "",
                        emergencyNumber: "",
                        landlineNumber: "",
                      })
                    }
                    icon={<MdAdd />}
                    mt={5}
                  />
                  {index > 0 && (
                    <IconButton
                      onClick={() => remove(index)}
                      icon={<MdRemove />}
                      mt={5}
                    />
                  )}
                </Flex>
              ))}
            </>
          )}
        </FieldArray>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="whatsapp" isRequired>
          <TextField
            as={PatternFormat}
            format="####-#######"
            mask="_"
            placeHolder="Enter Tenant Whatsapp Number"
            fieldType={"input"}
            label={"Whatsapp Number"}
            name="whatsapp"
            defaultValue={values.whatsapp}
            onBlur={handleBlur}
            onChange={handleChange("whatsapp")}
            isInvalid={Boolean(errors.whatsapp) && Boolean(touched.whatsapp)}
          />
          <FormHelperText color="red">
            {Boolean(touched.whatsapp) && errors.whatsapp}
          </FormHelperText>
        </FormControl>
        <FormControl id="email" isRequired>
          <TextField
            placeHolder="Enter Tenant Email Address"
            fieldType={"input"}
            label={"Email Address"}
            type="email"
            name="email"
            defaultValue={values.email}
            onBlur={handleBlur}
            onChange={handleChange("email")}
            isInvalid={Boolean(errors.email) && Boolean(touched.email)}
          />
          <FormHelperText color="red">
            {Boolean(touched.email) && errors.email}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="current" isRequired>
          <TextField
            placeHolder="Enter Tenant Current Address"
            fieldType={"textArea"}
            label={"Current Address"}
            name="currentAddress"
            defaultValue={values.currentAddress}
            onBlur={handleBlur}
            onChange={handleChange("currentAddress")}
            isInvalid={
              Boolean(errors.currentAddress) && Boolean(touched.currentAddress)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.currentAddress) && errors.currentAddress}
          </FormHelperText>
        </FormControl>
        <FormControl id="permanent" isRequired>
          <TextField
            placeHolder="Enter Tenant Permanent Address"
            fieldType={"textArea"}
            label={"Permanent Address"}
            name="permanentAddress"
            defaultValue={values.permanentAddress}
            onBlur={handleBlur}
            onChange={handleChange("permanentAddress")}
            isInvalid={
              Boolean(errors.permanentAddress) &&
              Boolean(touched.permanentAddress)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.permanentAddress) && errors.permanentAddress}
          </FormHelperText>
        </FormControl>
      </Flex>
    </>
  );
};

const Form2 = ({ handleBlur, handleChange, errors, touched, values }) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Job Details
      </Heading>
      <FormControl mb={5} id="title" isRequired>
        <TextField
          placeHolder="Enter Tenant Job Title"
          fieldType={"input"}
          label={"Title"}
          name="jobTitle"
          defaultValue={values.jobTitle}
          onBlur={handleBlur}
          onChange={handleChange("jobTitle")}
          isInvalid={Boolean(errors.jobTitle) && Boolean(touched.jobTitle)}
        />
        <FormHelperText color="red">
          {Boolean(touched.jobTitle) && errors.jobTitle}
        </FormHelperText>
      </FormControl>
      <FormControl mb={5} id="organization" isRequired>
        <TextField
          placeHolder="Enter Tenant Organization Name"
          fieldType={"input"}
          label={"Organization Name"}
          name="jobOrganization"
          defaultValue={values.jobOrganization}
          onBlur={handleBlur}
          onChange={handleChange("jobOrganization")}
          isInvalid={
            Boolean(errors.jobOrganization) && Boolean(touched.jobOrganization)
          }
        />
        <FormHelperText color="red">
          {Boolean(touched.jobOrganization) && errors.jobOrganization}
        </FormHelperText>
      </FormControl>
      <FormControl id="location" isRequired>
        <TextField
          placeHolder="Enter Tenant Organization Location"
          fieldType={"input"}
          label={"Organization Location"}
          name="jobLocation"
          defaultValue={values.jobLocation}
          onBlur={handleBlur}
          onChange={handleChange("jobLocation")}
          isInvalid={
            Boolean(errors.jobLocation) && Boolean(touched.jobLocation)
          }
        />
        <FormHelperText color="red">
          {Boolean(touched.jobLocation) && errors.jobLocation}
        </FormHelperText>
      </FormControl>
    </>
  );
};

const Form3 = ({
  handleBlur,
  errors,
  touched,
  handleChange,
  setFieldValue,
  values,
}) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Attachments
      </Heading>
      <FormControl mb={5} id="images" isRequired>
        <FormLabel>Upload Tenant Front and Back CNIC Image</FormLabel>
        <ImageUploader
          handleChange={handleChange}
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

const AddTenant = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "First", description: "Personal Info" },
    { title: "Second", description: "Job Details" },
    { title: "Third", description: "Attachments" },
  ];

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: step,
    count: steps.length,
  });

  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.200");

  const initialValues = {
    name: "",
    father: "",
    cnic: "",
    cnicExpiry: "",
    whatsapp: "",
    email: "",
    currentAddress: "",
    permanentAddress: "",
    jobTitle: "",
    jobOrganization: "",
    jobLocation: "",
    contacts: [
      {
        phoneNumber: "",
        landlineNumber: "",
        emergencyNumber: "",
      },
    ],
    images: [],
  };

  const handleSubmit = (values) => {
    const newValues = {
      name: values.name,
      father: values.father,
      cnic: values.cnic,
      cnicExpiry: values.cnicExpiry,
      whatsapp: values.whatsapp,
      email: values.email,
      currentAddress: values.currentAddress,
      permanentAddress: values.permanentAddress,
      jobTitle: values.jobTitle,
      jobOrganization: values.jobOrganization,
      jobLocation: values.jobLocation,
      contacts: values.contacts,
      images: values.images,
    };
    console.log(newValues);
  };
  useEffect(() => {
    document.title = "Add Tenant";
  }, []);
  return (
    <Layout>
      <Heading>Add Tenant</Heading>
      <Breadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            Add Tenant
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink href="#" color={mainText}>
            Show Tenant lists
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <CustomBox>
        <Stepper index={activeStep} display={{ base: "none", md: "flex" }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={object({
            name: string()
              .matches(
                /^(?=.{3,20}$)(?![a-z])(?!.*[_.]{2})[a-zA-Z ]+(?<![_.])$/,
                "Name should have at least 3 characters, not any number and first letter capital!"
              )
              .required("Name is Required!"),
            father: string()
              .matches(
                /^(?=.{3,20}$)(?![a-z])(?!.*[_.]{2})[a-zA-Z ]+(?<![_.])$/,
                "Father/Husband Name should have at least 3 characters, not any number and first letter capital!"
              )
              .required("Father/Husband Name is Required!"),
            cnic: string()
              .required("CNIC is required!")
              .matches(
                /^[0-9]{5}-[0-9]{7}-[0-9]$/,
                "CNIC must be 13 characters!"
              ),
            cnicExpiry: date().required("CNIC expiry date is Required!"),
            whatsapp: string()
              .required("Whatsapp Number is required!")
              .matches(/^[0-9]{4}-[0-9]{7}$/, "Invalid phone number!"),
            email: string()
              .email("Invalid Email")
              .required("Email is Required!"),
            currentAddress: string().required("Current Address is Required!"),
            permanentAddress: string().required(
              "Permanent Address is Required!"
            ),
            jobTitle: string().required("Job Title is Required!"),
            jobOrganization: string().required("Job Organization is Required!"),
            jobLocation: string().required("Job Location is Required!"),
            contacts: array(
              object({
                phoneNumber: string()
                  .required("Phone Number is required!")
                  .matches(/^[0-9]{4}-[0-9]{7}$/, "Invalid phone number!"),
                emergencyNumber: string().matches(
                  /^[0-9]{4}-[0-9]{7}$/,
                  "Invalid phone number!"
                ),
                landlineNumber: string().matches(
                  /^[0-9]{4}-[0-9]{7}$/,
                  "Invalid phone number!"
                ),
              })
            ),
            images: array().min(2, "At least two image is required"),
          })}
        >
          {({
            errors,
            touched,
            isValid,
            dirty,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              {step === 0 && (
                <Form1
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 1 && (
                <Form2
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  values={values}
                />
              )}
              {step === 2 && (
                <Form3
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  values={values}
                />
              )}

              <ButtonGroup mt="5%" w="100%">
                <Flex
                  w="100%"
                  justifyContent="space-between"
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Flex>
                    <Button
                      onClick={() => {
                        setStep(step - 1);
                        goToPrevious();
                      }}
                      isDisabled={step === 0}
                      colorScheme="teal"
                      variant="solid"
                      w="7rem"
                      mr="5%"
                    >
                      Back
                    </Button>
                    <Button
                      w="7rem"
                      isDisabled={step === 2}
                      onClick={() => {
                        setStep(step + 1);
                        goToNext();
                      }}
                      colorScheme="teal"
                      variant="outline"
                    >
                      Next
                    </Button>
                  </Flex>
                  {step === 2 && (
                    <Button
                      w="7rem"
                      mt={{ base: "5%", sm: "0" }}
                      colorScheme="green"
                      variant="solid"
                      type="submit"
                      isDisabled={!isValid || !dirty}
                      onClick={() => {
                        goToNext();
                        handleSubmit(values);
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </Flex>
              </ButtonGroup>
            </>
          )}
        </Formik>
      </CustomBox>
    </Layout>
  );
};

export default AddTenant;
