import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
