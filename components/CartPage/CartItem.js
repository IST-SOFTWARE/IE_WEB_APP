import styles from "../../styles/CartPage/CartPage.module.css"

import { useState, useEffect } from "react"
import { getProductDataById } from "../../queries/getProductDataById"
import getData from "../../queries/getData"
import { cartCreateAct } from "../../cartActions/cartActions"


import IST_CheckBox from "../../components/IST_CheckBox"
import NextImageRatioSaver from "../NextImageRatioSaver"
import QuantityEditor from "./QuantityEditor"

import Link from "next/link"
import ComponentLoader from "../ComponentLoader"

export default function CartItem({id, price, quantity, isSelected}){

    const[productData, setProductData] = useState();
    const[itemChecked, setItemChecked] = useState(null);

    const[loadedData, setloaded] = useState(null);

    // const FeedBackSender = (p, id, q) => {
    //     cartCreateAct(id, q, p);
    // }

    const handleClick = (q) => {
        if(q && q !== null)
            cartCreateAct(id, q, price);
        
    }

    // useEffect(()=>{
    //     // console.log(itemChecked);
    //     if(isSelected !== null && (isSelected === true || isSelected === false)){
    //         setItemChecked(isSelected);
    //     }
    // }, [isSelected])


    // useEffect(()=>{
    //     // console.log(itemChecked);
    //     if(itemChecked !== null && (itemChecked === true || itemChecked === false)){
    //             FeedBackSender(itemChecked, price, id, quentity)
    //     }
    // }, [itemChecked])


    useEffect(()=>{
        const ProdLoad = async() => {
            if(id && id !== null){
                const data = await getData(getProductDataById, 'Products', {id: parseFloat(id)});
                setProductData(data[0]);
                // console.log(data);
            }
        }

        if(!productData){
            ProdLoad();
        }
    });

    return(
        <>
            <div className={styles.CartItemContainer} style={!productData ?{
                    marginTop: 50 + "px"
            }:{
                    marginTop: ""
            }}>
            <ComponentLoader data={productData} data_setter={setloaded}>
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
                        <QuantityEditor clickEvent={handleClick} value={
                            quantity
                        } />
                        
                        <p>
                            <span className={styles.priceTag}>Цена: </span>

                            {new Intl.NumberFormat('ru-RU').format(
                                productData ? 
                                productData.price:
                                ""
                            )}
                      
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