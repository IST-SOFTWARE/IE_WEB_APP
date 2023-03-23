import React, {FC, useCallback, useEffect, useState} from 'react';
import {IPageOfLanding} from "../../../queries/landingPage";

import styles from "../../../styles/FeedBackPage/feedBack.module.scss"
import cstm_adaptive_comments from "../../UI/ISTComment/adaptiveForShortened.module.scss"

import StyledContentWrapper from "../../UI/styledContentWrapper/StyledContentWrapper";
import ISTInput, {inputTypesVars} from "../../UI/ISTInput/ISTInput";
import ISTSelect from "../../UI/ISTSelect/ISTSelect";
import ISTTextArea from "../../UI/ISTTextArea/ISTTextArea";
import ISTButtonN from "../../UI/ISTButton/ISTButtonN";

import megaphone_img from "../../../public/LandingPages/FeedBack/IstComment/megaphone_w_cl.png"

import ISTComponentWrapper from "../../UI/ComponentWrapper/ISTComponentWrapper";
import RatingSelector, {rating, IRatingList} from "./ratingSelector/RatingSelector";
import {useQuery} from "@apollo/client";
import {GET_RATING_ITEMS} from "../../../queries/landingFeatures/feedbackPage/rating";
import Image from "next/image";

import {
    GET_FEEDBACK_CATEGORIES, getFB_CategoriesArr,
    IFeedBackCategories, IFeedBackCategoriesVars,
} from "../../../queries/landingFeatures/feedbackPage/getFeedbackCategories";

import {
    GET_FEEDBACK_REVIEWS,
    getFB_Reviews,
    IFeedBackReviews, IFeedBackReviewsVars, reviewItem
} from "../../../queries/landingFeatures/feedbackPage/getFB_Reviews";
import useBaseModal from "../../ISTModals/useBaseModal";
import FeedBack_modal from "../../DefaultModals/LandingFeedBack/FeedBack_modal";
import {IQueryPaginationVariable} from "../../../queries/common";
import useISTReviews from "../../UI/ISTComment/hook/useISTReviews";



interface IFeedBackPage{
    page: IPageOfLanding
}


