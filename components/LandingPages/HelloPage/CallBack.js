import styles from "../../../styles/CallBack.module.css"
import MobileBtn from "../../MobileComponents/MobileBtn"
import { useEffect, useState } from "react";
import setData from "../../../helpers/setData";
import { CreateCallBack, updateCallBack } from "../../../queries/CallBack";
import { Query, useMutation } from "react-query";

export default function CallBack({cbLangChecker, lContent, lng, puProvider, api_data}) {
    
    const[callBackData, setCallBackData] = useState(null);
    
    const[client_name, setName] = useState("");
    const[client_phone, setPhone] = useState("");
    const[isSessionSet, setSession] = useState(typeof window !== 'undefined' && localStorage.getItem('session_id') !== null)

    const mutation = useMutation((newSession) => 
    {
        if(!isSessionSet){
            setData(CreateCallBack, {data: newSession}).then(resp =>
                {
                    localStorage.setItem('session_id', resp.create_CB_Requests_item.id)
                })
            setSession(true);
        }
        else{
            setData(updateCallBack, {data: newSession, id: localStorage.getItem('session_id')})
        }
    })
    
    const sendPhoneNum = () => {
        mutation.mutate({
            status: "draft",
            cb_order:[
                {
                    client_name: client_name,
                    client_phone: client_phone
                }
            ]
        })
    }
    useEffect(()=>{
        setCallBackData(api_data);
    })
    

    useEffect(()=>{
        const callBack = document.querySelector(`.${styles.BaseBlock}`);
        callBack.classList.add(`${styles.unload}`);
    },[])

    useEffect(()=>{

        if(callBackData && callBackData != null){
            const callBack = document.querySelector(`.${styles.BaseBlock}`);
            callBack.classList.remove(`${styles.unload}`);
        }

    },[callBackData])


    return(
        <>
            <div className={styles.CallBack}>
                <div className={styles.BaseBlock}>
                <p>
                    {/* {cbLangChecker(lContent,           
                    "Заказать звонок"
                    ,"SendFormTitle", lng)} */}
                    {callBackData
                    ? callBackData.CallBack_Title_Ru + ":" : ""}
                </p>
                
                    <div className={styles.InputBlock}>
                        <input type="text" placeholder=
                            // {cbLangChecker(lContent,                   
                            // "Имя"
                            // ,"SendFormName", lng) + ":"}
                            "Имя:"
                            onChange={(e) => setName(e.target.value)}
                            value={client_name}
                            
                        />
                        <input type="text" placeholder=
                            // {cbLangChecker(lContent,                  
                            // "Телефон"
                            // ,"SendFormPhone", lng) + ":"}
                            "Телефон:"

                            onChange={(e) => setPhone(e.target.value)}
                            value={client_phone}
                        />
                        <button onClick={(e) => sendPhoneNum()}>
                        {/* {cbLangChecker(lContent,                    
                            "Телефон"
                            ,"SendFormSender", lng)} */}
                        

                        Отправить заявку
                        </button>
                    </div>
                </div>
                <p>
                {/* {cbLangChecker(lContent,                    
                "Наш телефон"
                ,"SendFormPhoneTitle", lng) + ": "} */}
                  {callBackData
                    ? "Наш телефон: " : ""}
                
                    <a>
                    {/* {cbLangChecker(lContent,               
                    "+7(000)000-00-00"
                    ,"CompanyPhone", lng)} */}
                    {callBackData
                    ? callBackData.Phone_Num_Ru : ""}
                    </a>

                </p>
            </div>
            
            <div className={styles.CallBackMobBtn}>
                <MobileBtn PUsetter={puProvider}/>
            </div>
        </>
    )
}