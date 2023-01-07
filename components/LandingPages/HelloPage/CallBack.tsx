import * as styles from "../../../styles/LandingStyles/PagesComponents/HelloPage/callBack.module.scss"
import {FC, forwardRef, useEffect, useRef, useState} from "react";
import ISTInput, {inputTypesVars} from "../../UI/ISTInput/ISTInput";
import IstButton from "../../UI/ISTButton/IstButton";
import getOurContactsData, {
    contactsData,
    GET_OUR_CONTACTS_QUERY,
    IOurContacts
} from "../../../Apollo/Queries/landingPages/ourContactsQuery";
import {useQuery} from "@apollo/client";
import {apolloClient} from "../../../Apollo/apolloClient";
import useCallRequest from "../../../Hooks/useCallRequest";
import useBaseModal from "../../../Hooks/baseModal/useBaseModal";

interface CallBack{
    locale: string
}

const CallBack:FC<CallBack> = ({
    locale
    }) => {

    const[client_name, setName] = useState("");
    const[client_phone, setPhone] = useState("");

    const[contactsData, setContactsData] = useState<contactsData>(null);
    const {data, loading, error} = useQuery<IOurContacts>(GET_OUR_CONTACTS_QUERY, {
        variables:{
            lang: locale ?? "ne-us"
        }
    })

    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    const {modalComponent, ModalView} = useBaseModal();

    const{errors, newData, send} = useCallRequest(

        [{
            refObj: phoneRef,
            required: true
        },{
            refObj: nameRef,
            required: true
        }],
        apolloClient,
        client_name,
        client_phone,
    )


    useEffect(()=>{
        if(data){
            setContactsData(
                getOurContactsData(data)
            )
        }
    },[data])

    useEffect(()=> {
        console.log(newData, errors);
        if(newData){
            modalComponent.editModal(
                `Спасибо, ${client_name}!`,
                "Мы скоро свяжемся с вами :D"
                )
            modalComponent.switch(true);
        }
        if(errors){
            modalComponent.editModal(
                "Что-то пошло не так :(",
                "Перезагрузите страницу " +
                "и попробуйте еще раз"
            )
            modalComponent.switch(true);
        }
    },[newData, errors]);

    const sendCallBack = () => {
        send();
    }

    return(
        <>
            <div className={styles.callBack}>
                <div className={styles.baseBlock}>
                <p className={styles.callBackTitle}>
                    Заказать звонок:
                </p>
                
                    <div className={styles.inputBlock}>
                        <div style={{
                            marginBottom: "5px"
                        }}>
                            <ISTInput
                                inputType={inputTypesVars.any_string}
                                placeholder={"Имя:"}
                                required={true}
                                outDataSetter={setName}
                                actualData={client_name}

                                ref={nameRef}
                            />

                            <ISTInput
                                inputType={inputTypesVars.phone}
                                placeholder={"Телефон:"}
                                required={true}
                                outDataSetter={setPhone}
                                actualData={client_phone}

                                ref={phoneRef}
                            />
                        </div>
                        <IstButton
                            title={"Отправить заявку"}
                            paddings={{horizontalPadding: 28, paddingFactor: 2}}
                            maxSize={{h: "55px"}}
                            size={{w: "100%"}}
                            borderRadius={"28px"}

                            buttonAction={sendCallBack}
                        />
                    </div>
                </div>
                <p>
                    Наш телефон:
                    <span>
                        <a href={`tel:${contactsData ? 
                            contactsData.phone_numbers[0]?.phone_item
                            : null}`}>

                            {contactsData ?
                            contactsData.phone_numbers[0]?.phone_item
                            : null}
                        </a>
                    </span>
                </p>
            </div>

            <ModalView
                data={modalComponent}
                border={false}
            />

        </>
        )
    }


export default CallBack;