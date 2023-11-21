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
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";

import Layout from "@/components/Layout";
import CustomBox from "@/components/CustomBox";
import TextField from "@/components/TextField";
import ImageUploader from "@/components/ImageUploader";
import { Formik } from "formik";
import { date, number, object, string } from "yup";
import { NumericFormat } from "react-number-format";

const Form1 = ({ handleBlur, handleChange, errors, touched, values }) => {
  const tenantData = [
    {
      value: "Ruman",
      text: "Ruman",
    },
    {
      value: "Saqib",
      text: "Saqib",
    },
    {
      value: "Sohaib",
      text: "Sohaib",
    },
  ];

  const inventoryData = [
    {
      value: "Flat",
      text: "Flat",
    },
    {
      value: "Shop",
      text: "Shop",
    },
    {
      value: "Office",
      text: "Office",
    },
  ];
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Contract Info
      </Heading>
      <Flex flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="tenant-name">
          <TextField
            placeHolder="Select Tenant Name"
            label={"Tenant Name"}
            data={tenantData}
            name="tenantName"
            onBlur={handleBlur}
            onChange={handleChange("tenantName")}
            defaultValue={values.tenantName}
            isInvalid={
              Boolean(errors.tenantName) && Boolean(touched.tenantName)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.tenantName) && errors.tenantName}
          </FormHelperText>
        </FormControl>

        <FormControl id="inventory-type">
          <TextField
            placeHolder="Select Inventory Type"
            data={inventoryData}
            label={"Inventory Type"}
            defaultValue={values.inventoryType}
            name="inventoryType"
            onBlur={handleBlur}
            onChange={handleChange("inventoryType")}
            isInvalid={
              Boolean(errors.inventoryType) && Boolean(touched.inventoryType)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.inventoryType) && errors.inventoryType}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="signing-date">
          <TextField
            placeHolder="Select Contract Signing Date"
            label={"Signing Date"}
            fieldType={"input"}
            type="date"
            name="signingDate"
            defaultValue={values.signingDate}
            onBlur={handleBlur}
            onChange={handleChange("signingDate")}
            isInvalid={
              Boolean(errors.signingDate) && Boolean(touched.signingDate)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.signingDate) && errors.signingDate}
          </FormHelperText>
        </FormControl>
        <FormControl id="start-date">
          <TextField
            placeHolder="Enter Contract Start Date"
            fieldType={"input"}
            type="date"
            label={"Start Date"}
            defaultValue={values.startDate}
            name="startDate"
            onBlur={handleBlur}
            onChange={handleChange("startDate")}
            isInvalid={Boolean(errors.startDate) && Boolean(touched.startDate)}
          />
          <FormHelperText color="red">
            {Boolean(touched.startDate) && errors.startDate}
          </FormHelperText>
        </FormControl>
      </Flex>

      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl id="end-date" mr="5%">
          <TextField
            placeHolder="Enter Contract End Date"
            fieldType={"input"}
            type="date"
            label={"End Date"}
            defaultValue={values.endDate}
            name="endDate"
            onBlur={handleBlur}
            onChange={handleChange("endDate")}
            isInvalid={Boolean(errors.endDate) && Boolean(touched.endDate)}
          />
          <FormHelperText color="red">
            {Boolean(touched.endDate) && errors.endDate}
          </FormHelperText>
        </FormControl>
        <FormControl id="renewal-date">
          <TextField
            placeHolder="Enter Contract Renewal Notification Date"
            fieldType={"input"}
            type="date"
            label={"Renewal Notification Date"}
            name="renewalNotificationDate"
            onBlur={handleBlur}
            defaultValue={values.renewalNotificationDate}
            onChange={handleChange("renewalNotificationDate")}
            isInvalid={
              Boolean(errors.renewalNotificationDate) &&
              Boolean(touched.renewalNotificationDate)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.renewalNotificationDate) &&
              errors.renewalNotificationDate}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="monthlyAmount">
          <TextField
            as={NumericFormat}
            allowLeadingZeros
            thousandSeparator=","
            placeHolder="Enter Monthly Rental Amount"
            fieldType={"input"}
            label={"Monthly Amount"}
            name="monthlyAmount"
            onBlur={handleBlur}
            defaultValue={values.monthlyAmount}
            onChange={handleChange("monthlyAmount")}
            isInvalid={
              Boolean(errors.monthlyAmount) && Boolean(touched.monthlyAmount)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.monthlyAmount) && errors.monthlyAmount}
          </FormHelperText>
        </FormControl>
        <FormControl id="taxAmount">
          <TextField
            as={NumericFormat}
            allowLeadingZeros
            thousandSeparator=","
            placeHolder="Enter Monthly Tax Amount"
            fieldType={"input"}
            label={"Tax Amount"}
            name="taxAmount"
            defaultValue={values.taxAmount}
            onBlur={handleBlur}
            onChange={handleChange("taxAmount")}
            isInvalid={Boolean(errors.taxAmount) && Boolean(touched.taxAmount)}
          />
          <FormHelperText color="red">
            {Boolean(touched.taxAmount) && errors.taxAmount}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mr="5%" id="managementCharges">
          <TextField
            as={NumericFormat}
            allowLeadingZeros
            thousandSeparator=","
            placeHolder="Enter Building Management Charges"
            fieldType={"input"}
            label={"Management Charges"}
            name="managementCharges"
            onBlur={handleBlur}
            defaultValue={values.managementCharges}
            onChange={handleChange("managementCharges")}
            isInvalid={
              Boolean(errors.managementCharges) &&
              Boolean(touched.managementCharges)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.managementCharges) && errors.managementCharges}
          </FormHelperText>
        </FormControl>
        <FormControl id="depositAmount">
          <TextField
            as={NumericFormat}
            allowLeadingZeros
            thousandSeparator=","
            placeHolder="Enter Security Deposit Amount"
            fieldType={"input"}
            label={"Security Deposit Amount"}
            name="depositAmount"
            onBlur={handleBlur}
            defaultValue={values.depositAmount}
            onChange={handleChange("depositAmount")}
            isInvalid={
              Boolean(errors.depositAmount) && Boolean(touched.depositAmount)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.depositAmount) && errors.depositAmount}
          </FormHelperText>
        </FormControl>
      </Flex>
      <FormControl id="annualIncrement">
        <TextField
          as={NumericFormat}
          suffix={"%"}
          placeHolder="Enter Annual Increment"
          fieldType={"input"}
          label={"Annual Increment"}
          name="annualIncrement"
          defaultValue={values.annualIncrement}
          onBlur={handleBlur}
          onChange={handleChange("annualIncrement")}
          isInvalid={
            Boolean(errors.annualIncrement) && Boolean(touched.annualIncrement)
          }
        />
        <FormHelperText color="red">
          {Boolean(touched.annualIncrement) && errors.annualIncrement}
        </FormHelperText>
      </FormControl>
    </>
  );
};

