import { Inter } from "next/font/google";
import "./globals.css";
import ChakraUIProvider from "@/components/providers/ChakraUIProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/constants/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BMS",
  description: "Building Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
