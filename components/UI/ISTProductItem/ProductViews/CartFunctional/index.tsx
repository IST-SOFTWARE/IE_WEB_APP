import styles from "./index.module.scss";
import { useState, useEffect, useCallback, FC, CSSProperties } from "react";
import QuantityEditor from "./QuantityEditor";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import { IProductItem_cart } from "../../ICartTypes";
import { IProductData } from "../../common";
import { ProductItemSelector } from "./ProductItemSelector";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CART_BY_ID } from "../../../../../queries/cart/cartActions";

interface IProductItemCart extends Pick<IProductData, "id" | "slug" | "price"> {
  image_url?: string;
  product_name_ru: string;
  product_name: string;
  vend_code: string;
}

const CartFunctional: FC<IProductItem_cart> = ({ style, currency, data }) => {

  // Promise.resolve(data.cartItemGetter(data.productId))
  //   .then((data) => {
  //     setProductData(data);
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const { data: fetchProductData } = useQuery(GET_PRODUCT_CART_BY_ID, {
  //   variables: { id: Number(data.productId) },
  // });

  const [productData, setProductData] = useState<IProductItemCart>();

  const [currentQuantity, setCurrentQuantity] = useState<number>(data.quantity);
  const [currentAmountPrice, setCurrentAmountPrice] = useState<number>(
    Number(productData?.price)
  );
  const [checkedState, setCheckedState] = useState<boolean>(false);

  return (
    <>
      <div className={styles.CartItemContainer}>
        <Link href={`/products/${productData ? productData.slug : null}`}>
          <div className={styles.ItemImg}>
            {productData && productData.image_url ? (
              <Image
                alt="Product Item Image"
                src={productData.image_url}
                fill
              />
            ) : (
              <Image
                fill={true}
                alt="Product item empty image"
                src={emptyProduct}
              />
            )}
          </div>
        </Link>
        <div className={styles.ItemDescription}>
          <div>
            <p>
              {productData && productData.product_name_ru
                ? productData.product_name_ru
                : "No title on this product"}
            </p>
          </div>

          <a href="#">
            Артикул:{" "}
            {productData && productData.vend_code ? productData.vend_code : ""}
          </a>

          <div className={styles.qAndPrice}>
            <QuantityEditor clickEvent={() => {}} value={currentQuantity} />

            <p>
              <span className={styles.priceTag}>Цена: </span>

              {currentAmountPrice
                ? new Intl.NumberFormat("ru-RU").format(currentAmountPrice)
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
