import React, { FC, useCallback, useEffect, useState } from "react";
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
  ICartCollection,
  GET_PRODUCT_CART_BY_ID,
} from "../../../../queries/cart/cartActions";
import { apolloClient } from "../../../../Apollo/apolloClient";

interface cartCollection {
  cartCollection_by_id: ICartCollection;
}

export async function getCartProductDataById(id: number | string): IProductData {

  const inIsNumber = Number(id)

  const { data } = await apolloClient.query({
    query: GET_PRODUCT_CART_BY_ID,
    variables: {
      id: inIsNumber,
    },
  });

  return {
    data,
  };
}

//testing getCartProductById function
// Promise.resolve(getCartProductDataById(195))
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const CatalogTestFiltersModal: FC = () => {
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
                    displayingOption: "Functional",
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

export default CatalogTestFiltersModal;
