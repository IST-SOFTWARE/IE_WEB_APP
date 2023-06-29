import React, { FC, ReactNode, useEffect, useState } from "react";
import styles from "./index.module.scss";
import IstButtonN from "../ISTButton/ISTButtonN";
import { cartItemGetter_fnc } from "../common";
import { useRouter } from "next/router";
import ru from "../../../locales/ru";
import en from "../../../locales/en";
import { useAppSelector } from "../../../Hooks/reduxSettings";

interface ICartTotalSum {
  totalSum: number;
  totalSelect: number;
}

const ISTCartTotalSum: FC<ICartTotalSum> = ({ totalSelect, totalSum }) => {
  const [open, setOpen] = useState(false);

  const switchOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const router = useRouter();
  const t = router.locale === "ru-RU" ? ru : en;

  const region = useAppSelector((selector) => selector.region);

  return (
    <div className={styles.cart}>
      <div className={styles.cartLabel}>
        <div className={styles.yourCart}>
          {t.istCartTotalSum.yourCart}
          <div className={styles.productsQuantity}>
            {totalSelect ? totalSelect : 0}
          </div>
        </div>

        <div
          className={`${styles.arrow} ${open ? styles.openArrow : ""}`}
          onClick={switchOpen}
        ></div>
      </div>
      <div className={`${styles.prodSaleBox} ${open ? styles.openSaleBox : ""}`}>
        <div className={styles.prod}>
          <div className={styles.title}>
            {t.istCartTotalSum.products} ({totalSelect ? totalSelect : 0})
          </div>
          <div className={styles.total}>
            <span>
              {totalSum
                ? `${totalSum.toLocaleString(router?.locale, {
                    maximumFractionDigits: 2,
                  })}`
                : 0}
            </span>
            <span>{region.currency === "RUB" ? "₽" : "$"}</span>
          </div>
        </div>
        <div className={styles.sale}>
          <div className={styles.title}>{t.istCartTotalSum.sale}</div>
          <div className={styles.total}>
            {region.currency === "RUB" ? "₽" : "$"}
          </div>
        </div>
      </div>
      <div className={styles.sumBox}>
        <div className={styles.totalSum}>
          {t.istCartTotalSum.totalSum}:
          <span>
            {totalSum
              ? `${totalSum.toLocaleString(router?.locale, {
                  maximumFractionDigits: 2,
                })}`
              : 0}
            {region.currency === "RUB" ? " ₽" : " $"}
          </span>
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
    </div>
  );
};

export default ISTCartTotalSum;
