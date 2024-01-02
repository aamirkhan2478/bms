"use client";

import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Flex,
  Spinner,
  useSteps,
  useToast,
} from "@chakra-ui/react";

import Layout from "@/components/Layout";
import CustomBox from "@/components/CustomBox";
import { Formik } from "formik";
import {
  BankInfoForm,
  JobInfoForm,
  PersonalInfoForm,
} from "@/components/OwnerAndTenantForms";
import {
  bankInfoSchema,
  personalInfoSchema,
} from "@/validators/owner_tenant.validator";
import { useShowOwner, useUpdateOwner } from "@/hooks/useOwner";
import CustomButton from "@/components/CustomButton";
import Stepper from "@/components/Stepper";
import Breadcrumb from "@/components/Breadcrumb";
import { useParams } from "next/navigation";
import { QueryClient } from "react-query";
import dateFormat from "@/utils/dateFormat";

const UpdateOwner = () => {
  const { id } = useParams();
  const { data, isLoading: isOwnerLoading } = useShowOwner(id);
  const { mutate, isLoading } = useUpdateOwner(onSuccess, onError, id);
  const toast = useToast();
  const clientQuery = new QueryClient();
  const steps = [
    { title: "First", description: "Personal Info" },
    { title: "Second", description: "Job Details" },
    { title: "Third", description: "Bank Details" },
  ];

  const [step, setStep] = useState(0);

  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: step,
    count: steps.length,
  });

  useEffect(() => {
    const setTitle = () => {
      document.title = `Update Owner - ${data?.data?.data?.owner?.name}`;
    };

    setTitle();

    return () => setTitle();
  }, [data?.data?.data?.owner]);

  if (!data || !data.data || !data.data.data) {
    // You can return a loading indicator or an error message here
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Spinner />
        </Flex>
      </Layout>
    );
  }

  const { owner } = data.data.data;

  const cnicExpiry = dateFormat(owner?.cnicExpiry, "YYYY-MM-DD");

  const initialValues = {
    name: owner?.name,
    father: owner?.father || "",
    cnic: owner?.cnic || "",
    cnicExpiry: cnicExpiry || "",
    whatsapp: owner?.whatsapp || [],
    email: owner?.email || "",
    currentAddress: owner?.currentAddress || "",
    permanentAddress: owner?.permanentAddress || "",
    jobTitle: owner?.jobTitle || "",
    jobOrganization: owner?.jobOrganization || "",
    jobLocation: owner?.jobLocation || "",
    phoneNumber: owner?.phoneNumber || [],
    emergencyNumber: owner?.emergencyNumber || [],
    bankName: owner?.bankName || "",
    bankTitle: owner?.bankTitle || "",
    bankBranchAddress: owner?.bankBranchAddress || "",
    bankAccountNumber: owner?.bankAccountNumber || "",
    bankIbnNumber: owner?.bankIbnNumber || "",
    remarks: owner?.remarks || "",
  };

  const handleSubmit = (values) => {
    // Call the mutation
    mutate(values, {
      onSuccess: () => {
        setStep(0);
        setActiveStep(0);
      },
    });
  };

  function onSuccess(data) {
    clientQuery.invalidateQueries("show-owner");
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

  return (
    <Layout>
      <Breadcrumb
        firstLink={"Update Owner"}
        secondLink={"Show Owners"}
        heading={"Update Owner"}
        path={"/dashboard/show-owners/all"}
      />
      <CustomBox maxWidth={800}>
        <Stepper steps={steps} activeStep={activeStep} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={
            step === 0 ? personalInfoSchema : step === 2 ? bankInfoSchema : null
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
            status,
          }) => (
            <>
              {step === 0 && (
                <>
                  {isOwnerLoading ? (
                    <Flex justifyContent="center" alignItems="center" h="100vh">
                      <Spinner />
                    </Flex>
                  ) : (
                    <PersonalInfoForm
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      values={values}
                      setFieldValue={setFieldValue}
                      formHolder={"Owner"}
                      status={status}
                    />
                  )}
                </>
              )}
              {step === 1 && (
                <>
                  {isOwnerLoading ? (
                    <Flex justifyContent="center" alignItems="center" h="100vh">
                      <Spinner />
                    </Flex>
                  ) : (
                    <JobInfoForm
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      values={values}
                      formHolder={"Owner"}
                    />
                  )}
                </>
              )}
              {step === 2 && (
                <>
                  {isOwnerLoading ? (
                    <Flex justifyContent="center" alignItems="center" h="100vh">
                      <Spinner />
                    </Flex>
                  ) : (
                    <BankInfoForm
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      values={values}
                      formHolder={"Owner"}
                    />
                  )}
                </>
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
                      isDisabled={!isValid || !dirty || step === 2}
                      onClick={() => {
                        setStep(step + 1);
                        goToNext();
                      }}
                      variant="outline"
                      text={"Next"}
                    />
                  </Flex>
                  {step === 2 && (
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

export default UpdateOwner;
