import { FC } from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import { IProductData, cartItemGetter_fnc } from "../../../UI/common";
import { cartClient } from "../../../../Apollo/cartClient";
import {
  GET_PRODUCT_BY_ID,
  IProducts_Q,
} from "../../../../queries/products/productActions";

export const OrderedCartWrapper: FC = () => {

  const getCartProductDataById: cartItemGetter_fnc = async (
    id: number | string,
    callBack
  ): Promise<IProductData> => {
    let outProduct = {} as IProductData;

    await cartClient
      .query<IProducts_Q>({
        query: GET_PRODUCT_BY_ID,
        variables: {
          id: Number(id)
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

  return (
    <>
      <ISTProductItem
        key={`ISTProductItem_${1}`}
        currencySymbol={"R"}
        
        itemType={{
          productType: "cart",
          mobileSettings: {
            mobileSizeTrigger: "SM_576"
          },

          data: {
            productId: "224",
            quantity: 1,
            cartItemGetter: getCartProductDataById,
          },

          blocked: true
        }}        
      />
    </>
  );
};
