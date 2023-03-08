import { useState, useEffect, useContext, useRef} from "react";


//POLYFILLS FOR OLDER BR
import {forEach} from "core-js/stable/dom-collections";
import {replaceAll} from "core-js/stable/string";

import '../styles/global.scss'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'


import { useRouter, Router} from 'next/router'
import Footer from "../components/Footer/Footer";

import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "../Apollo/apolloClient";
import Loader from "../components/Loader";
import {Provider, useDispatch} from "react-redux";
import store from "../store/store";
import Header from "../components/Header/Header";
import RegionHandler from "../components/Header/Additional/regionHandler";
import useBaseModal from "../Hooks/baseModal/useBaseModal";
import CatalogWrapper_modal from "../components/DefaultModals/Catalog/catalogWrapper_modal";
import {useCatalog} from "../components/Catalog/useCatalog";

export default function MyApp({Component, pageProps}){


    const router = useRouter();
    const[loadingState, setLoadingState] = useState(true);

    const {modalComponent, ModalView} = useBaseModal("APP_BODY_WRAPPER");
    const [catalogState, setCatalogState] = useState(false);

    const {openCatalog, closeCatalog} = useCatalog({
        catalogStateSetter: setCatalogState
    })


    useEffect(()=>{
        if(modalComponent)
            modalComponent.switch(true);
    },[modalComponent])



    useEffect(()=>{
        modalComponent.switch(catalogState);
    },[catalogState, modalComponent])

    // useEffect(() => {
    //     const handleStart = () => setLoadingState(true);
    //     const handleComplete = () => (false);
    //
    //     router.events.on('routeChangeStart', handleStart)
    //     router.events.on('routeChangeComplete', handleComplete)
    //     router.events.on('routeChangeError', handleComplete)
    //
    //     return () => {
    //         router.events.off('routeChangeStart', handleStart)
    //         router.events.off('routeChangeComplete', handleComplete)
    //         router.events.off('routeChangeError', handleComplete)
    //     }
    // })

    // useEffect(()=>{
    //     setLoadingState(false);
    // }, [])


    return(
        <>
        
            <Head>
                <title>IST ELEVATOR</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
            </Head>

            {/*<NextNProgress*/}
            {/*    color="#29D"*/}
            {/*    startPosition={0.3}*/}
            {/*    stopDelayMs={200}*/}
            {/*    height={3}*/}
            {/*    showOnShallow={true}*/}
            {/*/>*/}

            <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <Header
                    catalogOpener={()=>{
                        openCatalog()
                    }}>
                    <RegionHandler baseRegion={router.locale}/>
                </Header>
                    <Component {...pageProps} key={router.asPath}/>
                <Footer className={"footer"}
                        route={router.locale}
                />

                <ModalView>
                    <CatalogWrapper_modal data={modalComponent}/>
                </ModalView>

            </Provider>
            </ApolloProvider>

        </>
    )
    
}
