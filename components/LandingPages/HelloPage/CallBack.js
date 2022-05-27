import styles from "../../../styles/CallBack.module.css"
import MobileBtn from "../../MobileComponents/MobileBtn"
import { useEffect, useState } from "react";
import setData from "../../../helpers/setCallBackReq";
import { CreateCallBack } from "../../../queries/CallBack";
import { Query, useMutation } from "react-query";

export default function CallBack({cbLangChecker, lContent, lng, puProvider, api_data}) {
    
    const[callBackData, setCallBackData] = useState(null);
    
    const[client_name, setName] = useState("");
    const[client_phone, setPhone] = useState("");
    const mutation = useMutation((newSession) => {setData(CreateCallBack, {data: newSession})})
  
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

    function sendPhoneNum(num, phone){
        setData(CreateCallBack, {data: {client_name, client_phone}})
    }

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
                        <button onClick={(e) => {mutation.mutate({status: "draft"})}}>
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