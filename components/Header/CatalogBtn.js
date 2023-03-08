import styles from "../../styles/Header.module.css"
import { useContext, useState, useEffect} from "react/"
import CatalogContext from "../Context/CatalogContext"

export default function CatalogBtn({text}){

    const Catalog = useContext(CatalogContext);
    const [catalogBorgerImg, setBurgerImg] = useState("/Menu_btn.svg");

    useEffect(()=>{
        const CatalogBtn = document.querySelector(`.${styles.CatalogBtn}`);

        if(Catalog.CatalogToggle){
            CatalogBtn.classList.add(`${styles.open}`);
            setBurgerImg("/CatalogClose_ico.svg");
        }
        else{
            if(CatalogBtn && CatalogBtn.classList.contains(`${styles.open}`)){
                CatalogBtn.classList.remove(`${styles.open}`);
                // console.log("Catalog.CatalogToggle: ", Catalog.CatalogToggle);
            }
            setBurgerImg("/Menu_btn.svg");
        }

    }, [Catalog.CatalogToggle]);

    return(
        <>
            <button className={styles.CatalogBtn}
            onClick={()=>Catalog.setCatalog(!Catalog.CatalogToggle)}>
                <img src={catalogBorgerImg} alt="Menu btn" width="19"/>
                {text}
            </button>
        </>
    )
}
