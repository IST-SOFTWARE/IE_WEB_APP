import Image from "next/image";
import React, { CSSProperties, FC } from "react";
import styles from "./productItem.module.scss";
import noImg from "./Empty_Prod_image.svg";
import addBasketIcon from "./add_to_basket.svg";
import { maxLengthText } from "../common";

type marginStyles = Pick<CSSProperties, "margin">;

type inlineProperty = {
  inline?: boolean;
};

interface ISTProductItemStyles extends marginStyles, inlineProperty {}

interface IProductItem {
  id: number;
  image?: string;
  title: string;
  price: string;
  style?: ISTProductItemStyles;
  addedToCart?: number;
  vendCode: string;
  currency: "RU" | "EN";
  cartAdder?: (...props: any) => any;
}

const IstProductItem: FC<IProductItem> = ({
  id,
  image,
  title,
  price,
  style,
  vendCode,
  currency,
  addedToCart,
  cartAdder,
}) => {
  return (
    <>
      <div className={styles.card} style={{ margin: style?.margin }}>

        {image ? (
            <Image fill alt="Product Item Image" src={image} />
        ) : (
            <Image fill alt="Product item empty image" src={noImg} />
        )}

        <div className={styles.productInformation}>
          <div className={styles.productTitle}>
            {maxLengthText(title, 24)}
          </div>
          <div className={styles.price}>Price: {price}$</div>

          <div className={styles.addToBasket} onClick={cartAdder}>
            <div className={styles.addToCart_container}>
              <Image
                  fill={true}
                  alt="imageBasket"
                  src={addBasketIcon}
                  style={{
                    objectPosition: "center",
                  }}
              />
            </div>
          </div>
        </div>
      </div>

      {/*{style?.inline === false || style?.inline === undefined || !style ? (*/}
      {/*  <div className={styles.card} style={{ margin: style?.margin }}>*/}

      {/*    {image ? (*/}
      {/*      <Image fill alt="Product Item Image" src={image} />*/}
      {/*    ) : (*/}
      {/*      <Image fill alt="Product item empty image" src={noImg} />*/}
      {/*    )}*/}

      {/*    <div className={styles.productInformation}>*/}
      {/*      <div className={styles.productTitle}>*/}
      {/*        {maxLengthText(title, 24)}*/}
      {/*      </div>*/}
      {/*      <div className={styles.price}>Price: {price}$</div>*/}

      {/*      <div className={styles.addToBasket} onClick={cartAdder}>*/}
      {/*        <Image*/}
      {/*            fill={true}*/}
      {/*            alt="imageBasket"*/}
      {/*            src={addBasketIcon}*/}
      {/*            style={{*/}
      {/*              padding: "6px"*/}
      {/*            }}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    */}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div*/}
      {/*    className={styles.productCardVariant_Inline}*/}
      {/*    style={{*/}
      {/*      margin: style.margin,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div className={styles.cardInline}>*/}
      {/*      <div className={styles.imageBox}>*/}
      {/*        {image ? (*/}
      {/*          <Image alt="Product Item Image" src={image} />*/}
      {/*        ) : (*/}
      {/*          <Image width={120} alt="Product item empty image" src={noImg} />*/}
      {/*        )}*/}
      {/*      </div>*/}

      {/*      <div className={styles.productInformationInline}>*/}

      {/*        <div className={styles.title}>*/}
      {/*          <div className={styles.productTitle}>*/}
      {/*            {maxLengthText(title, 24)}*/}
      {/*          </div>*/}
      {/*          <div className={styles.vendCode}>Артикул: {vendCode}</div>*/}
      {/*        </div>*/}

      {/*        <div className={styles.priceContainer}>*/}
      {/*          {addedToCart ||*/}
      {/*          addedToCart != undefined ||*/}
      {/*          addedToCart != null ? (*/}
      {/*            <div className={styles.quantityBasket}>{addedToCart} шт</div>*/}
      {/*          ) : null}*/}
      {/*          <div className={styles.price}>Цена: {price}$</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
};

export default IstProductItem;
