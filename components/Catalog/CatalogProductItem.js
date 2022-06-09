import { useEffect, useState} from "react"
import styles from "../../styles/Catalog.module.css"
import NextImageRatioSaver from "../NextImageRatioSaver"
import Link from 'next/link'

import BlureProdImage from "../ProductPage/BlureProdImage";
import { inCart, cartCreateAct, rmeoveItem } from "../../cartActions/cartActions";

export default function CatalogProductItem({imgPath, Title, Price, id, slug}){
    


    const[addToCartResp, setCartResp] = useState(null);
    const[prodInCart, setInCart] = useState(false);

    const[addRemoveMessage, setMessage] = useState({
        message: "",
    });

    useEffect(()=>{
        if(inCart === undefined){
            setInCart(false);
        }
    },[])

    useEffect(()=>{
        if(prodInCart)
            setMessage({message: "Убрать из корзины"})
        else
            setMessage({message: "Добавить в корзину"})
    },[prodInCart])

    useEffect(()=>{
            inCart(id).
            then(elem => {
                setInCart(elem);
            })
    },[addToCartResp])

    function SetCarState(id, q, p){
        if(!prodInCart){
            cartCreateAct(id, q, p).then(elem => {
                setCartResp(elem);
            });
        }
        else{
            rmeoveItem(id).then(elem => {
                setCartResp(elem);
            });
        }

    }

    return(
        <>
            <div className={styles.ProductItemCont}>
                <Link href={`/products/${slug}`}>
                <div className={styles.ProductItem}>
                    <div className={styles.PI_ImageBlock}>
                    <NextImageRatioSaver Img={imgPath} hPrime={true} unique={slug}/>
                    </div>

                    <div className={styles.PI_FuncBlock}>
                        <div className={styles.PI_AboutItem}>
                            <div className={styles.PI_About_Name}>
                                {Title}
                            </div>
                            <p>Цена: <a>{Price}</a> ₽</p>
                        </div>
                        <div>

                        </div>
                    </div>

                </div>
                </Link>

                <div className={styles.PI_AddToCart}>
                            <button className={prodInCart ? styles.AddedToCart : ""}
                            onClick={(e)=>SetCarState(id, 1, Price)}>
                                <div className={styles.PI_AddToCart_Message}>
                                    <p>{addRemoveMessage.message}</p>
                                </div>
                            </button>
                </div>
            </div>
        </>
    )
}