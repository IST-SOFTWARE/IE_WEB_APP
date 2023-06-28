import React, { FC, ReactNode, useEffect, useState } from "react";
import styles from "./index.module.scss";
import IstButtonN from "../ISTButton/ISTButtonN";
import { cartItemGetter_fnc } from "../common";
import { useRouter } from "next/router";
import ru from "../../../locales/ru";
import en from "../../../locales/en";

interface ICartTotalSum {
  totalSum: number;
  totalSelect: number;
}

const ISTCartTotalSum: FC<ICartTotalSum> = ({ totalSelect, totalSum }) => {
  const [selected, setSelected] = useState<number>(0);
  const [sum, setSum] = useState<number>(0);

  const router = useRouter();
  const t = router.locale === "ru-RU" ? ru : en;

  useEffect(() => {
    setSelected(totalSelect);
    setSum(totalSum);
  }, [totalSelect, totalSum]);

  return (
    <div className={styles.cart}>
      <div className={styles.cartLabel}>
        {t.istCartTotalSum.yourCart}
        <div className={styles.productsQuantity}>{selected ? selected : 0}</div>
      </div>
      <div className={styles.prodSaleBox}>
        <div className={styles.prod}>
          <div className={styles.title}>
            {t.istCartTotalSum.products} ({selected ? selected : 0})
          </div>
          <div className={styles.total}>{t.istCartTotalSum.currencyStyle}</div>
        </div>
        <div className={styles.sale}>
          <div className={styles.title}>{t.istCartTotalSum.sale}</div>
          <div className={styles.total}>{t.istCartTotalSum.currencyStyle}</div>
        </div>
      </div>
      <div className={styles.totalSum}>
        {t.istCartTotalSum.totalSum}: {sum ? sum : 0}
        {t.istCartTotalSum.currencyStyle}
      </div>
      <IstButtonN
        light={{
          fill: true,
          style: {
            borderRadius: "15px",
            fillContainer: true,
          },
        }}
        title={{
          caption: t.istCartTotalSum.order,
        }}
        onClick={() => {}}
      />
    </div>
  );
};

export default ISTCartTotalSum;
