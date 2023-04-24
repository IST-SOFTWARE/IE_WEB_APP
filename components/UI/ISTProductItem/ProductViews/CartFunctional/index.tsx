import styles from "./index.module.scss";
import { useState, useEffect, useCallback, FC, CSSProperties } from "react";
import QuantityEditor from "./QuantityEditor";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import {IProductItem_cart} from "../../ICartTypes";
import {IProductData} from "../../common";
import {ProductItemSelector} from "./ProductItemSelector";

const CartFunctional: FC<IProductItem_cart> = ({
    style,
    currency,
    data
}) => {

  const [productData, setProductData] = useState<IProductData>()
  const [currentQuantity, setCurrentQuantity] = useState<number>()
  const [currentAmountPrice, setCurrentAmountPrice] = useState<number>()
  const [checkedState, setCheckedState] = useState<boolean>(false)

  return (
    <>
      <div className={styles.CartItemContainer}>
        <Link href={`/products/${productData ? productData.slug : null}`}>
          <div className={styles.ItemImg}>
            {productData && productData.image ? (
              <Image  alt="Product Item Image" src={productData.image} />
            ) : (
              <Image fill={true} alt="Product item empty image" src={emptyProduct} />
            )}
          </div>
        </Link>
        <div className={styles.ItemDescription}>
          <div>
            <p>{productData && productData.title ?
                productData.title :
                "No title on this product"}
            </p>
          </div>

          <a>Артикул: {productData && productData.vendCode ?
              productData.vendCode :
              ""}
          </a>

          <div className={styles.qAndPrice}>

            <QuantityEditor
                clickEvent={()=>{}}
                value={currentQuantity}
            />

            <p>
              <span className={styles.priceTag}>Цена: </span>

              {currentAmountPrice ?
                  new Intl.NumberFormat("ru-RU").format(currentAmountPrice) :
                  null
              }

              <span className={styles.priceTag}> руб</span>
              <span className={styles.priceLilTag}> ₽</span>
            </p>

          </div>
        </div>

        <div className={styles.CheckBoxBlock}>
          <ProductItemSelector
              state={checkedState}
              stateSetter={setCheckedState}
          />
        </div>
      </div>
    </>
  );
};

export default CartFunctional;
