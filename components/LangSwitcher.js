import { useState,useEffect } from "react"

export default function LangSwitcher({switchFnc,SwLangChecker,lang,content}){
    const [lLang, setLeng] = useState(lang);

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

            <button className="LangSwtchrBlock"
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
        </>
    )
}