import React, { useState } from "react";
import styles from "../../../../../styles/Modals/catalog/mobile/cartMobilePage_modal.module.scss";
import ISTButtonN from "../../../../UI/ISTButton/ISTButtonN";
import ISTProductItem from "../../../../UI/ISTProductItem/ISTProductItem";

const CartMobilePageModal = ({ closeMobileFilter }) => {
  const [cartProductItems, setCartProductItems] = useState(
    new Array(1).fill("")
  );

  return (
    <div className={styles.container}>
      <div onClick={closeMobileFilter} className={`${styles.header}`}>
        <div className={styles.title}>Моя корзина</div>
        <div className={`${styles.vector}`}></div>
      </div>
      <div className={`${styles.mobileVersionCart}`}>
        <div className={styles.productsContainer}>
          {cartProductItems.map((item, index) => {
            return (
              <ISTProductItem
                id={index}
                key={`productItem_${index}`}
                title={"Product Item"}
                price={"200"}
                style={{
                  margin: "10px 5px",
                  inline: true,
                }}
                vendCode={"IST 000001"}
                currency={"RU"}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <ISTButtonN
          title={{
            caption: "Моя корзина",
          }}
          dark={{
            solid: false,
            style: {
              fillContainer: true,
              borderRadius: "15px",
            },
          }}
        />
        <ISTButtonN
          title={{
            caption: "Оформить заказ",
          }}
          dark={{
            solid: false,
            style: {
              fillContainer: true,
              borderRadius: "15px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default CartMobilePageModal;
