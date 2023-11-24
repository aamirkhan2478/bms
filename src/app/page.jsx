"use client";

import Footer from "@/components/Footer";
import TextField from "@/components/TextField";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Box,
  Switch,
  useColorModeValue,
  InputRightElement,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSun, FiMoon, FiEye, FiEyeOff } from "react-icons/fi";
import loginImage from "../../public/login_image.jpg";
import CustomButton from "@/components/CustomButton";
export default function SignIn() {
  const router = useRouter();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex position="relative" mb="40px">
        <Flex
          h={{ sm: "initial", md: "75vh", lg: "85vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="space-between"
          mb="30px"
          pt={{ sm: "100px", md: "0px" }}
        >
          <Flex
            alignItems="center"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "50%", lg: "42%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="48px"
              mt={{ md: "150px", lg: "80px" }}
              gap={4}
            >
              <Heading color={titleColor} fontSize="32px" mb="10px">
                Welcome Back
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Enter your email and password to sign in
              </Text>
              <FormControl>
                <TextField
                  placeholder={"Your Email Address"}
                  type={"email"}
                  fieldType={"input"}
                />
              </FormControl>
              <FormControl>
                <TextField
                  placeholder={"Your password"}
                  type={show ? "text" : "password"}
                  fieldType={"group"}
                  inputGroupSize={"md"}
                  rightElement={
                    <InputRightElement
                      width="4.5rem"
                      height="2.9rem"
                      onClick={handleClick}
                      cursor={"pointer"}
                      _focus={{ outlineColor: "teal.300" }}
                    >
                      {show ? <FiEyeOff /> : <FiEye />}
                    </InputRightElement>
                  }
                />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="teal" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Remember me
                </FormLabel>
              </FormControl>
              <CustomButton
                text={"SIGN IN"}
                onClick={() => router.push("/dashboard")}
              />
              <IconButton
                onClick={toggleColorMode}
                variant="solid"
                icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
                rounded="full"
              />
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", md: "block" }}
            overflowX="hidden"
            h="100%"
            w="40vw"
            position="absolute"
            right="0px"
          >
            <Box
              as={Image}
              src={loginImage}
              alt="login-image"
              height={"100%"}
              width={"100%"}
              borderBottomLeftRadius="20px"
            ></Box>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
