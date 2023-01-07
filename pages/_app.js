import { useState, useEffect, useContext, useRef} from "react";


//POLYFILLS FOR OLDER BR
import {forEach} from "core-js/stable/dom-collections";
import {replaceAll} from "core-js/stable/string";

import '../styles/global.scss'
import Catalog from "../components/Catalog/Catalog";

import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import CatalogContext from "../components/Context/CatalogContext"
import PageLevelsVisContext from "../components/Context/PageLevelsVisContext";
import {getProducts} from "../queries/getProducts"

import { useRouter, Router} from 'next/router'
import Footer from "../components/Footer/Footer";

import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "../Apollo/apolloClient";
import Loader from "../components/Loader";
import {Provider} from "react-redux";
import store from "../store/store";
import Header from "../components/Header/Header";

export default function MyApp({Component, pageProps}){

    // FOR SHOW/HIDE PAGE LEVELS IN MOBILE
    const[mobilePageLevels, setPageLevelsVis] = useState(true);

    const[CatalogProducts, setCatalogProducts] = useState();
    const[CatalogToggle, setCatalog] = useState(false);

    const[LoaderShow, setLoaderShow] = useState(false);
    const[ProductSearch, setProductSearch] = useState({
        s: ''
    })

    const[productDemoPageFilter, setProductDemoPageFilter] = useState(null);

    const HeaderRef = useRef();
    const router = useRouter();


    // GET CATALOG PRODUCTS
    useEffect(()=>{
        async function ProdLoad(){
            const response = await getProducts();
            setCatalogProducts(response);
            // console.log(response);
        }

        if(!CatalogProducts){
            ProdLoad();
        }
    },[]);
    

    //CatalogContext VALUES
    const CatalogValue = {
            CatalogToggle,
            setCatalog,

            ProductSearch,
            setProductSearch,

            CatalogProducts,

            setProductDemoPageFilter
    }


    useEffect(()=>{
        setPageLevelsVis(CatalogToggle);
    },[CatalogToggle]);


    useEffect(()=>{
        const ScrollSpaceToggle = document.body;
        CatalogToggle ? ScrollSpaceToggle.style.overflowY = "hidden" :  ScrollSpaceToggle.style.overflowY = "auto"
    },[CatalogToggle])

    useEffect(()=>{
        setCatalog(false);
    },[Component, pageProps])


    const[loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        const handleStart = () => setLoadingState(true);
        const handleComplete = () => (false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    useEffect(()=>{
        setLoadingState(false);
    }, [])

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

                <Header/>

                {/*<Catalog openState={CatalogToggle}*/}
                {/*         catalogFilter = {productDemoPageFilter}*/}
                {/*         HeaderForLoader={HeaderRef.current}/>*/}

                {/*<div style={{*/}
                {/*    width: "100%",*/}
                {/*    height: "80px",*/}
                {/*    position: "absolute",*/}
                {/*    top:0,*/}
                {/*    left:0,*/}
                {/*    background: "#fff",*/}
                {/*    zIndex: 2,*/}
                {/*}}>*/}
                {/*</div>*/}

                {/*<Loader state={loadingState}>*/}
                    <Component {...pageProps} key={router.asPath}/>
                {/*</Loader>*/}

                <Footer className={"footer"}
                        route={router.locale}
                />

            </Provider>
            </ApolloProvider>

        </>
    )
    
}
