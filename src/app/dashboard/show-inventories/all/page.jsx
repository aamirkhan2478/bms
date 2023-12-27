"use client";
import AlertDialog from "@/components/AlertDialog";
import CustomBox from "@/components/CustomBox";
import DataTable from "@/components/DataTable";
import Layout from "@/components/Layout";
import { useShowInventories } from "@/hooks/useInventory";
import dateFormat from "@/utils/dateFormat";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
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

  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.400");

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
      render: (item) => (
        <Flex gap={2} alignItems={"center"}>
          <IconButton
            icon={<MdRemoveRedEye />}
            colorScheme="blue"
            variant={"ghost"}
            size={"sm"}
            onClick={() =>
              router.push(`/dashboard/show-inventories/${item._id}`)
            }
          />
          <IconButton
            icon={<MdEdit />}
            colorScheme="cyan"
            variant={"ghost"}
            size={"sm"}
            onClick={() =>
              router.push(`/dashboard/show-inventories/${item._id}/edit`)
            }
          />
          <IconButton
            icon={<MdDelete />}
            colorScheme="red"
            variant={"ghost"}
            size={"sm"}
            onClick={() => openDialog()}
          />
        </Flex>
      ),
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
      <Heading>Show Inventory List</Heading>
      <Breadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            Show Inventories
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={mainText}
            onClick={() => router.push("/dashboard/add-inventory")}
          >
            Add Inventory
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <CustomBox>
        <DataTable
          data={data?.data?.data?.inventories}
          totalInventory={data?.data?.data?.totalInventory}
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
