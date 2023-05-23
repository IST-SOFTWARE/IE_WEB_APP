import React, {FC, useContext, useEffect} from "react";
import {IProductItem_distributor} from "../Abstract/ICartTypes";
import styles from "./index.module.scss";
import CartFunctional from "../ProductViews/CartFunctional";
import CartFunctional_mobile from "../ProductViews/CartFunctional_mobile";
import {ISTProductItemDistributor_Context} from "../Context";

const CartDistributor: FC = () => {

    const {mobileSettings} = useContext(ISTProductItemDistributor_Context);

    return (
        <>
            <div className={`${styles[`desktop_${mobileSettings?.mobileSizeTrigger}`]} ${styles[`def_desktop`]}`}
            >
                <CartFunctional/>
            </div>
            <div
                className={`${styles[`mobile_${mobileSettings?.mobileSizeTrigger}`]} 
      ${styles[`def_mobile`]}`}
            >
                <CartFunctional_mobile/>
            </div>
        </>
    );
};

export default CartDistributor;
