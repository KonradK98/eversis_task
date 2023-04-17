import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Layout from "@/layouts/defaultLayout";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
