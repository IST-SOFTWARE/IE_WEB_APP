import React, {Dispatch, FC, useCallback, useEffect, useState} from "react";
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";
import { useQuery } from "@apollo/client";
import {
  IProductData,
  cartItemGetter_fnc,
} from "../../../UI/ISTProductItem/common";
import {
  GET_CART_COLLECTION_BY_ID,
  ICartCollection
} from "../../../../queries/cart/cartActions";
import { apolloClient } from "../../../../Apollo/apolloClient";
import {GET_PRODUCT_BY_ID, IProducts} from "../../../../queries/products/productActions";

interface cartCollection {
  cartCollection_by_id: ICartCollection;
}


export const getCartProductDataById: cartItemGetter_fnc =
    async (id: number | string, sideEffect): Promise<IProductData> => {

  let outProduct = {} as IProductData

  await apolloClient.query<IProducts>({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id: Number(id),
    },
  }).then(prod => {
    if (prod.data && prod.data.Products[0]) {
      const _data = prod.data.Products[0];

      outProduct = {
        id: _data.id,
        image: _data.image_url,
        title: _data.product_name_ru,
        price: _data.price.toString(),
        vendCode: _data.vend_code.toString(),
        slug: _data.slug
      }
    }
  });

  if(sideEffect.sideEffect && sideEffect.flag === true)
    sideEffect.sideEffect(outProduct)

  return outProduct
}



const CatalogTestProdsModal:FC = () => {
  const { data, loading, error } = useQuery<cartCollection>(
    GET_CART_COLLECTION_BY_ID,
    {
      variables: { id: "f6a83d43-c82b-4e3e-a921-3519c31a5312" },
    }
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
                    displayingOption: "Informational",
                    data: {
                      amountPrice: price,
                      productId: product_id,
                      quantity: quantity,
                      cartItemGetter: getCartProductDataById,
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
