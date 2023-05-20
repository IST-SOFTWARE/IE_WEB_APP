import styles from "./index.module.scss";
import {useState, useEffect, useCallback, FC, CSSProperties, useContext} from "react";
import QuantityEditor from "./QuantityEditor";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import { IProductItem_cart } from "../../Abstract/ICartTypes";
import { ProductItemSelector } from "./ProductItemSelector";
import { IProductData } from "../../common";
import {ISTProductItemDistributor_Context} from "../../Context";
import {switchSelectedState_cartActions} from "../../Actions/CartActions";

const CartFunctional: FC = () => {

  const [productData, setProductData] = useState<IProductData>();
  const [checkedState, setCheckedState] = useState<boolean>(false);

  const {
    data,
    style,
    currency,
    cartSelector
  } = useContext(ISTProductItemDistributor_Context);


  // SELECT / DESELECT

    useEffect(() => {
      setCheckedState(cartSelector?.selectedState.indexOf(cartSelector.id) > -1);
    }, [cartSelector]);

  //


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


  const quantityEditorBuilder = (quantity: number) => {
    data && data.quantityEditor
      ? data.quantityEditor(data.productId, quantity)
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
                onChange={quantityEditorBuilder}
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
                  switchSelectedState_cartActions(cartSelector.id, cartSelector);
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
