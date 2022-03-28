import styles from "../../styles/Header.module.css"
import { useState, useEffect, useCallback, useContext} from "react";
import CatalogContext from "../Context/CatalogContext"

export default function Search({placeholder}){
    const Catalog = useContext(CatalogContext);
    const [mobSearchActive, msActivator] = useState(false);

    const searchStyler = useCallback(e => {
        if(mobSearchActive === true){
            const inputSpace =  document.querySelector(`.${styles.search}`);

            document.querySelector(`.${styles.search_block}`).className += ` ${styles.active}`;
            inputSpace.className += ` ${styles.active}`;
            document.querySelector(`.${styles.header}`).className += ` ${styles.active}`;
            document.querySelector(`.${styles.sBtn}`).className += ` ${styles.active}`;

            inputSpace.focus();
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

    function SearchFocusHandler(obj){
        Catalog.setCatalog(true)
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
                <input type="text" placeholder={placeholder} className={styles.search}
                onFocus={(e)=>SearchFocusHandler(e)}/>
                <button className={styles.sBtn} onClick={() => handlerActivator()}>
                    <img src="./sBtn.png" alt="Search" width="28px"/>
                </button>
            </div>
        </>
    )
}
