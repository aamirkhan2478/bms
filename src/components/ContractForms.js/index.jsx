import { Flex, Heading } from "@chakra-ui/react";
import Form from "../Form";

export const ContractInfoForm = ({
  handleBlur,
  handleChange,
  errors,
  values,
  touched,
  setFieldValue,
  searchOneData,
  searchTwoData,
  comboData,
  setOwnerName,
  tenantLoading,
  ownerLoading,
}) => {
  const formFields = [
    {
      id: "tenant-name",
      label: `Tenant Name(s)`,
      name: "tenants",
      placeHolder: `Select Tenant Name`,
      selectChange: true,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
      data: searchOneData,
      isMulti: true,
      isLoading: tenantLoading,
    },
    {
      id: "owner-name",
      label: `Owner Name(s)`,
      name: "owners",
      placeHolder: `Select Owner Names`,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
      data: searchTwoData,
      isLoading: ownerLoading,
    },
    {
      id: "inventories",
      name: "inventories",
      isCheckbox: true,
      flexBasis: "100%",
      checkboxData: comboData,
    },
    {
      id: "contract-signing-date",
      placeHolder: "Select Contract Signing Date",
      label: "Signing Date",
      fieldType: "input",
      type: "date",
      name: "signingDate",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
    },
    {
      id: "contract-start-date",
      placeHolder: "Enter Contract Start Date",
      fieldType: "input",
      type: "date",
      label: "Start Date",
      name: "startDate",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
    },
    {
      id: "contract-end-date",
      placeHolder: "Enter Contract End Date",
      fieldType: "input",
      type: "date",
      label: "End Date",
      name: "endDate",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
    },
    {
      id: "contract-renewal-notification-date",
      placeHolder: "Enter Contract Renewal Notification Date",
      fieldType: "input",
      type: "date",
      label: "Renewal Notification Date",
      name: "renewalDate",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
    },
    {
      id: "monthly-amount",
      allowLeadingZeros: true,
      thousandSeparator: ",",
      placeHolder: "Enter Monthly Rental Amount",
      fieldType: "input",
      label: "Monthly Amount",
      name: "monthlyRentalAmount",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
      numberFormat: true,
      defaultValue: values.monthlyAmount,
    },
    {
      id: "tax-amount",
      allowLeadingZeros: true,
      thousandSeparator: ",",
      placeHolder: "Enter Monthly Tax Amount",
      fieldType: "input",
      label: "Tax Amount",
      name: "monthlyTaxAmount",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
      numberFormat: true,
      defaultValue: values.taxAmount,
    },
    {
      id: "management-charges",
      allowLeadingZeros: true,
      thousandSeparator: ",",
      placeHolder: "Enter Building Management Charges",
      fieldType: "input",
      label: "Management Charges",
      name: "buildingManagementCharges",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
      numberFormat: true,
      defaultValue: values.managementCharges,
    },
    {
      id: "deposit-amount",
      allowLeadingZeros: true,
      thousandSeparator: ",",
      placeHolder: "Enter Security Deposit Amount",
      fieldType: "input",
      label: "Security Deposit Amount",
      name: "securityDepositAmount",
      flexBasis: { md: "48%", sm: "100%" },
      isRequired: true,
      numberFormat: true,
      defaultValue: values.depositAmount,
    },
    {
      id: "annual-increment",
      suffix: "%",
      placeHolder: "Enter Annual Increment",
      fieldType: "input",
      label: "Annual Increment",
      name: "annualRentalIncrease",
      flexBasis: "100%",
      isRequired: true,
      numberFormat: true,
      defaultValue: values.annualIncrement,
    },
  ];

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Contract Info
      </Heading>
      <Flex flexWrap={"wrap"} justifyContent={"space-between"}>
        <Form
          formFields={formFields}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          setOwnerName={setOwnerName}
        />
      </Flex>
    </>
  );
};

export const MoreInfoForm = ({
  handleBlur,
  handleChange,
  errors,
  values,
  touched,
  setFieldValue,
  agentData,
  agentLoading,
}) => {
  const formFields = [
    {
      id: "wapda-submeter-reading",
      placeHolder: "Enter Wapda Submeter Meter Reading",
      fieldType: "input",
      label: "Wapda Submeter Reading",
      name: "wapdaSubmeterReading",
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "generator-submeter-reading",
      placeHolder: "Enter Generator Submeter Meter Reading",
      fieldType: "input",
      label: "Generator Submeter Reading",
      name: "generatorSubmeterReading",
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "water-submeter-reading",
      placeHolder: "Enter Water Submeter Meter Reading",
      fieldType: "input",
      label: "Water Submeter Reading",
      name: "waterSubmeterReading",
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "monthly-due-date",
      placeHolder: "Enter Monthly Due Date",
      fieldType: "input",
      label: "Monthly Due Date",
      name: "monthlyRentalDueDate",
      defaultValue: values.dueDate,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "monthly-over-due-date",
      placeHolder: "Enter Monthly Over Due Date",
      fieldType: "input",
      label: "Monthly Over Due Date",
      name: "monthlyRentalOverDate",
      defaultValue: values.overDue,
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
    },
    {
      id: "agent-name",
      placeHolder: "Select Agent Name",
      data: agentData,
      label: "Agent Name",
      name: "agent",
      isRequired: true,
      flexBasis: { md: "48%", sm: "100%" },
      agentLoading,
      selectChange: true,
    },
    {
      id: "termination-notice",
      placeHolder: "Enter Termination Notice Period(in months)",
      fieldType: "input",
      label: "Termination Notice Period",
      name: "terminationNoticePeriod",
      isRequired: true,
      flexBasis: "100%",
    },
    {
      id: "non-refundable-Security-Deposit",
      placeHolder: "Enter Remarks",
      label:
        "One Month Security amount will not be refunded if apartment will be vacated within 6 months?",
      name: "nonrefundableSecurityDeposit",
      isRadio: true,
      radioData: [
        {
          value: "yes",
          label: "Yes",
          defaultChecked: true,
          colorScheme: "green",
        },
        { value: "no", label: "No", colorScheme: "red" },
      ],
    },
    {
      id: "remarks",
      placeHolder: "Enter Remarks",
      fieldType: "textArea",
      label: "Remarks",
      name: "remarks",
    },
  ];

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Meter Readings And More Info
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
