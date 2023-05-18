import React, { FC, useCallback, useEffect, useState } from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import { useQuery } from "@apollo/client";
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
import { apolloClient } from "../../../../Apollo/apolloClient";
import {
  GET_PRODUCT_BY_ID,
  IProducts,
} from "../../../../queries/products/productActions";
import { ICartItem_properties_data } from "../../../UI/ISTProductItem/ICartTypes";
import { ICartItem } from "../../../../queries/cart/cartActions";
import {
    redefining_to_CartModel,
    redefining_to_ICartItemPropertiesData
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
  const [selected, setSelected] = useState<number[]>([]);

  const { data, loading, error } = useQuery<cartCollection>(
    GET_CART_COLLECTION_BY_ID,
    {
      fetchPolicy: "cache-and-network",
      variables: { id: "8d391766-5fea-4da8-ab71-9d7794e692f2" },
    }
  );

  const [products, setProducts] = useState<ICartItem_properties_data[]>([]);

  useEffect(() => {
    if (data && data.cartCollection_by_id)
        setProducts(redefining_to_ICartItemPropertiesData(
            data.cartCollection_by_id.cart_model)
        )
  }, [data]);


  useEffect(()=>{
      if(products)
        console.log("PRODS: ", products)
        console.log("DATA: ", redefining_to_CartModel(products));
  },[products])

  const editQuantity = useCallback<quantityEditor_fnc>(
    async (id,
                    newQuantity,
                    callBack
    ) => {

    if(!products)
        return

    const newCart =
        products_editQuantity_actionsHelper(products, id, newQuantity)

      const variables = {
        id: data.cartCollection_by_id.id,
        data: {
          status: "Draft",
          cart_model: redefining_to_CartModel(newCart),
        },
      } as ICartCollectionVariables;

      let _newQuantity = 0;

      console.log("outVariables: ", variables);

      await apolloClient
        .mutate<ICartCollection_updated>({
          mutation: UPDATE_CART_BY_ID,
          variables: variables,
        })
        .then((el) => {
          if (el.data && !el.errors) {
            _newQuantity = newQuantity;
            console.log("fetched")

            if (callBack?.sideEffect && callBack?.flag === true)
              callBack.sideEffect(_newQuantity);
          }
        });

      return true
    }, [products]);

  const deleteProduct = useCallback<deleteProduct_fnc>(
      async (id, callBack) => {

          // const newCart =
          //     products_removeItem_actionsHelper(products, id)
          //
          // const variables = {
          //     id: id.toString(),
          //     data: {
          //         status: "Draft",
          //         cart_model: redefining_to_CartModel(newCart),
          //     },
          // } as ICartCollectionVariables;
          //
          // await apolloClient.mutate({
          //     mutation: UPDATE_CART_BY_ID,
          //     variables: variables,
          // }).then((el) => {
          //
          //     // if (el.data && !el.errors) {
          //     //     if (callBack?.sideEffect && callBack?.flag === true)
          //     //         callBack.sideEffect(el.data);
          //     // }
          // });

          return true
      }, [products]);

  return (
    <>
      <div style={{ width: "500px" }}>
        {!loading && !error &&
          products.map(({ amountPrice, productId, quantity }, index) => {
            return (
              <ISTProductItem
                currency="RU"
                key={`ISTProductItem_${index}`}
                mobileSettings={{ mobileSizeTrigger: "LG_992" }}
                style={{ margin: "20px 0 0 0" }}
                cartSelector={{
                  id: index,
                  selectedState: selected,
                  setSelectedState: setSelected,
                }}
                itemType={{
                  productType: "cart",
                  data: {
                    amountPrice: amountPrice,
                    productId: productId?.toString(),
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
