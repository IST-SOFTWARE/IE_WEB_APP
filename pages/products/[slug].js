import styles from "../../styles/ProductPage/ProductPage.module.css"
import Head from "next/head";
import LabelLoader from "../../legacy/components/ModalComponents/LabelLoader";
import ComponentLoader from "../../legacy/components/ComponentLoader";
import ReplacementItem from "../../legacy/components/ProductPage/ReplacementItem";
import AvailabilityStatus from "../../legacy/components/ProductPage/AvailabilityStatus";
import DescriptionEntry from "../../legacy/components/ProductPage/DescriptionEntry";
import GeometryViewer from "../../legacy/components/ProductPage/GeometryViewer";
import AdditionalItem from "../../legacy/components/ProductPage/AdditionalItem";
import ContactsModal from "../../legacy/components/DefaultModals/contactsModal";
import ImageViewerModal from "../../legacy/components/DefaultModals/imageViewerModal";
import {getData} from "../../legacy/queries/getData";
import PopUpBase from "../../legacy/components/PopUpBase";
import {useEffect, useRef, useState} from "react";
import {getProductData} from "../../legacy/queries/getProductData";
import {useRouter} from "next/router";
import BlureProdImage from "../../legacy/components/ProductPage/BlureProdImage";
import {inCart} from "../../legacy/cartActions/cartActions";


export default function ProductPage({data}){

    const router = useRouter();

    const[isPuType, setIsPuType] = useState("");

    // Modal windows states:
    const[puState, setPU] = useState(false);
    const[imageViewerPU, setImageViewerPU] = useState(false)
    const[cbRequestModal, setCbRequestModal] = useState(false);
    // ---------------------

    const[puHeaders, setPuHeaders] = useState({
        header: "",
        paragraph: ""
    })

    const Analogue = "analogue_text";
    const Replacement = "replacement_text";
    const Included = "included_text";


    const[productData, setProductData] = useState();

    const[addToCartResp, setCartResp] = useState(null);
    const[prodInCart, setInCart] = useState(false);

//Hor. Scroll Controller
    let ref = useRef();

    useEffect(()=>{
        const el = ref.current
        if(el){

            const onWheel = e =>{
                e.preventDefault()
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 4,
                    behavior: "smooth"
                })
            }

            el.addEventListener('wheel', onWheel);

            return () => el.removeEventListener('wheel', onWheel);
        }
    },[])
