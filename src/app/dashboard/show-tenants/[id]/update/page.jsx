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
import { useShowTenant, useUpdateTenant } from "@/hooks/useTenant";
import CustomButton from "@/components/CustomButton";
import Stepper from "@/components/Stepper";
import Breadcrumb from "@/components/Breadcrumb";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import dateFormat from "@/utils/dateFormat";

const UpdateTenant = () => {
  const { id } = useParams();
  const { data, isLoading: isTenantLoading } = useShowTenant(id);
  const { mutate, isLoading } = useUpdateTenant(onSuccess, onError, id);
  const toast = useToast();
  const clientQuery = useQueryClient();
  const router = useRouter();
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
      document.title = `Update Tenant - ${data?.data?.data?.tenant?.name}`;
    };

    setTitle();

    return () => setTitle();
  }, [data?.data?.data?.tenant]);

  if (!data || !data.data || !data.data.data) {
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Spinner />
        </Flex>
      </Layout>
    );
  }

  const { tenant } = data.data.data;

  const cnicExpiry = dateFormat(tenant?.cnicExpiry, "YYYY-MM-DD");

  const initialValues = {
    name: tenant?.name,
    father: tenant?.father || "",
    cnic: tenant?.cnic || "",
    cnicExpiry: cnicExpiry || "",
    whatsapp: tenant?.whatsapp || [],
    email: tenant?.email || "",
    currentAddress: tenant?.currentAddress || "",
    permanentAddress: tenant?.permanentAddress || "",
    jobTitle: tenant?.jobTitle || "",
    jobOrganization: tenant?.jobOrganization || "",
    jobLocation: tenant?.jobLocation || "",
    phoneNumber: tenant?.phoneNumber || [],
    emergencyNumber: tenant?.emergencyNumber || [],
    bankName: tenant?.bankName || "",
    bankTitle: tenant?.bankTitle || "",
    bankBranchAddress: tenant?.bankBranchAddress || "",
    bankAccountNumber: tenant?.bankAccountNumber || "",
    bankIbnNumber: tenant?.bankIbnNumber || "",
    remarks: tenant?.remarks || "",
  };

  const handleSubmit = (values) => {
    // Call the mutation
    mutate(values, {
      onSuccess: () => {
        clientQuery.invalidateQueries("show-tenant");
      },
    });
  };

  function onSuccess(data) {
    router.push("/dashboard/show-tenants/all");
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
        firstLink={"Update Tenant"}
        secondLink={"Show Tenants"}
        heading={"Update Tenant"}
        path={"/dashboard/show-tenants/all"}
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
                  {isTenantLoading ? (
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
                      formHolder={"Tenant"}
                      status={status}
                    />
                  )}
                </>
              )}
              {step === 1 && (
                <>
                  {isTenantLoading ? (
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
                      formHolder={"Tenant"}
                    />
                  )}
                </>
              )}
              {step === 2 && (
                <>
                  {isTenantLoading ? (
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
                      formHolder={"Tenant"}
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
                      isDisabled={step === 2}
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

export default UpdateTenant;
