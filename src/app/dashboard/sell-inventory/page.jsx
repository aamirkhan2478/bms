"use client";
import Breadcrumb from "@/components/Breadcrumb";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import { useSellInventory, useShowInventories } from "@/hooks/useInventory";
import { useShowOwners } from "@/hooks/useOwner";
import mappingArray from "@/utils/mappingArray";
import { useToast } from "@chakra-ui/react";
import { Form as ChakraForm, Formik } from "formik";
import { useEffect } from "react";
import { date, object } from "yup";

const SellInventory = () => {
  const { data: inventories, isLoading: inventoryLoading } = useShowInventories(
    "",
    999999999999999999
  );
  const { data: owners, isLoading: ownerLoading } = useShowOwners(
    "",
    999999999999999999
  );
  const { mutate, isLoading } = useSellInventory(onSuccess, onError);
  const toast = useToast();

  const initialValues = {
    inventoryId: {},
    ownerId: {},
    purchaseDate: "",
  };

  const mappingInventories = mappingArray(
    inventories?.data?.data?.inventories,
    "_id",
    (inventory) =>
      `${inventory.inventoryType} - ${inventory.floor}${inventory.flatNo}`
  );

  const mappingOwners = mappingArray(
    owners?.data?.data?.owners,
    "_id",
    (owner) => owner.name
  );

  const formFields = [
    {
      name: "inventoryId",
      label: "Inventory",
      data: mappingInventories,
      isRequired: true,
      flexBasis: "100%",
      selectChange: true,
    },
    {
      name: "ownerId",
      label: "Owner",
      data: mappingOwners,
      isRequired: true,
      flexBasis: "100%",
      selectChange: true,
    },
    {
      name: "purchaseDate",
      label: "Purchase Date",
      fieldType: "input",
      type: "date",
      isRequired: true,
      flexBasis: "100%",
    },
  ];

  const clickHandler = (values) => {
    const inventory = values.inventoryId.value;
    const owner = values.ownerId.value;
    const data = {
      inventoryId: inventory,
      ownerId: owner,
      purchaseDate: values.purchaseDate,
    };

    mutate(data);
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
    document.title = "Sell Inventory";
  }, []);

  return (
    <Layout>
      <Breadcrumb
        firstLink={"Sell Inventory"}
        secondLink={"Show Sold Inventories"}
        heading={"Sell Inventory"}
        path={"/dashboard/show-sold-inventories/all"}
      />
      <CustomBox heading={"Sell Inventory"} maxWidth={800}>
        <Formik
          initialValues={initialValues}
          onSubmit={clickHandler}
          validationSchema={object({
            inventoryId: object().required("Inventory is required!"),
            ownerId: object().required("Owner is required!"),
            purchaseDate: date().required("Purchase Date is required!"),
          })}
        >
          {({
            touched,
            dirty,
            isValid,
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
          }) => (
            <>
              <ChakraForm>
                <Form
                  errors={errors}
                  formFields={formFields}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  touched={touched}
                />

                <CustomButton
                  text={"Sell Inventory"}
                  w={{ base: "", md: "20%" }}
                  alignSelf={"start"}
                  type="submit"
                  isDisabled={!isValid || !dirty}
                  isLoading={isLoading}
                />
              </ChakraForm>
            </>
          )}
        </Formik>
      </CustomBox>
    </Layout>
  );
};

export default SellInventory;
