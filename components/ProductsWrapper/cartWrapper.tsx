import React, {
  CSSProperties,
  Dispatch,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ICartItem_properties_data,
  ICartSelector,
} from "../UI/ISTProductItem/Abstract/ICartTypes";
import {
  cartItemGetter_fnc,
  deleteProduct_fnc_onDelete,
  IProductData,
  mobileTrigger_size,
  quantityEditor_fnc,
} from "../UI/common";
import { IProductItem } from "../UI/ISTProductItem/common";
import {
  GET_PRODUCT_BY_ID,
  IProducts_Q,
} from "../../queries/products/productActions";
import { useQuery } from "@apollo/client";
import {
  GET_CART_COLLECTION_BY_ID,
  ICartCollection,
  ICartCollection_updated,
  ICartCollectionVariables,
  UPDATE_CART_BY_ID,
} from "../../queries/cart/cartActions";
import {
  redefining_to_CartModel_redefiningHelper,
  redefining_to_ICartItemPropertiesData_redefiningHelper,
} from "../../helpers/Products/products_redefining.helper";
import {
  products_editQuantity_actionsHelper,
  products_removeItem_actionsHelper,
} from "../../helpers/Products/products_actions.helper";
import ISTProductItem from "../UI/ISTProductItem/ISTProductItem";
import { cartClient } from "../../Apollo/cartClient";
import { useAppSelector } from "../../Hooks/reduxSettings";
import { useCartTotalSum } from "../../Hooks/useCartTotalSum/useCartTotalSum";
import { ICartTotalSum_prodsInf } from "../../Hooks/useCartTotalSum/ICartTotalSum";
import PuWrapper from "../DefaultModals/popUp/puWrapper";
import useBaseModal from "../../Hooks/useBaseModal/useBaseModal";
import { toc_order_information } from "../DefaultModals/table_of_contents/order/toc_order_information";
import OrderingInformation_modal from "../DefaultModals/CallBack/order/OrderingInformation_modal";
import OrderingRequest_modal from "../DefaultModals/CallBack/order/OrderingRequest_modal";
import { toc_order_request } from "../DefaultModals/table_of_contents/order/toc_order_request";
import { modalsBasics } from "../../Hooks/useBaseModal/modalSetter";

interface cartCollection {
  cartCollection_by_id: ICartCollection;
}

interface ICartWrapper {
  cartID: string;
  currency: Pick<IProductItem, "currencySymbol">;

  cartSelector: Omit<ICartSelector, "data">;

  mobileTriggerSize?: mobileTrigger_size;
  itemStyles?: Pick<IProductItem, "style">;
  wrapperStyles?: CSSProperties;

  amountData?: {
    amountPriceSetter: Dispatch<number>;
    amountQuantitySetter: Dispatch<number>;
  };
}

