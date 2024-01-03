"use client";
import Breadcrumb from "@/components/Breadcrumb";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import { useSellInventory, useShowInventories } from "@/hooks/useInventory";
import { useShowOwners } from "@/hooks/useOwner";
import mappingArray from "@/utils/mappingArray";
import { Flex, FormControl, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
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
              <Form>
                <Flex direction={"column"} gap={5}>
                  <FormControl id="inventory" isRequired>
                    <Field
                      component={TextField}
                      data={mappingInventories}
                      placeHolder={"Select Inventory"}
                      name={"inventoryId"}
                      label={"Inventory"}
                      isInvalid={
                        Boolean(errors.inventoryId) &&
                        Boolean(touched.inventoryId)
                      }
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("inventoryId", e)}
                      isLoading={inventoryLoading}
                      isDisabled={inventoryLoading}
                      helperText={
                        Boolean(touched.inventoryId) && errors.inventoryId
                      }
                      helperColorText={"red"}
                    />
                  </FormControl>
                  <FormControl id="owner" isRequired>
                    <Field
                      component={TextField}
                      data={mappingOwners}
                      placeHolder={"Select Owner"}
                      name={"ownerId"}
                      label={"Owner"}
                      isInvalid={
                        Boolean(errors.ownerId) && Boolean(touched.ownerId)
                      }
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("ownerId", e)}
                      isLoading={ownerLoading}
                      isDisabled={ownerLoading}
                      helperText={Boolean(touched.ownerId) && errors.ownerId}
                      helperColorText={"red"}
                    />
                  </FormControl>
                  <FormControl id="purchaseDate" isRequired>
                    <Field
                      as={TextField}
                      placeHolder={"Select Purchase Date"}
                      name={"purchaseDate"}
                      fieldType={"input"}
                      type="date"
                      label={"Purchase Date"}
                      isInvalid={
                        Boolean(errors.purchaseDate) &&
                        Boolean(touched.purchaseDate)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("purchaseDate")}
                      helperText={
                        Boolean(touched.purchaseDate) && errors.purchaseDate
                      }
                      helperColorText={"red"}
                    />
                  </FormControl>

                  <CustomButton
                    text={"Sell Inventory"}
                    w={{ base: "", md: "20%" }}
                    alignSelf={"start"}
                    type="submit"
                    isDisabled={!isValid || !dirty}
                    isLoading={isLoading}
                  />
                </Flex>
              </Form>
            </>
          )}
        </Formik>
      </CustomBox>
    </Layout>
  );
};

export default SellInventory;
