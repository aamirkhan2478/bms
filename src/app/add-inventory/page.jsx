"use client";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { number, object, string } from "yup";

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
  const initialValues = {
    inventoryType: "",
    floor: "",
    flatShopOfficeNo: "",
    wapdaSubMeterNo: "",
    generatorMeterNo: "",
    waterMeterNo: "",
  };

  const clickHandler = (values) => {
    console.log(values);
  };

  useEffect(() => {
    document.title = "Add Inventory";
  }, []);
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
            floor: number()
              .typeError("That doesn't look like a number!")
              .positive("Floor number must be a positive number!")
              .integer("Floor number should be integer")
              .required("Floor number is required!"),
            flatShopOfficeNo: number()
              .typeError("That doesn't look like a number!")
              .positive(
                "The flat/shop/office number should be positive number!"
              )
              .moreThan(
                2,
                "The flat/shop/office number should be positive and greater then 2 digits!"
              )
              .integer("The flat/shop/office should be integer")
              .required("The flat/shop/office number is required!"),
            wapdaSubMeterNo: number()
              .typeError("That doesn't look like a number")
              .positive("Wapda submeter number must be a positive number!")
              .integer("Wapda submeter number should be integer"),
            generatorMeterNo: number()
              .typeError("That doesn't look like a number")
              .positive("Generator meter number must be a positive number!")
              .integer("Generator meter number should be integer"),
            waterMeterNo: number()
              .typeError("That doesn't look like a number")
              .positive("Water meter number must be a positive number!")
              .integer("Water meter number should be integer"),
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
                      name={"flatShopOfficeNo"}
                      fieldType={"input"}
                      label={"Flat/Shop/Office No."}
                      isInvalid={
                        Boolean(errors.flatShopOfficeNo) &&
                        Boolean(touched.flatShopOfficeNo)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("flatShopOfficeNo")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.flatShopOfficeNo) &&
                        errors.flatShopOfficeNo}
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="wapda-submeter-number">
                    <Field
                      as={TextField}
                      placeHolder={"Enter Wapda submeter no."}
                      name={"wapdaSubMeterNo"}
                      fieldType={"input"}
                      label={"Wapda Submeter No."}
                      isInvalid={
                        Boolean(errors.wapdaSubMeterNo) &&
                        Boolean(touched.wapdaSubMeterNo)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("wapdaSubMeterNo")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.wapdaSubMeterNo) &&
                        errors.wapdaSubMeterNo}
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="generator-meter-number">
                    <Field
                      as={TextField}
                      placeHolder={"Enter Generator meter no."}
                      name={"generatorMeterNo"}
                      fieldType={"input"}
                      label={"Generator Meter No."}
                      isInvalid={
                        Boolean(errors.generatorMeterNo) &&
                        Boolean(touched.generatorMeterNo)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("generatorMeterNo")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.generatorMeterNo) &&
                        errors.generatorMeterNo}
                    </FormHelperText>
                  </FormControl>
                  <FormControl id="water-meter-number">
                    <Field
                      as={TextField}
                      placeHolder={"Enter Water meter no."}
                      name={"waterMeterNo"}
                      fieldType={"input"}
                      label={"Water Meter No."}
                      isInvalid={
                        Boolean(errors.waterMeterNo) &&
                        Boolean(touched.waterMeterNo)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("waterMeterNo")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.waterMeterNo) && errors.waterMeterNo}
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
