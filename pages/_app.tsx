//POLYFILLS FOR OLDER BR
import { forEach } from "core-js/stable/dom-collections";
import { replaceAll } from "core-js/stable/string";

import { useState, useEffect, useCallback } from "react";

import "../styles/global.scss";
import Head from "next/head";

import { useRouter } from "next/router";
import Footer from "../components/Footer/Footer";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../Apollo/apolloClient";

import { Provider } from "react-redux";
import store from "../store/store";
import Header from "../components/Header/Header";
import RegionHandler from "../components/Header/Additional/regionHandler";
import useBaseModal from "../components/ISTModals/useBaseModal";
import CatalogWrapper_modal from "../components/DefaultModals/Catalog/catalogWrapper_modal";
import { useCatalog } from "../Hooks/useCatalog/useCatalog";
import CatalogFullProductsListModal from "../components/DefaultModals/Catalog/Pages/catalogFullProductsList_modal";
import CatalogSearchModal from "../components/DefaultModals/Catalog/Pages/catalogSearch_modal";
import CatalogMobileFilterPageModal from "../components/DefaultModals/Catalog/Pages/mobile/catalogMobileFilterPage_modal";
import CartMobilePageModal from "../components/DefaultModals/Catalog/Pages/mobile/cartMobilePage_modal";

import { toc_catalog_full_prod_list } from "../components/DefaultModals/table_of_contents/Catalog/toc_catalog_full_prod_list";
import { toc_catalog_search } from "../components/DefaultModals/table_of_contents/Catalog/toc_catalog_search";
import { toc_mobile_filter_page } from "../components/DefaultModals/table_of_contents/Catalog/toc_mobile_filter_page";
import { toc_mobile_cart_page } from "../components/DefaultModals/table_of_contents/Catalog/toc_mobile_cart_page";

import { ICatalogQueries } from "../Hooks/useCatalog/ICatalogQueries";
import { ICatalogFiltersType } from "../store/slices/catalogSlice/catalogFiltersType";
import CatalogTestFiltersModal from "../components/DefaultModals/Catalog/Pages/catalogTestFilters_modal";
import ICatalogHelper from "../components/UI/ICatalogHelper/ICatalogHelper";

import searchIcon from "../public/MobileHelperIcons/search_icon.svg";
import filterIcon from "../public/MobileHelperIcons/filter_icon.svg";
import cartIcon from "../public/MobileHelperIcons/cart_icon.svg";
import currencyIcon from "../public/MobileHelperIcons/currency_icon.svg";
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
