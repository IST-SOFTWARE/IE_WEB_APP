import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {IPageOfLanding} from "../../../queries/landingPage";
import styles from "../../../styles/LandingStyles/PagesComponents/ProductDemo/ProdDemo.module.scss"
import getGallery, {IGallery} from "../GalleryTypes";
import Image from "next/image";
import Link from "next/link";
import useBaseModal from "../../../Hooks/baseModal/useBaseModal";
import PuWrapper from "../../DefaultModals/popUp/puWrapper";
import CallBackRequest_modal, {ICB_RequestModalData} from "../../DefaultModals/CallBack/CallBackRequest_modal";
import {GET_OUR_CONTACTS_QUERY} from "../../../queries/landingFeatures/ourContactsQuery";
import {toc_cb_req} from "../../DefaultModals/table_of_contents/toc_cb_request";
import {toc_cb_response} from "../../DefaultModals/table_of_contents/toc_cb_response";
import CallBackResponse_modal from "../../DefaultModals/CallBack/CallBackResponse_modal";


interface IPage{
    page: IPageOfLanding;
}


const ProductDemo:FC<IPage>= (
    {
        page
    }
) => {

    const[galleryContent, setGalleryContent]
        = useState<IGallery>(null);

    // Modal windows
        const {modalComponent, ModalView} = useBaseModal(
            "APP_BODY_WRAPPER"
        );

        //user contacts for CB request
        const[newCB_data, setNewCB_data] =
            useState<ICB_RequestModalData>(null);

        const [currentModal, setCurrentModal] =
            useState<number>(0);
    //

    useEffect(()=>{
        if(page){
            setGalleryContent(getGallery(page));
        }
    },[page])

    const onCloser = useCallback((name: string) => {
        modalComponent.applyModalByName(name).then(e=>
            setCurrentModal(e.index)
        );
    },[modalComponent]);

    useEffect(()=>{
        if(modalComponent){

            modalComponent.setOnClose =
                () => onCloser(toc_cb_req.typeName);

            modalComponent.editModals([
                toc_cb_req,
                toc_cb_response,
            ], 0)
        }
    },[modalComponent])

    useEffect(()=>{
        if(newCB_data && modalComponent)
            modalComponent.applyModalByName(toc_cb_response.typeName)
                .then(el => setCurrentModal(el.index));
    },[newCB_data, modalComponent])


    const handleCB_Request = () =>{
        modalComponent.switch(true);
    }


    return(
        <>
            <div className={`col-12 ${styles.pdPage}`}>
                <div className={styles.pdList}>
                {galleryContent?.slides.map((content, cont_i)=>(
                    <div className={styles.prTypeCard} key={cont_i}>
                        <div className={styles.imageBlock}>
                            <Image
                                src={content.image}
                                fill={true}
                                style={{
                                    objectFit: "contain",
                                }}
                                alt="product_category"
                                priority={true}
                                sizes={"auto"}
                            />
                        </div>
                        <div className={styles.textBlock}>
                            <p>{content?.title}</p>
                            <Link href={content.action? content.action : "/"}>
                                <button style={{
                                    opacity: 0
                                }}>Подробнее...</button>
                            </Link>
                        </div>
                    </div>
                ))}
                    <div className={`${styles.prTypeCard} ${styles.opener}`}>
                        <Link href={"/catalog"}>
                            <button/>
                        </Link>
                        <div className={styles.imageBlock}>
                            <Image
                                src={"/op_catalog.svg"}
                                fill={true}
                                style={{
                                    objectFit: "contain",
                                }}
                                alt="product_category"
                                priority={true}
                                sizes={"auto"}
                            />
                        </div>
                        <div className={styles.textBlock}>
                            <p>Открыть каталог</p>
                        </div>
                    </div>
                </div>

                <div className={styles.helpBlock}>
                    <p>
                        Возникли вопросы?
                    </p>
                    <a>
                        Оставь <span onClick={()=>{
                            handleCB_Request()
                        }}>заявку</span> и мы перезвоним!
                    </a>
                </div>
            </div>


            <ModalView
                style={{zIndex: 10}}
            >
                <PuWrapper data={modalComponent}>
                    {modalComponent.isCurrentModal(toc_cb_req.typeName) ?
                        <CallBackRequest_modal
                            getContactsQuery={GET_OUR_CONTACTS_QUERY}
                            getContactVars={{code: "en-US"}}
                            reqStatusSetter={setNewCB_data}
                        />
                        : modalComponent.isCurrentModal(toc_cb_response.typeName) ?
                            <CallBackResponse_modal/>
                        : null
                    }
                </PuWrapper>
            </ModalView>
        </>

    )
}


export default ProductDemo;