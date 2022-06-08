import styles from "../../styles/ProductPage/ProductPage.module.css"

import NextImageRatioSaver from "../../components/NextImageRatioSaver"
import ReplacementItem from "../../components/ProductPage/ReplacementItem"
import AdditionalItem from "../../components/ProductPage/AdditionalItem"

import AvailabilityStatus from "../../components/ProductPage/AvailabilityStatus";
import DescriptionEntry from "../../components/ProductPage/DescriptionEntry";
import GeometryViewer from "../../components/ProductPage/GeometryViewer";
import BlureProdImage from "../../components/ProductPage/BlureProdImage";

import PopUpBase from "../../components/PopUpBase";
import ComponentLoader from "../../components/ComponentLoader";
import LabelLoader from "../../components/ModalComponents/LabelLoader";

import Link from 'next/link'

import { useRef, useEffect, useState} from "react";
import { useRouter } from "next/router";

import { cartCreateAct, inCart } from "../../cartActions/cartActions";
import getData from "../../queries/getData";
import { getProductData } from "../../queries/getProductData";


export default function ProductPage(){
    
    const router = useRouter();

    const[isPuType, setIsPuType] = useState("");
    const[puState, setPU] = useState(false);
    const[puHeaders, setPuHeaders] = useState({
        header: "",
        paragraph: ""
    })

    const Analogue = "Analogue";
    const Replacement = "Replacement";
    const Included = "Included";


    const[productData, setProductData] = useState();
    
    const[addToCartResp, setCartResp] = useState(null);
    const[prodInCart, setInCart] = useState(false);
    const[linkPath, setLinkPath] = useState("");


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
  
  
// Get Prod Data
    useEffect(()=>{
        
        const {slug} = router.query;
        const ProdLoad = async() => {
            if(slug && slug !== null){
                const data = await getData(getProductData, 'Products', {product_slug: slug});
                setProductData(data[0]);
            }
        }

        if(!productData){
            ProdLoad();
        }
    });
//--------------

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
        if((createOrder).classList.contains(`${styles.active}`))
        createOrder.classList.remove(`${styles.active}`);
    }
    else if(!prodInCart && productData){
        const addToCartBtn = document.getElementById(`AddToCartAction_${productData.slug}`);
        const createOrder = document.querySelector(`.${styles.sendOrderAction}`);

        if(addToCartBtn !== null){
            addToCartBtn.innerHTML = "Добавить в корзину";
            createOrder.classList.add(`${styles.active}`);
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
        <div className={styles.ProductPage}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-15">
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
                                    
                                        <div className={styles.ProductImage}
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
                                                    <NextImageRatioSaver
                                                    Img={productData ? productData.image_url : ""}
                                                    wPrime={true}
                                                    q={100}
                                                    unique={"_MainPI"}
                                                    />
                                                </div>
                                            
                                        </div>
        
                                        <div className={styles.ProductReplacement}>
                                            <ReplacementItem text={"Аналог"}
                                            pu={setPU} headersSet={setPuHeaders}
                                            data={productData ? productData.product_name_ru : ""}
                                            puTyper={setIsPuType} isType={Analogue}/>

                                            <ReplacementItem text={"Замена"}    
                                            pu={setPU} headersSet={setPuHeaders}
                                            data={productData ? productData.product_name_ru : ""}
                                            puTyper={setIsPuType} isType={Replacement}/>

                                            <ReplacementItem text={"Входит в состав..."}
                                            pu={setPU} headersSet={setPuHeaders}
                                            paragraph={""}
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
                                     return <AdditionalItem key={el.slug}
                                     img={el.related_Products_id.image_url}
                                     name={el.related_Products_id.product_name_ru}
                                     slug={el.related_Products_id.slug}
                                     />
                                 })}
                                 
                            </div>
                        </div>
                    </div>

                    <div className="col-15 col-lg-7 col-xl-7">
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
                                        <GeometryViewer imagePath={
                                            productData ?
                                            productData.dimensions_product_types[0].dimensions_id.image :
                                            ""}
                                            geoSizes={
                                                productData ?
                                                {
                                                    a :productData.a,
                                                    b :productData.b,
                                                    c: productData.c,
                                                    d: productData.d,
                                                    e: productData.e,
                                                    f: productData.f
                                                }: {}
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
                                                    
                                                </button>

                                            <button className={styles.sendOrderAction}>
                                                Оформить заказ
                                            </button>
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
    

                        {productData && isPuType === Analogue ?
                            (productData.analogue).map(el => {
                            return <Link href={`/products/${el.related_Products_id.slug}`}><li key={el.related_Products_id.product_name_ru}>
                                    {el.related_Products_id.product_name_ru}
                                    </li></Link>
                                
                        }): productData && isPuType === Replacement ?
                            (productData.replacement).map(el => {
                            return <Link href={`/products/${el.related_Products_id.slug}`}><li key={el.related_Products_id.product_name_ru}>
                                    {el.related_Products_id.product_name_ru}
                                    </li></Link>
                        }): productData && isPuType === Included ?
                            (productData.products_included).map(el => {
                            // return <li key={el.related_Products_id.product_name_ru}>
                            //         {el.related_Products_id.product_name_ru}
                            //         </li>
                        }): ""}
                    </ul>
                </ComponentLoader>  
                

        </PopUpBase>

        </>
    )

}


// export async function getServerSideProps(ctx){
//     const {slug} = ctx.query;
//     const data = await getData(getProductData, 'Products', {product_slug: slug});
//     return{
//         props: {data}
//     }
// } 