const FeedBackPage:FC<IFeedBackPage> = (
        {

        }) => {
    // Local state
        const[name, setName] = useState<string>("");
        const[email, setEmail] = useState<string>("");
        const[message, setMessage] = useState<string>("");
        const[rating, setRating] = useState<rating>(null);

        const[reviewsDataList, setReviewsDataList] = useState<Array<reviewItem>>([]);
        const[lilReviewsDataList, setLilReviewsDataList] = useState<Array<reviewItem>>([]);

        const[findingId, setFindingId] = useState<number | string>(null);

        const[reviewsPagination] = useState<IQueryPaginationVariable>({
            limit: 8,
            offset: 0
        });


        const {modalComponent, ModalView} = useBaseModal(
            "APP_BODY_WRAPPER",
        );

        const {printComments, desiredReview, desiredEvent} = useISTReviews();
    //
    // queries
        const FBRatingItems = useQuery<IRatingList>(GET_RATING_ITEMS,{});

        const FBCategoryItems =
            useQuery<IFeedBackCategories, IFeedBackCategoriesVars>(GET_FEEDBACK_CATEGORIES, {
                variables:{
                    code: "ru-RU",
                }
            });

        const authToken = process.env.NEXT_PUBLIC_REVIEWS_ACCESS;
        const FBReviews = useQuery<IFeedBackReviews, IFeedBackReviewsVars>(GET_FEEDBACK_REVIEWS, {
                variables: {
                    code: "ru-RU",
                    limit: reviewsPagination.limit,
                    offset: reviewsPagination.offset,
                },
                context:{
                    headers: {
                        authorization: authToken ? `Bearer ${authToken}` : "",}
                }
        });
    //

    useEffect(()=>{
        if(FBReviews?.data){
            const commentList = getFB_Reviews(FBReviews.data);
            if(reviewsDataList.length < reviewsPagination.limit)
                setReviewsDataList(
                    current => [...reviewsDataList, ...commentList]
                );
        }
    },[FBReviews, reviewsPagination])


    // useEffect(()=>{
    //     if(reviewsDataList){
    //         const nList = reviewsDataList.pop();
    //         setLilReviewsDataList(current => [...lilReviewsDataList, nList]);
    //     }
    // },[reviewsDataList])


    useEffect(()=>{
        if(modalComponent){
            modalComponent.editModal(
                "All reviews",
                ""
            )
        }
    },[modalComponent])

    // Open full comments list
        const handleAllReviews = () =>{
            setFindingId(null);
            modalComponent.switch(true);
        }
    //

    desiredEvent.event = function(){
        modalComponent.switch(true);
        setFindingId(desiredReview.getId());
    }



    return(
        <>
            <div className={"col-12 col-md-5 col-xl-7"}>
                <div className={styles.feedBack_container}>

                    {/*REVIEWS LIST*/}

                    {printComments({
                        data: reviewsDataList,
                        uniqueKeyDesignation: "onPage_review",
                        customAdaptiveStyles: cstm_adaptive_comments,
                        listWrapperClassName: styles.fb_review_items_wrapper,
                        componentInnerStyles: {
                            margin: "10px",
                            marginBottom:"17px"
                        }
                    })}

                    {/*---*/}
                    <div className={styles.mob_show_all}
                         onClick={()=>{
                             handleAllReviews();
                         }}
                    >
                            <ISTButtonN
                                dark={{
                                    solid: false,
                                    style: {
                                        fillContainer: true,
                                        borderRadius: "15px"
                                    }
                                }}
                            />

                            <div className={styles.mob_show_all_data}>
                                <div className={styles.sar_caption}>
                                    Show all reviews
                                </div>

                                <div>
                                    <Image
                                        src={megaphone_img}
                                        alt={"megaphone image background"}
                                        fill={true}

                                        style={{
                                            objectFit: "contain",
                                            objectPosition: "right",
                                            paddingRight: "10px",
                                            paddingBottom: "10px"
                                        }}
                                    />
                                </div>
                            </div>
                    </div>

                </div>

                <div className={`${styles.allReviewsBtn} d-none d-md-block`}>
                    <ISTButtonN
                        dark={{
                            solid: false,
                            style:{
                                fillContainer: true,
                                borderRadius: "15px"
                            },
                        }}
                        title={{
                            caption: "Show all reviews",
                            id: styles.allReviews_btn
                        }}

                        onClick={(ev)=>{
                            handleAllReviews();
                        }}

                    />
                </div>

            </div>

            <div className={"col-12 col-md-7 col-xl-5"}>
                <div className={styles.feedBack_data}>
                    <StyledContentWrapper
                        title={"Here you can leave\n" +
                            "your feedback"}

                        style={{
                            borderRadius: "0px 46px 46px 0px",
                            boxShadow: "14px 14px 22px -13px #151A20"
                        }}
                    >

                        <div className={styles.feedback_inputs}>

                            {/*NAME FIELD*/}
                            <div className={styles.field_container}>
                                <ISTInput
                                    inputType={inputTypesVars.any_string}
                                    placeholder={"Andrew"}
                                    required={true}
                                    outDataSetter={setName}
                                    actualData={name}
                                    style={{
                                        height: "47px",
                                        borderRadius: "25px 89px 89px 89px"
                                    }}

                                    title={"Name:"}
                                />
                            </div>

                            {/*PHONE FIELD*/}
                            <div className={styles.field_container}>
                                <ISTInput
                                    inputType={inputTypesVars.phone}
                                    placeholder={"Your phone number"}
                                    required={true}
                                    outDataSetter={setEmail}
                                    actualData={email}
                                    style={{
                                        height: "47px",
                                        borderRadius: "25px 89px 89px 89px"
                                    }}

                                    inputCaption={"Enter the data that you previously indicated on our website. This data will not be published"}
                                    title={"Phone:"}
                                />
                            </div>

                            {/*CATEGORY SELECTOR*/}
                            <div className={styles.field_container}>
                                <ISTSelect
                                    title={"Recall category"}
                                    options={getFB_CategoriesArr(FBCategoryItems?.data)}/>
                            </div>

                            {/*MESSAGE FIELD*/}
                            <div className={styles.field_container}>
                                <ISTTextArea
                                    placeholder={"Message"}
                                    title={"Your feedback"}

                                    outDataSetter={setMessage}
                                    actualData={message}

                                    style={{
                                        borderRadius: "10px 25px 25px 25px",
                                        height: "130px",
                                        maxHeight: "150px",
                                        minHeight: "50px"
                                    }}
                                />
                            </div>

                            {/*SEND FEEDBACK BTN*/}
                            <div className={styles.feedback_bottom_comp}>
                                <div className={styles.selector_wrapper}>
                                    <ISTComponentWrapper
                                        title={"Leave your rating"}
                                        wrapperClass={styles.feedback_selector}
                                    >
                                        <RatingSelector
                                            inputList={FBRatingItems?.data}
                                            getCurrent={setRating}
                                        />
                                    </ISTComponentWrapper>
                                </div>

                                <div className={styles.feedback_btn_container}>
                                    <div className={styles.feedback_btn}>
                                        <ISTButtonN dark={{
                                            solid: false,
                                            style: {
                                                borderRadius: "15px",
                                                fillContainer: true,

                                            }
                                        }}
                                        title={{
                                            caption: "Send feedback",
                                            id: styles.tstBtn
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </StyledContentWrapper>
                </div>
            </div>

            <ModalView
                alignStyle={{
                    vertical: "end"
                }}
            >
                <FeedBack_modal
                    puCloser={()=>
                        {
                            modalComponent.switch(false)
                        }
                    }
                    initialList={reviewsDataList}
                    pagination={reviewsPagination}
                    query={FBReviews}
                    header={modalComponent.getHeader}
                    findingId={findingId}
                />
            </ModalView>

        </>
    )
}

export default FeedBackPage;