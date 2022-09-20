import PopUpBase from "../PopUpBase";
import cStyles from "../../styles/DefaultModals/contactsModal.module.css";
import {useEffect, useState} from "react";
import {getOurContacts} from "../../queries/getOurContacts"
import getData from "../../queries/getData";
import Link from "next/link";


export default function ContactsModal({modalState, modalSwitcher}){

    const[modalContent, setModalContent] = useState();

    useEffect(()=>{

        const contentLoad = async() => {
            const data = await getData(getOurContacts, 'ourContacts', {});
            setModalContent(data);
        }

        if(!modalContent){
            contentLoad();
        }
    })

    return modalContent ? (
    <>
        <PopUpBase puState={modalState} closer={modalSwitcher}
                   header={"Наши контакты"}
                   paragraph={"Мы всегда рады помочь вам!"}>

            <div className={cStyles.contacts}>
                <div className={cStyles.contactsData}>
                    Адрес электронной почты:
                    <span>
                        <a href={`mailTo: ${modalContent.ourEmail.emailAddress}`}>
                            {modalContent.ourEmail.emailAddress}
                        </a>
                    </span>
                </div>

                <div className={cStyles.contactsData}>
                    Наш телефон:
                    <span>
                            <a href={`tel: ${modalContent.phone_number_ru.phoneNum}`}>
                                {modalContent.phone_number_ru.phoneNum}
                            </a>
                    </span>
                </div>

                <div className={cStyles.contactsData}>
                    Наш адрес:
                    <span>
                            <a>
                                {modalContent.address}
                            </a>
                    </span>
                </div>

            </div>

            <Link href={`${modalContent.address_map}`}
                  passHref>
                <a className={cStyles.outLink}
                   target="_blank">
                    Показать на карте
                </a>
            </Link>

        </PopUpBase>
    </>
    ): null
}