export const CartWrapper: FC<ICartWrapper> = ({
  cartID,

  cartSelector,

  mobileTriggerSize,
  itemStyles,
  wrapperStyles,

  amountData,
}) => {
  const [products, setProducts] = useState<ICartItem_properties_data[]>([]);
  const regionHandler = useAppSelector((selector) => selector.region);

  /**
   *  DATA GETTER [PRODUCT DATA]
   */
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

            title:
              regionHandler.region === "ru-RU"
                ? _data.product_name_ru
                : _data.product_name,

            price: (
              Number(_data.price) *
              regionHandler.currency[regionHandler.currentCurrencyId]
                ?.currencyMultiplier
            ).toString(),

            vendCode: _data.vend_code.toString(),
            slug: _data.slug,
          };
        }

        if (callBack?.sideEffect && callBack?.flag === true)
          callBack.sideEffect(outProduct);
      });

    // console.log("out prods: ", outProduct, id);
    return outProduct;
  };

  const { getItemsInfo } = useCartTotalSum({
    cartSelector: cartSelector.selectedState,
    getProductByIdQuery_func: getCartProductDataById,
  });

  /**
   *  DATA FETCHING [CART DATA]
   */
  const { data, loading, error } = useQuery<cartCollection>(
    GET_CART_COLLECTION_BY_ID,
    {
      fetchPolicy: "cache-and-network",
      variables: { id: cartID },
    }
  );

  /**
   *  DATA UPDATER [CART DATA]
   */
  useEffect(() => {
    if (data && data.cartCollection_by_id)
      setProducts(
        redefining_to_ICartItemPropertiesData_redefiningHelper(
          data.cartCollection_by_id.cart_model
        )
      );
  }, [data]);

  /**
   *  QUANTITY EDITOR
   */
  const editQuantity = useCallback<quantityEditor_fnc>(
    async (id, newQuantity, callBack) => {
      if (!products || !data?.cartCollection_by_id) return;

      const newCart = products_editQuantity_actionsHelper(
        products,
        id,
        newQuantity
      );

      const variables = {
        id: cartID,
        data: {
          status: "Draft",
          cart_model: redefining_to_CartModel_redefiningHelper(newCart),
        },
      } as ICartCollectionVariables;

      let _newQuantity = 0;

      await cartClient
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

      return true;
    },
    [products, data]
  );

  /**
   *  PRODUCT REMOVER
   */
  const deleteProduct = useCallback<deleteProduct_fnc_onDelete>(
    async (id, callBack) => {
      const newCart = products_removeItem_actionsHelper(products, id);

      if (!products || !data?.cartCollection_by_id) return;

      const variables = {
        id: cartID,
        data: {
          status: "Draft",
          cart_model: redefining_to_CartModel_redefiningHelper(newCart),
        },
      } as ICartCollectionVariables;

      await cartClient
        .mutate<ICartCollection_updated>({
          mutation: UPDATE_CART_BY_ID,
          variables: variables,
        })
        .then((el) => {
          if (el.data?.update_cartCollection_item && !el.errors) {
            if (callBack?.sideEffect && callBack?.flag === true)
              callBack.sideEffect(
                redefining_to_ICartItemPropertiesData_redefiningHelper(
                  el.data.update_cartCollection_item.cart_model
                )
              );
          }
        });

      return true;
    },
    [products, data]
  );

  useEffect(() => {
    const calcTotalSum = (prodsInf: ICartTotalSum_prodsInf[]) => {
      let totalPrice = 0;
      let totalSelectedNum = 0;

      cartSelector.selectedState.map((el, i) => {
        const selectedProduct = el;
        const fetchedProduct = prodsInf.find(
          (product) => product.productId === selectedProduct.id
        );

        if (fetchedProduct) {
          const itemPrice =
            fetchedProduct.pricePerItem * Number(selectedProduct.quantity);
          totalPrice += itemPrice;
          totalSelectedNum += Number(selectedProduct.quantity);
        }
      });

      amountData?.amountPriceSetter(totalPrice);
      amountData?.amountQuantitySetter(totalSelectedNum);
    };

    getItemsInfo().then((data) => calcTotalSum(data));
  }, [cartSelector]);

  /**
   *  CART WRAPPER VIEW
   */
  return data && products ? (
    <>
      <div style={wrapperStyles}>
        {products.map(({ productId, quantity }, index) => {
          // console.log("_Prods: ", productId);

          return (
            <ISTProductItem
              key={`ISTProductItem_${index}`}
              currencySymbol={
                regionHandler.currency[regionHandler.currentCurrencyId]
                  ?.currencySymbol
              }
              style={itemStyles?.style}
              itemType={{
                productType: "cart",
                mobileSettings: {
                  mobileSizeTrigger: mobileTriggerSize,
                },

                cartSelector: {
                  data: {
                    id: productId,
                    quantity: quantity,
                    price: undefined,
                  },

                  selectedState: cartSelector?.selectedState,
                  setSelectedState: cartSelector?.setSelectedState,
                },

                data: {
                  productId: productId,
                  quantity: quantity,

                  cartItemGetter: getCartProductDataById,
                  quantityEditor: editQuantity,
                  deleteProduct: {
                    onDelete: deleteProduct,
                    productsListSetter: setProducts,
                  },
                },
              }}
            />
          );
        })}
      </div>
    </>
  ) : loading ? (
    <>
      <h1
        style={{
          margin: "30% auto",
        }}
      >
        LOADING
      </h1>
    </>
  ) : (
    <>
      <h1
        style={{
          margin: "30% auto",
          color: "red",
        }}
      >
        ERRoR :(
      </h1>
    </>
  );
};
