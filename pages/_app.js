import { useState, useEffect, useContext, useRef} from "react";

import '../styles/global.css'
import Header from '../components/Header/Header'
import Catalog from "../components/Catalog/Catalog";

import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import CatalogContext from "../components/Context/CatalogContext"
import PageLevelsVisContext from "../components/Context/PageLevelsVisContext";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {getProducts} from "../queries/getProducts"

import { useRouter } from 'next/router'
import Footer from "../components/Footer/Footer";

const queryClient = new QueryClient()


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

    const router = useRouter()
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


    return(
        <>
        
            <Head>
                <title>IST ELEVATOR</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>

            </Head>

            <QueryClientProvider client={queryClient}>
            <NextNProgress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />

            <PageLevelsVisContext.Provider value={{mobilePageLevels, setPageLevelsVis}}>
            <CatalogContext.Provider value={CatalogValue}>

                <Catalog openState={CatalogToggle}
                         catalogFilter = {productDemoPageFilter}
                         HeaderForLoader={HeaderRef.current}/>
                <Header
                    ref={HeaderRef}
                    // HeaderLangChecker={LangChecker}
                    // content = {HeaderContent}
                    // lang = {globalLng}
                    loaderShow = {LoaderShow}
                />
                <div className={"pages_content"} id={"pages_content"}>
                    <Component {...pageProps} key={router.asPath}/>
                </div>

                <Footer/>

            </CatalogContext.Provider>
            </PageLevelsVisContext.Provider>
            </QueryClientProvider>
        </>
    )
    
}
