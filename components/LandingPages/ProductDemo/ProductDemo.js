import { useCallback, useEffect, useState} from "react";
import styles from "../../../styles/ProdDemo.module.css"

import MainLabel from "../../MainLabel";

import PrTypeCard from "./PrTypeCard";
import PDBackImg from "./PDBackImg";

import PopUpBase from "../../PopUpBase";
import CallBackModal from "../../ModalComponents/CallBackModal";

import LabelLoader from "../../ModalComponents/LabelLoader";

export default function ProductDemo({PDLangChecker, content, lang, api_cont}){
    const[puState, setPU] = useState(false);
    const[linkerValue, setLinkerValue] = useState();

    const parallax = useCallback((e) => {
        document.querySelectorAll('.bg_item').forEach(element => {
            const speed = element.getAttribute('data-speed');

            const x = (window.innerWidth - e.pageX *speed)/100;
            const y = (window.innerWidth - e.pageY *speed)/100;

            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }, []);

    
    const linker = useCallback(()=>{
        let AnyQ = document.querySelector("#AnyQ").innerHTML;
        AnyQ = AnyQ.replace(/\{/gi, "<a>");
        AnyQ = AnyQ.replace(/\}/gi, "</a>");
        document.querySelector("#AnyQ").innerHTML = AnyQ;
    })
    
    // useEffect(()=>{
    //     api_cont ? setIsLoaded(true) : setIsLoaded(false);
    // })

    useEffect(()=>{
        if(linkerValue){
                linker();
        }
    },[linkerValue])

    useEffect(()=>{
        document.addEventListener("mousemove", parallax);
    },[])

    return(
        <>

            <div className={styles.ProductDemo}>
                <div className={styles.PrDemoLabel} style={{zIndex:1}}>
                    <MainLabel padding="130px">
                    {/* {PDLangChecker(content,
                                "БОЛЬШОЙ ВЫБОР ЗАПЧАСТЕЙ\nДЛЯ ГРУЗОПОДЪЕМНОЙ\nТЕХНИКИ"
                                ,"Label", lang)} */}
                        <LabelLoader LoadSizeInSymbols={30} field={"Title_Ru"} data={api_cont}/>
                    </MainLabel>
                </div>
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
                    {/* {PDLangChecker(content,
                            "Возникли вопросы?"
                            ,"AnyQuestions", lang)} */}

                            <LabelLoader LoadSizeInSymbols={30} field={"Have_q_label_Ru"} data={api_cont}/>
                    </h3>
                    <p id="AnyQ" onClick={()=>setPU(true)}>
                            <LabelLoader LoadSizeInSymbols={15} field={"Linker_Ru"} data={api_cont} stateSetter={setLinkerValue}/>
                            {linkerValue}
                    {/* {PDLangChecker(content,
                            "Оставь {заявку} и мы перезвоним!"
                            ,"LeaveReq", lang)} */}
                    </p>
                </div>


                <div className={styles.PrDemoBG}>
                        <PDBackImg 
                        url="https://res.cloudinary.com/dv9xitsjg/image/upload/v1644234857/ProdDemoBG/1_urgeoc.png"
                        speed="-0.55"
                        />
                        <PDBackImg 
                        url="https://res.cloudinary.com/dv9xitsjg/image/upload/v1644234857/ProdDemoBG/2_ew2vdz.png"
                        speed="-0.67"
                        />
                        <PDBackImg 
                        url="https://res.cloudinary.com/dv9xitsjg/image/upload/v1644234858/ProdDemoBG/3_ttgj62.png"
                        speed="0.63"
                        />
                        <PDBackImg 
                        url="https://res.cloudinary.com/dv9xitsjg/image/upload/v1644234857/ProdDemoBG/4_h19fys.png"
                        speed="0.7"
                        />
                        <PDBackImg 
                        url="https://res.cloudinary.com/dv9xitsjg/image/upload/v1644247049/ProdDemoBG/5_ya01mv.png"
                        speed="2.3"
                        />

                </div>

            </div>

            <PopUpBase puState={puState} closer={setPU} header="Заказать звонок" paragraph="Есть вопросы? Оставь заявку, а мы перезвоним!">
                <CallBackModal
                backImg={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1645444475/ProdDemoBG/BG_ZAP_lj0igf.png"}
                />
            </PopUpBase>


        
        </>
    );
}