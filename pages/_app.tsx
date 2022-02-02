import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import AppProvider from "../components/AppProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useApollo } from "../lib/apollo";
import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
