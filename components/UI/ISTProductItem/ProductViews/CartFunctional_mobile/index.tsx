import styles from "./index.module.scss";
import {useState, useEffect, useCallback, FC, CSSProperties, useContext} from "react";
import QuantityEditor from "./QuantityEditor";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import {IProductItem_cart} from "../../Abstract/ICartTypes";
import {ProductItemSelector} from "./ProductItemSelector";
import {IProductData} from "../../common";
import {switchSelectedState_cartActions} from "../../Actions/CartActions";
import {ISTProductItemDistributor_Context} from "../../Context";


const CartFunctional_mobile: FC = () => {

    const {
        data,
        style,
        currency,
        cartSelector
    } = useContext(ISTProductItemDistributor_Context);

    const [productData, setProductData] = useState<IProductData>();

    const [currentQuantity, setCurrentQuantity] = useState<number>(data?.quantity);

    const [checkedState, setCheckedState] = useState<boolean>(false);


    // SELECT / DESELECT

        useEffect(() => {
            setCheckedState(cartSelector?.selectedState.indexOf(cartSelector.id) > -1);
        }, [cartSelector]);

    //

    // Tracking the props of the number of elements
        useEffect(() => {
            if (data?.quantity)
                setCurrentQuantity(data.quantity);
        }, [data.quantity]);
    //

    // Getting information about a specific product
        useEffect(() => {
            let isSub = true;
            if (data.cartItemGetter)
                data
                    .cartItemGetter(data.productId, {
                        sideEffect: setProductData,
                        flag: isSub,
                    })
                    .catch((ex) => console.warn(ex));

            return () => {
                isSub = false;
            };
        }, [data]);
    //

    // Data and event transmission function ( REMOVE ITEM )
        const deleteProductBuilder = () => {
            let isSub = true;
            if (data.deleteProduct)
                data
                    .deleteProduct.onDelete(data.productId, {
                    sideEffect: data.deleteProduct.productsListSetter,
                    flag: isSub,
                })
                    .catch((ex) => console.warn(ex));

            return () => {
                isSub = false;
            };
        };
    //

    // Data and event transmission function ( EDIT QUANTITY )
        const quantityEditorBuilder = (quantity: number) => {
            let isSub = true;
            if (data.quantityEditor)
                data
                    .quantityEditor(data.productId, quantity, {
                        sideEffect: setCurrentQuantity,
                        flag: isSub,
                    })
                    .catch((ex) => console.warn(ex));

            return () => {
                isSub = false;
            };
        };
    //

    return (
        <>
            <div className={styles.CartItemContainer} style={style}>
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
                                    fill={true}
                                    alt="Product item empty image"
                                    src={emptyProduct}
                                />
                            )}
                        </Link>
                    </div>
                    <div className={styles.ItemDescription}>
                        <div>
                            <p>
                                {productData && productData.title
                                    ? productData.title
                                    : "No title on this product"}
                            </p>
                        </div>

                        <div className={styles.qAndPrice}>
                            {productData && !isNaN(Number(productData?.price))
                                ? new Intl.NumberFormat(currency).format(
                                    Number(productData?.price)
                                )
                                : null}
                            <span className={styles.qAndPrice}> ₽</span>
                        </div>
                        <QuantityEditor
                            quantity={currentQuantity}
                            onChange={quantityEditorBuilder}
                            onDelete={deleteProductBuilder}
                        />
                    </div>
                    {cartSelector ? (
                        <div className={styles.CheckBoxBlock}>
                            <ProductItemSelector
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
