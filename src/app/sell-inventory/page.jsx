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
import { date, number, object, string } from "yup";

const SellInventory = () => {
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
  const ownerData = [
    {
      value: "Zeshan",
      text: "Zeshan",
    },
    {
      value: "Aqib",
      text: "Aqib",
    },
    {
      value: "Talha",
      text: "Talha",
    },
  ];

  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  const initialValues = {
    inventoryType: "",
    floor: "",
    flatShopOfficeNo: "",
    owner: "",
    purchaseDate: "",
  };

  const clickHandler = (values) => {
    console.log(values);
  };

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
            owner: string().required("Owner is required!"),
            purchaseDate: date().required("Purchase Date is required!"),
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
                  <FormControl id="owner" isRequired>
                    <Field
                      as={TextField}
                      data={ownerData}
                      placeHolder={"Select Owner"}
                      name={"owner"}
                      label={"Owner"}
                      isInvalid={
                        Boolean(errors.owner) && Boolean(touched.owner)
                      }
                      onBlur={handleBlur}
                      onChange={handleChange("owner")}
                    />
                    <FormHelperText color="red">
                      {Boolean(touched.owner) && errors.owner}
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
