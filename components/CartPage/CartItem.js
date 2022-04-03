import IST_CheckBox from "../../components/IST_CheckBox"
import styles from "../../styles/CartPage/CartPage.module.css"
import NextImageRatioSaver from "../NextImageRatioSaver"

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

                    </div>
                    
                </div>
                <IST_CheckBox/>
            </div>
        </>
    )
}