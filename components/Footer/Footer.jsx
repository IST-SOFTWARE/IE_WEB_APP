import styles from "../../styles/Footer/footer.module.css"
import Image from "next/image";
import NextImageRatioSaver from "../NextImageRatioSaver";
import getData from "../../queries/getData";
import {getOurContacts} from "../../queries/getOurContacts";
import {useEffect, useState} from "react";

export default function Footer() {

    const[footerContent, setFooterContent] = useState();

    const footerResizer = () =>{

        const footer = document.querySelector(`.${styles.Footer}`);
        const contentBlock = document.querySelector('.pages_content');

        if(footer && contentBlock){
            const footerHeight = footer.offsetHeight;
            contentBlock.style.marginBottom = footerHeight + "px";
        }
    }

    useEffect(()=>{

        const contentLoad = async() => {
            const data = await getData(getOurContacts, 'ourContacts', {});
            setFooterContent(data);
        }

        if(!footerContent){
            contentLoad();
        }
    })

    useEffect(()=>{
        footerResizer();
    })

    useEffect(()=>{
        window.addEventListener("resize", footerResizer, false);
        return () => {
            window.removeEventListener("resize", footerResizer, false);
        };

    },[])

    return footerContent ? (
        <>
            <div className={styles.Footer}>
                <div className={styles.footer_block}>
                    <div className={"nb_container"}>
                        <div className={"row "}>
                            <div className={"col-md-7 col-sm-15"}>
                                <div className={styles.contactsBlock}>
                                    <p>Контакты:</p>

                                    <a href={`tel: ${footerContent.phone_number_ru.phoneNum}`}>
                                        Наш телефон:
                                            <span>
                                                {footerContent.phone_number_ru.phoneNum}
                                            </span>
                                    </a>

                                    <a href={`mailTo: ${footerContent.ourEmail.emailAddress}`}>
                                        Наш Email:
                                            <span>
                                                {footerContent.ourEmail.emailAddress}
                                            </span>
                                    </a>

                                    <a>Наш Адрес: {footerContent.address}</a>
                                </div>
                            </div>

                            <div className={"col-md-8 col-sm-15 d-flex justify-content-sm-center justify-content-end"}>
                                <div className={styles.mapBlock}>
                                        <iframe
                                            src={footerContent.address_map}
                                            width="100%"
                                            height="100%"
                                            allowFullScreen={false}
                                        />
                                </div>
                            </div>
                        </div>

                        <div className={styles.ourCompanyBlock}>
                            <p>IST ELEVATOR</p>
                            <a>All rights reserved</a>
                        </div>

                    </div>
                </div>
            </div>

        </>
    ) : null
}