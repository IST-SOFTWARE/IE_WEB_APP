import { FC, useCallback, useEffect, useState } from "react";
import { IProductData, cartItemGetter_fnc } from "../../UI/common";
import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import { IOrderedCart } from "./common";
import { ICartCollection } from "../../../queries/cart/cartActions";
import { cartClient } from "../../../Apollo/cartClient";
import {
  GET_PRODUCT_BY_ID,
  IProducts_Q,
} from "../../../queries/products/productActions";

type ICartModel = Pick<ICartCollection, "cart_model">;

export const OrderedCartWrapper: FC<IOrderedCart> = ({
  selectedIds,
  cartData,
}) => {
  const [sortedCart, setSortedCart] = useState<ICartModel>();

  const getCartProductDataById: cartItemGetter_fnc = async (
    id: number | string,
    callBack
  ): Promise<IProductData> => {
    let outProduct = {} as IProductData;

    await cartClient
      .query<IProducts_Q>({
        query: GET_PRODUCT_BY_ID,
        variables: {
          id: Number(id),
        },
        fetchPolicy: "network-only",
      })
      .then((prod) => {
        if (prod.data && prod.data.Products[0]) {
          const _data = prod.data.Products[0];

          outProduct = {
            id: _data.id,
            image: _data.image_url,
            title: _data.product_name,
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

  useEffect(() => {
    const _cartData = cartData?.cartCollection_by_id?.cart_model;
    const _outCartModel = {
      cart_model: [],
    } as ICartModel;

    if (!_cartData) return;

    const _cartData_filtered = _cartData.filter((cd) => {
      return selectedIds.indexOf(cd?.product_id?.toString()) > -1;
    });

    _cartData_filtered.map((el) => {
      _outCartModel.cart_model?.push({
        ...el,
      });
    });

    setSortedCart(_outCartModel);
  }, [cartData, selectedIds]);

  return (
    <>
      {sortedCart?.cart_model?.map((el, idx) => {
        return (
          <ISTProductItem
          style={{
            margin: "0 0 10px 0",
          }}
          key={`ISTProductItem_${idx}`}
          currencySymbol={"R"}
          itemType={{
              blocked: true,
              productType: "cart",
              mobileSettings: {
                mobileSizeTrigger: "SM_576",
              },

              data: {
                productId: el?.product_id.toString(),
                quantity: el?.quantity ?? 0,
                cartItemGetter: getCartProductDataById,
              },

            }}
          />
        );
      })}
    </>
  );
};
