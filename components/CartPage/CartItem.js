import styles from "../../styles/CartPage/CartPage.module.css"

import { useState, useEffect,useCallback  } from "react"
import { getProductBy_id} from "../../queries/getProductBy_id"
import getData from "../../queries/getData"
import { cartCreateAct } from "../../cartActions/cartActions"


import IST_CheckBox from "../../components/IST_CheckBox"
import NextImageRatioSaver from "../NextImageRatioSaver"
import QuantityEditor from "./QuantityEditor"

import Link from "next/link"
import ComponentLoader from "../ComponentLoader"

export default function CartItem({id, quantity, isSelected, feedback}){

    const[Loaded, setLoaded] = useState(false);
    const[productData, setProductData] = useState();
    const[itemChecked, setItemChecked] = useState(false);
    const[actualQuantity, setQuantity] = useState(0);

    // const FeedBackSender = (p, id, q) => {
    //     cartCreateAct(id, q, p);
    // }

    const handleClick = (q) => {
            if(q && q !== null){
                cartCreateAct(id, q, productData ? productData.price : "");
                if(actualQuantity !== {actualQuantity}){
                    setQuantity(q);
                }
            }
    }

    useEffect(()=>{
        let resp = false;
        if(isSelected.ProdList.length > 0){
            isSelected.ProdList.map(elem => { 
                if(elem.id === id){
                    resp = true;
                }
            })
        }
        setItemChecked(resp);
    },[isSelected])



    useEffect(()=>{
        feedback(id, actualQuantity,  productData ? productData.price : "", itemChecked);
    }, [itemChecked, actualQuantity])


    // useEffect(()=>{
    //     // console.log(itemChecked);
    //     if(itemChecked !== null && (itemChecked === true || itemChecked === false)){
    //             FeedBackSender(itemChecked, price, id, quentity)
    //     }
    // }, [itemChecked])


    useEffect(()=>{
        const ProdLoad = async() => {
            if(id && id !== null){
                const data = await getData(getProductBy_id, 'Products', {id: parseFloat(id)});
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
            <ComponentLoader data={productData}>
                <Link href={`/products/${productData ? productData.slug : null}`}>
                <div className={styles.ItemImg}>
                    <NextImageRatioSaver
                    Img={productData ? productData.image_url : ""}
                    hPrime={true}
                    unique={productData ? productData.slug : ""}/>
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
                    <IST_CheckBox state={itemChecked}
                    feedback={setItemChecked}/>
                </div>
            </ComponentLoader>
            </div>
        </>
    )
}