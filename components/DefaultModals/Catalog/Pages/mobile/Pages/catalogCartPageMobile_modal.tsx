import React, {FC, useEffect, useState} from 'react';
import styles from "../../../../../../styles/Modals/catalog/mobile/catalogCartPageMobileModal.module.scss"
import ISTButtonN from "../../../../../UI/ISTButton/ISTButtonN";
import {CatalogWrapper} from "../../../../../ProductsWrapper/catalogWrapper/catalogWrapper";
import {CartWrapper} from "../../../../../ProductsWrapper/cartWrapper";
import {useCartTotalSum} from "../../../../../../Hooks/useCartTotalSum/useCartTotalSum";
import {cartItemGetter_fnc, IProductData} from "../../../../../UI/common";
import {cartClient} from "../../../../../../Apollo/cartClient";
import {GET_PRODUCT_BY_ID, IProducts_Q} from "../../../../../../queries/products/productActions";
import {ICartSelector_type} from "../../../../../UI/ISTProductItem/Abstract/ICartTypes";
import {ICartTotalSum_prodsInf} from "../../../../../../Hooks/useCartTotalSum/ICartTotalSum";


const CatalogCartPageMobileModal:FC = ({

}) => {

    const getCartProductDataById: cartItemGetter_fnc = async (
        id: number | string,
        callBack
    ): Promise<IProductData> => {
        let outProduct = {} as IProductData;

        await cartClient
            .query<IProducts_Q>({
                query: GET_PRODUCT_BY_ID,
                variables: {
                    id: Number(id),
                },
                fetchPolicy: "network-only"
            })
            .then((prod) => {
                if (prod.data && prod.data.Products[0]) {
                    const _data = prod.data.Products[0];

                    outProduct = {
                        id: _data.id,
                        image: _data.image_url,
                        title: _data.product_name_ru,
                        price: _data.price.toString(),
                        vendCode: _data.vend_code.toString(),
                        slug: _data.slug,
                    };
                }

                if (callBack?.sideEffect && callBack?.flag === true)
                    callBack.sideEffect(outProduct);
            });

        // console.log("out prods: ", outProduct, id);
        return new Promise<IProductData>(resolve => {
            resolve(outProduct)
        });
    };

    const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([])
    const {getItemsInfo} = useCartTotalSum({
        cartSelector,
        getProductByIdQuery_func: getCartProductDataById

    })

    const [numOfSelected, setNumOfSelected] = useState<number>(0);
    const [totalSum, setTotalSum] = useState<number>(0);

    const handleOrder = () => {
        getItemsInfo()
            .then(res => console.log(res));
    }

    useEffect(()=>{

        const calcTotalSum = (prodsInf: ICartTotalSum_prodsInf[]) => {

            let totalPrice = 0;
            let totalSelectedNum = 0;

            cartSelector.map((el, i) => {
                const selectedProduct = el;
                const fetchedProduct = prodsInf.find(product => product.productId === selectedProduct.id);

                if (fetchedProduct) {
                    const itemPrice = fetchedProduct.pricePerItem * Number(selectedProduct.quantity);
                    totalPrice += itemPrice;
                    totalSelectedNum += Number(selectedProduct.quantity);
                }
            })

            setTotalSum(totalPrice);
            setNumOfSelected(totalSelectedNum);

        }

        getItemsInfo()
            .then(data => calcTotalSum(data));

    },[cartSelector])

    return(
        <div className={styles.mobileModalCartWrapper}>
            <div className={styles.cartWrapper}>

                <CartWrapper
                    currency={{
                         currency: "RU"
                    }}

                    cartID={"9cfa4d6a-f2e9-400c-b0a9-4c85ab777272"}
                    cartSelector={{
                        selectedState: cartSelector,
                        setSelectedState: setCartSelector
                    }}

                    wrapperStyles={{
                        width: "100%",
                        maxWidth: "100%",
                        padding: "0px 5px"
                    }}

                    itemStyles={{
                        style: {
                            margin: "0 0 15px 0",
                            fill: true
                        }
                    }}

                    mobileTriggerSize={"LG_992"}

                />
            </div>

            <div className={styles.cartTotalSum_and_order}>

                <div className={styles.totalSum}>

                    <div className={styles.selected}>
                        <div className={styles.selected_txt}>
                            Выбрано
                        </div>
                        <div className={styles.selected_num}>
                            {numOfSelected}
                        </div>
                    </div>

                    <div className={styles.selected}>
                        <div className={styles.selected_txt}>
                            Сумма
                        </div>
                        <div className={styles.selected_num}>
                            {totalSum} ₽
                        </div>
                    </div>

                </div>

                <div className={styles.btnPlace}>
                    <ISTButtonN
                        title={{
                            caption: "Оформить заказ"
                        }}
                        light={{
                            fill: true,
                            style: {
                                fillContainer: true,
                                borderRadius: "10px"
                            },
                        }}

                        onClick={()=>{handleOrder()}}

                    />
                </div>

            </div>

        </div>
    )
}

export default CatalogCartPageMobileModal;