import styles from "../../styles/Catalog.module.css"
import NextImageRatioSaver from "../NextImageRatioSaver"

export default function CatalogProductItem({imgPath}){
    return(
        <>
            <div className={styles.ProductItemCont}>

                <div className={styles.ProductItem}>
                    <div className={styles.PI_ImageBlock}>
                    <NextImageRatioSaver Img={imgPath} hPrime={true} wPrime={false}/>
                    </div>

                    <div className={styles.PI_FuncBlock}>
                        <div className={styles.PI_AboutItem}>
                            <div className={styles.PI_About_Name}>
                                Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)
                            </div>
                            <p>Цена: <a>357 750</a> ₽</p>
                        </div>
                        <div>

                        </div>
                    </div>

                </div>

                <div className={styles.PI_AddToCart}>
                            <button className={styles.AddedToCart}>
                                <div className={styles.PI_AddToCart_Message}>
                                    <p>Добавить в корзину</p>
                                </div>
                            </button>

                </div>
            </div>
        </>
    )
}