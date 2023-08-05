import React, { FC, useCallback, useEffect, useState } from "react";
import {
  ICartItem_properties_data,
  ICartSelector,
} from "../../UI/ISTProductItem/Abstract/ICartTypes";
import {
  cartItemGetter_fnc,
  deleteProduct_fnc,
  IProductData,
  mobileTrigger_size,
  quantityEditor_fnc,
} from "../../UI/common";
import { IProductItem } from "../../UI/ISTProductItem/common";
import {
  GET_PRODUCT_BY_ID,
  IProducts_Q,
} from "../../../queries/products/productActions";
import { useQuery } from "@apollo/client";
import {
  GET_CART_COLLECTION_BY_ID,
  ICartCollection,
  ICartCollection_updated,
  ICartCollectionVariables,
  UPDATE_CART_BY_ID,
} from "../../../queries/cart/cartActions";
import {
  redefining_to_CartModel_redefiningHelper,
  redefining_to_ICartItemPropertiesData_redefiningHelper,
} from "../../../helpers/Products/products_redefining.helper";
import {
  products_editQuantity_actionsHelper,
  products_removeItem_actionsHelper,
} from "../../../helpers/Products/products_actions.helper";
import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import { cartClient } from "../../../Apollo/cartClient";
import { useAppSelector } from "../../../Hooks/reduxSettings";
import { useCartTotalSum } from "../../../Hooks/useCartTotalSum/useCartTotalSum";
import { ICartTotalSum_prodsInf } from "../../../Hooks/useCartTotalSum/ICartTotalSum";
import { useLocalStorageManager } from "../../../Hooks/useSessionActions/useLocalStorageManager";
import { sessionObjectKey } from "../../../Hooks/useSessionActions/common";
import styles from "./cartWrapper.module.scss";
import { ICartWrapper } from "./ICartWrapper";
import { RU_LOCALE } from "../../../locales/locales";
import { cartCollection } from "../common";
import { useCartActions } from "../../../Hooks/useCartActions/useCartActions";

export const CartWrapper: FC<ICartWrapper> = ({
  cartSelector,
  loadingSetter,

  mobileTriggerSize,
  itemStyles,
  wrapperStyles,

  amountData,
}) => {
  const regionHandler = useAppSelector((selector) => selector.region);

  const { cItemById, cRemover, cData, cQuantityEditor, cMeta } = useCartActions(
    {
      cartAutoFetching: true,
      regionHandler: regionHandler,
    }
  );

  const { getItemsInfo } = useCartTotalSum({
    cartSelector: cartSelector.selectedState,
    getProductByIdQuery_func: cItemById,
  });

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
  }, [amountData, cartSelector, getItemsInfo]);

  /**
   *  LOADING HANDLER
   */
  useEffect(() => {
    loadingSetter(cMeta.loading);
  }, [cMeta.loading, loadingSetter]);

  /**
   *  CART WRAPPER VIEW
   */
  return (
    <div className={styles.cartWrapper}>
      {cData?.length < 1 || cMeta.error ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCart_title}>Корзина пуста</div>

          <div className={styles.emptyCart_hint}>
            Воспользуйтесь каталогом, чтобы найти всё, что нужно.
          </div>
        </div>
      ) : (
        <>
          <div style={wrapperStyles}>
            {cData.map((el, index) => {
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
                        id: el?.productId,
                        quantity: el?.quantity,
                        price: undefined,
                      },

                      selectedState: cartSelector?.selectedState,
                      setSelectedState: cartSelector?.setSelectedState,
                    },

                    data: {
                      productId: el?.productId,
                      quantity: el?.quantity,

                      cartItemGetter: cItemById,
                      quantityEditor: cQuantityEditor,
                      deleteProduct: cRemover,
                    },
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
