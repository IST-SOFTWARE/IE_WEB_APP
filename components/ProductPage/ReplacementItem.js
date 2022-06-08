import styles from "../../styles/ProductPage/ProductPageParticles.module.css"
import { useState, useEffect } from "react"

export default function ReplacementItem({text, pu, headersSet, paragraph, data, puTyper, isType}){


    const puOpener = () =>{
        if(paragraph === undefined){
            headersSet({
                header: text + " для:",
                paragraph: data.length > 45 ? data.substr(0, 45) + "..." : data
            })
        }
        else{
            headersSet({
                header: text,
                paragraph
            })
        }
        
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