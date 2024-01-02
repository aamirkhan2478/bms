import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Stack,
  Text,
  Select,
  InputLeftElement,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import {
  BiSearch,
  BiArrowFromLeft,
  BiArrowFromRight,
} from "react-icons/bi";
import TextField from "../TextField";
import { usePathname, useRouter } from "next/navigation";

const DataTable = ({
  data,
  headers,
  isLoading,
  searchTerm,
  currentPage,
  itemsPerPage,
  total,
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Change page
  const paginate = (pageNumber) => {
    router.replace(
      `?currentPage=${pageNumber}&searchTerm=${searchTerm}&itemsPerPage=${itemsPerPage}`
    );
  };

  const handleSearchParams = useCallback(
    (debouncedValue) => {
      let params = new URLSearchParams(window.location.search);
      if (debouncedValue.length > 0) {
        params.set("searchTerm", debouncedValue);
      } else {
        params.delete("searchTerm");
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router]
  );

  // EFFECT: Set Initial Params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("searchTerm") ?? "";
    setInputValue(searchQuery);
  }, []);

  // EFFECT: Set Mounted
  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  // EFFECT: Debounce Input Value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  // EFFECT: Search Params
  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <Stack spacing={4}>
      <Flex justifyContent={"flex-end"}>
        <TextField
          fieldType={"group"}
          placeHolder={"Search"}
          value={inputValue}
          colorScheme={"teal"}
          leftElement={
            <InputLeftElement>
              <BiSearch
                style={{
                  color: "gray.300",
                  fontSize: "1.2em",
                  marginTop: "0.5em",
                }}
              />
            </InputLeftElement>
          }
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Flex>
      {isLoading || isPending ? (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Spinner color="teal" />
        </Flex>
      ) : (
        <>
          <Box overflowX="auto">
            <Table variant="striped">
              <Thead>
                <Tr>
                  {headers?.map((header, index) => (
                    <>
                      <Th key={index}>
                        <Box display={"flex"}>{header.name}</Box>
                      </Th>
                    </>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => (
                  <Tr key={item._id}>
                    {headers?.map((header, index) => (
                      <Td key={index}>
                        {item[header.key]}
                        {header.mergeWith && item[header.mergeWith]}
                        {header.render && header.render(item)}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Flex
            justifyContent={{ base: "normal", sm: "space-between" }}
            alignItems={{ base: "normal", sm: "center" }}
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 3, sm: 0 }}
          >
            <Select
              value={itemsPerPage}
              onChange={(e) => {
                router.replace(
                  `?currentPage=${1}&searchTerm=${searchTerm}&itemsPerPage=${
                    e.target.value
                  }`
                );
              }}
              w={"auto"}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
            </Select>
            <Flex gap={3} justifyContent={"center"} alignItems={"center"}>
              <IconButton
                onClick={() => paginate(currentPage - 1)}
                icon={<BiArrowFromRight />}
                isDisabled={currentPage === 1}
              />
              <Text>{`Page ${currentPage} of ${Math.ceil(
                total / itemsPerPage
              )}`}</Text>
              <IconButton
                icon={<BiArrowFromLeft />}
                onClick={() => paginate(currentPage + 1)}
                isDisabled={
                  currentPage === Math.ceil(total / itemsPerPage)
                }
              />
            </Flex>
          </Flex>
        </>
      )}
    </Stack>
  );
};

export default DataTable;
