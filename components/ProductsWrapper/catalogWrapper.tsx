import React, {CSSProperties, FC, useCallback, useEffect, useState} from "react";
import {cartAdder_fnc_onAdd, deleteProduct_fnc_onDelete, IProductData} from "../UI/common";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {GRT_FILTERED_PRODUCTS_LIST, IProductFiltersVariables, IProducts_Q} from "../../queries/products/productActions";
import ISTProductItem from "../UI/ISTProductItem/ISTProductItem";
import {useAppSelector} from "../../Hooks/reduxSettings";

import {filterExclude_filtersHelper} from "../../helpers/Catalog/filters";
import {
    GET_CART_COLLECTION_BY_ID,
    ICartCollection,
    ICartCollection_updated,
    ICartCollectionVariables, UPDATE_CART_BY_ID
} from "../../queries/cart/cartActions";
import {
    products_addItem_actionsHelper,
    products_removeItem_actionsHelper
} from "../../helpers/Products/products_actions.helper";
import {ICartItem_properties_data} from "../UI/ISTProductItem/Abstract/ICartTypes";
import {
    redefining_to_CartModel_redefiningHelper,
    redefining_to_ICartItemPropertiesData_redefiningHelper
} from "../../helpers/Products/products_redefining.helper";
import {ImageLoader} from "next/image";
import {imageLoader_imagesHelper} from "../../helpers/Images/customImageLoader";
import {IQueryPaginationVariable} from "../../queries/common";


interface ICatalogWrapper{
    additionalForwarding: string
    search: string;
    paginationOptions: IQueryPaginationVariable

    cartID?: string;

    itemWrapper_ClassName?: string
    wrapper_ClassName?: string

    itemWrapperStyles?: CSSProperties
    wrapperStyles? :CSSProperties,

}

interface cartCollection {
    cartCollection_by_id: ICartCollection;
}

