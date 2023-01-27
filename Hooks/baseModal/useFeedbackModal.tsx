import React, {FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {modalStater} from "./modalSetter";
import Image from "next/image";
import styles from "../../styles/DefaultModals/nodes/feedBackModal.module.scss";
import fullList_comments_adaptive from "../../styles/FeedBackPage/feedbackFullList/fullListCommentsAdaptive.module.scss"

import {createPortal} from "react-dom";
import {IBaseModalFC} from "./useBaseModal";
import {JSXElement} from "@typescript-eslint/types/dist/generated/ast-spec";
import ISTComment, {printComments} from "../../components/UI/ISTComment/ISTComment";

import show_all_img from "../../public/LandingPages/FeedBack/FullList/show_all.svg"
import fb_closer_img from "../../public/LandingPages/FeedBack/FullList/PU_closer.svg"
import {reviewItem} from "../../Apollo/Queries/landingPages/feedbackPage/getFB_Reviews";
import cstm_adaptive_comments from "../../components/UI/ISTComment/adaptiveForShortened.module.scss";

const useFeedBackModal = (fb_list: Array<reviewItem>) => {

    const modalComponent = useMemo(()=>{
        return new modalStater();
    },[]);

    const ModalView:FC<IBaseModalFC> = ({
                                         children,
                                         border,
                                         data,
                                         currentStateSetter
                                     }) =>{

        const[isBrowser, setIsBrowser] = useState(false);
        const[nData, dataUpdate] = useState<modalStater>(null);

        const[listIsDeployed, setListDeployed] = useState<boolean>(false);
        const fb_wrapper = useRef<HTMLDivElement>(null);

        useEffect(()=>{
            setIsBrowser(true);
            if(data){
                data.setDataUpdater(dataUpdate);
                dataUpdate(data);
            }

        },[])

        const handleCloser = () => {
            if(currentStateSetter)
                currentStateSetter(false);
            data.switch(false);
        }

        const openFullList = useCallback(()=>{
            if(!listIsDeployed){
                setListDeployed(true);
                if(fb_wrapper && fb_wrapper.current){
                    fb_wrapper.current.classList.add(styles.deployed_wrapper);
                }
            }
        },[fb_wrapper, listIsDeployed])

        const modal = modalComponent.state ? (
            <>
                <div className={`container-fluid ${styles.feedback_container}
                d-flex justify-content-center align-items-end
            `}>
                    <div className={styles.feedback_data_wrapper}
                        ref={fb_wrapper}
                        onWheel={()=>openFullList()}
                        onTouchMove={()=>openFullList()}
                    >

                        <div className={styles.feedback_closer}
                             onClick={()=>handleCloser()}>
                            <Image
                                src={fb_closer_img}
                                alt={"close this window"}
                                fill={true}

                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    padding: "10px"
                                }}
                            />
                        </div>

                        <div className={styles.feedback_data}>
                            <div className={styles.feedback_data_header}>
                                <div className={styles.feedback_title}>
                                    All reviews
                                </div>
                            </div>

                            <div className={styles.feedback_comments}>
                                {printComments(
                                        fb_list,
                                        "modal_reviews",
                                        fullList_comments_adaptive,
                                        styles.fb_comments_wrapper,
                                        styles.fb_comment_container
                                )}
                                {/*<div className={styles.fb_comments_wrapper}>*/}
                                {/*    <div className={styles.fb_comment_container}>*/}
                                {/*        <ISTComment*/}
                                {/*            name={"John Doe John Doe John Doe"}*/}
                                {/*            rate={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1673194410/Emoji/emoji_stars_eyes_happy_icon_512_qhyoah.png"}*/}
                                {/*            comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non eros placerat, ornare eros ut, elementum odio Lorem ipsum dolor sit amet, consectetur adipiscing elitIn non eros placerat, ornare eros ut, elementum odio"}*/}
                                {/*            category={"Category name Category name Category name"}*/}

                                {/*            customAdaptiveStyles={fullList_comments_adaptive}*/}

                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div className={styles.feedback_more_comments}
                                onClick={openFullList}
                            >
                                <Image
                                    src={show_all_img}
                                    alt={"show all comments"}
                                    className={styles.feedback_more_comments_img}
                                    width={30}
                                    height={18}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : null

        return isBrowser ? createPortal(modal,
                document.getElementById("PopUpBase"))
            : null;
    }


    return{
        modalComponent,
        ModalView
    }
}

export default useFeedBackModal;