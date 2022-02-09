import { useState, useEffect, useCallback} from "react"
import { createPortal } from "react-dom";
import styles from "../styles/PopUp.module.css"


export default function PopUpBase({puState, children, header, closer}){
    const[isBrowser, setIsBrowser] = useState(false);

    function backHider(e){
        if(e.target.classList.contains(`${styles.PopUpLayout}`) ||
        e.target.classList.contains(`${styles.PopUpBaseCantainer}`) ||
        e.target.id === "btn_closer"){
            
            document.querySelector(`.${styles.PopUpLayout}`).style.opacity = "0";

            setTimeout(() =>{
                closer(false);
            }, 300);
        } 
        else{
            null;
        }
    }

    useEffect(()=>{
        (!puState) ? document.body.style.overflowY = "auto" : document.body.style.overflowY = "hidden";
        (puState) ? document.querySelector(`.${styles.PopUpLayout}`).style.opacity = "1" : null;
    },[puState])

    useEffect(()=>{
        setIsBrowser(true);
    },[]);

    const modalContent = puState ? (
        <>
            <div className={styles.PopUpLayout} 
            onClick={(e) => backHider(e)}
            >
                <div className="container">
                    <div className={styles.PopUpBaseCantainer}>
                        <div className={styles.PopUpBaseContent}>
                            <div className={styles.PUB_header}>
                                <h1>
                                    {header}
                                </h1>

                                <button
                                onClick={(e) => backHider(e)}
                                >
                                    <img src="./pu_closer.svg" alt="Close" id="btn_closer"/>
                                </button>

                            </div>

                            <div className={styles.PUB_content}>
                               {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : "";

    if(isBrowser){
        return createPortal(modalContent,
            document.getElementById("PopUpBase"));
    } else{
        return null;
    }
}