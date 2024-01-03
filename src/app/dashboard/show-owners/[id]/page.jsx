"use client";
import Layout from "@/components/Layout";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useShowOwner, useUpdateImage } from "@/hooks/useOwner";
import appendArrayField from "@/utils/appendArrayField";
import { QueryClient } from "react-query";
import ShowOwnerTenant from "@/components/ShowOwnerTenant";
import { useEffect } from "react";

const ShowOwner = () => {
  const { id } = useParams();
  const { data, isLoading} = useShowOwner(id);
  const toast = useToast();
  const clientQuery = new QueryClient();
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
      document.title = `Show Owner - ${data?.data?.data?.owner?.name}`;
    };

    setTitle();

    return () => setTitle();
  }, [data?.data?.data?.owner]);

  const owner = data?.data?.data?.owner;

  const submitHandler = (values) => {
    const formData = new FormData();
    appendArrayField(values?.images, "images", formData);
    mutate(formData);
  };

  function onSuccess(data) {
    clientQuery.invalidateQueries("show-owner");
    toast({
      title: data?.data?.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
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
        data={owner}
        isOpenModel={isOpenModel}
        openModel={openModel}
        closeModel={closeModel}
        submitHandler={submitHandler}
        isLoading={isLoading}
        imageUpdating={imageUpdating}
        name={"Owner"}
        onOpen={onOpen}
      />
    </Layout>
  );
};

export default ShowOwner;
