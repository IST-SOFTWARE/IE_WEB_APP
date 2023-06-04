import Image from "next/image";
import React, {FC, useCallback, useEffect} from "react";
import styles from "./index.module.scss";
import noImg from "../src/Empty_Prod_image.svg";
import {IProductItem_catalog} from "../../Abstract/ICatalogTypes";
import Link from "next/link";
import {base64_empty_product} from "../src/base64_empty_product";

const CatalogView: FC<IProductItem_catalog> = ({
    style,
    currency,
    data,
    cartStatus,

    cartRemover,
    cartAdder,

    forwardingPath,
    imageOptimization
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
                                    sizes={
                                        imageOptimization?.sizes ?
                                            imageOptimization?.sizes :
                                            undefined
                                    }

                                    loader={
                                        imageOptimization?.loader ? imageOptimization?.loader : undefined
                                    }

                                    placeholder={"blur"}

                                    blurDataURL={
                                        imageOptimization?.placeholderData ?
                                            imageOptimization?.placeholderData :
                                            base64_empty_product
                                    }

                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center"
                                    }}

                                    loading={"lazy"}
                                />
                            ) : (
                                <Image
                                    alt="Product Item Image"
                                    src={noImg}
                                    fill={true}

                                    sizes={
                                        imageOptimization?.sizes ?
                                            imageOptimization?.sizes :
                                            undefined
                                    }

                                    placeholder={"blur"}
                                    blurDataURL={base64_empty_product}

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
