import { Box, CloseButton, Flex, useColorModeValue } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { IoMdPerson, IoMdPersonAdd } from "react-icons/io";
import {
  BsBuildingFill,
  BsBuildingFillAdd,
  BsPersonFillAdd,
  BsSpeedometer,
} from "react-icons/bs";
import {
  MdAssignment,
  MdDashboard,
  MdOutlineElectricMeter,
  MdSell,
} from "react-icons/md";
import { FaMeteor } from "react-icons/fa";
import Image from "next/image";
import logo from "@/../public/bms_logo.png";

const SidebarContent = ({ onClose, ...rest }) => {
  const LinkItems = [
    { name: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    {
      name: "Add Inventory",
      icon: BsBuildingFillAdd,
      path: "/dashboard/add-inventory",
    },
    {
      name: "Show Inventories",
      icon: BsBuildingFill,
      path: "/dashboard/show-inventories/all",
    },
    // {
    //   name: "Add Wapda Submeter",
    //   icon: BsSpeedometer,
    //   path: "/dashboard/add-wapda-submeter",
    // },
    // {
    //   name: "Add Generator Submeter",
    //   icon: MdOutlineElectricMeter,
    //   path: "/dashboard/add-generator-submeter",
    // },
    // {
    //   name: "Add Water Submeter",
    //   icon: FaMeteor,
    //   path: "/dashboard/add-water-submeter",
    // },
    { name: "Add Owner", icon: IoMdPersonAdd, path: "/dashboard/add-owner" },
    {
      name: "Show Owners",
      icon: IoMdPerson,
      path: "/dashboard/show-owners/all",
    },
    {
      name: "Add Tenant",
      icon: BsPersonFillAdd,
      path: "/dashboard/add-tenant",
    },
    { name: "Sell Inventory", icon: MdSell, path: "/dashboard/sell-inventory" },
    {
      name: "Add Contract",
      icon: MdAssignment,
      path: "/dashboard/add-contract",
    },
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
          alt="logo"
          h={150}
          w={150}
          filter={useColorModeValue("", "saturate(10)")}
          priority={true}
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
