import React, { useState } from "react";
import {
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import { ErrorMessage } from "formik";

const ArrayPhoneNumber = ({
  setData,
  data,
  label,
  onBlur,
  onChange,
  value,
  ...rest
}) => {
  const [text, setText] = useState("");

  const handleButtonPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.trim() !== "") {
        const updatedData = data[value] ? [...data[value], text] : [text];
        setData(value, updatedData);
        setText("");
      }
    }
  };

  const handleBadgeRemove = (index) => {
    const updatedData = data[value] ? [...data[value]] : [];
    updatedData.splice(index, 1);
    setData(value, updatedData);
  };

  const renderBadge = (item, index) => {
    return (
      <Tag key={index} mt={2} bg={"teal.300"}>
        <TagLabel>{item}</TagLabel>
        <TagCloseButton onClick={() => handleBadgeRemove(index)} />
      </Tag>
    );
  };

  return (
    <>
      <FormLabel htmlFor={value} ms="4px" fontSize="sm" fontWeight="normal">
        {label}
      </FormLabel>
      <PhoneInput
        onChange={(value) => setText(value)}
        value={text}
        inputProps={{
          name: value,
          id: value,
        }}
        onKeyDown={handleButtonPress}
        country={"pk"}
        inputStyle={{
          borderRadius: "15px",
          fontSize: "15px",
          height: "47px",
          maxWidth: "100%",
          width: "100%",
        }}
        enableSearch
        onBlur={onBlur}
        {...rest}
      />
      <Flex flexWrap="wrap" gap={3}>
        {data[value] &&
          data[value].map((item, index) => renderBadge(item, index))}
      </Flex>
    </>
  );
};

export default ArrayPhoneNumber;
