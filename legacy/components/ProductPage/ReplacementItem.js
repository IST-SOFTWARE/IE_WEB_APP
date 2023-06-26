import styles from "./replacementItem.module.scss";
import { useState, useEffect } from "react"

export default function ReplacementItem({text, pu, headersSet, paragraph, data, puTyper, isType}){


    const puOpener = () =>{

            headersSet({
                header: paragraph !== undefined ? text + " " + paragraph + ":" : text,
                paragraph: data.length > 45 ? data.substr(0, 45) + "..." : data
            })

        
        puTyper(isType);
        pu(true);
    }
    useEffect(()=>{

    },[])

    return(
    <>
        <div className={styles.ReplacementItem}
        onClick={()=>{puOpener()}}>
            <p>{text}</p>
        </div>

    </>
    )
}