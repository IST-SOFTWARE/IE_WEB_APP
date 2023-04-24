import Image from "next/image";
import React, { FC, CSSProperties } from "react";
import styles from "./index.module.scss";

import addBasketIcon from "../src/add_to_basket.svg";
import noImg from "../src/Empty_Prod_image.svg";
import {IProductItem_catalog} from "../../ICatalogTypes";


const CatalogView: FC<IProductItem_catalog> = ({
  style,
  currency,
  data,
  cartaAdder
}) => {
  return (
    <>
      <div className={styles.card} style={{ margin: style?.margin }}>
        {data?.image ? (
          <Image fill alt="Product Item Image" src={data.image} />
        ) : (
          <Image fill alt="Product item empty image" src={noImg} />
        )}
        <div className={styles.productInformation}>
          <div className={styles.productTitle}>{data.title}</div>
          <div className={styles.price}>Price: {data.price}$</div>

          <div className={styles.addToBasket} onClick={()=>{
            cartaAdder ?
                cartaAdder() :
                null
          }}>

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
    </>
  );
};

export default CatalogView;
