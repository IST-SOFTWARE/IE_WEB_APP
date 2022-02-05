import styles from "../styles/CallBack.module.css"

export default function CallBack({cbLangChecker, lContent, lng}) {
    return(
        <>
            <div className={styles.CallBack}>
                <div className={styles.BaseBlock}>
                <p>
                    {cbLangChecker(lContent,           
                    "Заказать звонок"
                    ,"SendFormTitle", lng)}
                :</p>
                
                    <div className={styles.InputBlock}>
                        <input type="text" placeholder=
                            {cbLangChecker(lContent,                   
                            "Имя"
                            ,"SendFormName", lng) + ":"}
                            
                        />
                        <input type="text" placeholder=
                            {cbLangChecker(lContent,                  
                            "Телефон"
                            ,"SendFormPhone", lng) + ":"}
                        />
                        <button>
                        {cbLangChecker(lContent,                    
                            "Телефон"
                            ,"SendFormSender", lng)}
                        </button>
                    </div>
                </div>
                <p>
                {cbLangChecker(lContent,                    
                "Наш телефон"
                ,"SendFormPhoneTitle", lng) + ": "}

                    <a>
                    {cbLangChecker(lContent,               
                    "+7(000)000-00-00"
                    ,"CompanyPhone", lng)}
                    </a>

                </p>
            </div>
        </>
    )
}