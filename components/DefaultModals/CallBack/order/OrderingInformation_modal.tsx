import React, { FC } from "react";
import styles from "../../../../styles/Modals/order/ordering_information.module.scss";
import ISTButtonN from "../../../UI/ISTButton/ISTButtonN";
import { OrderedCartWrapper } from './OrderedCartWrapper'

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
  return (
    <>
      <div className={styles.orderBox}>
        <div className={styles.cartProducts}>
          {/* контейнер для продуктов юзера. получаем товары корзины или передаем пропсом? */}
          <OrderedCartWrapper/>
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
