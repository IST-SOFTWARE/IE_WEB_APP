import React, { Dispatch, FC, useCallback, useEffect, useState } from "react";
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";
import { useQuery } from "@apollo/client";
import {
  IProductData,
  cartItemGetter_fnc,
  quantityEditor_fnc,
} from "../../../UI/ISTProductItem/common";
import {
  GET_CART_COLLECTION_BY_ID,
  ICartCollection,
  ICartCollectionVariables,
  UPDATE_CART_BY_ID,
} from "../../../../queries/cart/cartActions";
import { apolloClient } from "../../../../Apollo/apolloClient";
import {
  GET_PRODUCT_BY_ID,
  IProducts,
} from "../../../../queries/products/productActions";
import { resolve } from "path";

interface cartCollection {
  cartCollection_by_id: ICartCollection;
}

const getCartProductDataById: cartItemGetter_fnc = async (
  id: number | string,
  sideEffect
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
    });

  if (sideEffect.sideEffect && sideEffect.flag === true)
    sideEffect.sideEffect(outProduct);

  return outProduct;
};

const CatalogTestProdsModal: FC = () => {
  const { data, loading, error } = useQuery<cartCollection>(
    GET_CART_COLLECTION_BY_ID,
    {
      fetchPolicy: "cache-and-network",
      variables: { id: "8e52446f-ab77-45b1-8994-a2e2046648f8" },
    }
  );

  const editQuantity = useCallback<quantityEditor_fnc>(
    async (id, newQuantity, callBack) => {
      const cart = data.cartCollection_by_id.cart_model;

      const indexProductInCartCollection =
        data.cartCollection_by_id.cart_model.findIndex((cartItem) => {
          return cartItem.product_id === id;
        });

      const product = { quantity: newQuantity, price: null, product_id: id };
      const left = cart.slice(0, indexProductInCartCollection);
      const right = cart.slice(indexProductInCartCollection + 1, cart.length);
      const newCart = [...left, product, ...right];

      const variables = {
        id: data.cartCollection_by_id.id,
        data: {
          status: "Draft",
          cart_model: newCart,
        },
      } as ICartCollectionVariables;

      await apolloClient.mutate({
        mutation: UPDATE_CART_BY_ID,
        variables: variables,
      });

      return new Promise<boolean>((resolve) => {
        false;
      });
    },
    [data]
  );

  return (
    <>
      <div style={{ width: "600px" }}>
        {!loading &&
          !error &&
          data?.cartCollection_by_id?.cart_model.map(
            ({ price, product_id, quantity }, index) => {
              return (
                <ISTProductItem
                  currency="RU"
                  key={`ISTProductItem_${index}`}
                  itemType={{
                    productType: "cart",
                    displayingOption: "Functional",
                    data: {
                      amountPrice: price,
                      productId: product_id,
                      quantity: quantity,
                      cartItemGetter: getCartProductDataById,
                      quantityEditor: editQuantity,
                    },
                  }}
                />
              );
            }
          )}
      </div>
    </>
  );
};

export default CatalogTestProdsModal;
