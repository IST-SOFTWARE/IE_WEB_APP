import React, {FC, useEffect, useState} from 'react';
import {IPageOfLanding} from "../../../Apollo/Queries/landingPage";
import styles from "../../../styles/LandingStyles/PagesComponents/ProductDemo/ProdDemo.module.scss"
import getGallery, {IGallery} from "../../GalleryTypes/GalleryTypes";
import Image from "next/image";
import Link from "next/link";
import CallBackRequest_modal from "../../DefaultModals/callBackRequest_modal";
import useBaseModal from "../../../Hooks/baseModal/useBaseModal";

interface IPage{
    page: IPageOfLanding;
}

const ProductDemo:FC<IPage>= (
    {
        page
    }
) => {


    const[galleryContent, setGalleryContent] = useState<IGallery>(null);
    const {modalComponent, ModalView} = useBaseModal();

    useEffect(()=>{
        if(page){
            setGalleryContent(getGallery(page));
        }
    },[page])

    useEffect(()=>{
        if(modalComponent){
            modalComponent.editModal(
                "Заказать звонок",
                "Есть вопросы? Оставь " +
                "заявку, а мы перезвоним!"
            )
        }
    },[modalComponent])

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
                        Оставь <span onClick={()=>{handleCB_Request()}}>заявку</span> и мы перезвоним!
                    </a>
                </div>
            </div>


            <ModalView border={false} data={modalComponent}>
                <CallBackRequest_modal
                    phone_label={"Телефон"}
                    name_label={"Имя"}
                    name_example={"Андрей"}
                    phone_example={"+7(000)000-00-00"}
                    modal={modalComponent}
                />
            </ModalView>


        </>

    )
}


export default ProductDemo;