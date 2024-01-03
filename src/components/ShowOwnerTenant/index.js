import { Box, Divider, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { ImageUploadForm } from "../OwnerAndTenantForms";
import CustomButton from "../CustomButton";
import dateFormat from "@/utils/dateFormat";
import Image from "next/image";
import ownerLogo from "@/../public/owner-logo.png";
import { BiBuilding, BiBuildings, BiCalendar, BiIdCard } from "react-icons/bi";
import {
  MdAccountBalanceWallet,
  MdContactPhone,
  MdFeedback,
  MdInfo,
  MdWork,
} from "react-icons/md";
import Accordion from "../Accordion";
import Modal from "../Modal";
import CustomBox from "../CustomBox";

const ShowOwnerTenant = ({
  isOpen,
  onClose,
  onOpen,
  isLoading,
  imageUpdating,
  isOpenModel,
  openModel,
  closeModel,
  submitHandler,
  name,
  data,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header={"Front and Back CNIC Photo"}
        size={"xl"}
        body={
          <Flex justifyContent={"center"} alignItems={"center"}>
            {data?.images.length === 0 && (
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
                        label={`Upload ${name} Front and Back CNIC Image`}
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
            {data?.images?.map((image, index) => (
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
        header={`${data?.name}'s inventories`}
        body={
          <>
            {data?.inventories?.map((inventory, index) => (
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
      <CustomBox heading={`${name} Details`} maxW={800}>
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
                        <strong>Name:</strong> {data?.name}
                      </Text>
                      <Text mb={2}>
                        <strong>Father/Husband Name:</strong> {data?.father}
                      </Text>
                      <Text mb={2}>
                        <strong>Email:</strong> {data?.email || "N/A"}
                      </Text>
                      <Text mb={2} display={"flex"} gap={1}>
                        <strong>CNIC:</strong> {data?.cnic}
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
                        {dateFormat(data?.cnicExpiry)}
                      </Text>
                      <Text mb={2}>
                        <strong>Permanent Address:</strong>{" "}
                        {data?.permanentAddress}
                      </Text>
                      <Text mb={2}>
                        <strong>Current Address:</strong> {data?.currentAddress}
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
                      <strong>Job Title:</strong> {data?.jobTitle || "N/A"}
                    </Text>
                    <Text mb={2}>
                      <strong>Organization Name:</strong>{" "}
                      {data?.jobOrganization || "N/A"}
                    </Text>
                    <Text mb={2}>
                      <strong>Organization Location:</strong>{" "}
                      {data?.jobLocation || "N/A"}
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
                        <strong>Name:</strong> {data?.bankName || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>Title:</strong> {data?.bankTitle || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>Address :</strong>{" "}
                        {data?.bankBranchAddress || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>Account Number:</strong>{" "}
                        {data?.bankAccountNumber || "N/A"}
                      </Text>
                      <Text mb={2}>
                        <strong>IBN Number:</strong>{" "}
                        {data?.bankIbnNumber || "N/A"}
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
                        data={data?.phoneNumber}
                      />
                      <Accordion
                        mainText={"Emergency Number(s)"}
                        data={data?.emergencyNumber}
                      />
                      <Accordion
                        mainText={"Whatsapp Number(s)"}
                        data={data?.whatsapp}
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
              <Text fontSize={"md"}>{data?.remarks || "N/A"}</Text>
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
    </>
  );
};

export default ShowOwnerTenant;
