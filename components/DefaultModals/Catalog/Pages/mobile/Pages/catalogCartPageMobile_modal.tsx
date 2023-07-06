import React, {FC, useState} from 'react';
import styles from "../../../../../../styles/Modals/catalog/mobile/catalogCartPageMobileModal.module.scss"
import ISTButtonN from "../../../../../UI/ISTButton/ISTButtonN";
import {CartWrapper} from "../../../../../ProductsWrapper/cartWrapper";
import {ICartSelector_type} from "../../../../../UI/ISTProductItem/Abstract/ICartTypes";
import {useRouter} from "next/router";
import ru from "../../../../../../locales/ru";
import en from "../../../../../../locales/en";
import {useAppSelector} from "../../../../../../Hooks/reduxSettings";

interface ICatalogCartPageMobileModal {
    currency?: "USD" | "RUB"
}

const CatalogCartPageMobileModal:FC<ICatalogCartPageMobileModal> = ({
   currency
}) => {

    const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([])

    const [numOfSelected, setNumOfSelected] = useState<number>(0);
    const [totalSum, setTotalSum] = useState<number>(0);

    const router = useRouter();
    const t = router.locale === "ru-RU" ? ru : en;

    const region = useAppSelector(selector => selector.region);

    return(
        <div className={styles.mobileModalCartWrapper}>
            <div className={styles.cartWrapper}>

                <CartWrapper
                    currency={{
                         currencySymbol: "",
                    }}

                    cartID={"9cfa4d6a-f2e9-400c-b0a9-4c85ab777272"}
                    cartSelector={{
                        selectedState: cartSelector,
                        setSelectedState: setCartSelector
                    }}

                    amountData={{
                        amountQuantitySetter: setNumOfSelected,
                        amountPriceSetter: setTotalSum,
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
                            {t.catalogCartPageMobileModal.select}
                        </div>
                        <div className={styles.selected_num}>
                            {numOfSelected}
                        </div>
                    </div>

                    <div className={styles.selected}>
                        <div className={styles.selected_txt}>
                            {t.catalogCartPageMobileModal.amount}
                        </div>
                        <div className={styles.selected_num}>
                            {`${totalSum
                                .toLocaleString(
                                    region.currency[region.currentCurrencyId]?.targetRegion, {
                                        maximumFractionDigits: 2
                                    })
                            } ${
                                region.currency[region.currentCurrencyId]?.currencySymbol}`
                            }
                        </div>
                    </div>

                </div>

                <div className={styles.btnPlace}>
                    <ISTButtonN
                        
                        title={{
                            caption: t.catalogCartPageMobileModal.order
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