import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.scss";

import emptyProduct from "../src/Empty_Prod_image.svg";

import Image from "next/image";
import { IProductItem_cart } from "../../ICartTypes";
import { IProductData } from "../../common";

const CartFunctional_mobile: FC<IProductItem_cart> = ({
  style,
  currency,
  data,
  cartSelector
}) => {
  const [productData, setProductData] = useState<IProductData>();

  useEffect(() => {
    let isSub = true;

    if (!data.cartItemGetter)
      return () => {
        isSub = false;
      };

    data
      .cartItemGetter(data.productId, {
        sideEffect: setProductData,
        flag: isSub,
      })
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <>
      <div
        className={styles.productCardVariant_Inline}
        style={{
          margin: style?.margin,
        }}
      >
        <div className={styles.cardInline}>
          <div className={styles.productContainer}>
            <div className={styles.imageBox}>
              {productData && productData.image ? (
                <Image
                  alt="Product Item Image"
                  src={productData.image}
                  fill={true}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              ) : (
                <Image
                  fill={true}
                  alt="Product item empty image"
                  src={emptyProduct}
                />
              )}
            </div>

              <div className={styles.productInformationInline}>
                <div className={styles.title}>
                  <div className={styles.productTitle}>
                    {productData && productData.title ? productData.title : ""}
                  </div>

                  <div className={styles.vendCode}>
                    Артикул:{" "}
                    {productData && productData.vendCode
                      ? productData.vendCode
                      : ""}
                  </div>
                </div>

                <div className={styles.priceContainer}>
                  {data && data.quantity ? (
                    <div className={styles.quantityBasket}>{data.quantity} шт</div>
                  ) : null}

                  <div className={styles.price}>
                    Цена: {data && data.amountPrice ? data.amountPrice : ""}$
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>
    </>
  );
};

export default CartFunctional_mobile;