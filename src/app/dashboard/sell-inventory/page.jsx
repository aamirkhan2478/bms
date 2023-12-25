"use client";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import { useSellInventory, useShowInventories } from "@/hooks/useInventory";
import { useShowOwners } from "@/hooks/useOwner";
import mappingArray from "@/utils/mappingArray";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { date, object } from "yup";

const SellInventory = () => {
  const { data: inventories, isLoading: inventoryLoading } =
    useShowInventories();
  const { data: owners, isLoading: ownerLoading } = useShowOwners();
  const { mutate, isLoading } = useSellInventory(onSuccess, onError);
  const toast = useToast();

  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  const initialValues = {
    inventoryId: "",
    ownerId: "",
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

  const clickHandler = (values, { resetForm }) => {
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
      <Heading>Sell Inventory</Heading>
      <Breadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            Sell Inventory
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink href="#" color={mainText}>
            Show Sold Inventory List
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <CustomBox heading={"Sell Inventory"}>
        <Formik
          initialValues={initialValues}
          onSubmit={clickHandler}
          validationSchema={object({
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
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.inventoryId) && errors.inventoryId}
                    </FormHelperText>
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
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.ownerId) && errors.ownerId}
                    </FormHelperText>
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
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.purchaseDate) && errors.purchaseDate}
                    </FormHelperText>
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
