import React, { FC, ReactNode, useEffect, useState } from "react";
import styles from "./index.module.scss";
import IstButtonN from "../ISTButton/ISTButtonN";

export interface ICartTotalSum_translation{
  title: string,
  products: string,
  sale: string,
  totalSum: string,
  order: string,
}

interface ICartTotalSum_region {
  currencySymbol: string,
  region:  Intl.LocalesArgument
}

interface ICartTotalSum {
  totalSum: number;
  totalSelect: number;
  region: ICartTotalSum_region;
  translation: ICartTotalSum_translation;
}

const ISTCartTotalSum: FC<ICartTotalSum> = ({
    totalSelect,
    totalSum,
    region,
    translation,
}) => {
  const [open, setOpen] = useState(false);

  const switchOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };


  return (
    <div className={styles.cart}>
      <div className={styles.cartLabel}>
        <div className={styles.yourCart}>
          {translation?.title}
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
            {translation?.products} ({totalSelect ? totalSelect : 0})
          </div>
          <div className={styles.total}>
            <span>
              {totalSum
                ? `${totalSum.toLocaleString(region.region, {
                    maximumFractionDigits: 2,
                  })}`
                : 0}
            </span>
            <span>{region.currencySymbol}</span>
          </div>
        </div>
        <div className={styles.sale}>
          <div className={styles.title}>{translation?.sale}</div>
          <div className={styles.total}>
            {region.currencySymbol}
          </div>
        </div>
      </div>
      <div className={styles.sumBox}>
        <div className={styles.totalSum}>
          {translation?.totalSum}:
          <span>
            {totalSum
              ? `${totalSum.toLocaleString(region.region, {
                  maximumFractionDigits: 2,
                })}`
              : 0}
            {region.currencySymbol}
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
            caption: translation?.order,
          }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ISTCartTotalSum;
