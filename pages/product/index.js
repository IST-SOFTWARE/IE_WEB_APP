import styles from "../../styles/ProductPage/ProductPage.module.css"

import NextImageRatioSaver from "../../components/NextImageRatioSaver"
import ReplacementItem from "../../components/ProductPage/ReplacementItem"
import AdditionalItem from "../../components/ProductPage/AdditionalItem"

import { useRef, useEffect} from "react";
import AvailabilityStatus from "../../components/ProductPage/AvailabilityStatus";
import DescriptionEntry from "../../components/ProductPage/DescriptionEntry";
import GeometryViewer from "../../components/ProductPage/GeometryViewer";

export default function ProductPage(){
    let ref = useRef();
    
    useEffect(()=>{
        const el = ref.current
        if(el){

            const onWheel = e =>{
                e.preventDefault()
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 4,
                    behavior: "smooth"
                })
            }

            el.addEventListener('wheel', onWheel);

            return () => el.removeEventListener('wheel', onWheel);
        }
    },[])

    return(
        <>
        <div className={styles.ProductPage}>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className={styles.ProductBlock}>
                            <p>
                                Редуктор главного привода FTJ160R (TD-FT160R)
                                правый для лебедки EC-W1 (п.ч. 49/2)
                            </p>
                            <a>
                                Артикул:  000000000 
                            </a>

                                <div className={styles.Image_and_replacement}>
                                
                                    <div className={styles.ProductImage}>
                                        <NextImageRatioSaver
                                        Img={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1649417232/ProductsImages/image_6_1_gz9vki.png"}
                                        wPrime={true}
                                        q={100}
                                        unique={"_MainPI"}
                                        />
                                    </div>
    
                                    <div className={styles.ProductReplacement}>
                                        <ReplacementItem/>
                                        <ReplacementItem/>
                                        <ReplacementItem/>
                                    </div>

                            </div>
                        </div>

                        <div className={styles.AdditionalProductsBlock}>
                            <p>С этим товаром покупают...</p>
                            <div className={styles.AdditionalList} ref={ref}>
                                <AdditionalItem/>
                                <AdditionalItem/>
                                <AdditionalItem/>
                                <AdditionalItem/>
                                <AdditionalItem/>
                                <AdditionalItem/>
                                <AdditionalItem/>
                                <AdditionalItem/>
                                <AdditionalItem/>
                            </div>
                        </div>
                    </div>

                    <div className="col-7">
                        <div className={styles.ProductDescription_wrapper}>
                            <div className={styles.ProductDescription}>
                                <AvailabilityStatus status={1}/>

                                <div className={styles.ProductParams}>
                                    <p className={styles.CharacteristicsTitle}>
                                        Характеристики:
                                    </p>
                                    <div className={styles.ParamsWrapper}>
                                        <DescriptionEntry Title={"Марка"} Params={"OTIS"}/>
                                        <DescriptionEntry Title={"Узел"} Params={"Главный привод, лебедка эскалатора, тормоз"}/>
                                        <DescriptionEntry Title={"Тип"} Params={"Главный привод"}/>
                                        <DescriptionEntry Title={"Вес"} Params={"260кг"}/>


                                    <div className={styles.GeometryBlock}>
                                        <GeometryViewer/>
                                    </div>

                                    <div className={styles.DetailedDescription}>
                                        <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        </p>
                                    </div>

                                    </div>
                                    <div className={styles.ProductActions}>
                                        <div className={styles.ProductPrice}>
                                            <p>
                                            <span className={styles.priceHider}>Цена: </span>
                                            357 750
                                            <span className={styles.priceHider}> руб</span>
                                            <span className={styles.monySymbol}> ₽</span>
                                            </p>
                                        </div>
                                        <div className={styles.Actions}>
                                            <button className={styles.AddToCartAction}>
                                                Добавить в корзину
                                            </button>

                                            <button className={styles.sendOrderAction}>
                                                Оформить заказ
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}