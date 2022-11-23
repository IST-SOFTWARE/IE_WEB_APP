import * as styles from "../../../styles/LandingStyles/PagesComponents/HelloPage/callBack.module.scss"
import {forwardRef, useEffect, useRef, useState} from "react";
import ISTInput, {inputTypesVars} from "../../UI/ISTInput/ISTInput";
import IstButton from "../../UI/ISTButton/IstButton";
import getOurContactsData, {
    contactsData,
    GET_OUR_CONTACTS_QUERY,
    IOurContacts
} from "../../../Apollo/Queries/landingPages/ourContactsQuery";
import {useQuery} from "@apollo/client";
import {dataSender} from "../../../helpers/dataSender";
import {apolloClient} from "../../../Apollo/apolloClient";
import {newCallBack, SEND_NEW_CALLBACK} from "../../../queries/sendCallBack";
import useCallRequest from "../../../Hooks/useCallRequest";

export default function CallBack({}) {



    const[callBackData, setCallBackData] = useState<newCallBack>(null);
    
    const[client_name, setName] = useState("");
    const[client_phone, setPhone] = useState("");
    const[isSessionSet, setSession] = useState(typeof window !== 'undefined' && localStorage.getItem('session_id') !== null)

    const[requestSent, setRequestSent] = useState();
    const[requestResModal, setRequestResModal] = useState(false);

    const[response, SetResp] = useState(null);

    const[contactsData, setContactsData] = useState<contactsData>(null);
    const {data, loading, error} = useQuery<IOurContacts>(GET_OUR_CONTACTS_QUERY, {
        variables:{
            lang: "ru-RU"
        }
    })

    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    const{sendErrors, send} = useCallRequest<newCallBack>(
        {
            client: apolloClient,
            data: [{
                refObj: phoneRef,
                required: true
            },{
                refObj: nameRef,
                required: true
            }]
        },
        client_name,
        client_phone,
        setCallBackData
    )

    useEffect(()=>{
        if(data){
            setContactsData(
                getOurContactsData(data)
            )
        }
    },[data])

    // const mutation = useMutation((newSession) =>
    // {
    //     if(!isSessionSet){
    //         setData(CreateCallBack, {data: newSession}).then(resp =>
    //             {
    //                 localStorage.setItem('session_id', resp.create_CB_Requests_item.id)
    //             })
    //         setSession(true);
    //     }
    //     else{
    //         setRequestSent(
    //             setData(updateCallBack, {
    //                 data: newSession,
    //                 id: localStorage.getItem('session_id')
    //             }))
    //     }
    // })
    
    // const sendPhoneNum = () => {
    //     const fieldsValid = CheckRequired();
    //     if(fieldsValid) {
    //         mutation.mutate({
    //             status: "draft",
    //             cb_order: [
    //                 {
    //                     client_name: client_name,
    //                     client_phone: client_phone
    //                 }
    //             ]
    //         })
    //     }
    // }

    useEffect(()=>{
        if(requestSent)
            setRequestResModal(true);
    },[requestSent])

    useEffect(()=>{
        if(!requestResModal) {
            setName("");
            setPhone("");
        }
    }, [requestResModal])


    // useEffect(()=>{
    //     setCallBackData(api_data);
    // })


    // useEffect(()=>{
    //     const callBack = document.querySelector(`.${styles.BaseBlock}`);
    //     callBack.classList.add(`${styles.unload}`);
    // },[])

    // useEffect(()=>{
    //
    //     if(callBackData && callBackData != null){
    //         const callBack = document.querySelector(`.${styles.BaseBlock}`);
    //         callBack.classList.remove(`${styles.unload}`);
    //     }
    //
    // },[callBackData])


    const sendCallBack = () => {
        send();
    }

    useEffect(()=>{
        console.log(response);
    },[response])

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
            
            {/*<div className={styles.CallBackMobBtn}>*/}
            {/*    <MobileBtn PUsetter={puProvider}/>*/}
            {/*</div>*/}

            {/*<CallRequestMessageModal modalState={requestResModal}*/}
            {/*                         modalSwitcher={setRequestResModal}*/}
            {/*                         userName={client_name}*/}
            {/*/>*/}

        </>
    )
}