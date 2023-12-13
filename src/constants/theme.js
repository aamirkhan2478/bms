import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  }
};

const theme = extendTheme({ config });

export default theme;
