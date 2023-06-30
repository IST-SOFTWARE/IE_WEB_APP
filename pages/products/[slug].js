import { useEffect, useRef, useState } from "react";

import styles from "../../styles/ProductPage/ProductPage.module.css";

import Head from "next/head";

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
import { inCart } from "../../legacy/cartActions/cartActions";

import ISTButtonN from "../../components/UI/ISTButton/ISTButtonN";

import ru from "../../locales/ru";
import en from "../../locales/en";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({ data }) {
  const router = useRouter();
  const t = router.locale === "ru-RU" ? ru : en;

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
        addToCartBtn.innerHTML = t.productPage.myCart;
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
        addToCartBtn.innerHTML = t.productPage.addToCart;
        createOrder?.classList?.add(`${styles.active}`);
        if (addToCartBtn.classList.contains(`${styles.active}`))
          addToCartBtn.classList.remove(`${styles.active}`);
      }
    }
  }, [prodInCart, productData]);

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
      <Head>
        <title>
          {data && data[0]
            ? `${data[0].product_name_ru} в Москве – купить в интернет-магазине запчастей для лифтов и эскалаторов`
            : "Product page"}
        </title>
        <meta
          name={"description"}
          content={
            data && data[0]
              ? `
                    У нас вы сможете приобрести ${data[0].product_name_ru} в Москве. 
                    Изделия, представленные в нашем магазине, изготавливаются только их 
                    прочных материалов, благодаря чему в несколько раз увеличивается срок 
                    эксплуатации. Башмаки, представленные в нашем магазине, обладают высокой 
                    безопасностью. 
                `
              : ""
          }
        />
      </Head>

      <div className={styles.ProductPage}>
        <div
          className="container-fluid justify-content-between"
          style={{
            maxWidth: "1480px",
          }}
        >
          <div className="d-block d-lg-flex d-xl-flex lg-justify-content-between xl-justify-content-between">
            <div className="col-12 col-lg-6 col-xl-6">
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
                        {/*<NextImageRatioSaver*/}
                        {/*    Img={productData ? productData.image_url : ""}*/}
                        {/*    primaryFill={"width"}*/}
                        {/*    q={100}*/}
                        {/*    unique={"_MainPI"}*/}
                        {/*    alt={productData ? productData.product_name_ru : ""}*/}
                        {/*    title={productData ? productData.product_name_ru : ""}*/}
                        {/*/>*/}

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
                        text={t.productPage.analog}
                        paragraph={t.productPage.for}
                        pu={setPU}
                        headersSet={setPuHeaders}
                        data={productData ? productData.product_name_ru : ""}
                        puTyper={setIsPuType}
                        isType={Analogue}
                      />

                      <ReplacementItem
                        text={t.productPage.replacement}
                        paragraph={t.productPage.for}
                        pu={setPU}
                        headersSet={setPuHeaders}
                        data={productData ? productData.product_name_ru : ""}
                        puTyper={setIsPuType}
                        isType={Replacement}
                      />

                      <ReplacementItem
                        text={t.productPage.partOf + "..."}
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

              {/* UNDER DEVELOPMENT */}

              {/* <div className={styles.AdditionalProductsBlock}>
                                <p>{productData ? "С этим товаром покупают..." : <LabelLoader LoadSizeInSymbols={15}/>}</p>
                                <div className={styles.AdditionalList} ref={ref}>

                                    {!productData ? [1,2,3].map(i => {
                                        return <AdditionalItem key={i}/>
                                    }) : (productData.additional_items).map(el => {
                                        return <AdditionalItem
                                            img={el.related_Products_id.image_url}
                                            name={el.related_Products_id.product_name_ru}
                                            slug={el.related_Products_id.slug}
                                            key={el.related_Products_id.slug}
                                        />
                                    })}

                                </div>
                            </div> */}
            </div>

            <div className="col-12 col-lg-6 col-xl-6">
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
                        {t.productPage.specifications}:
                      </p>
                      <div className={styles.ParamsWrapper}>
                        <DescriptionEntry
                          Title={t.productPage.brand}
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
                          Title={t.productPage.unit}
                          Params={
                            productData
                              ? productData.product_unit.map(
                                  (elem) =>
                                    " " + elem.Unit_category_id.unit_name
                                ) + ""
                              : ""
                          }
                        />

                        <DescriptionEntry
                          Title={t.productPage.type}
                          Params={
                            productData
                              ? productData.product_type.map(
                                  (elem) =>
                                    " " + elem.Type_category_id.type_name
                                ) + ""
                              : ""
                          }
                        />

                        <DescriptionEntry
                          Title={t.productPage.weight}
                          Params={
                            productData
                              ? productData.weight + t.productPage.wt
                              : "0" + t.productPage.wt
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
                                {t.productPage.price}:{" "}
                              </span>
                              {new Intl.NumberFormat("ru-RU").format(
                                productData.price
                              )}
                              <span className={styles.priceHider}>
                                {" "}
                                {t.productPage.currency}
                              </span>
                              <span className={styles.monySymbol}>
                                {" "}
                                {t.productPage.currencyStyle}
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
                                caption: t.productPage.inToCart,
                              }}
                              onClick={() => {}}
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
                                caption: t.productPage.addToCart,
                              }}
                              onClick={() => {}}
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
                              caption: t.productPage.order,
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
          </div>
        </div>
      </div>

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
                    {t.productPage.u}
                    <br />
                    {t.productPage.info}
                    <br />
                    {t.productPage.feedback}
                  </p>

                  <button
                    onClick={() => {
                      setPU(false);
                      setCbRequestModal(true);
                    }}
                  >
                    {t.productPage.infoTel}
                  </button>
                </li>
              ) : (
                <li>{productData[isPuType]}</li>
              )
            ) : (
              <li>{t.productPage.error}</li>
            )}
          </ul>
        </ComponentLoader>
      </PopUpBase>

      {/*Image-viewer modal */}
      {/* <Image
        image={productData ? productData.image_url : null}
        modalState={imageViewerPU}
        setModalState={setImageViewerPU}
      /> */}

      {/*Contacts modal*/}
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
