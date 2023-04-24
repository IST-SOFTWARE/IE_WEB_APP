import React, {FC, useState} from "react";
import styles from "./index.module.scss";

import noImg from "../src/Empty_Prod_image.svg";
import Image from "next/image";
import {IProductItem_cart} from "../../ICartTypes";
import {IProductData} from "../../common";

const CartInformational: FC<IProductItem_cart> = ({
  style,
  currency,
  data
}) => {

  const [productData, setProductData] = useState<IProductData>()

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
            {productData && productData.image ? (
              <Image alt="Product Item Image" src={productData.image} />
            ) : (
              <Image width={120} alt="Product item empty image" src={noImg} />
            )}
          </div>

          <div className={styles.productInformationInline}>
            <div className={styles.title}>

              <div className={styles.productTitle}>{
                  productData && productData.title ?
                  productData.title :
                  ""}
              </div>

              <div className={styles.vendCode}>Артикул: {
                  productData && productData.vendCode ?
                  productData.vendCode :
                  ""}
              </div>

            </div>

            <div className={styles.priceContainer}>

              {data && data.quantity ? (
                <div className={styles.quantityBasket}>{data.quantity} шт</div>
              ) : null}

              <div className={styles.price}>Цена: {
                data && data.amountPrice ?
                data.amountPrice :
                ""}$
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartInformational;
