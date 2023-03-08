import styles from "../../styles/Footer/footer.module.scss"
import {FC, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import getOurContactsData, {
    contactsData,
    GET_OUR_CONTACTS_QUERY,
    IOurContacts,
    IOurContactsVars
} from "../../queries/landingFeatures/ourContactsQuery";
import YandexMap from "./Map/YandexMap";

interface FooterData{
    route: string,
    height?: number,
}

const Footer:FC<FooterData> = (
                {
                    route,
                    height
                }) => {

    const[footerContent, setFooterContent] = useState<contactsData>(null);
    const {loading, data, error} = useQuery<IOurContacts, IOurContactsVars>(GET_OUR_CONTACTS_QUERY, {
            variables: {
                code: route
            }
        }
    )

    useEffect(()=>{
        document.body.style.paddingBottom =
            `${height ? height : 440}px`
    },[])

    useEffect(()=>{
        if(data)
           setFooterContent(
               getOurContactsData(data)
           )
    },[data])

    return data && footerContent? (
        <>
                <div className={styles.Footer}>
                    <div className={"container"}>
                        <div className={"row h-100"}>
                            <div className={"col-md-6"}>
                                <div className={styles.contactsBlock}>
                                    <p>Контакты:</p>
                                    <ul>
                                        <p>Наш телефон:</p>
                                        {footerContent.phone_numbers?.map(
                                            (phone, ph_i) => (
                                                <li key={`${ph_i}_phone_num`}>
                                                    <a href={`tel: ${phone?.phone_item}`}>
                                                        <span className={styles.margined}>
                                                            {phone?.phone_item}
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}


                                        <p>Наш Email:</p>
                                        {footerContent.emails?.map(
                                            (email, em_i) => (
                                                <li key={`${em_i}_mail`}>
                                                    <a href={`mailTo: ${email?.email_item}`}>
                                                        <span className={styles.margined}>
                                                            {email?.email_item}
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}

                                        <p>Наш Адрес:</p>
                                        {footerContent.addresses?.map(
                                            (address, ad_i) => (
                                                <li key={`${ad_i}_mail`}>
                                                    <a href={`${address?.address_map}`}
                                                       target={"_blank"} rel={"noreferrer"}>
                                                        <span className={styles.margined}>
                                                            {address?.address_name}
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>

                                </div>
                            </div>

                            <div className={"col-md-6 d-flex justify-content-end"}>
                                <div className={"d-none d-md-block"}
                                style={{
                                    height: "100%",
                                    width: "70%"
                                }}>
                                    <div className={styles.mapBlock}>
                                        <YandexMap
                                            location={footerContent?.addresses[0]?.address_map}
                                            zoom={10}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"row d-flex w-100"}>
                            <div className={"mx-auto justify-content-center"}>
                                <div className={styles.ourCompanyBlock}>
                                    <p>IST ELEVATOR</p>
                                    <a>All rights reserved</a>
                                </div>
                            </div>

                        </div>
                    </div>
            </div>

        </>
    ) : null
}

export default Footer;