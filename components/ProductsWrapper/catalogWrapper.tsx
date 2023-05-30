import React, {CSSProperties, FC, useCallback, useEffect, useState} from "react";
import {IProductData} from "../UI/common";
import {useLazyQuery, useQuery} from "@apollo/client";
import {IQueryPaginationVariable} from "../../queries/common";
import {GRT_FILTERED_PRODUCTS_LIST, IProductFiltersVariables, IProducts_Q} from "../../queries/products/productActions";
import ISTProductItem from "../UI/ISTProductItem/ISTProductItem";
import {useAppSelector} from "../../Hooks/reduxSettings";
import {useDispatch} from "react-redux";
import catalog from "../Catalog/Catalog";

interface ICatalogWrapper{
    onFetchMore: () => void,
    search: string;

    itemWrapper_ClassName?: string
    wrapper_ClassName?: string

    itemWrapperStyles?: CSSProperties
    wrapperStyles? :CSSProperties
}

export const CatalogWrapper:FC<ICatalogWrapper> = ({
    onFetchMore,
    search = "",

    itemWrapper_ClassName,
    wrapper_ClassName,
    wrapperStyles,
    itemWrapperStyles
}) => {


    const filters = useAppSelector(selector => selector.catalog);
    const dispatch = useDispatch();

    const [products, setProducts] = useState<IProductData[]>([])

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

    useEffect(()=>{
        setFullProdsVars(prevState =>{
            console.log(prevState.limit);
            return{
                ...prevState,
                search: search
            }
        })
    },[search])

    useEffect(()=>{
        console.log("fullProdVars: ", fullProdVars);
    },[fullProdVars])


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

            {data ? data.Products.map((el, i) => {
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
                                        cartStatus: false
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