export const CatalogWrapper:FC<ICatalogWrapper> = ({
    paginationOptions,
    search = "",

    itemWrapper_ClassName,
    wrapper_ClassName,
    wrapperStyles,
    itemWrapperStyles,
    cartID,
    additionalForwarding
}) => {

    const catalog = useAppSelector(selector => selector.catalog);
    const filtersList = useAppSelector(selector => selector.filtersList)

    const [cartProducts, setCartProducts] = useState<ICartItem_properties_data[]>([]);
    const [fullProdVars, setFullProdsVars] = useState<IProductFiltersVariables>({
        ...paginationOptions,
        mfg: [""],
        unit: [""],
        type: [""],
        search: search
    })

    const {data, loading, error} = useQuery<IProducts_Q, IProductFiltersVariables>(
        GRT_FILTERED_PRODUCTS_LIST, {
            variables: fullProdVars,
            fetchPolicy: "cache-and-network"
        }
    );

    const [getCartData, cartData] = useLazyQuery<cartCollection>(
        GET_CART_COLLECTION_BY_ID,
        {
            fetchPolicy: "cache-and-network",
            variables: {id: cartID},
        }
    );

    const [onMutateCart, mutatedData] =
        useMutation<ICartCollection_updated, ICartCollectionVariables>(UPDATE_CART_BY_ID)

    useEffect(()=>{
        setFullProdsVars(prevState =>{
            return{
                ...prevState,
                search: search
            }
        })
    },[search])

    useEffect(()=>{
        if(data && !cartData.called)
            getCartData()
                .then(el => {
                    const newCartItems = new Array<ICartItem_properties_data>();
                    el.data?.cartCollection_by_id.cart_model.map(_el => {
                        newCartItems.push({
                            productId:  _el.product_id,
                            quantity: _el.quantity
                        } as ICartItem_properties_data)
                    })
                    setCartProducts(newCartItems);
                })
    },[data, cartData])

    useEffect(()=>{
        if(!catalog.filters || !filtersList)
            return

        let newState = {
            mfg: catalog.filters.mfg && catalog.filters.mfg?.length > 0 ?
                filterExclude_filtersHelper(catalog.filters.mfg, filtersList.mfg) : [""],

            unit: catalog.filters.unit && catalog.filters.unit?.length > 0 ?
                filterExclude_filtersHelper(catalog.filters.unit, filtersList.unit) : [""],

            type: catalog.filters.type && catalog.filters.type?.length > 0 ?
                filterExclude_filtersHelper(catalog.filters.type, filtersList.type) : [""],
        } as Pick<IProductFiltersVariables, "mfg" | "unit" | "type">


        setFullProdsVars(prevState =>{
                return{
                    ...prevState,
                    ...newState
                }
        });
    },[filtersList, catalog.filters])

    const cartAdder = useCallback<cartAdder_fnc_onAdd>(
        async (id) => {

            if(!cartProducts || !cartData?.data?.cartCollection_by_id)
                return

            const newCart =
                products_addItem_actionsHelper(cartProducts, id, 1);

            const vars = {
                id: cartID,
                data: {
                    status: "Draft",
                    cart_model: redefining_to_CartModel_redefiningHelper(newCart)
                }
            } as ICartCollectionVariables;

                onMutateCart({variables: vars}).then((el) => {
                    if (el.data?.update_cartCollection_item && !el.errors)
                        setCartProducts(
                            redefining_to_ICartItemPropertiesData_redefiningHelper(
                                el.data.update_cartCollection_item.cart_model
                            )
                        )
                })

        return true

    }, [cartProducts, cartData]);


    const cartRemover = useCallback<deleteProduct_fnc_onDelete>(
        async (id) => {

            if(!cartProducts || !cartData?.data?.cartCollection_by_id)
                return

            const newCart =
                products_removeItem_actionsHelper(cartProducts, id);

            const vars = {
                id: cartID,
                data: {
                    status: "Draft",
                    cart_model: redefining_to_CartModel_redefiningHelper(newCart)
                }
            } as ICartCollectionVariables;


            onMutateCart({variables: vars}).then((el) => {
                if (el.data?.update_cartCollection_item && !el.errors)
                    setCartProducts(
                        redefining_to_ICartItemPropertiesData_redefiningHelper(
                            el.data.update_cartCollection_item.cart_model
                        )
                    )
            })

            return true
        }, [cartProducts, cartData]);

    const getImageLoader = useCallback<ImageLoader>(({src, width, quality}) => {

        let cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC
        const imageHelper = new imageLoader_imagesHelper(cloudinary_acc);
        const newUrl = imageHelper.customImageLoader({src, width, quality});

        return newUrl ? newUrl : src

    }, [])

    const getImageSrc = useCallback((src: string, v_code: string):string => {

        const cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC;
        const imageHelper = new imageLoader_imagesHelper(cloudinary_acc);
        return imageHelper.getCloudinaryImageByUrl(src, v_code, "ProductsImages")

    }, [])

    return(
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexWrap: "wrap",
            alignContent: "flex-start",
            opacity: mutatedData?.loading ? 0.5 : 1,
            ...wrapperStyles
            }}

            className={wrapper_ClassName}
        >

            {data && cartProducts ? data.Products.map((el, i) => {
                    return (
                        <div
                            className={itemWrapper_ClassName}
                            style={itemWrapperStyles}
                            key={`productItemCatalog_${i}_key`}
                        >
                            <ISTProductItem
                                currency={"RU"}
                                forwardingPath={`${additionalForwarding}${el?.slug}`}
                                style={{
                                    fill: true,
                                }}

                                imageOptimization={{
                                    loader: getImageLoader,
                                    sizes: "(min-width: 0) 256px, 256px",
                                }}

                                itemType={{
                                    productType: "catalog",
                                    parameters: {
                                        inline: false,
                                        cartStatus: !!cartProducts.find(_el => _el.productId === el.id),

                                        cartAdder: cartAdder,
                                        cartRemover: cartRemover
                                    },
                                    data: {
                                        id: el?.id,
                                        title: el?.product_name_ru,
                                        price: el?.price.toString(),
                                        vendCode: el?.vend_code.toString(),
                                        image: getImageSrc(el?.image_url, el?.vend_code.toString())
                                    },
                                }}
                            />
                        </div>
                    )}) : ("NULL")
            }
        </div>
    )
}