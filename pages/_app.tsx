//POLYFILLS FOR OLDER BR
import { forEach } from "core-js/stable/dom-collections";
import { replaceAll } from "core-js/stable/string";

import "../styles/global.scss";
import Head from "next/head";

import { useRouter } from "next/router";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../Apollo/apolloClient";

import { Provider } from "react-redux";
import store from "../store/store";

import LandingLayout from "../components/Layouts/landingLayout";

export default function MyApp({ Component, pageProps }) {

    const router = useRouter();

  return (
    <>
      <Head>
        <title>IST ELEVATOR</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <LandingLayout>
                <Component {...pageProps}/>
            </LandingLayout>
        </Provider>
      </ApolloProvider>
    </>
  );
}
