"use client";
import Breadcrumb from "@/components/Breadcrumb";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import { useAddInventory } from "@/hooks/useInventory";
import { useToast } from "@chakra-ui/react";
import { Form as FormikForm, Formik } from "formik";
import { useEffect } from "react";
import { object, string } from "yup";

const AddInventory = () => {
  const data = [
    {
      value: "Flat",
      label: "Flat",
    },
    {
      value: "Shop",
      label: "Shop",
    },
    {
      value: "Office",
      label: "Office",
    },
  ];

  const formFields = [
    {
      id: "inventory",
      name: "inventoryType",
      isRequired: true,
      label: "Inventory Type",
      flexBasis: "100%",
      selectChange: true,
      data,
    },
    {
      id: "floor-no",
      name: "floor",
      isRequired: true,
      label: "Floor No.",
      flexBasis: "100%",
      fieldType: "input",
      placeHolder: "Enter floor no.",
    },
    {
      id: "flat-no",
      name: "flatNo",
      isRequired: true,
      label: "Flat/Shop/Office No.",
      flexBasis: "100%",
      fieldType: "input",
      placeHolder: "Enter Flat/Shop/Office No.",
    },
  ];

  const { mutate, isLoading } = useAddInventory(onSuccess, onError);
  const toast = useToast();

  const initialValues = {
    inventoryType: "",
    floor: "",
    flatNo: "",
  };

  const clickHandler = (values, { resetForm }) => {
    const convertedValues = {
      ...values,
      inventoryType: values.inventoryType.value,
    };
    mutate(convertedValues, {
      onSuccess: () => {
        resetForm();
      },
    });
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
      <Breadcrumb
        firstLink={"Add Inventory"}
        secondLink={"Show Inventories"}
        heading={"Add Inventory"}
        path={"/dashboard/show-inventories/all"}
      />
      <CustomBox heading={"Add Inventory"} maxWidth={800}>
        <Formik
          initialValues={initialValues}
          onSubmit={clickHandler}
          validationSchema={object({
            inventoryType: object().required("Inventory type is required!"),
            floor: string().required("Floor number is required!"),
            flatNo: string()
              .matches(
                /^([0-9]{2,})$/gm,
                "The flat/shop/office number should be positive and greater then 2 digits!"
              )
              .required("The flat/shop/office number is required!"),
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
            <FormikForm>
              <Form
                errors={errors}
                formFields={formFields}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                touched={touched}
              />
              <CustomButton
                text={"Add Inventory"}
                w={"20%"}
                alignSelf={"start"}
                type="submit"
                isDisabled={!isValid || !dirty}
                isLoading={isLoading}
              />
            </FormikForm>
          )}
        </Formik>
      </CustomBox>
    </Layout>
  );
};

export default AddInventory;
