import { Box, CloseButton, Flex, useColorModeValue } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { IoMdPersonAdd } from "react-icons/io";
import { BsBuildingFillAdd, BsPersonFillAdd, BsSpeedometer } from "react-icons/bs";
import { MdAssignment, MdDashboard, MdOutlineElectricMeter, MdSell } from "react-icons/md";
import { FaMeteor } from "react-icons/fa";
import Image from "next/image";
import logo from "@/../public/bms_logo.png";

const SidebarContent = ({ onClose, ...rest }) => {
  const LinkItems = [
    { name: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    { name: "Add Inventory", icon: BsBuildingFillAdd, path: "/add-inventory" },
    {
      name: "Add Wapda Submeter",
      icon: BsSpeedometer,
      path: "/add-wapda-submeter",
    },
    {
      name: "Add Generator Submeter",
      icon: MdOutlineElectricMeter,
      path: "/add-generator-submeter",
    },
    {
      name: "Add Water Submeter",
      icon: FaMeteor,
      path: "/add-water-submeter",
    },
    { name: "Add Owner", icon: IoMdPersonAdd, path: "/add-owner" },
    { name: "Add Tenant", icon: BsPersonFillAdd, path: "/add-tenant" },
    { name: "Sell Inventory", icon: MdSell, path: "/sell-inventory" },
    { name: "Add Contract", icon: MdAssignment, path: "/add-contract" },
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