const Form2 = ({ handleBlur, handleChange, errors, touched, values }) => {
  const agentData = [
    {
      value: "Atif Mustafa Khan",
      text: "Atif Mustafa Khan",
    },
  ];
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Meter Readings And More Info
      </Heading>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mb={5} id="wapdaMeter" mr={"5%"}>
          <TextField
            placeHolder="Enter Wapda Meter Reading"
            fieldType={"input"}
            label={"Wapda Meter Reading"}
            name="wapdaMeter"
            onBlur={handleBlur}
            defaultValue={values.wapdaMeter}
            onChange={handleChange("wapdaMeter")}
            isInvalid={
              Boolean(errors.wapdaMeter) && Boolean(touched.wapdaMeter)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.wapdaMeter) && errors.wapdaMeter}
          </FormHelperText>
        </FormControl>

        <FormControl mb={5} id="generatorMeter">
          <TextField
            placeHolder="Enter Generator Meter Reading"
            fieldType={"input"}
            label={"Generator Meter Reading"}
            name="generatorMeter"
            onBlur={handleBlur}
            defaultValue={values.generatorMeter}
            onChange={handleChange("generatorMeter")}
            isInvalid={
              Boolean(errors.generatorMeter) && Boolean(touched.generatorMeter)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.generatorMeter) && errors.generatorMeter}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mb={5} id="waterMeter" mr={"5%"}>
          <TextField
            placeHolder="Enter Water Meter Reading"
            fieldType={"input"}
            label={"Water Meter Reading"}
            name="waterMeter"
            onBlur={handleBlur}
            defaultValue={values.waterMeter}
            onChange={handleChange("waterMeter")}
            isInvalid={
              Boolean(errors.waterMeter) && Boolean(touched.waterMeter)
            }
          />
          <FormHelperText color="red">
            {Boolean(touched.waterMeter) && errors.waterMeter}
          </FormHelperText>
        </FormControl>

        <FormControl mb={5} id="dueDate">
          <TextField
            placeHolder="Enter Monthly Due Date"
            fieldType={"input"}
            type="date"
            label={"Monthly Due Date"}
            name="dueDate"
            onBlur={handleBlur}
            defaultValue={values.dueDate}
            onChange={handleChange("dueDate")}
            isInvalid={Boolean(errors.dueDate) && Boolean(touched.dueDate)}
          />
          <FormHelperText color="red">
            {Boolean(touched.dueDate) && errors.dueDate}
          </FormHelperText>
        </FormControl>
      </Flex>
      <Flex my={5} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mb={5} id="overDue" mr={"5%"}>
          <TextField
            placeHolder="Enter Monthly Over Due Date"
            fieldType={"input"}
            type="date"
            label={"Monthly Over Due Date"}
            name="overDue"
            onBlur={handleBlur}
            defaultValue={values.overDue}
            onChange={handleChange("overDue")}
            isInvalid={Boolean(errors.overDue) && Boolean(touched.overDue)}
          />
          <FormHelperText color="red">
            {Boolean(touched.overDue) && errors.overDue}
          </FormHelperText>
        </FormControl>

        <FormControl mb={5} id="agentName">
          <TextField
            placeHolder="Select Agent Name"
            data={agentData}
            label={"Agent Name"}
            name="agentName"
            onBlur={handleBlur}
            defaultValue={values.agentName}
            onChange={handleChange("agentName")}
            isInvalid={Boolean(errors.agentName) && Boolean(touched.agentName)}
          />
          <FormHelperText color="red">
            {Boolean(touched.agentName) && errors.agentName}
          </FormHelperText>
        </FormControl>
      </Flex>
      <FormControl mb={5} id="terminationNotice">
        <TextField
          placeHolder="Enter Termination Notice Period(in months)"
          fieldType={"input"}
          label={"Termination Notice Period"}
          name="terminationNotice"
          onBlur={handleBlur}
          defaultValue={values.terminationNotice}
          onChange={handleChange("terminationNotice")}
          isInvalid={
            Boolean(errors.terminationNotice) &&
            Boolean(touched.terminationNotice)
          }
        />
        <FormHelperText color="red">
          {Boolean(touched.terminationNotice) && errors.terminationNotice}
        </FormHelperText>
      </FormControl>
      <RadioGroup defaultValue={values.monthSecurityAmount}>
        <FormLabel>
          One Month Security amount will not be refunded if apartment will be
          vacated within 6 months?
        </FormLabel>
        <Stack spacing={5} direction="row">
          <Radio
            colorScheme="green"
            value={"yes"}
            name="monthSecurityAmount"
            onChange={handleChange("monthSecurityAmount")}
          >
            Yes
          </Radio>
          <Radio
            colorScheme="red"
            value={"no"}
            name="monthSecurityAmount"
            onChange={handleChange("monthSecurityAmount")}
          >
            No
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  );
};

