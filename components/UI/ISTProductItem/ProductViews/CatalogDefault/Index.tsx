import Image from "next/image";
import React, {FC} from "react";
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
    forwardingPath,
    cartaAdder,
    cartStatus
}) => {
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
                                    alt="Product Item Image"
                                    src={data.image}
                                    fill={true}

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
                                 // onClick={cartaAdder ?
                                 //         cartaAdder.onAdd :
                                 //         null}
                            >
                                {
                                    cartStatus ? (
                                        <div className={styles.addToCart_container}>
                                            <Image
                                                fill={true}
                                                alt="imageBasket"
                                                src={addedToCart}
                                                style={{
                                                    padding: "6px 2px",
                                                    objectPosition: "center",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className={styles.addToCart_container}>
                                            <Image
                                                fill={true}
                                                alt="imageBasket"
                                                src={addBasketIcon}
                                                style={{
                                                    objectPosition: "center",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CatalogView;
