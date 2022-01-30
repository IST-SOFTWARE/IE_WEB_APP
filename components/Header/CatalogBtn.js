import styles from "../../styles/Header.module.css"
const CatalogBtn = () => {
    return(
        <>
            <button className={styles.CatalogBtn}>
                <img src="./Menu_btn.svg" alt="Menu btn" width="19"/>
                Каталог
            </button>
        </>
    )
}
export default CatalogBtn;