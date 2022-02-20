import styles from "../../styles/Header.module.css"
import { useState, useEffect, useCallback } from "react";

export default function Search({placeholder}){
    const [mobSearchActive, msActivator] = useState(false);

    const searchStyler = useCallback(e => {
        if(mobSearchActive === true){
            document.querySelector(`.${styles.search_block}`).className += ` ${styles.active}`;
            document.querySelector(`.${styles.search}`).className += ` ${styles.active}`;
            document.querySelector(`.${styles.header}`).className += ` ${styles.active}`;
            document.querySelector(`.${styles.sBtn}`).className += ` ${styles.active}`;
        }
        else{
            if(document.querySelector(`.${styles.header} .${styles.active}`) !== null){
                let elems = document.querySelectorAll(`.${styles.active}`);
                [].forEach.call(elems, function(el) {
                    el.classList.remove(`${styles.active}`);
                });
            }
        }
    });

    function mobSerachCLickCloser(e){
        try{
            if(mobSearchActive === true){
                if(e.target.className.includes('active')){
                    return;
                }
                else{
                    msActivator(false);
                }
            }
        }
        catch{
            msActivator(false);
        }
    }

    function handlerActivator(){
        msActivator(!mobSearchActive);
    }

    
    useEffect(() => {
        document.addEventListener("click", mobSerachCLickCloser);
        return () => {
            document.removeEventListener("click", mobSerachCLickCloser);
        };
    }, [searchStyler]);


    useEffect(()=>{
        searchStyler()
    },[mobSearchActive])

    return(
        <>
            <div className={styles.search_block}>
                <input type="text" placeholder={placeholder} className={styles.search}/>
                <button className={styles.sBtn} onClick={() => handlerActivator()}>
                    <img src="./sBtn.png" alt="Search" width="28px"/>
                </button>
            </div>
        </>
    )
}
