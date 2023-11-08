"use client";
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "../Sidebar/SidebarContent";
import { FiChevronDown, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import Image from "next/image";
import logo from "@/../public/bms_logo.png";

const Navbar = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "dark")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "dark")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      shadow={"lg"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box
        as={Image}
        src={logo}
        h={100}
        w={100}
        display={{ base: "flex", md: "none" }}
        filter={useColorModeValue("", "saturate(10)")}
      />
      <HStack>
        <IconButton
          onClick={toggleColorMode}
          variant="solid"
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          rounded="full"
        />
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    backgroundColor={useColorModeValue("gray.500", "gray.700")}
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">User Name</Text>
                    
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </HStack>
    </Flex>
  );
};
const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Navbar */}
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
