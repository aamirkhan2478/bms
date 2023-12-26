"use client";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  FormControl,
  FormHelperText,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";

const WaterSubmeter = () => {
  const data = [
    {
      value: "Flat-101",
      text: "Flat-101",
    },
    {
      value: "Shop-G-01",
      text: "Shop-G-01",
    },
    {
      value: "Office-B-01",
      text: "Office-B-01",
    },
  ];

  const initialValues = {
    flatShopsOffice: "",
    meterNumber: "",
    remarks: "",
  };

  useEffect(() => {
    document.title = "Add Water Submeter";
  }, []);

  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  return (
    <Layout>
      <Heading>Add Water Submeter</Heading>
      <Breadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            Add Water Submeter
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink href="#" color={mainText}>
            Add Inventory
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <CustomBox heading={"Add Water Submeter"} maxWidth={800}>
        <Formik initialValues={initialValues}>
          {({ errors, touched, values, handleBlur, handleChange }) => (
            <>
              <TextField
                data={data}
                name="flatShopsOffice"
                label={"Flat/Shop/Office"}
                placeHolder={"Select Flat/Shop/Office"}
              />
              <TextField
                fieldType={"input"}
                name="meterNumber"
                label={"Meter Number"}
                placeHolder={"Enter Meter Number "}
              />
              <FormControl id="remarks">
                <TextField
                  placeHolder="Enter Remarks"
                  fieldType={"textArea"}
                  label={"Remarks"}
                  name="remarks"
                  defaultValue={values.remarks}
                  onBlur={handleBlur}
                  onChange={handleChange("remarks")}
                  isInvalid={
                    Boolean(errors.remarks) && Boolean(touched.remarks)
                  }
                />
                <FormHelperText color="red">
                  {Boolean(touched.remarks) && errors.remarks}
                </FormHelperText>
              </FormControl>
              <CustomButton text={"Add Wapda Submeter"} alignSelf={"start"} />
            </>
          )}
        </Formik>
      </CustomBox>
    </Layout>
  );
};

export default WaterSubmeter;
