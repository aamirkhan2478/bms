"use client";
import Breadcrumb from "@/components/Breadcrumb";
import CustomBox from "@/components/CustomBox";
import CustomButton from "@/components/CustomButton";
import DataTable from "@/components/DataTable";
import Layout from "@/components/Layout";
import MenuBar from "@/components/MenuBar";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import {
  useShowInventory,
  useSoldInventories,
  useUpdateStatus,
} from "@/hooks/useInventory";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import dateFormat from "@/utils/dateFormat";
import {
  ListItem,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { MdMenu, MdRemoveRedEye, MdUpdate } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "react-query";
const SoldInventories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const clientQuery = useQueryClient();
  const searchTerm = searchParams.get("searchTerm") || "";
  const currentPage = parseInt(searchParams.get("currentPage")) || 1;
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || 5;
  const inventoryId = searchParams.get("inventoryId") || "";
  const { data: inventory } = useShowInventory(inventoryId);
  const { mutate, isLoading: updateStatusLoading } = useUpdateStatus(
    onSuccess,
    onError,
    inventoryId
  );
  const { data, isLoading } = useSoldInventories(
    searchTerm,
    itemsPerPage,
    currentPage
  );

  const menuItems = [
    {
      name: "Update Status",
      icon: <MdUpdate />,
      onClick: (item) => openModalHandler(item._id),
    },
    {
      name: "View Inventory",
      icon: <MdRemoveRedEye />,
      onClick: (item) => router.push(`/dashboard/show-inventories/${item._id}`),
    },
  ];
  const headers = [
    { name: "Inventory Type", key: "inventoryType" },
    {
      name: "Floor",
      key: "floor",
    },
    {
      name: "Flat(s)/Shop(s)/Office(s) No.",
      key: "flatNo",
    },
    {
      name: "Owners",
      render: (item) => (
        <UnorderedList>
          {item?.ownerInventory?.map((owner) => (
            <ListItem key={owner.ownerId}>{owner.ownerName}</ListItem>
          ))}
        </UnorderedList>
      ),
    },
    {
      name: "Purchase Date",
      render: (item) => (
        <UnorderedList>
          {item?.ownerInventory?.map((owner) => (
            <ListItem key={owner.ownerId}>
              {dateFormat(owner.purchaseDate)}
            </ListItem>
          ))}
        </UnorderedList>
      ),
    },
    { name: "Created By", key: "createdBy" },
    {
      name: "Created At",
      render: (item) => dateFormat(item.createdAt),
    },
    {
      name: "Actions",
      render: (item) => (
        <MenuBar
          data={menuItems}
          buttonIcon={<MdMenu />}
          variant={"ghost"}
          _hover={{ bgColor: "blue.200", color: "white" }}
          item={item}
        />
      ),
    },
  ];

  const statuses = [
    { label: "Sold", value: "sold" },
    { label: "For Sell", value: "for sell" },
    { label: "Vacant", value: "vacant" },
  ];

  const openModalHandler = (id) => {
    if (id) {
      router.push(`/dashboard/sold-inventories/all?inventoryId=${id}`);
    }
  };

  const closeModalHandler = () => {
    if (inventoryId) {
      router.push(`/dashboard/sold-inventories/all`);
    }
    onClose();
  };

  const handleChange = (value, setFieldValue) => {
    setFieldValue("status", value);
  };

  const submitHandler = (values) => {
    const status = values.status.value;
    const data = { status };
    mutate(data, {
      onSuccess: () => {
        closeModalHandler();
      },
    });
  };

  function onSuccess(data) {
    clientQuery.invalidateQueries("sold-inventories");
    toast({
      title: "Congratulation!",
      description: data?.data?.message,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  function onError(error) {
    toast({
      title: "An error occurred.",
      description: error?.response?.data?.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  useEffect(() => {
    const setTitle = () => {
      document.title = "Sold Inventories";
    };
    setTitle();

    return () => setTitle();
  }, []);

  const openModalWithData = useCallback(() => {
    if (inventory?.data?.data?.inventory?.status)
      onOpen({
        onClose: () => {
          router.push(`/dashboard/sold-inventories/all`);
        },
      });
  }, [inventory?.data?.data?.inventory?.status, inventoryId]);

  useEffect(() => {
    openModalWithData();
  }, [openModalWithData]);
  return (
    <Layout>
      <Modal
        header={"Update Status"}
        isOpen={isOpen}
        onClose={closeModalHandler}
        body={
          <Formik
            initialValues={{
              status: {
                value: inventory?.data?.data?.inventory?.status,
                label: capitalizeFirstLetter(
                  inventory?.data?.data?.inventory?.status
                ),
              },
            }}
            onSubmit={submitHandler}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <TextField
                  name="status"
                  data={statuses}
                  value={values.status}
                  onChange={(value) => handleChange(value, setFieldValue)}
                />
                <CustomButton
                  text={"Update Status"}
                  type="submit"
                  isLoading={updateStatusLoading}
                />
              </Form>
            )}
          </Formik>
        }
      />
      <Breadcrumb
        firstLink={"Sold Inventories"}
        secondLink={"Sell Inventory"}
        heading={"Sold Inventories"}
        path={"/dashboard/sell-inventory"}
      />
      <CustomBox>
        <DataTable
          data={data?.data?.data?.showSoldInventories}
          total={data?.data?.data?.totalSoldInventory}
          isLoading={isLoading}
          headers={headers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          searchTerm={searchParams}
        />
      </CustomBox>
    </Layout>
  );
};

export default SoldInventories;
