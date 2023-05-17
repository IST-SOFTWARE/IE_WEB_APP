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
      variables: { id: "9f10783f-5bdf-467c-892a-90abaffdf205" },
    }
  );

  const [products, setProducts] = useState<ICartItem_properties_data[]>([]);

  // console.log(products)

  const transformationTypeToICartItemPropertiesData = (
    data: ICartItem[]
  ): ICartItem_properties_data[] => {
    const newTransformType = data.map(({ product_id, quantity, price }) => {
      return {
        productId: product_id,
        quantity: quantity,
        amountPrice: price,
      } as ICartItem_properties_data;
    });
    return newTransformType;
  };

  const transformationTypeToCartModel = (
    data: ICartItem_properties_data[]
  ): ICartItem[] => {
    const newTransformType = data.map(
      ({ productId, quantity, amountPrice }) => {
        return {
          product_id: productId,
          quantity: quantity,
          price: amountPrice,
        } as ICartItem;
      }
    );
    return newTransformType;
  };

  console.log(
    "ICartItem_properties_data to CartModel",
    transformationTypeToICartItemPropertiesData(
      data.cartCollection_by_id.cart_model
    )
  );

  console.log(
    "CartModel to ICartItem_properties_data",
    transformationTypeToCartModel(transformationTypeToICartItemPropertiesData(
      data.cartCollection_by_id.cart_model
    ))
  );

  // useEffect(() => {
  //   if (data && data.cartCollection_by_id)

  // }, [data]);

  const editQuantity = useCallback<quantityEditor_fnc>(
    async (id, newQuantity, callBack) => {
      const indexProductInCartCollection = products.findIndex((cartItem) => {
        return cartItem.productId === id;
      });

      const product = { product_id: id, quantity: newQuantity, price: null };
      const left = products.slice(0, indexProductInCartCollection);
      const right = products.slice(
        indexProductInCartCollection + 1,
        products.length
      );
      const newCart = [...left, product, ...right];

      const variables = {
        id: data.cartCollection_by_id.id,
        data: {
          status: "Draft",
          cart_model: newCart,
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

      return new Promise<boolean>((resolve) => {
        false;
      });
    },
    [products]
  );

  // const deleteProduct = useCallback<deleteProduct_fnc>(
  //     async (id) => {
  //         // const cart = data.cartCollection_by_id.cart_model;
  //         const newCart = products.filter((product) => product.productId !== id);

  //         const variables = {
  //             id: id.toString(),
  //             data: {
  //                 status: "Draft",
  //                 cart_model: ,
  //             },
  //         } as ICartCollectionVariables;

  //         await apolloClient.mutate({
  //             mutation: UPDATE_CART_BY_ID,
  //             variables: variables,
  //         });

  //         return new Promise<boolean>((resolve) => {
  //             false;
  //         });
  //     },
  //     [data, products]
  // );

  return (
    <>
      {/* <div style={{ width: "500зч" }}>
        {!loading &&
          !error &&
          products.map(({ price, product_id, quantity }, index) => {
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
                    amountPrice: price,
                    productId: product_id,
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
    </>
  );
};

export default CatalogTestProdsModal;
