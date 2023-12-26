"use client";
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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";

const ShowInventories = () => {
  const router = useRouter();
  const { data, isLoading } = useShowInventories();
  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.400");

  const headers = [
    { name: "Inventory Type", key: "inventoryType" },
    {
      name: "Flat(s)/Shop(s)/Office(s) No.",
      key: "floor",
      mergeWith: "flatNo",
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
              router.push(`/dashboard/show-inventories/${item._id}`)
            }
          />
          <IconButton
            icon={<MdDelete />}
            colorScheme="red"
            variant={"ghost"}
            size={"sm"}
            onClick={() =>
              router.push(`/dashboard/show-inventories/${item._id}`)
            }
          />
        </Flex>
      ),
    },
  ];
  return (
    <Layout>
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
          headers={headers}
          isLoading={isLoading}
        />
      </CustomBox>
    </Layout>
  );
};

export default ShowInventories;
