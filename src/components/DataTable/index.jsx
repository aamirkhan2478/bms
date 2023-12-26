// DataTable.js

import React, { useState } from "react";
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
  BiSort,
} from "react-icons/bi";
import TextField from "../TextField";
import { useRouter, useSearchParams } from "next/navigation";

const DataTable = ({ data, headers, isLoading }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  //   const [itemsPerPage, setItemsPerPage] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const currentPage = parseInt(searchParams.get("currentPage")) || 1;
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || 5;

  // Filter data based on search term
  const filteredData = data?.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Function to sort data based on sortConfig
  const sortData = (dataToSort) => {
    if (sortConfig.key) {
      return [...dataToSort].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          // Numeric comparison
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        } else {
          // String comparison
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
      });
    }

    return dataToSort;
  };

  // Sort data based on the selected column and order
  const sortedData = sortData(filteredData);

  // Paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    router.push(
      `?currentPage=${pageNumber}&searchTerm=${searchTerm}&itemsPerPage=${itemsPerPage}`
    );
  };

  // Function to handle column sorting
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  return (
    <Stack spacing={4}>
      <Flex justifyContent={"flex-end"}>
        <TextField
          fieldType={"group"}
          placeHolder={"Search"}
          value={searchTerm}
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
          onChange={(e) => {
            router.push(
              `?searchTerm=${
                e.target.value
              }&currentPage=${1}&itemsPerPage=${itemsPerPage}`
            );
          }}
        />
      </Flex>
      {isLoading ? (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Spinner color="teal" />
        </Flex>
      ) : (
        <>
          <Box overflowX="auto">
            <Table variant="striped">
              <Thead>
                <Tr>
                  {headers?.map((header) => (
                    <>
                      <Th
                        key={header.key}
                        onClick={() => handleSort(header.key)}
                        cursor="pointer"
                        _hover={{ color: "blue.500" }}
                      >
                        <Box display={"flex"}>
                          {header.name}
                          {sortConfig.key === header.key && (
                            <BiSort
                              style={{
                                marginLeft: "0.5em",
                                color: "gray.300",
                                fontSize: "1em",
                              }}
                            />
                          )}
                        </Box>
                      </Th>
                    </>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {currentItems?.map((item) => (
                  <Tr key={item._id}>
                    {headers?.map((header) => (
                      <Td key={header.key}>
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
                router.push(
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
                sortedData?.length / itemsPerPage
              )}`}</Text>
              <IconButton
                icon={<BiArrowFromLeft />}
                onClick={() => paginate(currentPage + 1)}
                isDisabled={
                  currentPage === Math.ceil(sortedData?.length / itemsPerPage)
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
