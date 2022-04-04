import styles from "../../styles/CartPage/CartPage.module.css"

import IST_CheckBox from "../../components/IST_CheckBox"
import NextImageRatioSaver from "../NextImageRatioSaver"
import QuantityEditor from "./QuantityEditor"

export default function CartItem({image, name, vendCode, price}){
    return(
        <>
            <div className={styles.CartItemContainer}>
                <div className={styles.ItemImg}>
                    <NextImageRatioSaver
                    Img={image}
                    hPrime={true}/>
                </div>
                <div className={styles.ItemDescription}>
                    <p>{name}</p>
                    <a>Артикул: {vendCode}</a>
                    <div className={styles.qAndPrice}>
                        <QuantityEditor/>
                        <p>Цена: {price} руб</p>
                    </div>
                </div>
                <div className={styles.CheckBoxBlock}>
                    <IST_CheckBox/>
                </div>
            </div>
        </>
    )
}