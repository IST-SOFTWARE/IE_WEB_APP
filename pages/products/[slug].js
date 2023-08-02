import { useEffect, useRef, useState } from "react";
import { useTransition } from '../../Hooks/useTranslation/useTranslation';

import styles from "../../styles/ProductPage/ProductPage.module.css";

import LabelLoader from "../../legacy/components/ModalComponents/LabelLoader";
import ComponentLoader from "../../legacy/components/ComponentLoader";
import ReplacementItem from "../../legacy/components/ProductPage/ReplacementItem";
import AvailabilityStatus from "../../legacy/components/ProductPage/AvailabilityStatus";
import DescriptionEntry from "../../legacy/components/ProductPage/DescriptionEntry";
import GeometryViewer from "../../legacy/components/ProductPage/GeometryViewer";
import ContactsModal from "../../legacy/components/DefaultModals/contactsModal";
import PopUpBase from "../../legacy/components/PopUpBase";
import BlureProdImage from "../../legacy/components/ProductPage/BlureProdImage";

import { getData } from "../../legacy/queries/getData";
import { getProductData } from "../../legacy/queries/getProductData";
import { cartCreateAct, inCart } from "../../legacy/cartActions/cartActions";

import ISTButtonN from "../../components/UI/ISTButton/ISTButtonN";

import Image from "next/image";
import Link from "next/link";
import DefaultLandingPage from "../../components/LandingPages/DefaultLandingPage";

import { EN_LOCALE, RU_LOCALE } from "../../locales/locales";


import ru_productPage from "../../locales/productPage/ru";
import en_productPage from "../../locales/productPage/en";

