import styles from "./index.module.scss";
import {useState, useEffect, useCallback, FC, CSSProperties, useContext} from "react";
import QuantityEditor from "../../QuantityEditor";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import {ProductItemSelector} from "../../../ISTCheckBox";
import {switchSelectedState_cartActions} from "../../Actions/CartActions";
import {ISTProductItemDistributor_Context} from "../../Context";
import {IProductItem_cart} from "../../Abstract/ICartTypes";


const CartFunctional_mobile: FC<IProductItem_cart> = ({
    onEditQuantity,
    onRemoveItem,

    productData,
    currentQuantity,
    checkedState
  }) => {

    const {
        style,
        currency,
        cartSelector
    } = useContext(ISTProductItemDistributor_Context);

    return (
        <>
            <div className={styles.CartItemContainer} style={{
                margin: style?.margin ? style?.margin : undefined,
                width: style?.fill ? "100%" : (style?.width ? style?.width : "100%")
            }}>
                <div className={styles.productContainer}>

                    <div className={styles.ItemImg}>
                        <Link href={`/products/${productData ? productData.slug : null}`}>
                            {productData && productData.image ? (
                                <Image
                                    alt="Product Item Image"
                                    src={productData.image}
                                    fill={true}
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            ) : (
                                <Image
                                    alt="Product item empty image"
                                    src={emptyProduct}

                                    fill={true}
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            )}
                        </Link>
                    </div>

                    <div className={styles.ItemDescription}>
                        <div className={styles.itemData}>
                            <div className={styles.title}>
                                {productData && productData.title
                                    ? productData.title
                                    : "No title on this product"}
                            </div>

                            <div className={styles.price}>

                                    <div className={styles.priceValue}>
                                        {productData && !isNaN(Number(productData?.price))
                                            ? new Intl.NumberFormat(currency).format(
                                                Number(productData?.price)
                                            )
                                            : null}
                                    </div>

                                    <span>
                                        {currency === "RU" ? "₽" : "$"}
                                    </span>

                            </div>
                        </div>

                        <div className={styles.qAndPrice}>
                            <div className={styles.qEditor}>
                                {currentQuantity && onEditQuantity && onRemoveItem ? (
                                        <QuantityEditor
                                            quantity={currentQuantity}
                                            onChange={onEditQuantity}
                                            onDelete={onRemoveItem}
                                        />
                                ): null}
                            </div>
                        </div>

                    </div>
                    {cartSelector ? (
                        <div className={styles.CheckBoxBlock}>
                            <ProductItemSelector
                                style={{
                                    width: "32px",
                                }}
                                state={checkedState}
                                onSelect={() => {
                                    switchSelectedState_cartActions(cartSelector.id, cartSelector);
                                }}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default CartFunctional_mobile;
