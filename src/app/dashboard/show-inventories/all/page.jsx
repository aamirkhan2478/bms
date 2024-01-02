"use client";
import AlertDialog from "@/components/AlertDialog";
import Breadcrumb from "@/components/Breadcrumb";
import CustomBox from "@/components/CustomBox";
import DataTable from "@/components/DataTable";
import Layout from "@/components/Layout";
import TableIconButton from "@/components/TableIconButton";
import { useShowInventories } from "@/hooks/useInventory";
import dateFormat from "@/utils/dateFormat";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";

const ShowInventories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen: openDialog, onClose } = useDisclosure();
  const cancelRef = useRef();
  const searchTerm = searchParams.get("searchTerm") || "";
  const currentPage = parseInt(searchParams.get("currentPage")) || 1;
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || 5;

  const { data, isLoading } = useShowInventories(
    searchTerm,
    itemsPerPage,
    currentPage
  );

  const iconData = [
    {
      icon: <MdRemoveRedEye />,
      colorScheme: "blue",
      variant: "ghost",
      size: "sm",
      onClick: (item) => router.push(`/dashboard/show-inventories/${item._id}`),
    },
    {
      icon: <MdEdit />,
      colorScheme: "cyan",
      variant: "ghost",
      size: "sm",
      onClick: (item) =>
        router.push(`/dashboard/show-inventories/${item._id}/edit`),
    },
    {
      icon: <MdDelete />,
      colorScheme: "red",
      variant: "ghost",
      size: "sm",
      onClick: () => openDialog(),
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
    { name: "Created By", key: "createdBy" },
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
        dialogBody={"Are you sure you want Delete this Inventory?"}
        dialogHeader={"Delete Inventory"}
        onClose={onClose}
      />
      <Breadcrumb
        heading={"Show Inventory List"}
        firstLink={"Show Inventories"}
        secondLink={"Add Inventory"}
        path={"/dashboard/add-inventory"}
      />
      <CustomBox>
        <DataTable
          data={data?.data?.data?.inventories}
          total={data?.data?.data?.totalInventory}
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

export default ShowInventories;
