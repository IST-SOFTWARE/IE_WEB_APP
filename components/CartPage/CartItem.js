import styles from "../../styles/CartPage/CartPage.module.css"

import { useState, useEffect } from "react"

import IST_CheckBox from "../../components/IST_CheckBox"
import NextImageRatioSaver from "../NextImageRatioSaver"
import QuantityEditor from "./QuantityEditor"

export default function CartItem({image, name, vendCode, price, isSelected, feedback}){

    const[itemChecked, setItemChecked] = useState(isSelected);

    const[quentity, setQuentity] = useState(1);

    const FeedBackSender = (s, p, vc, q) => {
        if(feedback !== undefined){
            feedback(s, p, vc, q);
            // console.log(ic)
        }
    }

    useEffect(()=>{
        // console.log(itemChecked);
        FeedBackSender(itemChecked, price, vendCode, quentity)
    }, [itemChecked])


    return(
        <>
            <div className={styles.CartItemContainer}>
                <div className={styles.ItemImg}>
                    <NextImageRatioSaver
                    Img={image}
                    hPrime={true}/>
                </div>
                <div className={styles.ItemDescription}>
                    <div>
                        <p>{name}</p>
                    </div>
                    <a>Артикул: {vendCode}</a>
                    <div className={styles.qAndPrice}>
                        <QuantityEditor getQuentity={setQuentity}/>
                        <p>
                            <span className={styles.priceTag}>Цена: </span>
                            {price}
                            <span className={styles.priceTag}> руб</span>
                            <span className={styles.priceLilTag}> ₽</span>
                            </p>
                    </div>
                </div>
                <div className={styles.CheckBoxBlock}>
                    <IST_CheckBox state={isSelected}
                    feedback={setItemChecked}/>
                </div>
            </div>
        </>
    )
}