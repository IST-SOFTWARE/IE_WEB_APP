import React, {FC, useState} from 'react';
import styles from "../../../../../../styles/Modals/catalog/mobile/catalogCartPageMobileModal.module.scss"
import ISTButtonN from "../../../../../UI/ISTButton/ISTButtonN";
import {CatalogWrapper} from "../../../../../ProductsWrapper/catalogWrapper/catalogWrapper";
import {CartWrapper} from "../../../../../ProductsWrapper/cartWrapper";

interface ICatalogCartPageMobileModal{

}

const CatalogCartPageMobileModal:FC<ICatalogCartPageMobileModal> = ({

}) => {

    const [cartSelector, setCartSelector] = useState<string[]>([])

    return(
        <div className={styles.mobileModalCartWrapper}>
            <div className={styles.cartWrapper}>
                <CartWrapper
                    currency={{
                         currency: "RU"
                    }}
                    cartID={"9cfa4d6a-f2e9-400c-b0a9-4c85ab777272"}
                    cartSelector={{
                        selectedState: cartSelector,
                        setSelectedState: setCartSelector
                    }}

                    wrapperStyles={{
                        width: "100%",
                        maxWidth: "100%",
                        padding: "0px 5px"
                    }}

                    itemStyles={{
                        style: {
                            margin: "0 0 15px 0",
                            fill: true
                        }
                    }}

                    mobileTriggerSize={"LG_992"}
                />
            </div>

            <div className={styles.cartTotalSum_and_order}>

                <div className={styles.totalSum}>

                    <div className={styles.selected}>
                        <div className={styles.selected_txt}>
                            Выбр аноas asdasdasd ass
                        </div>
                        <div className={styles.selected_num}>
                            {12}
                        </div>
                    </div>

                    <div className={styles.selected}>
                        <div className={styles.selected_txt}>
                            Сумм аыв фывод лфофыфыолдфы
                        </div>
                        <div className={styles.selected_num}>
                            {12} ₽
                        </div>
                    </div>

                </div>

                <div className={styles.btnPlace}>
                    <ISTButtonN
                        title={{
                            caption: "Оформить заказ"
                        }}
                        light={{
                            fill: true,
                            style: {
                                fillContainer: true,
                                borderRadius: "10px"
                            },
                        }}
                    />
                </div>

            </div>

        </div>
    )
}

export default CatalogCartPageMobileModal;