"use client";
import Breadcrumb from "@/components/Breadcrumb";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import { useShowInventory, useUpdateInventory } from "@/hooks/useInventory";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { Form as FormikForm, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { object, string } from "yup";

const UpdateInventory = () => {
  const { id } = useParams();
  const { mutate, isLoading } = useUpdateInventory(onSuccess, onError, id);
  const { data: showInventory } = useShowInventory(id);
  const clientQuery = useQueryClient();
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    const setTitle = () => {
      document.title = `Update Inventory - ${showInventory?.data?.data?.inventory?.inventoryType}-${showInventory?.data?.data?.inventory?.floor}${showInventory?.data?.data?.inventory?.flatNo}`;
    };

    setTitle();

    return () => setTitle();
  }, [showInventory?.data?.data?.inventory]);

  if (!showInventory || !showInventory.data || !showInventory.data.data) {
    return (
      <Layout>
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Spinner colorScheme="teal" />
        </Flex>
      </Layout>
    );
  }

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

  const { inventory } = showInventory.data.data;
  const initialValues = {
    inventoryType:
      {
        value: inventory?.inventoryType,
        label: inventory?.inventoryType,
      } || {},
    floor: inventory?.floor || "",
    flatNo: inventory?.flatNo || "",
  };

  const clickHandler = (values) => {
    const convertedValues = {
      ...values,
      inventoryType: values.inventoryType.value,
    };
    mutate(convertedValues, {
      onSuccess: () => {
        clientQuery.invalidateQueries("show-inventory");
      },
    });
  };

  function onSuccess(data) {
    router.push("/dashboard/show-inventories/all");
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
        firstLink={"Update Inventory"}
        secondLink={"Show Inventories"}
        heading={"Update Inventory"}
        path={"/dashboard/show-inventories/all"}
      />
      <CustomBox heading={"Update Inventory"} maxWidth={800}>
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
                text={"Update Inventory"}
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

export default UpdateInventory;
