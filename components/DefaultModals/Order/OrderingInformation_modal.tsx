import React, { FC, useEffect, useState } from "react";
import styles from "../../../styles/Modals/order/ordering_information.module.scss";
import ISTButtonN from "../../UI/ISTButton/ISTButtonN";
import { useQueryBuilder } from "../../../Hooks/useQueryBuilder/useQueryBuilder";
import { useQuery } from "@apollo/client";
import { cartCollection } from "../../ProductsWrapper/cartWrapper/ICartWrapper";
import { GET_CART_COLLECTION_BY_ID } from "../../../queries/cart/cartActions";
import { useLocalStorageManager } from "../../../Hooks/useSessionActions/useLocalStorageManager";
import { sessionObjectKey } from "../../../Hooks/useSessionActions/common";

export interface IOrderingInformation_translation {
  order: string;
  detailsOrder: string;
  products: string;
  sum: string;
  continueOrder: string;
}

interface IOrderingInformation {
  translation: IOrderingInformation_translation;

  nextModalFunc: (...props) => any;
}

const OrderingInformation_modal: FC<IOrderingInformation> = ({
  translation,
  nextModalFunc,
}) => {
  const [filteredOrderProducts, setFilteredOrderProducts] = useState();

  const { getQueryAsArray } = useQueryBuilder<string>();
  const { getStorageItem } = useLocalStorageManager(sessionObjectKey);

  const { data, loading, error } = useQuery<cartCollection>(
    GET_CART_COLLECTION_BY_ID,
    {
      fetchPolicy: "cache-and-network",
      variables: { id: getStorageItem() },
    }
  );

  useEffect(() => {
    const selectedProduct = getQueryAsArray();
    const dataProduct = data?.cartCollection_by_id?.cart_model;

    console.log(selectedProduct);

    // setFilteredOrderProducts(
    //   selectedProduct?.map((el) => {
    //     const prods = dataProduct.find(
    //       (findElement) => findElement.product_id === el
    //     );
    //     return prods;
    //   })
    // );

  }, [data?.cartCollection_by_id?.cart_model, getQueryAsArray]);

  return (
    <>
      <div className={styles.orderBox}>
        <div className={styles.cartProducts}>
          {/* контейнер для продуктов юзера. получаем товары корзины или передаем пропсом? */}
          
        </div>

        <div className={styles.cartTotal}>
          <div className="costBox">
            <div className={styles.products}>{translation?.products}: 4</div>
            <div className={styles.sum}>{translation?.sum}: 0 000 000</div>
          </div>
          <div className={styles.boxButtonOrder}>
            <ISTButtonN
              light={{
                fill: true,
                style: {
                  borderRadius: "15px",
                  fillContainer: true,
                },
              }}
              title={{
                caption: translation?.continueOrder,
              }}
              onClick={nextModalFunc}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderingInformation_modal;
