import Image from "next/image";
import React, {FC, useCallback} from "react";
import styles from "./index.module.scss";

import addBasketIcon from "../src/add_to_basket.svg";
import noImg from "../src/Empty_Prod_image.svg";
import addedToCart from "../src/added_to_cart.svg"

import {IProductItem_catalog} from "../../Abstract/ICatalogTypes";
import Link from "next/link";


const CatalogView: FC<IProductItem_catalog> = ({
    style,
    currency,
    data,
    cartStatus,

    cartRemover,
    cartAdder,

    forwardingPath,
    imgLoaderFnc
}) => {

    const handleClick = useCallback(()=>{

        if(cartStatus === undefined || !data)
            return

        if(cartStatus)
            cartRemover ? cartRemover(data.id) : null

        else if(cartStatus === false)
            cartAdder ? cartAdder(data.id) : null

    },[cartRemover, cartAdder, cartStatus, data])



    return (
        <>
            <div className={styles.cardContainer}
                 style={{
                     margin: style?.margin,
                     width: style?.fill ? "100%" : (style?.width ? style?.width : "100%")
                 }}>
                <div className={styles.cardData}>

                    <Link href={forwardingPath ? forwardingPath : ""}>
                        <div className={styles.cardImg}>
                            {data?.image ? (
                                <Image
                                    alt={`${data.title}_Catalog_image`}
                                    src={data.image}
                                    fill={true}
                                    sizes={"100%"}


                                    placeholder={"blur"}
                                    blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGqSURBVHgBAJoBZf4BLDZB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAABmbHEABwYGAAAAAAD29vUA/v7+ANzb2QDDv70ABAAAAAAAAAAAbnR5APPy8QDDv7wA////AB4gIQBaXmIAFBUWAMO/vQAEAAAAAFVZXQAyNDYAvbq3AD1AQwAAAP8AGxweAKijnwAQERIAAAAAAAQAAAAAHyEiAI6JhADj4eAAAAAAAAUFBQBYXWEAxsTBAF1hZgAAAAAABAAAAAD5+fgA/Pv7AO/u7QAAAAAAAAAAAAEBAAACAgMA////AAAAAAACAAAAAAEAAQD8/PsAAAAAAAAAAAAAAAAA7u3tAEhNTwD///8AAAAAAAQAAAAADxARADQ3OgANDg8AAAAAAAEBAQBDR0kA4t/eAH54cwAAAAAAASw2Qf85PD4ALjAzAAEBAQAAAAAAAAAAAPj49wCgm5cAAAAAAAAAAAABLDZB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP//UD9QyWTN6H8AAAAASUVORK5CYII="}

                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center"
                                    }}
                                />
                            ) : (
                                <Image
                                    alt="Product Item Image"
                                    src={noImg}
                                    fill={true}
                                    sizes={"inherit"}

                                    placeholder={"empty"}
                                    blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGqSURBVHgBAJoBZf4BLDZB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAABmbHEABwYGAAAAAAD29vUA/v7+ANzb2QDDv70ABAAAAAAAAAAAbnR5APPy8QDDv7wA////AB4gIQBaXmIAFBUWAMO/vQAEAAAAAFVZXQAyNDYAvbq3AD1AQwAAAP8AGxweAKijnwAQERIAAAAAAAQAAAAAHyEiAI6JhADj4eAAAAAAAAUFBQBYXWEAxsTBAF1hZgAAAAAABAAAAAD5+fgA/Pv7AO/u7QAAAAAAAAAAAAEBAAACAgMA////AAAAAAACAAAAAAEAAQD8/PsAAAAAAAAAAAAAAAAA7u3tAEhNTwD///8AAAAAAAQAAAAADxARADQ3OgANDg8AAAAAAAEBAQBDR0kA4t/eAH54cwAAAAAAASw2Qf85PD4ALjAzAAEBAQAAAAAAAAAAAPj49wCgm5cAAAAAAAAAAAABLDZB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAP//UD9QyWTN6H8AAAAASUVORK5CYII="}

                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center"
                                    }}
                                />
                            )}
                        </div>
                    </Link>

                    <div className={styles.InfBlockContainer}>
                        <div className={styles.productInformation}>
                            <div className={styles.productTitle}>{data.title}</div>
                            <div className={styles.price}>

                                <div className={styles.priceValue}>
                                    {data && !isNaN(Number(data?.price))
                                        ? new Intl.NumberFormat(currency).format(
                                            Number(data?.price)
                                        )
                                    : null}
                                </div>

                                <span>
                                    {currency === "RU" ? "₽" : "$"}
                                </span>
                            </div>

                            <div className={`${styles.addToBasket} ${cartStatus ? styles.added : ""}`}
                                 onClick={()=>handleClick()}
                            >
                                <div className={`${styles.addToCart_container} ${cartStatus ? styles.added_ico : ""}`}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CatalogView;
