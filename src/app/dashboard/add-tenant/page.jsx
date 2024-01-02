"use client";

import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Flex,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import CustomBox from "@/components/CustomBox";
import { Formik } from "formik";
import {
  BankInfoForm,
  ImageUploadForm,
  JobInfoForm,
  PersonalInfoForm,
} from "@/components/OwnerAndTenantForms";
import { useAddTenant } from "@/hooks/useTenant";
import CustomButton from "@/components/CustomButton";
import appendArrayField from "@/utils/appendArrayField";
import {
  bankInfoSchema,
  imagesSchema,
  personalInfoSchema,
} from "@/validators/owner_tenant.validator";
import Stepper from "@/components/Stepper";
import Breadcrumb from "@/components/Breadcrumb";

const AddTenant = () => {
  const [step, setStep] = useState(0);
  const { mutate, isLoading } = useAddTenant(onSuccess, onError);
  const toast = useToast();
  const steps = [
    { title: "First", description: "Personal Info" },
    { title: "Second", description: "Job Details" },
    { title: "Third", description: "Bank Details" },
    { title: "Forth", description: "Attachments" },
  ];

  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: step,
    count: steps.length,
  });


  const initialValues = {
    name: "",
    father: "",
    cnic: "",
    cnicExpiry: "",
    whatsapp: [],
    email: "",
    currentAddress: "",
    permanentAddress: "",
    jobTitle: "",
    jobOrganization: "",
    jobLocation: "",
    phoneNumber: [],
    emergencyNumber: [],
    images: [],
    bankName: "",
    bankTitle: "",
    bankBranchAddress: "",
    bankAccountNumber: "",
    bankIbnNumber: "",
    remarks: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    // Convert the values to FormData and append the files
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("father", values.father);
    formData.append("cnic", values.cnic);
    formData.append("cnicExpiry", values.cnicExpiry);
    formData.append("email", values.email);
    formData.append("currentAddress", values.currentAddress);
    formData.append("permanentAddress", values.permanentAddress);
    formData.append("jobTitle", values.jobTitle);
    formData.append("jobOrganization", values.jobOrganization);
    formData.append("jobLocation", values.jobLocation);
    formData.append("bankName", values.bankName);
    formData.append("bankTitle", values.bankTitle);
    formData.append("bankBranchAddress", values.bankBranchAddress);
    formData.append("bankAccountNumber", values.bankAccountNumber);
    formData.append("bankIbnNumber", values.bankIbnNumber);
    formData.append("remarks", values.remarks);

    // Append the arrays
    appendArrayField(values.whatsapp, "whatsapp", formData);
    appendArrayField(values.phoneNumber, "phoneNumber", formData);
    appendArrayField(values.emergencyNumber, "emergencyNumber", formData);
    appendArrayField(values.images, "images", formData);

    // Call the mutation
    mutate(formData, {
      onSuccess: () => {
        setStep(0);
        setActiveStep(0);
        resetForm();
      },
    });
  };

  function onSuccess(data) {
    toast({
      title: "Congratulation!",
      description: data?.data?.message,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }

  function onError(error) {
    toast({
      title: "An error occurred.",
      description: error?.response?.data?.message,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }

  useEffect(() => {
    document.title = "Add Tenant";
  }, []);

  return (
    <Layout>
      <Breadcrumb
        firstLink={"Add Tenant"}
        secondLink={"Show Tenants"}
        heading={"Add Tenant"}
        path={"/dashboard/show-tenants/all"}
      />
      <CustomBox maxWidth={800}>
        <Stepper steps={steps} activeStep={activeStep} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={
            step === 0
              ? personalInfoSchema
              : step === 2
              ? bankInfoSchema
              : imagesSchema
          }
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
                <PersonalInfoForm
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  formHolder={"Tenant"}
                />
              )}
              {step === 1 && (
                <JobInfoForm
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                  formHolder={"Tenant"}
                />
              )}
              {step === 2 && (
                <BankInfoForm
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                  formHolder={"Tenant"}
                />
              )}
              {step === 3 && (
                <ImageUploadForm
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                  label={"Upload Tenant Front and Back CNIC Image"}
                />
              )}

              <ButtonGroup mt="5%" w="100%">
                <Flex
                  w="100%"
                  justifyContent="space-between"
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  <Flex>
                    <CustomButton
                      onClick={() => {
                        setStep(step - 1);
                        goToPrevious();
                      }}
                      isDisabled={step === 0}
                      variant="solid"
                      w="7rem"
                      mr="5%"
                      text={"Back"}
                    />
                    <CustomButton
                      w="7rem"
                      isDisabled={!isValid || !dirty || step === 3}
                      onClick={() => {
                        setStep(step + 1);
                        goToNext();
                      }}
                      variant="outline"
                      text={"Next"}
                    />
                  </Flex>
                  {step === 3 && (
                    <CustomButton
                      text={"Submit"}
                      w="7rem"
                      colorScheme="blue"
                      variant="solid"
                      type="submit"
                      isDisabled={!isValid || !dirty}
                      onClick={() => {
                        goToNext();
                        handleSubmit(values);
                      }}
                      isLoading={isLoading}
                    />
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
