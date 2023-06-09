import React, { FC, useCallback, useEffect, useState } from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import { useQuery } from "@apollo/client";
import {
  GET_CART_COLLECTION_BY_ID,
  ICartCollection,
  ICartCollection_updated,
  ICartCollectionVariables,
  UPDATE_CART_BY_ID,
} from "../../../../queries/cart/cartActions";
import { apolloClient } from "../../../../Apollo/apolloClient";
import {
  GET_PRODUCT_BY_ID,
  IProducts_Q,
} from "../../../../queries/products/productActions";
import { ICartItem_properties_data } from "../../../UI/ISTProductItem/Abstract/ICartTypes";

import {
  redefining_to_CartModel_redefiningHelper,
  redefining_to_ICartItemPropertiesData_redefiningHelper,
} from "../../../../helpers/Products/products_redefining.helper";
import {
  products_editQuantity_actionsHelper,
  products_removeItem_actionsHelper,
} from "../../../../helpers/Products/products_actions.helper";
import {
  cartItemGetter_fnc,
  deleteProduct_fnc_onDelete,
  IProductData,
  quantityEditor_fnc,
} from "../../../UI/common";
import { useAppSelector } from "../../../../Hooks/reduxSettings";
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import {
  filterSetter_filtersHelper,
  isActiveNow_filtersHelper,
} from "../../../../helpers/Catalog/filters";
import useISTFiltersList from "../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import { ICatalogFiltersType } from "../../../../store/slices/common/catalogFiltersType";
import { useDispatch } from "react-redux";
import { onFilterSwitchCustom_t } from "../../../UI/hooks/ISTFiltersHook/common";
import { addNewFilter } from "../../../../store/slices/catalogSlices/catalogSlice";


interface mobileFIlterModal {
   pageDesignation: keyof ICatalogFiltersType;

}

interface cartCollection {
  cartCollection_by_id: ICartCollection;
}

const cartID = "e0a9d860-c0f9-4b6a-ace4-04ecf56b0f0c";

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

const CatalogTestProdsModal: FC<mobileFIlterModal> = ({pageDesignation}) => {
  const catalogFilter = useAppSelector((selector) => selector.filtersList);
  const catalog = useAppSelector((state) => state.catalog);

  const [firstFilter, firstActive, designation] =
    useISTFiltersList<ICatalogFiltersType>(pageDesignation);

  const dispatch = useDispatch();



  const switchFilter: onFilterSwitchCustom_t<keyof ICatalogFiltersType> =
    useCallback(
      (idx, state, name, options) => {
        if (!catalog || !catalog.filters || !options) return;

        const newFilters = filterSetter_filtersHelper(
          catalog.filters,
          options,
          name
        );

        dispatch(
          addNewFilter({
            key: options,
            filter: newFilters,
          })
        );
      },
      [dispatch, catalog]
    );

  return (
    <>
      {/* <div style={{width: "100%", height: "1200px", padding: "10px"}}>
                {!loading && !error &&
                    products.map(({productId, quantity}, index) => {
                        return (
                            <ISTProductItem
                                key={`ISTProductItem_${index}`}
                                currency="RU"
                                style={{
                                    margin: "20px 0 0 0"
                                }}

                                itemType={{
                                    productType: "cart",
                                    mobileSettings: {
                                        mobileSizeTrigger: "LG_992"
                                    },

                                    cartSelector: {
                                        id: `${productId}_product_selector`,
                                        selectedState: selected,
                                        setSelectedState: setSelected,
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
            </div> */}

      {catalogFilter && catalogFilter[pageDesignation] ? (
        <ISTFiltersList
          fields={catalogFilter[pageDesignation].map((el) => {
            return {
              fieldName: el,
              isCheckBox: true,
              isActive: isActiveNow_filtersHelper(catalog?.filters, pageDesignation, el),
            };
          })}
          hookedData={firstFilter}
          switcherOptions={{
            onSwitch: switchFilter,
            filterDesignation: designation,
          }}
        />
      ) : null}
    </>
  );
};

export default CatalogTestProdsModal;


  //   const [selected, setSelected] = useState<string[]>([]);

  //   const { data, loading, error } = useQuery<cartCollection>(
  //     GET_CART_COLLECTION_BY_ID,
  //     {
  //       fetchPolicy: "cache-and-network",
  //       variables: { id: cartID },
  //     }
  //   );

  //   const [products, setProducts] = useState<ICartItem_properties_data[]>([]);

  //   useEffect(() => {
  //     if (data && data.cartCollection_by_id)
  //       setProducts(
  //         redefining_to_ICartItemPropertiesData_redefiningHelper(
  //           data.cartCollection_by_id.cart_model
  //         )
  //       );
  //   }, [data]);

  //   const editQuantity = useCallback<quantityEditor_fnc>(
  //     async (id, newQuantity, callBack) => {
  //       if (!products || !data?.cartCollection_by_id) return;

  //       const newCart = products_editQuantity_actionsHelper(
  //         products,
  //         id,
  //         newQuantity
  //       );

  //       const variables = {
  //         id: data.cartCollection_by_id.id,
  //         data: {
  //           status: "Draft",
  //           cart_model: redefining_to_CartModel_redefiningHelper(newCart),
  //         },
  //       } as ICartCollectionVariables;

  //       let _newQuantity = 0;

  //       await apolloClient
  //         .mutate<ICartCollection_updated>({
  //           mutation: UPDATE_CART_BY_ID,
  //           variables: variables,
  //         })
  //         .then((el) => {
  //           if (el.data && !el.errors) {
  //             _newQuantity = newQuantity;

  //             if (callBack?.sideEffect && callBack?.flag === true)
  //               callBack.sideEffect(_newQuantity);
  //           }
  //         });

  //       return true;
  //     },
  //     [products, data]
  //   );

  //   const deleteProduct = useCallback<deleteProduct_fnc_onDelete>(
  //     async (id, callBack) => {
  //       const newCart = products_removeItem_actionsHelper(products, id);

  //       if (!products || !data?.cartCollection_by_id) return;

  //       const variables = {
  //         id: data.cartCollection_by_id.id,
  //         data: {
  //           status: "Draft",
  //           cart_model: redefining_to_CartModel_redefiningHelper(newCart),
  //         },
  //       } as ICartCollectionVariables;

  //       await apolloClient
  //         .mutate<ICartCollection_updated>({
  //           mutation: UPDATE_CART_BY_ID,
  //           variables: variables,
  //         })
  //         .then((el) => {
  //           if (el.data?.update_cartCollection_item && !el.errors) {
  //             if (callBack?.sideEffect && callBack?.flag === true)
  //               callBack.sideEffect(
  //                 redefining_to_ICartItemPropertiesData_redefiningHelper(
  //                   el.data.update_cartCollection_item.cart_model
  //                 )
  //               );
  //           }
  //         });

  //       return true;
  //     },
  //     [products, data]
  //   );