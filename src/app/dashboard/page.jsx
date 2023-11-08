"use client";
import Layout from "@/components/Layout";
import SmallCard from "@/components/SmallCard";
import {
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  SimpleGrid,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  MdCalendarMonth,
  MdCalendarToday,
  MdChecklist,
  MdPayments,
  MdReceipt,
  MdWallet,
  MdWarning,
} from "react-icons/md";
import { useEffect } from "react";

const Dashboard = () => {
  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.200");

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const items = [
    {
      title: "Contract Expiring",
      amount: 8,
      icon: <MdCalendarMonth color="white" size={25} />,
    },
    {
      title: "Canceled Contract",
      amount: 8,
      icon: <MdCalendarToday color="white" size={25} />,
    },
    {
      title: "Flat Open for sell",
      amount: 8,
      icon: <MdChecklist color="white" size={25} />,
    },
    {
      title: "Pending Invoices",
      amount: currencyFormat(215000),
      icon: <MdReceipt color="white" size={25} />,
    },
    {
      title: "Pending Payouts",
      amount: currencyFormat(215000),
      icon: <MdPayments color="white" size={25} />,
    },
    {
      title: "Agent Balance",
      amount: currencyFormat(215000),
      icon: <MdWallet color="white" size={25} />,
    },
  ];

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <Layout>
      <Heading>Dashboard</Heading>
      <Breadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink href="#" color={mainText}>
            Add Inventory
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
        {items.map((item) => (
          <>
            <SmallCard
              key={item.title}
              title={item.title}
              amount={item.amount}
              icon={item.icon}
            />
          </>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Dashboard;
