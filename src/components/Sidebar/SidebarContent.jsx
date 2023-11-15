import { Box, CloseButton, Flex, useColorModeValue } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { FiTrendingUp, FiCompass, FiStar } from "react-icons/fi";
import { MdDashboard, MdSell } from "react-icons/md";
import Image from "next/image";
import logo from "@/../public/bms_logo.png";

const SidebarContent = ({ onClose, ...rest }) => {
  const LinkItems = [
    { name: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    { name: "Add Inventory", icon: FiTrendingUp, path: "/add-inventory" },
    { name: "Add Owner", icon: FiCompass, path: "/add-owner" },
    { name: "Add Tenant", icon: FiStar, path: "/add-tenant" },
    { name: "Sell Inventory", icon: MdSell, path: "/sell-inventory" },
  ];
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "dark")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "dark")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY={"auto"}
      scrollBehavior={"smooth"}
      shadow={"lg"}
      borderBottomRightRadius={"3xl"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box
          as={Image}
          src={logo}
          h={150}
          w={150}
          filter={useColorModeValue("", "saturate(10)")}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
