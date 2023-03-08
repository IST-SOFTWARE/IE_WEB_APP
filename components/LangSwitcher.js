import { useState, useEffect, useContext} from "react"
import PageLevelsVisContext from "./Context/PageLevelsVisContext";

export default function LangSwitcher({switchFnc,SwLangChecker,lang,content}){
    const [lLang, setLeng] = useState(lang);
    const PageLevelsVis = useContext(PageLevelsVisContext);

useEffect(()=>{
    console.log(PageLevelsVis);
},[])

    useEffect(()=>{
        setLeng(lang);
    },[lang])

    return(
        <>
            {/* <div className="languegesBlock">
                <ul>
                    <li><button>Russian</button></li>
                    <li><button>English</button></li>
                </ul>
            </div> */}

            <button className={PageLevelsVis.mobilePageLevels ? "LangSwtchrBlock mob_hide" : "LangSwtchrBlock"}
            onClick={switchFnc}
            >
                <img src={"./" + lang + "_fl.svg"} alt="Language"/>
                <p>
                    {SwLangChecker(
                        content,
                        "Язык",
                        "Title",
                        lLang
                    ) + ": " + lang.toUpperCase()}

                </p>
            </button>

            <style jsx global>{`
            .LangSwtchrBlock:hover::before{
                content: '${SwLangChecker(
                    content,
                    "Переключить язык на \"ENG\" ",
                    "ChangeText",
                    lLang
                )}';
                width: 100px;
                text-align: center;
                vertical-align: middle;
                padding: 10px 30px;
                background: #2C3641;
                border-radius: 30px;
                color:#fff;
                box-shadow: 0px 0px 10px #191c1f;
                position: absolute;
                bottom: 100px;
                transition: 1s;
                font-family: roboto;
                font-size: 15px;
              }
            `}    
            </style>
        </>
    )
}