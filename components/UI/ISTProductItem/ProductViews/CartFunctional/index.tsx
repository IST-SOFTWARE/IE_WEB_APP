import styles from "./index.module.scss";
import {useState, useEffect, useCallback, FC, CSSProperties, useContext} from "react";
import emptyProduct from "../src/Empty_Prod_image.svg";
import Link from "next/link";
import Image from "next/image";
import {ISTProductItemDistributor_Context} from "../../Context";
import {switchSelectedState_cartActions} from "../../Actions/CartActions";
import {IProductData} from "../../../common";
import {ProductItemSelector} from "../../ProductItemSelector";
import QuantityEditor from "../../QuantityEditor";

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
                      alt="Product item empty image"
                      src={emptyProduct}

                      fill={true}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  )}
                </Link>
              </div>

          {/*</Link>*/}


          <div className={styles.ItemDescription}>
            <div className={styles.itemData}>
              <div className={styles.title}>
                {productData && productData.title
                  ? productData.title
                  : "No title on this product"}
              </div>

              <div className={styles.vendCode}>
                {productData && productData.vendCode ? productData.vendCode : ""}
              </div>
            </div>

            <div className={styles.qAndPrice}>

              <div className={styles.qEditor}>
                <QuantityEditor
                  quantity={data?.quantity}
                  onChange={quantityEditorBuilder}
                />
              </div>


              <div className={styles.price}>
                <div className={styles.priceValue}>
                  {productData && !isNaN(Number(productData?.price))
                    ? new Intl.NumberFormat(currency).format(
                        Number(productData?.price)
                      )
                    : null}
                </div>

                <span>
                  ₽
                </span>
              </div>
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
