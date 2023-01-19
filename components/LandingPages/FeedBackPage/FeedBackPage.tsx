import React, {FC, useEffect, useState} from 'react';
import {IPageOfLanding} from "../../../Apollo/Queries/landingPage";
import ISTComment from "../../UI/ISTComment/ISTComment";

import styles from "../../../styles/FeedBackPage/feedBack.module.scss"
import selector_styles from "../../../styles/FeedBackPage/RatingSelector/ratingSelector.module.scss"

import StyledContentWrapper from "../../UI/styledContentWrapper/StyledContentWrapper";
import ISTInput, {inputTypesVars} from "../../UI/ISTInput/ISTInput";
import ISTSelect from "../../UI/ISTSelect/ISTSelect";
import ISTTextArea from "../../UI/ISTTextArea/ISTTextArea";
import ISTButtonN from "../../UI/ISTButton/ISTButtonN";

import megaphone_img from "../../../public/LandingPages/FeedBack/IstComment/megaphone_w_cl.png"

import image from "../../../public/Header/catalog_btn.svg"
import ISTComponentWrapper from "../../UI/ComponentWrapper/ISTComponentWrapper";
import RatingSelector, {rating, ratingList} from "./ratingSelector/RatingSelector";
import {useQuery} from "@apollo/client";
import {GET_RATING_ITEMS} from "../../../Apollo/Queries/rating";
import Image from "next/image";

interface IFeedBackPage{
    page: IPageOfLanding
}

const FeedBackPage:FC<IFeedBackPage> = (
        {

        }) => {

    const[name, setName] = useState<string>("");
    const[email, setEmail] = useState<string>("");
    const[message, setMessage] = useState<string>("");
    const[rating, setRating] = useState<rating>(null);

    const {data, loading, error} = useQuery<ratingList>(GET_RATING_ITEMS,{});


    return(
        <>
            <div className={"col-12 col-md-5 col-xl-7"}>
                <div className={styles.feedBack_container}>

                    <ISTComment
                        name={"John Doe John Doe John Doe"}
                        rate={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1673194410/Emoji/emoji_stars_eyes_happy_icon_512_qhyoah.png"}
                        comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non eros placerat, ornare eros ut, elementum odio Lorem ipsum dolor sit amet, consectetur adipiscing elitIn non eros placerat, ornare eros ut, elementum odio"}
                        category={"Category name Category name Category name"}
                        style={{
                            margin: "10px",
                            marginBottom: "17px",
                        }}
                    />

                    <ISTComment
                        name={"John Doe John Doe John Doe"}
                        rate={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1673194410/Emoji/emoji_stars_eyes_happy_icon_512_qhyoah.png"}
                        comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non eros placerat, ornare eros ut, elementum odio Lorem ipsum dolor sit amet, consectetur adipiscing elitIn non eros placerat, ornare eros ut, elementum odio"}
                        category={"Category name Category name Category name"}

                        style={{
                            margin: "10px",
                            marginBottom: "17px"
                        }}
                    />

                    <ISTComment
                        name={"John Doe John Doe John Doe"}
                        rate={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1673194410/Emoji/emoji_stars_eyes_happy_icon_512_qhyoah.png"}
                        comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non eros placerat, ornare eros ut, elementum odio Lorem ipsum dolor sit amet, consectetur adipiscing elitIn non eros placerat, ornare eros ut, elementum odio"}
                        category={"Category name Category name Category name"}

                        style={{
                            margin: "10px",
                            marginBottom: "17px"
                        }}
                    />

                    <ISTComment
                        name={"John Doe John Doe John Doe"}
                        rate={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1673194410/Emoji/emoji_stars_eyes_happy_icon_512_qhyoah.png"}
                        comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non eros placerat, ornare eros ut, elementum odio Lorem ipsum dolor sit amet, consectetur adipiscing elitIn non eros placerat, ornare eros ut, elementum odio"}
                        category={"Category name Category name Category name"}

                        style={{
                            margin: "10px",
                            marginBottom: "17px"
                        }}
                    />

                    <div className={styles.mob_show_all}>
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

                            <div className={styles.field_container}>
                                <ISTSelect
                                    title={"Recall category"}
                                    options={[
                                    "Here you can leave Here you can leave Here you can leave",
                                    "2",
                                    "Here you can leave Here you can leave Here you can leave",
                                    "2",
                                    "Here you can leave Here you can leave Here you can leave",
                                    "2"
                                ]}/>
                            </div>

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

                            <div className={styles.feedback_bottom_comp}>
                                <div className={styles.selector_wrapper}>
                                    <ISTComponentWrapper
                                        title={"Leave your rating"}
                                        wrapperClass={styles.feedback_selector}
                                    >
                                        <RatingSelector
                                            inputList={data}
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
        </>
    )
}

export default FeedBackPage;