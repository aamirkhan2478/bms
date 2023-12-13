"use client";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import { useAddInventory } from "@/hooks/useInventory";
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
import { object, string } from "yup";

const AddInventory = () => {
  const data = [
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

  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  const { mutate } = useAddInventory(onSuccess, onError);
  const toast = useToast();

  const initialValues = {
    inventoryType: "",
    floor: "",
    flatNo: "",
  };

  const clickHandler = (values) => {
    mutate(values);
  };

  useEffect(() => {
    document.title = "Add Inventory";
  }, []);

  function onSuccess(data) {
    toast({
      title: "Congratulation",
      description: data?.data?.message,
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  }
  function onError(error) {
    console.log(error);
    toast({
      title: "An error occurred.",
      description: error?.response?.data?.message,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top-left",
    });
  }
  return (
    <Layout>
      <Heading>Add Inventory</Heading>
      <Breadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            Add Inventory
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink href="#" color={mainText}>
            Show Inventory List
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <CustomBox heading={"Add Inventory"}>
        <Formik
          initialValues={initialValues}
          onSubmit={clickHandler}
          validationSchema={object({
            inventoryType: string().required("Inventory Type is required!"),
            floor: string().required("Floor number is required!"),
            flatNo: string()
              .matches(
                /^([0-9]{2,})$/gm,
                "The flat/shop/office number should be positive and greater then 2 digits!"
              )
              .required("The flat/shop/office number is required!"),
          })}
        >
          {({ touched, dirty, isValid, errors, handleBlur, handleChange }) => (
            <>
              <Form>
                <Flex direction={"column"} gap={5}>
                  <FormControl id="inventory" isRequired>
                    <Field
                      as={TextField}
                      data={data}
                      placeHolder={"Select Inventory Type"}
                      name={"inventoryType"}
                      label={"Inventory Type"}
                      isInvalid={
                        Boolean(errors.inventoryType) &&
                        Boolean(touched.inventoryType)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("inventoryType")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.inventoryType) && errors.inventoryType}
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="Floor-no" isRequired>
                    <Field
                      as={TextField}
                      fieldType={"input"}
                      placeHolder={"Enter floor no."}
                      name={"floor"}
                      label={"Floor No."}
                      isInvalid={
                        Boolean(errors.floor) && Boolean(touched.floor)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("floor")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.floor) && errors.floor}
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="inventory-number" isRequired>
                    <Field
                      as={TextField}
                      placeHolder={"Enter flat/shop/office no."}
                      name={"flatNo"}
                      fieldType={"input"}
                      label={"Flat/Shop/Office No."}
                      isInvalid={
                        Boolean(errors.flatNo) && Boolean(touched.flatNo)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("flatNo")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.flatNo) && errors.flatNo}
                    </FormHelperText>
                  </FormControl>

                  <CustomButton
                    text={"Add Inventory"}
                    w={"20%"}
                    alignSelf={"start"}
                    type="submit"
                    isDisabled={!isValid || !dirty}
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

export default AddInventory;
