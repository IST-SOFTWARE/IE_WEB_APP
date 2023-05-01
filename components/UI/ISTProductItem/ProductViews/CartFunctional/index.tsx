import styles from "./index.module.scss";
import { useState, useEffect, useCallback, FC, CSSProperties } from "react";
import QuantityEditor from "./QuantityEditor";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import { IProductItem_cart } from "../../ICartTypes";
import { ProductItemSelector } from "./ProductItemSelector";
import {IProductData} from "../../common";


const CartFunctional: FC<IProductItem_cart> = ({
  style,
  currency,
  data }
) => {

  const [productData, setProductData] = useState<IProductData>();

  const [currentQuantity, setCurrentQuantity] = useState<number>(data.quantity);
  const [currentAmountPrice, setCurrentAmountPrice] = useState<number>(
      Number(data.amountPrice)
  );

  const [checkedState, setCheckedState] = useState<boolean>(false);

  useEffect(()=>{
    let isSub = true

    if(data.cartItemGetter)
      data.cartItemGetter(data.productId, {
        sideEffect: setProductData,
        flag: isSub
      }).catch(ex => console.warn(ex));

    return ()=> {
      isSub = false
    }

  },[data])


  return (
    <>
      <div className={styles.CartItemContainer}>
        <Link href={`/products/${productData ? productData.slug : null}`}>
          <div className={styles.ItemImg}>
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
                style={{
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            )}
          </div>
        </Link>
        <div className={styles.ItemDescription}>
          <div>
            <p>
              {productData && productData.title
                ? productData.title
                : "No title on this product"}
            </p>
          </div>

          <a href="#">
            Артикул:{" "}
            {productData && productData.vendCode ? productData.vendCode : ""}
          </a>

          <div className={styles.qAndPrice}>
            <QuantityEditor clickEvent={() => {}} value={currentQuantity} />

            <p>
              <span className={styles.priceTag}>Цена: </span>

              {currentAmountPrice && !isNaN(currentAmountPrice)
                ? new Intl.NumberFormat(currency).format(currentAmountPrice)
                : null}

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
