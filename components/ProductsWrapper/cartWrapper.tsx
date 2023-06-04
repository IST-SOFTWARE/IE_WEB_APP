import React, {CSSProperties, FC, useCallback, useEffect, useState} from "react";
import {ICartItem_properties_data, ICartSelector} from "../UI/ISTProductItem/Abstract/ICartTypes";
import {
    cartItemGetter_fnc,
    deleteProduct_fnc_onDelete,
    IProductData,
    mobileTrigger_size,
    quantityEditor_fnc
} from "../UI/common";
import {IProductItem} from "../UI/ISTProductItem/common";
import {apolloClient} from "../../Apollo/apolloClient";
import {GET_PRODUCT_BY_ID, IProducts_Q} from "../../queries/products/productActions";
import {useQuery} from "@apollo/client";
import {
    GET_CART_COLLECTION_BY_ID,
    ICartCollection,
    ICartCollection_updated,
    ICartCollectionVariables, UPDATE_CART_BY_ID
} from "../../queries/cart/cartActions";
import {
    redefining_to_CartModel_redefiningHelper,
    redefining_to_ICartItemPropertiesData_redefiningHelper
} from "../../helpers/Products/products_redefining.helper";
import {
    products_editQuantity_actionsHelper,
    products_removeItem_actionsHelper
} from "../../helpers/Products/products_actions.helper";
import {data} from "yandex-maps";
import ISTProductItem from "../UI/ISTProductItem/ISTProductItem";


interface cartCollection {
    cartCollection_by_id: ICartCollection;
}

interface ICartWrapper{
    cartID: string,
    currency: Pick<IProductItem, "currency">
    cartSelector: Omit<ICartSelector, "id">

    mobileTriggerSize?: mobileTrigger_size,
    itemStyles?: Pick<IProductItem, "style">
    wrapperStyles?: CSSProperties,
}

export const CartWrapper: FC<ICartWrapper> = ({
    cartID,
    currency,
    cartSelector,

    mobileTriggerSize,
    itemStyles,
    wrapperStyles
}) => {

    const [products, setProducts] = useState<ICartItem_properties_data[]>([]);

    /**
     *  DATA FETCHING [CART DATA]
    */
    const {data, loading, error} = useQuery<cartCollection>(
        GET_CART_COLLECTION_BY_ID,
        {
            fetchPolicy: "cache-and-network",
            variables: {id: cartID},
        }
    );



    /**
     *  DATA UPDATER [CART DATA]
    */
    useEffect(() => {
        if (data && data.cartCollection_by_id)
            setProducts(redefining_to_ICartItemPropertiesData_redefiningHelper(
                data.cartCollection_by_id.cart_model)
            )
    }, [data]);

    /**
     *  DATA GETTER [PRODUCT DATA]
    */
    const getCartProductDataById: cartItemGetter_fnc = async (
        id: number | string,
        callBack
    ): Promise<IProductData> => {
        let outProduct = {} as IProductData;

        await apolloClient
            .query<IProducts_Q>({
                query: GET_PRODUCT_BY_ID,
                variables: {
                    id: Number(id),
                },
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

        return outProduct;
    };

    /**
     *  QUANTITY EDITOR
    */
    const editQuantity = useCallback<quantityEditor_fnc>(
        async (id,
               newQuantity,
               callBack
    ) => {

            if (!products || !data?.cartCollection_by_id)
                return

            const newCart =
                products_editQuantity_actionsHelper(products, id, newQuantity)

            const variables = {
                id: cartID,
                data: {
                    status: "Draft",
                    cart_model: redefining_to_CartModel_redefiningHelper(newCart),
                },
            } as ICartCollectionVariables;

            let _newQuantity = 0;


            await apolloClient
                .mutate<ICartCollection_updated>({
                    mutation: UPDATE_CART_BY_ID,
                    variables: variables,
                })
                .then((el) => {
                    if (el.data && !el.errors) {
                        _newQuantity = newQuantity;

                        if (callBack?.sideEffect && callBack?.flag === true)
                            callBack.sideEffect(_newQuantity);
                    }
                });

            return true
    }, [products, data]);

    /**
     *  PRODUCT REMOVER
    */
    const deleteProduct = useCallback<deleteProduct_fnc_onDelete>(
        async (id,
               callBack
        ) => {

            const newCart =
                products_removeItem_actionsHelper(products, id)

            if (!products || !data?.cartCollection_by_id)
                return

            const variables = {
                id: cartID,
                data: {
                    status: "Draft",
                    cart_model: redefining_to_CartModel_redefiningHelper(newCart),
                },
            } as ICartCollectionVariables;

            await apolloClient.mutate<ICartCollection_updated>({
                mutation: UPDATE_CART_BY_ID,
                variables: variables,
            }).then((el) => {

                if (el.data?.update_cartCollection_item && !el.errors) {
                    if (callBack?.sideEffect && callBack?.flag === true)
                        callBack.sideEffect(redefining_to_ICartItemPropertiesData_redefiningHelper(el.data.update_cartCollection_item.cart_model));
                }
            });

            return true
        }, [products, data]);


    /**
     *  CART WRAPPER VIEW
    */

    return data && products ? (
        <div style={wrapperStyles}>
            {products.map(({productId, quantity}, index) => {
                return (
                    <ISTProductItem
                        key={`ISTProductItem_${index}`}
                        currency={currency?.currency}
                        style={itemStyles?.style}

                        itemType={{
                            productType: "cart",
                            mobileSettings: {
                                mobileSizeTrigger: mobileTriggerSize
                            },

                            cartSelector: {
                                id: `${productId}_product_selector`,
                                selectedState: cartSelector?.selectedState,
                                setSelectedState: cartSelector?.setSelectedState,
                            },

                            data: {
                                productId: productId,
                                quantity: quantity,

                                cartItemGetter: getCartProductDataById,
                                quantityEditor: editQuantity,
                                deleteProduct: {
                                    onDelete: deleteProduct,
                                    productsListSetter: setProducts
                                },
                            },
                        }}
                    />
                );
            })}
        </div>
    ) : loading ? (
        <>
            <h1 style={{
               margin: "30% auto"
            }}>
                LOADING
            </h1>
        </>
    ) : (
        <>
            <h1 style={{
                margin: "30% auto",
                color: "red"
            }}>
                ERRoR :(
            </h1>
        </>
    )

}