//---------------------


    useEffect(()=>{
        if(data && data[0])
            setProductData(data[0]);
    },[data])

    useEffect(()=>{
        if(productData){
            inCart(productData.id).
            then(elem => {
                setInCart(elem);
            });
        }
    },[productData, addToCartResp])

    useEffect(()=>{
        if(prodInCart && productData){
            const addToCartBtn = document.getElementById(`AddToCartAction_${productData.slug}`);
            const createOrder = document.querySelector(`.${styles.sendOrderAction}`);

            if(addToCartBtn !== null){
                addToCartBtn.innerHTML = "Моя корзина";
                addToCartBtn.classList.add(`${styles.active}`);
            }
            // if((createOrder).classList.contains(`${styles.active}`))
            // createOrder.classList.remove(`${styles.active}`);
        }
        else if(!prodInCart && productData){
            const addToCartBtn = document.getElementById(`AddToCartAction_${productData.slug}`);
            const createOrder = document.querySelector(`.${styles.sendOrderAction}`);

            if(addToCartBtn !== null){
                addToCartBtn.innerHTML = "Добавить в корзину";
                createOrder?.classList?.add(`${styles.active}`);
                if(addToCartBtn.classList.contains(`${styles.active}`))
                    addToCartBtn.classList.remove(`${styles.active}`);
            }
        }
    }, [prodInCart, productData])

    const addToCart = (id, q, p) =>{
        if(!prodInCart){
            cartCreateAct(id, q, p).then(elem => {
                setCartResp(elem);
            });
        }
        else{
            router.push("/cart");
        }
    }

    return(
        <>
            <Head>
                <title>{data && data[0] ?
                    `${data[0].product_name_ru} в Москве – купить в интернет-магазине запчастей для лифтов и эскалаторов`:
                    "Product page"}
                </title>
                <meta name={"description"} content={data && data[0] ? `
                    У нас вы сможете приобрести ${data[0].product_name_ru} в Москве. 
                    Изделия, представленные в нашем магазине, изготавливаются только их 
                    прочных материалов, благодаря чему в несколько раз увеличивается срок 
                    эксплуатации. Башмаки, представленные в нашем магазине, обладают высокой 
                    безопасностью. 
                ` : ""}/>
            </Head>

            <div className={styles.ProductPage}>
                <div className="container-fluid justify-content-between"

                    style={{
                        border: "solid 1px red",
                        maxWidth: "1480px"
                    }}
                >
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 col-12">
                            <div className={styles.ProductBlock}>
                                <p>
                                    <LabelLoader LoadSizeInSymbols={20}
                                                 data={productData} field={"product_name_ru"}/>

                                </p>
                                <a>
                                    <LabelLoader LoadSizeInSymbols={20}
                                                 data={productData} field={"vend_code"}/>
                                </a>

                                <div className={styles.Image_and_replacement}>
                                    <ComponentLoader fill_percent={90} margin={10} data={productData}>

                                        <button onClick={()=>setImageViewerPU(true)} className={styles.ProductImage}
                                                style = {{
                                                    backgroundImage: `url(${
                                                        BlureProdImage(productData ? productData.image_url : "")
                                                    })`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
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


                                                {/*  Image here  */}

                                            </div>
                                        </button>

                                        <div className={styles.ProductReplacement}>
                                            <ReplacementItem text={"Аналог"}
                                                             paragraph={"для"}
                                                             pu={setPU} headersSet={setPuHeaders}
                                                             data={productData ? productData.product_name_ru : ""}
                                                             puTyper={setIsPuType} isType={Analogue}/>

                                            <ReplacementItem text={"Замена"}
                                                             paragraph={"для"}
                                                             pu={setPU} headersSet={setPuHeaders}
                                                             data={productData ? productData.product_name_ru : ""}
                                                             puTyper={setIsPuType} isType={Replacement}/>

                                            <ReplacementItem text={"Входит в состав..."}
                                                             pu={setPU} headersSet={setPuHeaders}
                                                             data={productData ? productData.product_name_ru: ""}
                                                             puTyper={setIsPuType} isType={Included}/>
                                        </div>

                                    </ComponentLoader>
                                </div>
                            </div>


                            <div className={styles.AdditionalProductsBlock}>
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
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 col-xl-6">
                            <div className={styles.ProductDescription_wrapper}>
                                <ComponentLoader data={productData} margin={50}>
                                    <div className={styles.ProductDescription}>
                                        <AvailabilityStatus status={
                                            productData ? parseInt(productData.available_status) : 0
                                        }/>


                                        <div className={styles.ProductParams}>
                                            <p className={styles.CharacteristicsTitle}>
                                                Характеристики:
                                            </p>
                                            <div className={styles.ParamsWrapper}>

                                                <DescriptionEntry Title={"Марка"} Params={productData ?
                                                    productData.product_manufacturer.map(elem =>
                                                        ' ' + elem.manufacturer_category_id.
                                                            manufacturer_name) + "" :
                                                    ""}/>

                                                <DescriptionEntry Title={"Узел"} Params={productData ?
                                                    productData.product_unit.map(elem =>
                                                        ' ' + elem.Unit_category_id.
                                                            unit_name) + "" :
                                                    ""}/>

                                                <DescriptionEntry Title={"Тип"} Params={productData ?
                                                    productData.product_type.map(elem =>
                                                        ' ' + elem.Type_category_id.
                                                            type_name) + "" :
                                                    ""}/>

                                                <DescriptionEntry Title={"Вес"} Params={productData ?
                                                    productData.weight+"кг" :
                                                    "0кг"}/>


                                                <div className={styles.GeometryBlock}>

                                                    {/* внутри надо добавить некстовский имейдж для
                                                    отображения картинки с размерами*/}

                                                    <GeometryViewer imagePath={
                                                        productData ?
                                                            productData.form_factor_image :
                                                            ""}
                                                                    geoSizes={
                                                                        productData ? productData.sizes : null
                                                                    }
                                                    />
                                                </div>

                                                <div className={styles.DetailedDescription}>
                                                    <p>
                                                        <LabelLoader fill_percent={60} data={productData} field={"text_description"}/>
                                                    </p>
                                                </div>

                                            </div>
                                            <div className={styles.ProductActions}>
                                                <div className={styles.ProductPrice}>
                                                    {productData ? (
                                                        <p>
                                                            <span className={styles.priceHider}>Цена: </span>
                                                            {new Intl.NumberFormat('ru-RU').format(productData.price)}
                                                            <span className={styles.priceHider}> руб</span>
                                                            <span className={styles.monySymbol}> ₽</span>
                                                        </p>
                                                    ): ""}
                                                </div>
                                                <div className={styles.Actions}>
                                                    <button id={productData ?
                                                        'AddToCartAction_' + productData.slug :
                                                        ""}
                                                            onClick={() => addToCart(
                                                                productData.id, 1, productData.price
                                                            )}>
                                                        Добавить в корзину
                                                    </button>

                                                    {/*<button className={styles.sendOrderAction}>*/}
                                                    {/*    Оформить заказ*/}
                                                    {/*</button>*/}
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

            <PopUpBase puState={puState} closer={setPU}
                       header={ puHeaders ? puHeaders.header : ""}
                       paragraph={ puHeaders ? puHeaders.paragraph : ""}
            >

                <ComponentLoader data={productData}>
                    <ul className={styles.slug_PuBaseList}>

                        {productData ?
                            productData[isPuType] === "" ?
                                <li>
                                    <p>
                                        Упс!<br/>
                                        Данные еще не заполнены<br/>
                                        Свяжитесь с нами, и мы поможем
                                    </p>

                                    <button onClick={()=>
                                    {
                                        setPU(false);
                                        setCbRequestModal(true);
                                    }
                                    }>
                                        Уточнить по телефону
                                    </button>
                                </li> :
                                <li>{productData[isPuType]}</li> :
                            <li>Произошла ошибка</li>
                        }

                    </ul>
                </ComponentLoader>

            </PopUpBase>

            {/*Image-viewer modal */}
            <ImageViewerModal

                image={productData ? productData.image_url : null}
                modalState={imageViewerPU}
                setModalState={setImageViewerPU}
            />

            {/*Contacts modal*/}
            <ContactsModal
                modalState={cbRequestModal}
                modalSwitcher={setCbRequestModal}
            />

        </>
    )

}


export async function getServerSideProps(ctx){
    const {slug} = ctx.query;
    const data = await getData(getProductData, 'Products', {product_slug: slug});
    return{
        props: {data}
    }
}



