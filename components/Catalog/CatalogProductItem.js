import styles from "../../styles/Catalog.module.css"
import NextImageRatioSaver from "../NextImageRatioSaver"

export default function CatalogProductItem({imgPath, id}){
    return(
        <>
            <div className={styles.ProductItemCont}>
                <div className={styles.ProductItem}>
                    <div className={styles.PI_ImageBlock}>
                    <NextImageRatioSaver Img={imgPath} hPrime={true} wPrime={false}/>
                    </div>
                </div>
            </div>
        </>
    )
}