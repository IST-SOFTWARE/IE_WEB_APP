import React, { FC, useState } from "react";
import styles from "../../../../../../styles/Modals/catalog/mobile/catalogCartPageMobileModal.module.scss";
import ISTButtonN from "../../../../../UI/ISTButton/ISTButtonN";
import { CatalogWrapper } from "../../../../../ProductsWrapper/catalogWrapper/catalogWrapper";
import { CartWrapper } from "../../../../../ProductsWrapper/cartWrapper";
import { useCartTotalSum } from "../../../../../../Hooks/useCartTotalSum/useCartTotalSum";
import { cartItemGetter_fnc, IProductData } from "../../../../../UI/common";
import { cartClient } from "../../../../../../Apollo/cartClient";
import {
  GET_PRODUCT_BY_ID,
  IProducts_Q,
} from "../../../../../../queries/products/productActions";
import { useRouter } from "next/router";
import ru from "../../../../../../locales/ru";
import en from "../../../../../../locales/en";

const CatalogCartPageMobileModal: FC = ({}) => {
  const router = useRouter();
  const t = router.locale === "ru-RU" ? ru : en;

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

    // console.log("out prods: ", outProduct, id);
    return new Promise<IProductData>((resolve) => {
      resolve(outProduct);
    });
  };

  const [cartSelector, setCartSelector] = useState<string[]>([]);
  const { getItemsInfo } = useCartTotalSum({
    cartSelector,
    getProductByIdQuery_func: getCartProductDataById,
  });

  const handleOrder = () => {
    getItemsInfo();
  };

  return (
    <div className={styles.mobileModalCartWrapper}>
      <div className={styles.cartWrapper}>
        <CartWrapper
          currency={{
            currency: t.catalogCartPageMobileModal.currency ? "EN": "RU",
          }}
          cartID={"9cfa4d6a-f2e9-400c-b0a9-4c85ab777272"}
          cartSelector={{
            selectedState: cartSelector,
            setSelectedState: setCartSelector,
          }}
          wrapperStyles={{
            width: "100%",
            maxWidth: "100%",
            padding: "0px 5px",
          }}
          itemStyles={{
            style: {
              margin: "0 0 15px 0",
              fill: true,
            },
          }}
          mobileTriggerSize={"LG_992"}
        />
      </div>

      <div className={styles.cartTotalSum_and_order}>
        <div className={styles.totalSum}>
          <div className={styles.selected}>
            <div className={styles.selected_txt}>
              {t.catalogCartPageMobileModal.select}
            </div>
            <div className={styles.selected_num}>{12}</div>
          </div>

          <div className={styles.selected}>
            <div className={styles.selected_txt}>
              {t.catalogCartPageMobileModal.amount}
            </div>
            <div className={styles.selected_num}>
              {1223211} {t.catalogCartPageMobileModal.currencyStyle}
            </div>
          </div>
        </div>

        <div className={styles.btnPlace}>
          <ISTButtonN
            title={{
              caption: t.catalogCartPageMobileModal.order,
            }}
            light={{
              fill: true,
              style: {
                fillContainer: true,
                borderRadius: "10px",
              },
            }}
            onClick={() => {
              const data = getItemsInfo();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogCartPageMobileModal;
