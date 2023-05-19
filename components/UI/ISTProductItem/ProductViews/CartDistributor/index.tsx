import React, {FC, useEffect} from "react";
import { IProductItem_distributer } from "../../Abstract/ICartTypes";
import styles from "./index.module.scss";
import CartFunctional from "../CartFunctional";
import CartFunctional_mobile from "../CartFunctional_mobile";

const CartDistributer: FC<IProductItem_distributer> = ({
  data,
  currency,
  style,
  mobileSettings,
  cartSelector,
}) => {


  return (
    <>
      <div
        className={`${styles[`desktop_${mobileSettings.mobileSizeTrigger}`]} 
      ${styles[`def_desktop`]}`}
      >

        <CartFunctional
            currency={currency}
            data={data}
            style={style}
            cartSelector={cartSelector}
        />

      </div>
      <div
        className={`${styles[`mobile_${mobileSettings.mobileSizeTrigger}`]} 
      ${styles[`def_mobile`]}`}
      >

        <CartFunctional_mobile
            currency={currency}
            data={data}
            style={style}
            cartSelector={cartSelector}
        />

      </div>
    </>
  );
};

export default CartDistributer;
