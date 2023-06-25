import React, {CSSProperties, FC, useCallback, useEffect, useState} from "react";
import {cartAdder_fnc_onAdd, deleteProduct_fnc_onDelete} from "../../UI/common";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
    GRT_FILTERED_PRODUCTS_LIST,
    IProductFiltersVariables,
    IProducts_Q
} from "../../../queries/products/productActions";
import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import {useAppSelector} from "../../../Hooks/reduxSettings";

import styles from "./catalogWrapper.module.scss";

import {filterExclude_filtersHelper} from "../../../helpers/Catalog/filters";
import {
    GET_CART_COLLECTION_BY_ID,
    ICartCollection,
    ICartCollection_updated,
    ICartCollectionVariables, UPDATE_CART_BY_ID
} from "../../../queries/cart/cartActions";
import {
    products_addItem_actionsHelper,
    products_removeItem_actionsHelper
} from "../../../helpers/Products/products_actions.helper";
import {ICartItem_properties_data} from "../../UI/ISTProductItem/Abstract/ICartTypes";
import {
    redefining_to_CartModel_redefiningHelper,
    redefining_to_ICartItemPropertiesData_redefiningHelper
} from "../../../helpers/Products/products_redefining.helper";
import {ImageLoader} from "next/image";
import {imageLoader_imagesHelper} from "../../../helpers/Images/customImageLoader";
import {useDispatch} from "react-redux";
import {setOffset} from "../../../store/slices/catalogSlices/catalogPaginationSlice";

interface ICatalogWrapper {
    additionalForwarding: string

    cartID?: string;

    itemWrapper_ClassName?: string
    wrapper_ClassName?: string

    itemWrapperStyles?: CSSProperties
    wrapperStyles?: CSSProperties,
}

interface cartCollection {
    cartCollection_by_id: ICartCollection;
}

export const CatalogWrapper: FC<ICatalogWrapper> = ({
    itemWrapper_ClassName,
    wrapper_ClassName,
    wrapperStyles,
    itemWrapperStyles,
    cartID,
    additionalForwarding
}) => {

    const catalog = useAppSelector(selector => selector.catalog);
    const filtersList = useAppSelector(selector => selector.filtersList);
    const pagination = useAppSelector(selector => selector.pagination);
    const regionHandler = useAppSelector(selector => selector.region);
    const dispatch = useDispatch();

    const [cartProducts, setCartProducts] = useState<ICartItem_properties_data[]>([]);
    const [fetchedAll, setFetchedAll] = useState<boolean>(false);

    const [fullProdVars, setFullProdsVars] = useState<IProductFiltersVariables>({
        ...pagination,
        mfg: [""],
        unit: [""],
        type: [""],
        available: [""],
        search: ""
    })

    // QUERIES BLOCK
    const {data, error, fetchMore} = useQuery<IProducts_Q, IProductFiltersVariables>(
        GRT_FILTERED_PRODUCTS_LIST, {
            variables: fullProdVars,
            fetchPolicy: "network-only"
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


    useEffect(() => {
        if (!fetchedAll && pagination.offset > 0)
            fetchMore<IProducts_Q, IProductFiltersVariables>({
                variables: {
                    ...fullProdVars,
                    limit: pagination?.limit,
                    offset: pagination?.offset,
                }
            }).then(el => {
                    if (!(el?.data?.Products?.length > 0))
                        setFetchedAll(true);
                }
            ).catch(ex => console.error(ex));

    }, [pagination, fetchedAll])


    useEffect(() => {
        if (data && !cartData.called)
            getCartData()
                .then(el => {
                    const newCartItems = new Array<ICartItem_properties_data>();
                    el.data?.cartCollection_by_id.cart_model.map(_el => {
                        newCartItems.push({
                            productId: _el.product_id,
                            quantity: _el.quantity
                        } as ICartItem_properties_data)
                    })
                    setCartProducts(newCartItems);
                })
    }, [data, cartData])


    useEffect(() => {

        const timeOutId = setTimeout(() => {

            setFetchedAll(false);

            setFullProdsVars(prevState => {
                return prevState.search || catalog?.search ? {
                    ...prevState,
                    offset: 0,
                    search: catalog.search
                } : prevState
            });

            dispatch(setOffset(0));
        }, 1000);

        return () => clearTimeout(timeOutId);
    }, [catalog?.search]);


    useEffect(() => {
        if (!catalog.filters || !filtersList)
            return

        let newState = {
            mfg: catalog.filters.mfg && catalog.filters.mfg?.length > 0 ?
                filterExclude_filtersHelper(catalog.filters.mfg, filtersList.mfg) : [""],

            unit: catalog.filters.unit && catalog.filters.unit?.length > 0 ?
                filterExclude_filtersHelper(catalog.filters.unit, filtersList.unit) : [""],

            type: catalog.filters.type && catalog.filters.type?.length > 0 ?
                filterExclude_filtersHelper(catalog.filters.type, filtersList.type) : [""],

            available: catalog.filters.available && catalog.filters.available?.length > 0 ?
                filterExclude_filtersHelper(catalog.filters.available, filtersList.available) : [""],

        } as Pick<IProductFiltersVariables, "mfg" | "unit" | "type" | "available">

        setFetchedAll(false);

        setFullProdsVars(prevState => {
            return {
                ...prevState,
                ...newState,
                offset: 0,
            }
        });

        dispatch(setOffset(0));

    }, [filtersList, catalog.filters])

    const cartAdder = useCallback<cartAdder_fnc_onAdd>(
        async (id) => {

            if (!cartProducts || !cartData?.data?.cartCollection_by_id)
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

            if (!cartProducts || !cartData?.data?.cartCollection_by_id)
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

    const getImageSrc = useCallback((src: string, v_code: string): string => {

        const cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC;
        const imageHelper = new imageLoader_imagesHelper(cloudinary_acc);
        return imageHelper.getCloudinaryImageByUrl(src, v_code, "ProductsImages")

    }, [])

    return (
        <div style={{...wrapperStyles}}
             className={`${wrapper_ClassName} ${styles.wrapper} ${mutatedData?.loading ? styles.isLoading : ""}`}
        >
            {data && cartProducts ? data.Products.map((el, i) => {
                return (
                    <div
                        className={itemWrapper_ClassName}
                        style={itemWrapperStyles}
                        key={`productItemCatalog_${i}_key`}
                    >
                        <ISTProductItem
                            currency={regionHandler.currency === "RUB" ? "RU" : "EN"}
                            forwardingPath={`${additionalForwarding}${el?.slug}`}
                            style={{
                                fill: true,
                            }}

                            imageOptimization={{
                                loader: getImageLoader,
                                sizes: "350px",
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

                                    title: regionHandler.region === "RU" ?
                                        el.product_name_ru :
                                        el.product_name,

                                    price: regionHandler.currency === "RUB" ?
                                        el.price.toString() :
                                        (Number(el.price) * regionHandler.currencyMultiplier).toString(),

                                    vendCode: el?.vend_code.toString(),
                                    image: getImageSrc(el?.image_url, el?.vend_code.toString())
                                },
                            }}
                        />
                    </div>
                )
            }) : (
                <>
                    <div className={styles.loadingWrapper}/>
                </>
            )
            }
        </div>
    )
}