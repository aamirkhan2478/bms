"use client";
import Layout from "@/components/Layout";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useShowTenant, useUpdateImage } from "@/hooks/useTenant";
import appendArrayField from "@/utils/appendArrayField";
import { useQueryClient } from "react-query";
import ShowOwnerTenant from "@/components/ShowOwnerTenant";
import { useEffect } from "react";


const ShowTenant = () => {
  const { id } = useParams();
  const { data, isLoading } = useShowTenant(id);
  const toast = useToast();
  const clientQuery = useQueryClient();
  const { mutate, isLoading: imageUpdating } = useUpdateImage(
    onSuccess,
    onError,
    id
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModel,
    onOpen: openModel,
    onClose: closeModel,
  } = useDisclosure();

  useEffect(() => {
    const setTitle = () => {
      document.title = `Show Tenant - ${data?.data?.data?.tenant?.name}`;
    };

    setTitle();

    return () => setTitle();
  }, [data?.data?.data?.tenant]);

  const tenant = data?.data?.data?.tenant;

  const submitHandler = (values) => {
    const formData = new FormData();
    appendArrayField(values?.images, "images", formData);
    mutate(formData);
  };

  function onSuccess(data) {
    clientQuery.invalidateQueries("show-tenant");
    toast({
      title: data?.data?.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  function onError(error) {
    toast({
      title: error?.response?.data?.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <Layout>
      <ShowOwnerTenant
        isOpen={isOpen}
        onClose={onClose}
        data={tenant}
        isOpenModel={isOpenModel}
        openModel={openModel}
        closeModel={closeModel}
        submitHandler={submitHandler}
        isLoading={isLoading}
        imageUpdating={imageUpdating}
        name={"Tenant"}
        onOpen={onOpen}
      />
    </Layout>
  );
};

export default ShowTenant;
