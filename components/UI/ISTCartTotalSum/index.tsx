import React, {FC, ReactNode} from "react";
import styles from "./index.module.scss";
import IstButtonN from "../ISTButton/ISTButtonN";
import { cartItemGetter_fnc } from "../common";



const ISTCartTotalSum: FC = ({
    // cartSelector,
    // getProductByIdQuery_func,
    // currentPriceSetter,
    // acceptOrder_func,
    // children
}) => {

  return (
      <>
          {/*{children}*/}
      </>
    // <div className={styles.cart}>
    //   <div className={styles.cartLabel}>
    //     Ваша Корзина <div className={styles.productsQuantity}>4</div>
    //   </div>
    //   <div className={styles.prodSaleBox}>
    //     <div className={styles.prod}>
    //       <div className={styles.title}>Товары (4)</div>
    //       <div className={styles.total}>1 431 000₽</div>
    //     </div>
    //     <div className={styles.sale}>
    //       <div className={styles.title}>Скидка</div>
    //       <div className={styles.total}>10 845₽</div>
    //     </div>
    //   </div>
    //   <div className={styles.totalSum}>Сумма: 1 420 155₽</div>
    //   <IstButtonN
    //     light={{
    //       fill: true,
    //       style: {
    //         borderRadius: "15px",
    //         fillContainer: true,
    //       },
    //     }}
    //     title={{
    //       caption: "Оформить заказ",
    //     }}
    //     onClick={() => {}}
    //   />
    // </div>
  );
};

export default ISTCartTotalSum;
