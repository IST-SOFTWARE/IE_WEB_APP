import { useEffect } from "react";
import styles from "../../styles/ProdDemo.module.css"
import MainLabel from "../MainLabel";
import PrTypeCard from "../PrTypeCard";

export default function ProductDemo({PDLangChecker, content, lang}){
    
    useEffect(()=>{
        let AnyQ = document.querySelector("#AnyQ").innerHTML;
        AnyQ = AnyQ.replace(/\{/gi, "<a>");
        AnyQ = AnyQ.replace(/\}/gi, "</a>");
        document.querySelector("#AnyQ").innerHTML = AnyQ;
    },[lang])

    return(
        <>
            <div className={styles.ProductDemo}>
                <MainLabel padding="170px">
                {PDLangChecker(content,
                            "БОЛЬШОЙ ВЫБОР ЗАПЧАСТЕЙ\nДЛЯ ГРУЗОПОДЪЕМНОЙ\nТЕХНИКИ"
                            ,"Label", lang)}
                </MainLabel>
                <div className={styles.prTypesList}>
                    <PrTypeCard img={(content["1stCard"])["img"]} crop= "1.3"
                        text={PDLangChecker(content,
                            "Запчасти для лифтов"
                            ,"1stCard", lang)}
                    />
                    <PrTypeCard img={(content["2ndCard"])["img"]} crop= "0.95"
                            text={PDLangChecker(content,
                            "Запчасти для лифтов"
                            ,"2ndCard", lang)}
                    />
                    <PrTypeCard img={(content["3thCard"])["img"]} crop= "0.9"
                            text={PDLangChecker(content,
                            "Запчасти для лифтов"
                            ,"3thCard", lang)}
                    />

                    <div className={styles.openCatalogCard}>
                        <img src="/op_catalog.svg" width="95px"/>
                        <p>
                        {PDLangChecker(content,
                            "Открыть каталог"
                            ,"OpenCatalog", lang)}
                        </p>
                    </div>

                </div>
                <div className={styles.helpBlock}>
                    <h3>
                    {PDLangChecker(content,
                            "Возникли вопросы?"
                            ,"AnyQuestions", lang)}
                    </h3>
                    <p id="AnyQ">
                    {PDLangChecker(content,
                            "Оставь {заявку} и мы перезвоним!"
                            ,"LeaveReq", lang)}
                    </p>
                </div>
            </div>
        </>
    );
}