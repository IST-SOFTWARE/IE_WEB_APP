import styles from "../../styles/Header.module.css"
import { useContext } from "react/"
import CatalogContext from "../Context/CatalogContext"

export default function  CatalogBtn({text}){

    const Catalog = useContext(CatalogContext);

    return(
        <>
            <button className={styles.CatalogBtn}
            onClick={()=>Catalog.setCatalog(!Catalog.CatalogToggle)}>
                <img src="./Menu_btn.svg" alt="Menu btn" width="19"/>
                {text}
            </button>
        </>
    )
}
