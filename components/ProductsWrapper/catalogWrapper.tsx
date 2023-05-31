import React, {CSSProperties, FC, useEffect, useState} from "react";
import {IProductData} from "../UI/common";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GRT_FILTERED_PRODUCTS_LIST, IProductFiltersVariables, IProducts_Q} from "../../queries/products/productActions";
import ISTProductItem from "../UI/ISTProductItem/ISTProductItem";
import {useAppSelector} from "../../Hooks/reduxSettings";
import {useDispatch} from "react-redux";
import {filterExclude_filtersHelper} from "../../helpers/Catalog/filters";
import {GET_CART_COLLECTION_BY_ID, ICartCollection} from "../../queries/cart/cartActions";

interface ICatalogWrapper{
    onFetchMore: () => void,
    search: string;

    itemWrapper_ClassName?: string
    wrapper_ClassName?: string

    itemWrapperStyles?: CSSProperties
    wrapperStyles? :CSSProperties,

    cartID?: string
}

interface cartCollection {
    cartCollection_by_id: ICartCollection;
}

export const CatalogWrapper:FC<ICatalogWrapper> = ({
    onFetchMore,
    search = "",

    itemWrapper_ClassName,
    wrapper_ClassName,
    wrapperStyles,
    itemWrapperStyles,
    cartID
}) => {


    const catalog = useAppSelector(selector => selector.catalog);

    const filtersList = useAppSelector(selector => selector.filtersList)

    const dispatch = useDispatch();

    const [cartProducts, setCartProducts] = useState<IProductData[]>([])

    const [fullProdVars, setFullProdsVars] = useState<IProductFiltersVariables>({
        limit: 20,
        offset: 0,
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
                    const newCartItems = new Array<IProductData>();
                    el.data?.cartCollection_by_id.cart_model.map(_el => {
                        newCartItems.push({
                            id:  _el.product_id
                        } as IProductData)
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

    // const deleteProduct = useCallback<deleteProduct_fnc_onDelete>(
    //     async (id,
    //            callBack
    //     ) => {
    //
    //         const newCart =
    //             products_removeItem_actionsHelper(products, id)
    //
    //         if (!products || !data?.cartCollection_by_id)
    //             return
    //
    //         const variables = {
    //             id: data.cartCollection_by_id.id,
    //             data: {
    //                 status: "Draft",
    //                 cart_model: redefining_to_CartModel_redefiningHelper(newCart),
    //             },
    //         } as ICartCollectionVariables;
    //
    //         await apolloClient.mutate<ICartCollection_updated>({
    //             mutation: UPDATE_CART_BY_ID,
    //             variables: variables,
    //         }).then((el) => {
    //
    //             if (el.data?.update_cartCollection_item && !el.errors) {
    //                 if (callBack?.sideEffect && callBack?.flag === true)
    //                     callBack.sideEffect(redefining_to_ICartItemPropertiesData_redefiningHelper(el.data.update_cartCollection_item.cart_model));
    //             }
    //         });
    //
    //     return true
    // }, [products, data]);


    return(
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexWrap: "wrap",
            ...wrapperStyles
            }}

            className={itemWrapper_ClassName}
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
                                forwardingPath={`./prods/${el?.slug}`}
                                style={{
                                    width: "200px",
                                    margin: "0 15px 15px 0"
                                }}
                                itemType={{
                                    productType: "catalog",
                                    parameters: {
                                        inline: false,
                                        cartStatus: !!cartProducts.find(el => el.id === el.id),
                                    },
                                    data: {
                                        id: i,
                                        title: el?.product_name_ru,
                                        price: el?.price.toString(),
                                        vendCode: el?.vend_code.toString(),
                                        image: el?.image_url
                                    }
                                }}
                            />

                        </div>
                    )}) : ("NULL")
            }
        </div>
    )
}