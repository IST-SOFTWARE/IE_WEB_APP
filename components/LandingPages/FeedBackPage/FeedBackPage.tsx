import React, {FC, useState} from 'react';
import {IPageOfLanding} from "../../../Apollo/Queries/landingPage";
import ISTComment from "../../UI/ISTComment/ISTComment";
import styles from "../../../styles/FeedBackPage/feedBack.module.scss"
import StyledContentWrapper from "../../UI/styledContentWrapper/StyledContentWrapper";
import ISTInput, {inputTypesVars} from "../../UI/ISTInput/ISTInput";
import ISTSelect from "../../UI/ISTSelect/ISTSelect";
import ISTTextArea from "../../UI/ISTTextArea/ISTTextArea";
import ISTButtonN from "../../UI/ISTButton/ISTButtonN";

import image from "../../../public/Header/catalog_btn.svg"

interface IFeedBackPage{
    page: IPageOfLanding
}

const FeedBackPage:FC<IFeedBackPage> = (
        {

        }) => {

    const[name, setName] = useState<string>("");
    const[email, setEmail] = useState<string>("");
    const[message, setMessage] = useState<string>("");


    return(
        <>
            <div className={"col-7"}>
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
                </div>
            </div>

            <div className={"col-5"}>
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
                                    inputType={inputTypesVars.any_string}
                                    placeholder={"main@istllift.com"}
                                    required={true}
                                    outDataSetter={setEmail}
                                    actualData={email}
                                    style={{
                                        height: "47px",
                                        borderRadius: "25px 89px 89px 89px"
                                    }}

                                    inputCaption={"Enter the data that you previously indicated on our website. This data will not be published"}
                                    title={"Email:"}
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
                            <div className={styles.feedback_btn_container}>
                                <div className={styles.feedback_btn}>
                                    <ISTButtonN dark={{
                                        solid: false,
                                        style: {
                                            borderRadius: "15px",
                                            fillContainer: true,
                                            height: "45px"
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

                    </StyledContentWrapper>
                </div>
            </div>
        </>
    )
}

export default FeedBackPage;