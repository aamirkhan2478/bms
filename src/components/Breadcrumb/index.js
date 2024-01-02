"use client";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb as ChakraBreadcrumb,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Breadcrumb = ({ heading, firstLink, secondLink, path }) => {
  let mainText = useColorModeValue("gray.700", "gray.200");
  let secondaryText = useColorModeValue("gray.400", "gray.400");
  const router = useRouter();
  return (
    <>
      <Heading>{heading}</Heading>
      <ChakraBreadcrumb>
        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={secondaryText}
            textDecoration={"none"}
          >
            {firstLink}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem color={mainText}>
          <BreadcrumbLink
            href="#"
            color={mainText}
            onClick={() => router.push(path)}
          >
            {secondLink}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </ChakraBreadcrumb>
    </>
  );
};

export default Breadcrumb;
