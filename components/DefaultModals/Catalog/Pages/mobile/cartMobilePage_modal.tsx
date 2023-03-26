import React, { useState } from "react";
import styles from "../../../../../styles/Modals/catalog/mobile/cartMobilePage_modal.module.scss";
import ISTButtonN from "../../../../UI/ISTButton/ISTButtonN";
import ISTProductItem from "../../../../UI/ISTProductItem/ISTProductItem";

const CartMobilePageModal = ({ closeMobileFilter }) => {
  const [cartProductItems, setCartProductItems] = useState(
    new Array(10).fill("")
  );  // добавленные в корзину продукты

  return (
    <div className={styles.container}>
      <div onClick={closeMobileFilter} className={`${styles.header}`}>
        <div className={styles.title}>Моя корзина</div>
        <div className={`${styles.vector}`}></div>
      </div>
      <div className={`${styles.mobileVersionCart}`}>
        {cartProductItems.map((item, index) => {
          return (
            <ISTProductItem
              key={`productItem_${index}`}
              id={index}
              title={"Product Item"}
              price={"200"}
              style={{
                margin: "10px 5px",
                inline: true,
              }}
              addedToCart={3} //при добавлении колличества штук в корзину
              vendCode={"IST 000001"}
              currency={"RU"}
            />
          );
        })}
      </div>
      <div className={styles.buttonsContainer}>

        {/* для расстояния между кнопками каждую кнопку требуется обернуть в див? */}

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
