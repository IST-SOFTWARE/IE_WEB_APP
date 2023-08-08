import React, { FC } from "react";
import styles from "../../../styles/Modals/order/ordering_information.module.scss";
import ISTButtonN from "../../UI/ISTButton/ISTButtonN";
import { IOrderingInformation } from "./common";

const OrderingInformation_modal: FC<IOrderingInformation> = ({
  openRequestPage: nextModalFunc,
  children,
  translation,
}) => {
  return (
    <>
      <div className={styles.orderBox}>
        <div className={styles.cartProducts}>{children}</div>

        <div className={styles.cartTotal}>
          <div className="costBox">
            {/* <div className={styles.products}>
              {translation?.products}: {totalSelect}
            </div>
            <div className={styles.sum}>
              {translation?.sum}:{" "}
              {totalSum
                ? `${totalSum.toLocaleString(region.region, {
                    maximumFractionDigits: 2,
                  })}`
                : 0}
              {region.currencySymbol}
            </div> */}
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