const Form3 = ({
  selectedFiles,
  setSelectedFiles,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Attachments
      </Heading>
      <FormControl mb={5} id="images">
        <FormLabel>Upload Contract Copy Image</FormLabel>
        <ImageUploader
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          name={"images"}
          onBlur={handleBlur}
        />
        <FormHelperText color="red">
          {Boolean(touched.images) && errors.images}
        </FormHelperText>
      </FormControl>
    </>
  );
};

const AddContract = () => {
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

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [emergencyNumber, setEmergencyNumber] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const initialValues = {
    tenantName: "",
    inventoryType: "",
    signingDate: "",
    startDate: "",
    endDate: "",
    renewalNotificationDate: "",
    monthlyAmount: "",
    taxAmount: "",
    managementCharges: "",
    depositAmount: "",
    annualIncrement: "",
    wapdaMeter: "",
    generatorMeter: "",
    waterMeter: "",
    dueDate: "",
    overDue: "",
    agentName: "",
    terminationNotice: "",
    monthSecurityAmount: "yes",
    images: selectedFiles,
  };

  const handleSubmit = (values) => {
    const withoutPercentageSign = values.annualIncrement.replace("%", "");
    const withoutMonthlyAmountComma = values.monthlyAmount.replace(/,/g, "");
    const withoutTaxAmountComma = values.taxAmount.replace(/,/g, "");
    const withoutManagementChargesComma = values.managementCharges.replace(
      /,/g,
      ""
    );
    const withoutDepositAmountComma = values.depositAmount.replace(/,/g, "");

    const newValues = {
      tenantName: values.tenantName,
      inventoryType: values.inventoryType,
      signingDate: values.signingDate,
      startDate: values.startDate,
      endDate: values.endDate,
      renewalNotificationDate: values.renewalNotificationDate,
      monthlyAmount: withoutMonthlyAmountComma,
      taxAmount: withoutTaxAmountComma,
      managementCharges: withoutManagementChargesComma,
      depositAmount: withoutDepositAmountComma,
      annualIncrement: withoutPercentageSign,
      wapdaMeter: values.wapdaMeter,
      generatorMeter: values.generatorMeter,
      waterMeter: values.waterMeter,
      dueDate: values.dueDate,
      overDue: values.overDue,
      agentName: values.agentName,
      terminationNotice: values.terminationNotice,
      monthSecurityAmount: values.monthSecurityAmount,
      images: selectedFiles,
    };
    console.log(newValues);
  };
  useEffect(() => {
    document.title = "Add Contract";
  }, []);
  return (
    <Layout>
      <Heading>Add Contract</Heading>
      <Breadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            Add Contract
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink href="#" color={mainText}>
            Show Contract lists
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
            tenantName: string().required("Tenant Name is Required!"),
            inventoryType: string().required("Inventory Type is Required!"),
            signingDate: date().required("Signing Date is Required!"),
            startDate: date().required("Start Date is Required!"),
            endDate: date().required("End Date is Required!"),
            renewalNotificationDate: date().required(
              "Renewal Notification Date is Required!"
            ),
            monthlyAmount: string().required("Monthly Amount is Required!"),
            taxAmount: string().required("Tax Amount is Required!"),
            managementCharges: string().required(
              "Management Charges is Required!"
            ),
            depositAmount: string().required("Deposit Amount is Required!"),
            annualIncrement: string().required("Annual Increment is Required!"),
            wapdaMeter: number()
              .typeError("That doesn't look like a number!")
              .positive("Wapda meter number must be a positive number!")
              .integer("Wapda meter number should be integer!")
              .required("Wapda Meter is Required!"),
            generatorMeter: number()
              .typeError("That doesn't look like a number!")
              .positive("Generator meter number must be a positive number!")
              .integer("Generator meter number should be integer!")
              .required("Generator Meter is Required!"),
            waterMeter: number()
              .typeError("That doesn't look like a number")
              .positive("Water meter number must be a positive number!")
              .integer("Water meter number should be integer!")
              .required("Water Meter is Required!"),
            dueDate: date().required("Due Date is Required!"),
            overDue: date().required("Over Due is Required!"),
            agentName: string().required("Agent Name is Required!"),
            terminationNotice: string().required(
              "Termination Notice is Required!"
            ),
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
          }) => (
            <>
              {step === 0 && (
                <Form1
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  emergencyNumber={emergencyNumber}
                  setEmergencyNumber={setEmergencyNumber}
                  phoneNumbers={phoneNumbers}
                  setPhoneNumbers={setPhoneNumbers}
                  errors={errors}
                  touched={touched}
                  values={values}
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
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
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

export default AddContract;
