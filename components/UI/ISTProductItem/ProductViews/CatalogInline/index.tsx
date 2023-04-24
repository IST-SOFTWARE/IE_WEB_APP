import React, { FC } from "react";
import styles from "./index.module.scss";

import noImg from "../src/Empty_Prod_image.svg";
import Image from "next/image";
import {IProductItem_catalog} from "../../ICatalogTypes";


const CatalogInline: FC<IProductItem_catalog> = ({
    style,
    currency,
    data
}) => {
  return (
    <>
      <div
        className={styles.productCardVariant_Inline}
        style={{
          margin: style?.margin,
        }}
      >
        <div className={styles.cardInline}>
          <div className={styles.imageBox}>
            {data.image ? (
              <Image alt="Product Item Image" src={data.image} />
            ) : (
              <Image width={120} alt="Product item empty image" src={noImg} />
            )}
          </div>

          <div className={styles.productInformationInline}>
            <div className={styles.title}>
              <div className={styles.productTitle}>{data.title}</div>
              <div className={styles.vendCode}>Артикул: {data.vendCode}</div>
            </div>

            <div className={styles.price}>Цена: {data.price}$</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogInline;
