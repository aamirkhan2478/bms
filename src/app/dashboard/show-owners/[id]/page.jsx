"use client";
import CustomBox from "@/components/CustomBox";
import Layout from "@/components/Layout";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { BiBuilding, BiBuildings, BiCalendar, BiIdCard } from "react-icons/bi";
import Image from "next/image";
import ownerLogo from "@/../public/owner-logo.png";
import {
  MdAccountBalanceWallet,
  MdContactPhone,
  MdFeedback,
  MdInfo,
  MdWork,
} from "react-icons/md";
import Accordion from "@/components/Accordion";
import { useShowOwner, useUpdateImage } from "@/hooks/useOwner";
import Modal from "@/components/Modal";
import { ImageUploadForm } from "@/components/OwnerAndTenantForms";
import { Formik } from "formik";
import CustomButton from "@/components/CustomButton";
import dateFormat from "@/utils/dateFormat";
import appendArrayField from "@/utils/appendArrayField";
import { QueryClient } from "react-query";

const ShowOwner = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useShowOwner(id);
  const toast = useToast();
  const clientQuery = new QueryClient();
  const { mutate, isLoading: imageUpdating } = useUpdateImage(
    onSuccess,
    onError,
    id
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModel,
    onOpen: openModel,
    onClose: closeModel,
  } = useDisclosure();

  const owner = data?.data?.data?.owner;

  const submitHandler = (values) => {
    const formData = new FormData();
    appendArrayField(values?.images, "images", formData);
    mutate(formData);
  };

  function onSuccess(data) {
    clientQuery.invalidateQueries("show-owner");
    toast({
      title: data?.data?.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  }

  function onError(error) {
    toast({
      title: error?.response?.data?.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header={"Front and Back CNIC Photo"}
        size={"xl"}
        body={
          <Flex justifyContent={"center"} alignItems={"center"}>
            {owner?.images.length === 0 && (
              <Flex direction={"column"}>
                <Formik
                  initialValues={{
                    images: [],
                  }}
                  onSubmit={submitHandler}
                >
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    values,
                    touched,
                    errors,
                  }) => (
                    <>
                      <ImageUploadForm
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                        label={"Upload Owner Front and Back CNIC Image"}
                      />
                      {values?.images?.length > 0 && (
                        <CustomButton
                          text={"Submit"}
                          colorScheme="blue"
                          type="submit"
                          onClick={() => handleSubmit(values)}
                          isLoading={imageUpdating}
                        />
                      )}
                    </>
                  )}
                </Formik>
              </Flex>
            )}
            {owner?.images?.map((image, index) => (
              <Box key={index} mr={4}>
                <Image src={image} width={400} height={400} alt="cnic front" />
              </Box>
            ))}
          </Flex>
        }
      />

      <Modal
        isOpen={isOpenModel}
        onClose={closeModel}
        header={`${owner?.name}'s inventories`}
        body={
          <>
            {owner?.inventories?.map((inventory, index) => (
              <Box key={index} mb={4} display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <Box as={BiBuildings} fontSize={24} color={"blue.300"} />
                  <Text fontSize={24}>
                    {inventory?.inventoryType}-{inventory?.floor}
                    {inventory?.flatNo}
                  </Text>
                </Box>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <Box as={BiCalendar} fontSize={24} color={"blue.300"} />
                  <Text fontSize={24}>
                    {dateFormat(inventory?.purchaseDate)}
                  </Text>
                </Box>
              </Box>
            ))}
          </>
        }
      />
      <CustomBox heading={"Owner Details"} maxW={800}>
        <Divider mb={6} />
        {isLoading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h={"50vh"}>
            <Spinner size={"xl"} color="teal" />
          </Flex>
        ) : (
          <>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={5}
            >
              <Box mb={4}>
                <Image
                  src={ownerLogo}
                  width={200}
                  height={200}
                  alt="owner"
                  priority
                />
              </Box>
              <Flex
                gap={10}
                direction={{ base: "column", md: "row" }}
                justifyContent={"center"}
              >
                <Box w={{ md: "50%" }}>
                  <Box>
                    <Heading
                      as={"h2"}
                      size={"lg"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      fontWeight={"normal"}
                    >
                      <Box as={MdInfo} color={"teal.300"} />
                      Personal Info
                    </Heading>

                    <Divider mb={6} borderColor="teal.400" />
                    <Box mt={4} mb={4}>
                      <Text mb={2}>
                        <strong>Name:</strong> {owner?.name}
                      </Text>
                      <Text mb={2}>
                        <strong>Father/Husband Name:</strong> {owner?.father}
                      </Text>
                      <Text mb={2}>
                        <strong>Email:</strong> {owner?.email || "N/A"}
                      </Text>
                      <Text mb={2} display={"flex"} gap={1}>
                        <strong>CNIC:</strong> {owner?.cnic}
                        <Box
                          as={BiIdCard}
                          fontSize={25}
                          color={"blue.300"}
                          cursor={"pointer"}
                          onClick={onOpen}
                        />
                      </Text>
                      <Text mb={2}>
                        <strong>CNIC Expiry:</strong>{" "}
                        {dateFormat(owner?.cnicExpiry)}
                      </Text>
                      <Text mb={2}>
                        <strong>Permanent Address:</strong>{" "}
                        {owner?.permanentAddress}
                      </Text>
                      <Text mb={2}>
                        <strong>Current Address:</strong>{" "}
                        {owner?.currentAddress}
                      </Text>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Heading
                      as={"h2"}
                      size={"lg"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      fontWeight={"normal"}
                    >
                      <Box as={MdWork} color={"teal.300"} />
                      Job Details
                    </Heading>
                    <Divider borderColor="teal.400" mb={6} />
                    <Text mb={2}>
                      <strong>Job Title:</strong> {owner?.jobTitle || "N/A"}
                    </Text>
                    <Text mb={2}>
                      <strong>Organization Name:</strong>{" "}
                      {owner?.organizationName || "N/A"}
                    </Text>
                    <Text mb={2}>
                      <strong>Organization Location:</strong>{" "}
                      {owner?.organizationLocation || "N/A"}
                    </Text>
                  </Box>
                </Box>
                <Box w={{ md: "50%" }}>
                  <Box>
                    <Heading
                      as={"h2"}
                      size={"lg"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      fontWeight={"normal"}
                    >
                      <Box as={MdAccountBalanceWallet} color={"teal.300"} />
                      Bank Details
                    </Heading>

                    <Divider mb={6} borderColor="teal.400" />
                    <Box mt={4} mb={4}>
                      <Text mb={2}>
                        <strong>Name:</strong> {owner?.bankName || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>Title:</strong> {owner?.bankTitle || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>Address :</strong>{" "}
                        {owner?.bankBranchAddress || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>Account Number:</strong>{" "}
                        {owner?.bankAccountNumber || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>IBN Number:</strong>{" "}
                        {owner?.bankIbnNumber || "N/A"}
                      </Text>
                    </Box>
                  </Box>
                  <Box mt={10}>
                    <Heading
                      as={"h2"}
                      size={"lg"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      fontWeight={"normal"}
                    >
                      <Box as={MdContactPhone} color={"teal.300"} />
                      Contacts
                    </Heading>
                    <Divider borderColor="teal.400" mb={6} />
                    <Flex gap={2} direction={"column"}>
                      <Accordion
                        mainText={"Phone Number(s)"}
                        data={owner?.phoneNumber}
                      />
                      <Accordion
                        mainText={"Emergency Number(s)"}
                        data={owner?.emergencyNumber}
                      />
                      <Accordion
                        mainText={"Whatsapp Number(s)"}
                        data={owner?.whatsapp}
                      />
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Flex>
            <Box mt={3}>
              <Heading
                as={"h2"}
                size={"lg"}
                display={"flex"}
                alignItems={"center"}
                gap={2}
                fontWeight={"normal"}
              >
                <Box as={MdFeedback} color={"teal.300"} />
                Remarks
              </Heading>
              <Divider borderColor="teal.400" mb={2} />
              <Text fontSize={"md"}>{owner?.remarks || "N/A"}</Text>
            </Box>
            <Divider my={6} borderColor={"teal.400"} />
            <Flex>
              <CustomButton
                leftIcon={BiBuilding}
                text={"Show Inventories"}
                variant="outline"
                fontSize={"md"}
                onClick={openModel}
              />
            </Flex>
          </>
        )}
      </CustomBox>
    </Layout>
  );
};

export default ShowOwner;
