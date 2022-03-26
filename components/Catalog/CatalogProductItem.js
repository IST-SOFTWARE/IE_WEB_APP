import { useEffect, useState} from "react"
import styles from "../../styles/Catalog.module.css"
import NextImageRatioSaver from "../NextImageRatioSaver"

export default function CatalogProductItem({imgPath, inCart}){
    
    const[isInCart, setInCart] = useState(inCart);
    const[addRemoveMessage, setMessage] = useState({
        message: "",
    });

    useEffect(()=>{
        if(inCart === undefined){
            setInCart(false);
        }
    },[])

    useEffect(()=>{
        if(isInCart)
            setMessage({message: "Убрать из корзины"})
        else
            setMessage({message: "Добавить в корзину"})
    },[isInCart])

    function SetCarState(e){
        isInCart ? setInCart(false) : setInCart(true);
    }

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
                            <button className={isInCart ? styles.AddedToCart : ""}
                            onClick={(e)=>SetCarState(e)}>
                                <div className={styles.PI_AddToCart_Message}>
                                    <p>{addRemoveMessage.message}</p>
                                </div>
                            </button>
                </div>
            </div>
        </>
    )
}