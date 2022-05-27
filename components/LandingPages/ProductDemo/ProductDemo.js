import { useCallback, useEffect, useState} from "react";
import styles from "../../../styles/ProdDemo.module.css"

import MainLabel from "../../MainLabel";

import PrTypeCard from "./PrTypeCard";
import PDBackImg from "./PDBackImg";

import PopUpBase from "../../PopUpBase";
import CallBackModal from "../../ModalComponents/CallBackModal";

import LabelLoader from "../../ModalComponents/LabelLoader";
import ComponentLoader from "../../ComponentLoader";

export default function ProductDemo({PDLangChecker, content, lang, api_cont, callBack_api}){
    
    const[puState, setPU] = useState(false);
    const [compLoaderData, setCompLoaderData] = useState();     // For Pop-Up

    const[linkerValue, setLinkerValue] = useState();            // For Linker

    const [pdPageData, setPdData] = useState();                 // For MainCont
    const [cardsData, setCardsData] = useState();               // For Cards

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
    
    useEffect(()=>{
        if(api_cont){
            setPdData(api_cont.Home_Page_our_products);
            setCardsData(api_cont.ProdDemo_Cards);
            console.log(cardsData);
        }
    })

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
                        <LabelLoader LoadSizeInSymbols={30} field={"Title_Ru"} data={pdPageData}/>
                    </MainLabel>
                </div>

                <div className={styles.prTypesList}>
                    <ComponentLoader data={cardsData} margin={20} fill_percent={75}>

                        <PrTypeCard img={
                            cardsData ? cardsData[0].Image : null
                        } crop= "1.3"
                            text={cardsData ? cardsData[0].Title : null}
                        />

                        <PrTypeCard img={
                            cardsData ? cardsData[1].Image : null
                        } crop= "0.95"
                            text={cardsData ? cardsData[1].Title : null}
                        />

                        <PrTypeCard img={
                            cardsData ? cardsData[2].Image : null
                        }crop= "0.9"
                            text={cardsData ? cardsData[2].Title : null}
                        />

                        <div className={styles.openCatalogCard}>
                            <img src="/op_catalog.svg" width="95px"/>
                            <p>
                            {PDLangChecker(content,
                                "Открыть каталог"
                                ,"OpenCatalog", lang)}
                            </p>
                        </div>

                    </ComponentLoader>
                </div>


                <div className={styles.helpBlock}>
                    <h3>
                    {/* {PDLangChecker(content,
                            "Возникли вопросы?"
                            ,"AnyQuestions", lang)} */}

                            <LabelLoader LoadSizeInSymbols={18} field={"Have_q_label_Ru"} data={pdPageData}/>
                    </h3>

                    <p id="AnyQ" onClick={()=>setPU(true)}>
                   
                        <LabelLoader LoadSizeInSymbols={15} field={"Linker_Ru"} data={pdPageData} stateSetter={setLinkerValue}/>
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


            <PopUpBase puState={puState} closer={setPU}
                header={compLoaderData ? compLoaderData.CallBack_Title_Ru : ""}
                paragraph={compLoaderData ? compLoaderData.CallBack_subtitle_Ru : ""}
                >
                    <ComponentLoader data={callBack_api} data_setter={setCompLoaderData}>
                        <CallBackModal
                        backImg={compLoaderData ? compLoaderData.BackImage : ""}
                        actPhone={compLoaderData ? compLoaderData.Phone_Num_Ru : ""}/>    
                    </ComponentLoader>        
            </PopUpBase>
        
        </>
    );
}