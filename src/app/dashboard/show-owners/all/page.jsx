"use client";
import AlertDialog from "@/components/AlertDialog";
import Breadcrumb from "@/components/Breadcrumb";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import DataTable from "@/components/DataTable";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { ImageUploadForm } from "@/components/OwnerAndTenantForms";
import TableIconButton from "@/components/TableIconButton";
import { useShowOwner, useShowOwners, useUpdateImage } from "@/hooks/useOwner";
import appendArrayField from "@/utils/appendArrayField";
import dateFormat from "@/utils/dateFormat";
import {
  Divider,
  ListItem,
  Spinner,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { MdDelete, MdEdit, MdImage, MdRemoveRedEye } from "react-icons/md";
import { useQueryClient } from "react-query";

const ShowOwners = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen: openDialog, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: openModalDialog,
    onClose: onCloseModal,
  } = useDisclosure();
  const cancelRef = useRef();
  const searchTerm = searchParams.get("searchTerm") || "";
  const currentPage = parseInt(searchParams.get("currentPage")) || 1;
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || 5;
  const toast = useToast();
  const clientQuery = useQueryClient();
  const { data, isLoading } = useShowOwners(
    searchTerm,
    itemsPerPage,
    currentPage
  );

  const ownerId = searchParams.get("ownerId") || "";
  const { data: showOwner, isLoading: ownerLoading } = useShowOwner(ownerId);
  const { mutate, isLoading: ownerUpdating } = useUpdateImage(
    onSuccess,
    onError,
    ownerId
  );

  const openModalHandler = (id) => {
    if (id) {
      router.push(`/dashboard/show-owners/all?ownerId=${id}`);
    }
  };

  const closeModalHandler = () => {
    if (ownerId) {
      router.push(`/dashboard/show-owners/all`);
    }
    onCloseModal();
  };

  const updateHandler = (values) => {
    const formData = new FormData();
    appendArrayField(values?.images, "images", formData);
    mutate(formData);
  };

  function onSuccess(data) {
    clientQuery.invalidateQueries("show-owner");
    toast({
      title: data?.data?.message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    if (ownerId) {
      router.push(`/dashboard/show-owners/all`);
    }
    onCloseModal();
  }

  function onError(error) {
    toast({
      title: error?.response?.data?.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  useEffect(() => {
    const setTitle = () => {
      document.title = "Show Owners";
    };
    setTitle();

    return () => setTitle();
  }, []);

  const openModalWithData = useCallback(() => {
    if (showOwner?.data?.data?.owner?.images)
      openModalDialog({
        onClose: () => {
          router.push(`/dashboard/show-owners/all`);
        },
      });
  }, [showOwner?.data?.data?.owner?.images, ownerId]);

  useEffect(() => {
    openModalWithData();
  }, [openModalWithData]);

  const initialValues = {
    images: showOwner?.data?.data?.owner?.images || [],
  };

  const iconData = [
    {
      icon: <MdRemoveRedEye />,
      colorScheme: "blue",
      variant: "ghost",
      size: "sm",
      onClick: (item) => router.push(`/dashboard/show-owners/${item._id}`),
    },
    {
      icon: <MdEdit />,
      colorScheme: "cyan",
      variant: "ghost",
      size: "sm",
      onClick: (item) =>
        router.push(`/dashboard/show-owners/${item._id}/update`),
    },
    // {
    //   icon: <MdDelete />,
    //   colorScheme: "red",
    //   variant: "ghost",
    //   size: "sm",
    //   onClick: () => openDialog(),
    // },
    {
      icon: <MdImage />,
      colorScheme: "purple",
      variant: "ghost",
      size: "sm",
      onClick: (item) => openModalHandler(item?._id),
    },
  ];
  const headers = [
    { name: "Name", key: "name" },
    {
      name: "Father/Husband Name",
      key: "father",
    },
    {
      name: "CNIC",
      key: "cnic",
    },
    {
      name: "Phone Number(s)",
      render: (item) => (
        <UnorderedList>
          {item?.phoneNumber?.map((phone, index) => (
            <ListItem key={index}>+{phone}</ListItem>
          ))}
        </UnorderedList>
      ),
    },
    {
      name: "whatsapp Number(s)",
      render: (item) => (
        <UnorderedList>
          {item?.whatsapp?.map((phone, index) => (
            <ListItem key={index}>+{phone}</ListItem>
          ))}
        </UnorderedList>
      ),
    },
    {
      name: "Created By",
      key: "createdBy",
    },
    {
      name: "Created At",
      render: (item) => dateFormat(item.createdAt),
    },
    {
      name: "Action",
      key: "action",
      render: (item) => <TableIconButton data={iconData} item={item} />,
    },
  ];
  return (
    <Layout>
      <AlertDialog
        isOpen={isOpen}
        cancelRef={cancelRef}
        confirmButtonText={"Yes, Delete"}
        dialogBody={"Are you sure you want Delete this Owner?"}
        dialogHeader={"Delete Inventory"}
        onClose={onClose}
      />
      <Breadcrumb
        heading={"Show Owners List"}
        firstLink={"Show Owners"}
        secondLink={"Add Owner"}
        path={"/dashboard/add-owner"}
      />
      <Modal
        isOpen={isOpenModal}
        onClose={closeModalHandler}
        header={"Update CNIC Images"}
        size={"xl"}
        body={
          <Formik initialValues={initialValues} onSubmit={updateHandler}>
            {({
              errors,
              touched,
              setFieldValue,
              handleBlur,
              values,
              handleSubmit,
            }) => (
              <>
                {ownerLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <ImageUploadForm
                      errors={errors}
                      handleBlur={handleBlur}
                      label={"CNIC Front and Back Images"}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      values={values}
                    />

                    {values?.images?.length > 0 && (
                      <>
                        <Divider my={6} borderColor={"teal.400"} />
                        <CustomButton
                          text={"Update"}
                          fontSize={20}
                          w={200}
                          variant={"outline"}
                          type={"submit"}
                          onClick={() => handleSubmit(values)}
                          isLoading={ownerUpdating}
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Formik>
        }
      />
      <CustomBox>
        <DataTable
          data={data?.data?.data?.owners}
          total={data?.data?.data?.totalOwners}
          headers={headers}
          isLoading={isLoading}
          searchTerm={searchTerm}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </CustomBox>
    </Layout>
  );
};

export default ShowOwners;
