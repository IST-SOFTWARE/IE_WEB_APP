import React, {FC, useCallback, useEffect, useState} from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import {useQuery} from "@apollo/client";
import {
    cartItemGetter_fnc,
    deleteProduct_fnc,
    IProductData,
    quantityEditor_fnc,
} from "../../../UI/ISTProductItem/common";
import {
    GET_CART_COLLECTION_BY_ID,
    ICartCollection,
    ICartCollection_updated,
    ICartCollectionVariables,
    UPDATE_CART_BY_ID,
} from "../../../../queries/cart/cartActions";
import {apolloClient} from "../../../../Apollo/apolloClient";
import {
    GET_PRODUCT_BY_ID,
    IProducts,
} from "../../../../queries/products/productActions";
import {ICartItem_properties_data} from "../../../UI/ISTProductItem/Abstract/ICartTypes";

import {
    redefining_to_CartModel_redefiningHelper,
    redefining_to_ICartItemPropertiesData_redefiningHelper
} from "../../../../helpers/Products/products_redefining.helper";
import {
    products_editQuantity_actionsHelper,
    products_removeItem_actionsHelper
} from "../../../../helpers/Products/products_actions.helper";

interface cartCollection {
    cartCollection_by_id: ICartCollection;
}

const getCartProductDataById: cartItemGetter_fnc = async (
    id: number | string,
    callBack
): Promise<IProductData> => {
    let outProduct = {} as IProductData;

    await apolloClient
        .query<IProducts>({
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

const CatalogTestProdsModal: FC = () => {

    const [selected, setSelected] = useState<string[]>([]);


    const {data, loading, error} = useQuery<cartCollection>(
        GET_CART_COLLECTION_BY_ID,
        {
            fetchPolicy: "cache-and-network",
            variables: {id: "8d391766-5fea-4da8-ab71-9d7794e692f2"},
        }
    );

    const [products, setProducts] = useState<ICartItem_properties_data[]>([]);

    useEffect(() => {
        if (data && data.cartCollection_by_id)
            setProducts(redefining_to_ICartItemPropertiesData_redefiningHelper(
                data.cartCollection_by_id.cart_model)
            )
    }, [data]);


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
                id: data.cartCollection_by_id.id,
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

    const deleteProduct = useCallback<deleteProduct_fnc>(
        async (id, callBack) => {

            const newCart =
                products_removeItem_actionsHelper(products, id)

            if (!products || !data?.cartCollection_by_id)
                return

            const variables = {
                id: data.cartCollection_by_id.id,
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

    return (
        <>
            <div style={{width: "500px", height: "1200px"}}>
                {!loading && !error &&
                    products.map(({amountPrice, productId, quantity}, index) => {
                        return (
                            <ISTProductItem
                                key={`ISTProductItem_${index}`}
                                currency="RU"
                                style={{margin: "20px 0 0 0"}}

                                cartSelector={{
                                    id: `${productId}_product_selector`,
                                    selectedState: selected,
                                    setSelectedState: setSelected,
                                }}

                                itemType={{
                                    productType: "cart",
                                    mobileSettings: {
                                        mobileSizeTrigger: "LG_992"
                                    },
                                    data: {
                                        amountPrice: amountPrice,
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

        </>
    );
};

export default CatalogTestProdsModal;
