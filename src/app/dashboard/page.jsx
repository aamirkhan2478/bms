"use client";
import Layout from "@/components/Layout";
import SmallCard from "@/components/SmallCard";
import {
  useColorModeValue,
  SimpleGrid,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  MdApartment,
  MdAssignment,
  MdAssignmentAdd,
  MdAssignmentLate,
  MdCalendarMonth,
  MdChecklist,
  MdPayments,
  MdReceipt,
  MdWarning,
} from "react-icons/md";
import { useEffect } from "react";
import { BiIdCard } from "react-icons/bi";
import { IoMdCash } from "react-icons/io";
import Breadcrumb from "@/components/Breadcrumb";
import {
  useInventoryOpenForSell,
  useVacantInventories,
} from "@/hooks/useInventory";
import { useOwnerExpiredCnic } from "@/hooks/useOwner";
import { useTenantExpiredCnic } from "@/hooks/useTenant";
import { useExpireContracts } from "@/hooks/useContract";

const Dashboard = () => {
  const { data: openForSell, isLoading: openForSellLoading } =
    useInventoryOpenForSell();
  const { data: vacatedInventories, isLoading: vacatedInventoriesLoading } =
    useVacantInventories();
  const { data: ownerExpiredCnic, isLoading: ownerExpiredCnicLoading } =
    useOwnerExpiredCnic();
  const { data: tenantExpiredCnic, isLoading: tenantExpiredCnicLoading } =
    useTenantExpiredCnic();
  const { data: expireContracts, isLoading: expireContractsLoading } =
    useExpireContracts();

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const totalOpenForSellInventoriesCount =
    openForSell?.data?.data?.totalInventories;
  const totalOfficeVacantInventoriesCount =
    vacatedInventories?.data?.data?.vacantOfficeInventoriesCount;
  const totalShopVacantInventoriesCount =
    vacatedInventories?.data?.data?.vacantShopInventoriesCount;
  const totalFlatVacantInventoriesCount =
    vacatedInventories?.data?.data?.vacantFlatInventoriesCount;
  const ownerExpiredCnicCount = ownerExpiredCnic?.data?.data?.expiredCnicCount;
  const tenantExpiredCnicCount =
    tenantExpiredCnic?.data?.data?.expiredCnicCount;
  const expiringContractsCount =
    expireContracts?.data?.data?.expiringContractsCount;
  const expiredContractsCount =
    expireContracts?.data?.data?.expiredContractsCount;

  const items = [
    {
      title: "Contract Expiring",
      amount: expiringContractsCount,
      icon: <MdCalendarMonth color="white" size={25} />,
      isLoading: expireContractsLoading,
    },
    {
      title: "Expired Contract",
      amount: expiredContractsCount,
      icon: <MdAssignmentLate color="white" size={25} />,
      isLoading: expireContractsLoading,
    },
    // {
    //   title: "Contract to be renewed",
    //   amount: 1,
    //   icon: <MdAssignment color="white" size={25} />,
    // },
    {
      title: "Inventory Open for sell",
      amount: totalOpenForSellInventoriesCount,
      icon: <MdChecklist color="white" size={25} />,
      isLoading: openForSellLoading,
    },
    {
      title: "Vacant Flats | Shops | Offices",
      amount: `${totalFlatVacantInventoriesCount} | ${totalShopVacantInventoriesCount} | ${totalOfficeVacantInventoriesCount}`,
      icon: <MdApartment color="white" size={25} />,
      isLoading: vacatedInventoriesLoading,
    },
    // {
    //   title: "Pending Invoices",
    //   amount: currencyFormat(215000),
    //   icon: <MdReceipt color="white" size={25} />,
    // },
    // {
    //   title: "Pending Payouts",
    //   amount: currencyFormat(215000),
    //   icon: <MdPayments color="white" size={25} />,
    // },
    {
      title: "Owner CNIC Expired",
      amount: ownerExpiredCnicCount,
      icon: <BiIdCard color="white" size={25} />,
      isLoading: ownerExpiredCnicLoading,
    },
    {
      title: "Tenant CNIC Expired",
      amount: tenantExpiredCnicCount,
      icon: <BiIdCard color="white" size={25} />,
      isLoading: tenantExpiredCnicLoading,
    },
    // {
    //   title: "Contract Copy To Uploaded",
    //   amount: 1,
    //   icon: <MdAssignmentAdd color="white" size={25} />,
    // },
    // {
    //   title: "Over Due pending Invoices",
    //   amount: 1,
    //   icon: <IoMdCash color="white" size={25} />,
    // },
  ];

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <Layout>
      <Breadcrumb
        firstLink={"Dashboard"}
        secondLink={"Add Inventory"}
        heading={"Dashboard"}
        path={"/dashboard/add-inventory"}
      />
      <Flex
        bg={useColorModeValue("white", "#2D3748")}
        alignItems={"center"}
        h={"50px"}
        justifyContent={"space-between"}
        mt={"10px"}
        shadow={"lg"}
      >
        <Text ml={"10px"} fontSize={"1rem"} color="#F18805">
          Notifications
        </Text>
        <Box mr={"10px"}>
          <MdWarning color="#F18805" size={35} />
        </Box>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="15px" mt={"20px"}>
        {items.map(({ title, amount, icon, isLoading }, index) => (
          <SmallCard
            key={index}
            title={title}
            amount={amount}
            icon={icon}
            isLoading={isLoading}
          />
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Dashboard;
