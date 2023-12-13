import { fonts } from "./fonts";
import "./globals.css";
import ChakraUIProvider from "@/components/providers/ChakraUIProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/constants/theme";
import "react-phone-input-2/lib/style.css";

export const metadata = {
  title: "BMS",
  description: "Building Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <ReactQueryProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
