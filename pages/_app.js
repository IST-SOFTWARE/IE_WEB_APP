import { useState, useEffect, useContext } from "react";


import '../styles/global.css'
import Header from '../components/Header/Header'
import Catalog from "../components/Catalog/Catalog";

import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import CatalogContext from "../components/Context/CatalogContext"
import PageLevelsVisContext from "../components/Context/PageLevelsVisContext";



export default function MyApp({Component, PageProps}){


    // FOR SHOW/HIDE PAGE LEVELS IN MOBILE
    const[mobilePageLevels, setPageLevelsVis] = useState(true);


    const[ProductSearch, setProductSearch] = useState({
        s: ''
    })
    
    const[CatalogToggle, setCatalog] = useState(false);
    
    const CatalogValue = {
        CatalogToggle,
        setCatalog,

        ProductSearch,
        setProductSearch
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
    },[Component, PageProps])

    return(
        <>
        
            <Head>
                <title>IST ELEVATOR</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>

            </Head>
            <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            />

            <PageLevelsVisContext.Provider value={{mobilePageLevels, setPageLevelsVis}}>
            <CatalogContext.Provider value={CatalogValue}>
            <Catalog openState={CatalogToggle} searchFilter={ProductSearch.s}/>
            <Header
                // HeaderLangChecker={LangChecker}
                // content = {HeaderContent}
                // lang = {globalLng}
            />
                
            <Component {...PageProps} />

            </CatalogContext.Provider>
            </PageLevelsVisContext.Provider>
       
        </>
    )
}


// App.getInitialProps = async ({Component, ctx}) => {
//     let pageProps = {};
//     if(Component.getInitialProps){
//       pageProps = await Component.getInitialProps(ctx)
//     }
//     return {pageProps};
//   }

// MyApp.getInitialProps = async (appContext) => {
//     const appProps = await App.getInitialProps(appContext)
//     return { ...appProps }
//   }




// MyApp.getInitialProps = async (context) => {
//     const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
//     let api_cont = await getHomePageContent();
//     console.log(pageProps, api_cont);
//     return {
//         ...pageProps,
//         api_cont
//     };
// };

// // MyApp.getInitialProps = async () => {
    
// //     return {api_cont};
// // }

// // export async function getServerSideProps() {
// //     let api_cont = await getHomePageContent();
// //     console.log("1", api_cont);
// //     return {props: {api_cont}}
// // }

