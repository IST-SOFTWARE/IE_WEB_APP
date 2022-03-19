import { useState, useEffect, useCallback} from "react"
import { createPortal } from "react-dom";
// import styles from "../styles/PopUp.module.css"


export default function KeyboardShow({puState, children, closer}){
    const[isBrowser, setIsBrowser] = useState(false);

    // function backHider(e){
    //     if(e.target.classList.contains(`${styles.PopUpLayout}`) ||
    //     e.target.classList.contains(`${styles.PopUpBaseCantainer}`) ||
    //     e.target.id === "btn_closer"){
            
    //         document.querySelector(`.${styles.PopUpLayout}`).style.opacity = "0";

    //         setTimeout(() =>{
    //             closer(false);
    //         }, 300);
    //     } 
    //     else{
    //         null;
    //     }
    // }

    // useEffect(()=>{
    //     (!puState) ? document.body.style.overflowY = "auto" : document.body.style.overflowY = "hidden";
    //     (puState) ? document.querySelector(`.${styles.PopUpLayout}`).style.opacity = "1" : null;
    // },[puState])

    useEffect(()=>{
        setIsBrowser(true);
    },[]);

    const modalContent = puState ? (
        <>
            {children}
        </>
    ) : "";

    if(isBrowser){
        return createPortal(modalContent,
            document.getElementById("KeyboardHideContent"));
    } else{
        return null;
    }
}