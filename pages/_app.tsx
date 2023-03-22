import {useEffect} from "react";
import {forEach} from "core-js/stable/dom-collections";
import {replaceAll} from "core-js/stable/string";

import '../styles/global.scss'
import Head from 'next/head'

import {useRouter} from 'next/router'
import Footer from "../components/Footer/Footer";

import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "../Apollo/apolloClient";
import {Provider} from "react-redux";
import store from "../store/store";
import Header from "../components/Header/Header";
import RegionHandler from "../components/Header/Additional/regionHandler";
import useBaseModal from "../components/ISTModals/useBaseModal";
import CatalogWrapper_modal from "../components/DefaultModals/Catalog/catalogWrapper_modal";

import {
    toc_catalog_full_prod_list
} from "../components/DefaultModals/table_of_contents/Catalog/toc_catalog_full_prod_list";

import {toc_catalog_search} from "../components/DefaultModals/table_of_contents/Catalog/toc_catalog_search";
import CatalogSearchModal from "../components/DefaultModals/Catalog/Pages/catalogSearch_modal";
import CatalogReducerTestModal from "../components/DefaultModals/Catalog/Pages/catalogReducerTest_modal";
import {toc_catalog_test} from "../components/DefaultModals/table_of_contents/Catalog/toc_catalog_test";
import {useCatalog} from "../Hooks/useCatalog/useCatalog";
import {ICatalogQueries} from "../components/ISTCatalog/ICatalogQueries";
import {ICatalogFiltersType} from "../store/slices/catalogSlice/catalogFiltersType";


export default function MyApp({Component, pageProps}){

    const router = useRouter();

    const {modalComponent, ModalView} = useBaseModal("APP_BODY_WRAPPER");
    const {currentState} = useCatalog<ICatalogQueries<ICatalogFiltersType>>()

    useEffect(()=>{
        if(modalComponent) {
            modalComponent.editModals([
                toc_catalog_full_prod_list,
                toc_catalog_test,
            ], 1 )
        }
    },[modalComponent])


    useEffect(()=>{
        if(modalComponent && currentState)
            modalComponent.switch(currentState.catalog);
    },[currentState, modalComponent])

    return(
        <>
            <Head>
                <title>IST ELEVATOR</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
            </Head>

            <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <Header>
                    <RegionHandler baseRegion={router.locale}/>
                </Header>
                    <Component {...pageProps} key={router.asPath}/>
                <Footer
                        route={router.locale}
                />

                <ModalView>
                    <CatalogWrapper_modal>
                        {modalComponent.isCurrentModal(toc_catalog_search.typeName) ?
                            <>
                            <CatalogSearchModal/>
                            </> :
                            <CatalogReducerTestModal/>
                        }

                    </CatalogWrapper_modal>
                </ModalView>

            </Provider>
            </ApolloProvider>

        </>
    )
    
}
