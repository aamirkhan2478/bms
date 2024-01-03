"use client";
import { useEffect, useState } from "react";
import { ButtonGroup, Flex, useSteps, useToast } from "@chakra-ui/react";

import Layout from "@/components/Layout";
import CustomBox from "@/components/CustomBox";
import { Formik } from "formik";
import { useShowTenants } from "@/hooks/useTenant";
import { ContractInfoForm, MoreInfoForm } from "@/components/ContractForms.js";
import { useShowInventoryOwners } from "@/hooks/useInventory";
import { ImageUploadForm } from "@/components/OwnerAndTenantForms";
import {
  contractInfoFormSchema,
  imagesFormSchema,
  moreInfoFormSchema,
} from "@/validators/contract.validator";
import { useShowAgents } from "@/hooks/useAgent";
import { useAddContract } from "@/hooks/useContract";
import appendArrayField from "@/utils/appendArrayField";
import CustomButton from "@/components/CustomButton";
import Stepper from "@/components/Stepper";
import mappingArray from "@/utils/mappingArray";
import Breadcrumb from "@/components/Breadcrumb";

const AddContract = () => {
  const [step, setStep] = useState(0);
  const [ownerNames, setOwnerNames] = useState([]);
  const toast = useToast();
  const { data: tenants, isLoading: tenantLoading } = useShowTenants(
    "",
    999999999999999999
  );
  const { data: inventories, isLoading: ownerLoading } =
    useShowInventoryOwners();
  const { data: agents, isLoading: agentLoading } = useShowAgents();
  const { mutate: addContract, isLoading: contractLoading } = useAddContract(
    onSuccess,
    onError
  );

  const tenantData = mappingArray(
    tenants?.data?.data?.tenants,
    "_id",
    (tenant) => tenant.name
  );

  const inventoriesData = mappingArray(
    inventories?.data?.data?.inventoriesWithOwners,
    "",
    (inventory) =>
      `${inventory.inventoryType} - ${inventory.floor}${inventory.flatNo}`,
    (inventory) => ({
      ownerIds: inventory.ownerInventory
        .map((owner) => owner.ownerId)
        .join(","),
      inventoryId: inventory._id,
      ownerNames: inventory.ownerInventory.map((owner) => owner.ownerName),
    })
  );

  const agentData = mappingArray(
    agents?.data?.data?.agents,
    "_id",
    (agent) => agent.name
  );

  const initialValues = {
    tenants: [],
    owners: [],
    inventory: "",
    signingDate: "",
    startDate: "",
    endDate: "",
    renewalDate: "",
    monthlyRentalAmount: "",
    monthlyTaxAmount: "",
    buildingManagementCharges: "",
    securityDepositAmount: "",
    annualRentalIncrease: "",
    wapdaSubmeterReading: "",
    generatorSubmeterReading: "",
    waterSubmeterReading: "",
    monthlyRentalDueDate: "",
    monthlyRentalOverDate: "",
    agent: "",
    terminationNoticePeriod: "",
    nonrefundableSecurityDeposit: "yes",
    images: [],
    remarks: "",
  };

  const steps = [
    { title: "First", description: "Personal Info" },
    { title: "Second", description: "Job Details" },
    { title: "Third", description: "Attachments" },
  ];

  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: step,
    count: steps.length,
  });

  const handleSubmit = (values, { resetForm }) => {
    // Convert the values to FormData and append the files
    const formData = new FormData();
    formData.append("inventory", values.inventory.value.inventoryId);
    formData.append("signingDate", values.signingDate);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("renewalDate", values.renewalDate);
    formData.append("monthlyRentalAmount", values.monthlyRentalAmount);
    formData.append("monthlyTaxAmount", values.monthlyTaxAmount);
    formData.append(
      "buildingManagementCharges",
      values.buildingManagementCharges
    );
    formData.append("securityDepositAmount", values.securityDepositAmount);
    formData.append("annualRentalIncrease", values.annualRentalIncrease);
    formData.append("wapdaSubmeterReading", values.wapdaSubmeterReading);
    formData.append(
      "generatorSubmeterReading",
      values.generatorSubmeterReading
    );
    formData.append("waterSubmeterReading", values.waterSubmeterReading);
    formData.append("monthlyRentalDueDate", values.monthlyRentalDueDate);
    formData.append("monthlyRentalOverDate", values.monthlyRentalOverDate);
    formData.append("agent", values.agent.value);
    formData.append("terminationNoticePeriod", values.terminationNoticePeriod);
    formData.append(
      "nonrefundableSecurityDeposit",
      values.nonrefundableSecurityDeposit
    );
    formData.append("remarks", values.remarks);

    // Get the values of the arrays
    const tenantData = values.tenants.map((tenant) => tenant.value);

    // Convent value to an array
    const ownerData = Array.from(values.inventory.value.ownerIds.split(","));

    // Append the arrays
    appendArrayField(ownerData, "owners", formData);
    appendArrayField(tenantData, "tenants", formData);
    appendArrayField(values.images, "images", formData);

    // Add the contract
    addContract(formData, {
      onSuccess: () => {
        resetForm();
        setStep(0);
        setActiveStep(0);
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
    document.title = "Add Contract";
  }, []);
  return (
    <Layout>
      <Breadcrumb
        firstLink={"Add Contract"}
        secondLink={"Show Contracts"}
        heading={"Add Contract"}
        path={"/dashboard/show-contracts/all"}
      />
      <CustomBox maxWidth={800}>
        <Stepper steps={steps} activeStep={activeStep} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={
            step === 0
              ? contractInfoFormSchema
              : step === 1
              ? moreInfoFormSchema
              : imagesFormSchema
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
                <ContractInfoForm
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  setOwnerNames={setOwnerNames}
                  ownerNames={ownerNames}
                  errors={errors}
                  touched={touched}
                  values={values}
                  searchOneData={tenantData}
                  searchTwoData={inventoriesData}
                  tenantLoading={tenantLoading}
                  ownerLoading={ownerLoading}
                />
              )}
              {step === 1 && (
                <MoreInfoForm
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  values={values}
                  agentData={agentData}
                  agentLoading={agentLoading}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 2 && (
                <ImageUploadForm
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                  label={"Upload Contract Copy Image"}
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
                      isLoading={contractLoading}
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

export default AddContract;
