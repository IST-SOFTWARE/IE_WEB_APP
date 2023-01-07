import React, {FC, useEffect, useRef, useState} from 'react';
import styles from "../../styles/DefaultModals/nodes/CB_Request.module.scss";
import {ApolloClient, NormalizedCacheObject, useQuery} from "@apollo/client";
import ISTInput, {inputTypesVars} from "../UI/ISTInput/ISTInput";
import IstButton from "../UI/ISTButton/IstButton";
import { useRouter } from 'next/router'
import {GET_OUR_CONTACTS_QUERY, IOurContacts} from "../../Apollo/Queries/landingPages/ourContactsQuery";
import useCallRequest from "../../Hooks/useCallRequest";
import {apolloClient} from "../../Apollo/apolloClient";
import {modalStater} from "../../Hooks/baseModal/modalSetter";

interface ICB_modal{
    name_label: string,
    phone_label: string,

    name_example?: string,
    phone_example?: string,

    modal: modalStater;
}

const CallBackRequest_modal:FC<ICB_modal> = ({
    name_label,
    phone_label,
    phone_example,
    name_example,

    modal
 }) => {

    const[name, setName] = useState<string>("");
    const[phone, setPhone] = useState<string>("");
    const[actRegion, setActRegion] = useState<string>(null);

    const nameRef= useRef(null);
    const phoneRef = useRef(null);

    const {data, error} = useQuery<IOurContacts>(GET_OUR_CONTACTS_QUERY, {
        variables:{
            lang: actRegion
        }
    })

    const{errors, newData, send} = useCallRequest(

        [{
            refObj: phoneRef,
            required: true
        },{
            refObj: nameRef,
            required: true
        }],
        apolloClient,
        name,
        phone,
    )

    const router = useRouter();

    useEffect(()=>{
        setActRegion(router.locale);
    },[router])


    useEffect(()=>{
        if(newData){
            modal.editModal(
                `Спасибо, ${name}!`,
                "Мы скоро свяжемся с вами :D",
                false,
            )
        }
    },[newData])

    const sendRequest = () => {
        send();
    }


    return(
        <>
                <div className={styles.modal_CB}>
                    <p>{name_label}:</p>
                    <ISTInput inputType={inputTypesVars.any_string}
                              placeholder={`${name_example ? 
                                  name_example : name_label + ":"}`}
                              required={true}
                              outDataSetter={setName}
                              actualData={name}
                              ref={nameRef}
                    />

                    <p>{phone_label}:</p>
                    <ISTInput inputType={inputTypesVars.phone}
                              placeholder={`${phone_example ? 
                                  phone_example : phone_label + ":"}`}
                              required={true}
                              outDataSetter={setPhone}
                              actualData={phone}
                              ref={phoneRef}
                    />
                    <IstButton
                        title={"Отправить заявку"}
                        paddings={{horizontalPadding: 28, paddingFactor: 2}}
                        maxSize={{h: "47px"}}
                        size={{w: "100%"}}
                        borderRadius={"17px"}

                        buttonAction={()=>sendRequest()}
                    />

                    <div className={styles.contactsBlock}>
                        <a
                        href={`tel: ${data?.ourContacts.contacts_data[0]?.
                            phone_numbers[0]?.phone_item}`}

                        >{data?.ourContacts.contacts_data[0].
                            phone_numbers[0]?.phone_item}
                        </a>

                        {data?.ourContacts.contacts_data[0].phone_numbers.length > 1 ? (
                            <>
                                <a className={styles.points}>more</a>
                            </>
                        ) : null}
                    </div>

                </div>
        </>
    )
}

export default CallBackRequest_modal;