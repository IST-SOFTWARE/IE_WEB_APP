import React, {FC, useEffect, useState} from 'react';
import {IPageOfLanding} from "../../../Apollo/Queries/landingPage";
import IstButton from "../../UI/ISTButton/IstButton";
import styles from "../../../styles/LandingStyles/PagesComponents/ProductDemo/ProdDemo.module.scss"
import getGallery, {IGallery} from "../../GalleryTypes/GalleryTypes";
import Image from "next/image";
import Link from "next/link";
import useWindowDimensions from "../../../Hooks/useWindowsDimensions";

interface IPage{
    page: IPageOfLanding;
}

const ProductDemo:FC<IPage>= (
    {
        page
    }
) => {

    const[galleryContent, setGalleryContent] = useState<IGallery>(null);
    const {width, height} = useWindowDimensions();


    useEffect(()=>{
        if(page){
            setGalleryContent(getGallery(page));
        }
    },[page])

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
                        Оставь <span onClick={()=>{}}>заявку</span> и мы перезвоним!
                    </a>
                </div>
            </div>

        </>

    )
}


export default ProductDemo;