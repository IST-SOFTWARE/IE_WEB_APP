import React, {FC, useEffect, useState} from 'react';

import {apolloClient} from "../../Apollo/apolloClient";
import DefaultLandingPage, {inputData, pageBackground} from "../../components/LandingPages/DefaultLandingPage";
import {GET_LANDING_PAGE_CONTENT, ILandingPage, IPageOfLanding} from "../../Apollo/Queries/landingPage";
import HelloPage from "../../components/LandingPages/HelloPage/HelloPage";
import Gallery from "../../components/LandingPages/HelloPage/Gallery/Gallery";
import ProductDemo from "../../components/LandingPages/ProductDemo/ProductDemo";
import OurPartnersPage from "../../components/LandingPages/OurPartners/OurPartnersPage";



interface ILandingPageCont{
    landingPage: ILandingPage | null
}

const Index:FC<ILandingPageCont> =
            ({
               landingPage
            }) => {


    const getPageData = (page_identifire: string): Array<IPageOfLanding> | null=> {
        const landing = landingPage.landing_page
            .filter(x => x.page_identifier === page_identifire);

        return landing ? landing : null;
    }

    const getPageBackground = (
        page_data: IPageOfLanding,
        back_props: Array<{
            distance: number,
            offset: {
                top: number,
                left: number,
            }
        }>
    ):pageBackground => {

        const backItems: Array<inputData> = new Array<inputData>();
        page_data.background.back_images.map((elem, index)=>{
            const newInputData : inputData = {
                content: {
                    data: elem.Image_URL,
                    contentOffset: back_props[index] ? {
                            top: back_props[index].offset.top,
                            left: back_props[index].offset.left
                        } :
                        {
                            top: 0,
                            left: 0
                        },
                    contentDistance: back_props[index] ? back_props[index].distance : 1
                }
            }
            backItems.push(newInputData);
        })

        const newPageBg: pageBackground = {
            backgroundItems: backItems,
            backgroundCrossFilling: true

        }

        return newPageBg;
    }

    useEffect(()=>{
        const data = getPageData('hello_page');


        console.log(data);
    },[landingPage])



    return (
        <>
            {getPageData('hello_page')?.map((elem, index) => (
                <DefaultLandingPage key={`${index}_${elem.page_identifier}`}
                    landingDescription={{
                        title: elem.landing_label[0]?.main_label,
                        subTitle: elem.landing_label[0]?.subtitle,
                        titleOffset: 80}}
                        pageId={elem.page_identifier}
                >
                    <HelloPage page={elem}/>
                </DefaultLandingPage>
            ))}

            {getPageData('product_demo_page')?.map((elem, index) => (
                <DefaultLandingPage key={`${index}_${elem.page_identifier}`}
                                    landingDescription={{
                                        title: elem.landing_label[0]?.main_label,
                                        subTitle: elem.landing_label[0]?.subtitle,
                                        titleOffset: 80}}
                                    pageBackground={
                                        getPageBackground(elem, [
                                            {
                                                distance: 0.6,
                                                offset: {left: -200, top: 0}
                                            },
                                            {
                                                distance: 0.4,
                                                offset: {left: -100, top: 0}
                                            },
                                            {
                                                distance: 0.65,
                                                offset: {left: -100, top: 0}
                                            },
                                            {
                                                distance: 0.4,
                                                offset: {left: -100, top: 0}
                                            },
                                            {
                                                distance: 0.8,
                                                offset: {left: -100, top: -40}
                                            },
                                        ])
                                    }
                                    pageId={elem.page_identifier}
                >
                    <ProductDemo page={elem}/>
                </DefaultLandingPage>
            ))}

            {getPageData('our_partners')?.map((elem, index) => (
                <DefaultLandingPage key={`${index}_${elem.page_identifier}`}
                                    landingDescription={{
                                        title: elem.landing_label[0]?.main_label,
                                        subTitle: elem.landing_label[0]?.subtitle,
                                        titleOffset: 80}}
                                    pageBackground={
                                        getPageBackground(elem, [
                                            {
                                                distance: 0.6,
                                                offset: {left: -100, top: 0}
                                            },
                                            {
                                                distance: 0.4,
                                                offset: {left: -50, top: 0}
                                            },
                                            {
                                                distance: 0.8,
                                                offset: {left: -50, top: 0}
                                            },
                                            {
                                                distance: 0.56,
                                                offset: {left: -50, top: 0}
                                            },
                                            {
                                                distance: 0.6,
                                                offset: {left: -50, top: -40}
                                            },
                                        ])
                                    }
                                    pageId={elem.page_identifier}
                >
                    <OurPartnersPage page={elem}/>
                </DefaultLandingPage>
            ))}


        </>
    )
}


export default Index;

export async function getServerSideProps(context){

    const locale = context?.locale;
    const {data, loading, error} = await apolloClient.query<ILandingPageCont>(
        {
            query: GET_LANDING_PAGE_CONTENT,
            variables: {
                "lang": locale
            }
        }
    );

    return {
        props:{
            landingPage: data,
        }
    }
}