import styles from "../../styles/CartPage/CartPage.module.css"

import { useState, useEffect } from "react"
import { getProductDataById } from "../../queries/getProductDataById"
import getData from "../../queries/getData"

import IST_CheckBox from "../../components/IST_CheckBox"
import NextImageRatioSaver from "../NextImageRatioSaver"
import QuantityEditor from "./QuantityEditor"

import Link from "next/link"
import ComponentLoader from "../ComponentLoader"

export default function CartItem({id, image, name, vendCode, price, isSelected, feedback}){

    const[productData, setProductData] = useState();
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

    useEffect(()=>{
        const ProdLoad = async() => {
            if(id && id !== null){
                const data = await getData(getProductDataById, 'Products', {id: parseFloat(id)});
                setProductData(data[0]);
                console.log(data);
            }
        }

        if(!productData){
            ProdLoad();
        }
    });


    return(
        <>
            <div className={styles.CartItemContainer}>
            <ComponentLoader data={productData}>
                <Link href={`/products/${productData ? productData.slug : null}`}>
                <div className={styles.ItemImg}>
                    <NextImageRatioSaver
                    Img={productData ? productData.image_url : ""}
                    hPrime={true}/>
                </div>
                </Link>
                <div className={styles.ItemDescription}>
                    <div>
                        <p>{productData ? productData.product_name_ru : ""}</p>
                    </div>
                    <a>Артикул: {productData ? productData.vend_code : ""}</a>
                    <div className={styles.qAndPrice}>
                        <QuantityEditor getQuentity={setQuentity}/>
                        <p>
                            <span className={styles.priceTag}>Цена: </span>
                            {productData ? productData.price : ""}
                            <span className={styles.priceTag}> руб</span>
                            <span className={styles.priceLilTag}> ₽</span>
                            </p>
                    </div>
                </div>
                <div className={styles.CheckBoxBlock}>
                    <IST_CheckBox state={isSelected}
                    feedback={setItemChecked}/>
                </div>
            </ComponentLoader>
            </div>
        </>
    )
}