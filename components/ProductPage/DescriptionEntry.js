import styles from "../../styles/ProductPage/ProductPageParticles.module.css";

export default function DescriptionEntry({Title, Params}){
    return(
    <>
        <div className={styles.DescEntryItem}>
            <p className={styles.DescEntryTitle}>{Title}:</p>
            <p className={styles.DescEntryParams}>{Params}</p>
        </div>
    </>
    )
}