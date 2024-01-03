"use client";
import { Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ icon, children, path, ...rest }) => {
  const pathname = usePathname();
  return (
    <Link href={path} legacyBehavior>
      <a style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          my="1"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={pathname === path ? "teal.300" : ""}
          color={pathname === path ? "white" : ""}
          _hover={{
            bg: "teal.300",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </a>
    </Link>
  );
};

export default NavItem;
