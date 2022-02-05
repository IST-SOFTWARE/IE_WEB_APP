import styles from "../../styles/Header.module.css"
export default function  CatalogBtn({text}){
    return(
        <>
            <button className={styles.CatalogBtn}>
                <img src="./Menu_btn.svg" alt="Menu btn" width="19"/>
                {text}
            </button>
        </>
    )
}