export default function ProductPage({ data }) {

  const currentTranslationProductPage = useTransition([
    { locale: RU_LOCALE, translation: ru_productPage },
    { locale: EN_LOCALE, translation: en_productPage },
  ]);

  const [isPuType, setIsPuType] = useState("");

  // Modal windows states:
  const [puState, setPU] = useState(false);
  const [imageViewerPU, setImageViewerPU] = useState(false);
  const [cbRequestModal, setCbRequestModal] = useState(false);
  // ---------------------

  const [puHeaders, setPuHeaders] = useState({
    header: "",
    paragraph: "",
  });

  const Analogue = "analogue_text";
  const Replacement = "replacement_text";
  const Included = "included_text";

  const [productData, setProductData] = useState();

  const [addToCartResp, setCartResp] = useState(null);
  const [prodInCart, setInCart] = useState(false);

  //Hor. Scroll Controller
  let ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const onWheel = (e) => {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 4,
          behavior: "smooth",
        });
      };

      el.addEventListener("wheel", onWheel);

      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  //---------------------

  useEffect(() => {
    if (data && data[0]) setProductData(data[0]);
  }, [data]);

  useEffect(() => {
    if (productData) {
      inCart(productData.id).then((elem) => {
        setInCart(elem);
      });
    }
  }, [productData, addToCartResp]);

  useEffect(() => {
    if (prodInCart && productData) {
      const addToCartBtn = document.getElementById(
        `AddToCartAction_${productData.slug}`
      );
      const createOrder = document.querySelector(`.${styles.sendOrderAction}`);

      if (addToCartBtn !== null) {
        addToCartBtn.innerHTML = currentTranslationProductPage?.translation?.myCart;
        addToCartBtn.classList.add(`${styles.active}`);
      }
      // if((createOrder).classList.contains(`${styles.active}`))
      // createOrder.classList.remove(`${styles.active}`);
    } else if (!prodInCart && productData) {
      const addToCartBtn = document.getElementById(
        `AddToCartAction_${productData.slug}`
      );
      const createOrder = document.querySelector(`.${styles.sendOrderAction}`);

      if (addToCartBtn !== null) {
        addToCartBtn.innerHTML = currentTranslationProductPage?.translation?.addToCart;
        createOrder?.classList?.add(`${styles.active}`);
        if (addToCartBtn.classList.contains(`${styles.active}`))
          addToCartBtn.classList.remove(`${styles.active}`);
      }
    }
  }, [prodInCart, productData, currentTranslationProductPage]);

  const addToCart = (id, q, p) => {
    if (!prodInCart) {
      cartCreateAct(id, q, p).then((elem) => {
        setCartResp(elem);
      });
    } else {
      router.push("/cart");
    }
  };

  return (
    <>
      <DefaultLandingPage
        landingDescription={{
          title: null,
          titleOffset: 100,
        }}
        pageId={"ProductPage"}
      >
        <>
          <div className="col-12 col-lg-6 p-0">
            <div className={styles.ProductBlock}>
              <p>
                <LabelLoader
                  LoadSizeInSymbols={20}
                  data={productData}
                  field={"product_name_ru"}
                />
              </p>
              <Link href="#">
                <LabelLoader
                  LoadSizeInSymbols={20}
                  data={productData}
                  field={"vend_code"}
                />
              </Link>

              <div className={styles.Image_and_replacement}>
                <ComponentLoader
                  fill_percent={90}
                  margin={10}
                  data={productData}
                >
                  <button
                    onClick={() => setImageViewerPU(true)}
                    className={styles.ProductImage}
                    style={{
                      backgroundImage: `url(${BlureProdImage(
                        productData ? productData.image_url : ""
                      )})`,
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div>
                      <Image
                        src={productData ? productData.image_url : ""}
                        fill={true}
                        alt={productData ? productData.product_name_ru : ""}
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  </button>

                  <div className={styles.ProductReplacement}>
                    <ReplacementItem
                      text={currentTranslationProductPage?.translation?.analog}
                      paragraph={currentTranslationProductPage?.translation?.for}
                      pu={setPU}
                      headersSet={setPuHeaders}
                      data={productData ? productData.product_name_ru : ""}
                      puTyper={setIsPuType}
                      isType={Analogue}
                    />

                    <ReplacementItem
                      text={currentTranslationProductPage?.translation?.replacement}
                      paragraph={currentTranslationProductPage?.translation?.for}
                      pu={setPU}
                      headersSet={setPuHeaders}
                      data={productData ? productData.product_name_ru : ""}
                      puTyper={setIsPuType}
                      isType={Replacement}
                    />

                    <ReplacementItem
                      text={currentTranslationProductPage?.translation?.partOf + "..."}
                      pu={setPU}
                      headersSet={setPuHeaders}
                      data={productData ? productData.product_name_ru : ""}
                      puTyper={setIsPuType}
                      isType={Included}
                    />
                  </div>
                </ComponentLoader>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className={styles.ProductDescription_wrapper}>
              <ComponentLoader data={productData} margin={50}>
                <div className={styles.ProductDescription}>
                  <AvailabilityStatus
                    status={
                      productData ? parseInt(productData.available_status) : 0
                    }
                  />

                  <div className={styles.ProductParams}>
                    <p className={styles.CharacteristicsTitle}>
                      {currentTranslationProductPage?.translation?.specifications}:
                    </p>
                    <div className={styles.ParamsWrapper}>
                      <DescriptionEntry
                        Title={currentTranslationProductPage?.translation?.brand}
                        Params={
                          productData
                            ? productData.product_manufacturer.map(
                                (elem) =>
                                  " " +
                                  elem.manufacturer_category_id
                                    .manufacturer_name
                              ) + ""
                            : ""
                        }
                      />

                      <DescriptionEntry
                        Title={currentTranslationProductPage?.translation?.unit}
                        Params={
                          productData
                            ? productData.product_unit.map(
                                (elem) => " " + elem.Unit_category_id.unit_name
                              ) + ""
                            : ""
                        }
                      />

                      <DescriptionEntry
                        Title={currentTranslationProductPage?.translation?.type}
                        Params={
                          productData
                            ? productData.product_type.map(
                                (elem) => " " + elem.Type_category_id.type_name
                              ) + ""
                            : ""
                        }
                      />

                      <DescriptionEntry
                        Title={currentTranslationProductPage?.translation?.weight}
                        Params={
                          productData
                            ? productData.weight + currentTranslationProductPage?.translation?.wt
                            : "0" + currentTranslationProductPage?.translation?.wt
                        }
                      />

                      <div className={styles.GeometryBlock}>
                        {/* внутри надо добавить некстовский имейдж для
                                                      отображения картинки с размерами*/}

                        <GeometryViewer
                          imagePath={
                            productData ? productData.form_factor_image : ""
                          }
                          geoSizes={productData ? productData.sizes : null}
                        />
                      </div>

                      <div className={styles.DetailedDescription}>
                        <p>
                          <LabelLoader
                            fill_percent={60}
                            data={productData}
                            field={"text_description"}
                          />
                        </p>
                      </div>
                    </div>
                    <div className={styles.ProductActions}>
                      <div className={styles.ProductPrice}>
                        {productData ? (
                          <p>
                            <span className={styles.priceHider}>
                              {currentTranslationProductPage?.translation?.price}:{" "}
                            </span>
                            {new Intl.NumberFormat("ru-RU").format(
                              productData.price
                            )}
                            <span className={styles.priceHider}>
                              {" "}
                              {currentTranslationProductPage?.translation?.currency}
                            </span>
                            <span className={styles.monySymbol}>
                              {" "}
                              {currentTranslationProductPage?.translation?.currencyStyle}
                            </span>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={styles.Actions}>
                        {prodInCart ? (
                          <ISTButtonN
                            dark={{
                              solid: false,
                              fill: true,
                              fillContainer: true,
                            }}
                            title={{
                              caption: currentTranslationProductPage?.translation?.inToCart,
                            }}
                            onClick={() => {
                              addToCart(productData.id, 1, null);
                            }}
                          />
                        ) : (
                          <ISTButtonN
                            light={{
                              fill: false,
                              style: {
                                borderRadius: "15px",
                                fillContainer: true,
                              },
                            }}
                            title={{
                              caption: currentTranslationProductPage?.translation?.addToCart,
                            }}
                            onClick={() => {
                              addToCart(productData.id, 1, null);
                            }}
                          />
                        )}

                        <ISTButtonN
                          light={{
                            fill: true,
                            style: {
                              borderRadius: "15px",
                              fillContainer: true,
                            },
                          }}
                          title={{
                            caption: currentTranslationProductPage?.translation?.order,
                          }}
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ComponentLoader>
            </div>
          </div>
        </>
      </DefaultLandingPage>

      <PopUpBase
        puState={puState}
        closer={setPU}
        header={puHeaders ? puHeaders.header : ""}
        paragraph={puHeaders ? puHeaders.paragraph : ""}
      >
        <ComponentLoader data={productData}>
          <ul className={styles.slug_PuBaseList}>
            {productData ? (
              productData[isPuType] === "" ? (
                <li>
                  <p>
                    {currentTranslationProductPage?.translation?.u}
                    <br />
                    {currentTranslationProductPage?.translation?.info}
                    <br />
                    {currentTranslationProductPage?.translation?.feedback}
                  </p>

                  <button
                    onClick={() => {
                      setPU(false);
                      setCbRequestModal(true);
                    }}
                  >
                    {currentTranslationProductPage?.translation?.infoTel}
                  </button>
                </li>
              ) : (
                <li>{productData[isPuType]}</li>
              )
            ) : (
              <li>{currentTranslationProductPage?.translation?.error}</li>
            )}
          </ul>
        </ComponentLoader>
      </PopUpBase>

      <ContactsModal
        modalState={cbRequestModal}
        modalSwitcher={setCbRequestModal}
      />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  const data = await getData(getProductData, "Products", {
    product_slug: slug,
  });
  return {
    props: { data },
  };
}
