import styles from "./index.module.scss";
import { useState, useEffect, useCallback, FC, CSSProperties } from "react";
import QuantityEditor from "./QuantityEditor";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import { IProductItem_cart } from "../../Abstract/ICartTypes";
import { ProductItemSelector } from "./ProductItemSelector";
import { IProductData } from "../../common";

const CartFunctional: FC<IProductItem_cart> = ({
  style,
  data,
  currency,
  cartSelector,
}) => {
  const [productData, setProductData] = useState<IProductData>();
  const [checkedState, setCheckedState] = useState<boolean>(false);

  useEffect(() => {
      setCheckedState(cartSelector?.selectedState.indexOf(cartSelector.id) > -1);
  }, [cartSelector]);

  const switchSelectedState = useCallback((idx: number)=>{
    if(!cartSelector) return

      const prevSelectorsList = [...cartSelector.selectedState];
      const foundIdx = prevSelectorsList.indexOf(idx);

      foundIdx > -1 ?
          prevSelectorsList.splice(foundIdx, 1) :
          prevSelectorsList.push(idx);

      cartSelector.setSelectedState(prevSelectorsList);

  },[cartSelector])


  useEffect(() => {
    let isSub = true;
    if (data.cartItemGetter)
      data
        .cartItemGetter(data.productId, {
          sideEffect: setProductData,
          flag: isSub,
        })
        .catch((ex) => console.warn(ex));

    return () => {
      isSub = false;
    };
  }, [data]);


  const quentityEditorBuilder = (quentity: number) => {
    data && data.quantityEditor
      ? data.quantityEditor(data.productId, quentity)
      : null;
  };


  return (
    <>
      <div className={styles.CartItemContainer} style={style}>
        <div className={styles.productContainer}>
          <div className={styles.ItemImg}>
            <Link href={`/products/${productData ? productData.slug : null}`}>
              {productData && productData.image ? (
                <Image
                  alt="Product Item Image"
                  src={productData.image}
                  fill={true}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : (
                <Image
                  fill={true}
                  alt="Product item empty image"
                  src={emptyProduct}
                />
              )}
            </Link>
          </div>
          <div className={styles.ItemDescription}>
            <div>
              <p>
                {productData && productData.title
                  ? productData.title
                  : "No title on this product"}
              </p>
            </div>

            <a>
              Артикул:{" "}
              {productData && productData.vendCode ? productData.vendCode : ""}
            </a>

            <div className={styles.qAndPrice}>
              <QuantityEditor
                quantity={data?.quantity}
                onChange={quentityEditorBuilder}
              />

              <p>
                <span className={styles.priceTag}>Цена: </span>

                {productData && !isNaN(Number(productData?.price))
                  ? new Intl.NumberFormat(currency).format(
                      Number(productData?.price)
                    )
                  : null}

                <span className={styles.priceTag}> руб</span>
                <span className={styles.priceLilTag}> ₽</span>
              </p>
            </div>
          </div>
          {cartSelector ? (
            <div className={styles.CheckBoxBlock}>
              <ProductItemSelector
                state={checkedState}
                onSelect={()=>{
                  switchSelectedState(cartSelector.id);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CartFunctional;
