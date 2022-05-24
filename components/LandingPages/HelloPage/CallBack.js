import styles from "../../../styles/CallBack.module.css"
import MobileBtn from "../../MobileComponents/MobileBtn"
import { useEffect, useState } from "react";

export default function CallBack({cbLangChecker, lContent, lng, puProvider, api_data}) {
    
    const[callBackData, setCallBackData] = useState(null);

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
                            
                        />
                        <input type="text" placeholder=
                            // {cbLangChecker(lContent,                  
                            // "Телефон"
                            // ,"SendFormPhone", lng) + ":"}
                            "Телефон:"
                        />
                        <button>
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
                
                    <a>
                    {/* {cbLangChecker(lContent,               
                    "+7(000)000-00-00"
                    ,"CompanyPhone", lng)} */}
                    {callBackData
                    ? "Наш телефон: " + callBackData.Phone_Num_Ru : ""}
                    </a>

                </p>
            </div>
            
            <div className={styles.CallBackMobBtn}>
                <MobileBtn PUsetter={puProvider}/>
            </div>
        </>
    )
}