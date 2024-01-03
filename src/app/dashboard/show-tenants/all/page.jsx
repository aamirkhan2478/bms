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
import { useShowTenant, useShowTenants, useUpdateImage } from "@/hooks/useTenant";
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

const ShowTenants = () => {
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
  const { data, isLoading } = useShowTenants(
    searchTerm,
    itemsPerPage,
    currentPage
  );

  const tenantId = searchParams.get("tenantId") || "";
  const { data: showTenant, isLoading: tenantLoading } = useShowTenant(tenantId);
  const { mutate, isLoading: tenantUpdating } = useUpdateImage(
    onSuccess,
    onError,
    tenantId
  );

  const openModalHandler = (id) => {
    if (id) {
      router.push(`/dashboard/show-tenants/all?tenantId=${id}`);
    }
  };

  const closeModalHandler = () => {
    if (tenantId) {
      router.push(`/dashboard/show-tenants/all`);
    }
    onCloseModal();
  };

  const updateHandler = (values) => {
    const formData = new FormData();
    appendArrayField(values?.images, "images", formData);
    mutate(formData);
  };

  function onSuccess(data) {
    clientQuery.invalidateQueries("show-tenant");
    toast({
      title: data?.data?.message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    if (tenantId) {
      router.push(`/dashboard/show-tenants/all`);
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
      document.title = "Show Tenants";
    };
    setTitle();

    return () => setTitle();
  }, []);

  const openModalWithData = useCallback(() => {
    if (showTenant?.data?.data?.tenant?.images)
      openModalDialog({
        onClose: () => {
          router.push(`/dashboard/show-tenants/all`);
        },
      });
  }, [showTenant?.data?.data?.tenant?.images, tenantId]);

  useEffect(() => {
    openModalWithData();
  }, [openModalWithData]);

  const initialValues = {
    images: showTenant?.data?.data?.tenant?.images || [],
  };

  const iconData = [
    {
      icon: <MdRemoveRedEye />,
      colorScheme: "blue",
      variant: "ghost",
      size: "sm",
      onClick: (item) => router.push(`/dashboard/show-tenants/${item._id}`),
    },
    {
      icon: <MdEdit />,
      colorScheme: "cyan",
      variant: "ghost",
      size: "sm",
      onClick: (item) =>
        router.push(`/dashboard/show-tenants/${item._id}/update`),
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
        dialogBody={"Are you sure you want Delete this Tenant?"}
        dialogHeader={"Delete Inventory"}
        onClose={onClose}
      />
      <Breadcrumb
        heading={"Show Tenants List"}
        firstLink={"Show Tenants"}
        secondLink={"Add Tenant"}
        path={"/dashboard/add-tenant"}
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
                {tenantLoading ? (
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
                          isLoading={tenantUpdating}
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
          data={data?.data?.data?.tenants}
          total={data?.data?.data?.totalTenants}
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

export default ShowTenants;
