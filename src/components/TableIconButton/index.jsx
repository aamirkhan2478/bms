import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";

const TableIconButton = ({ data, item }) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      {data &&
        data.map(({ icon, colorScheme, variant, size, onClick }, index) => (
          <IconButton
            key={index}
            icon={icon}
            colorScheme={colorScheme}
            variant={variant}
            size={size}
            onClick={() => onClick(item)}
          />
        ))}
    </Flex>
  );
};

export default TableIconButton;
