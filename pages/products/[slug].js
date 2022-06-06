import styles from "../../styles/ProductPage/ProductPage.module.css"

import NextImageRatioSaver from "../../components/NextImageRatioSaver"
import ReplacementItem from "../../components/ProductPage/ReplacementItem"
import AdditionalItem from "../../components/ProductPage/AdditionalItem"

import AvailabilityStatus from "../../components/ProductPage/AvailabilityStatus";
import DescriptionEntry from "../../components/ProductPage/DescriptionEntry";
import GeometryViewer from "../../components/ProductPage/GeometryViewer";
import BlureProdImage from "../../components/ProductPage/BlureProdImage";

import PopUpBase from "../../components/PopUpBase";

import { useRef, useEffect, useState} from "react";
import { useRouter } from "next/router";

import getData from "../../queries/getData";
import { getProductData } from "../../queries/getProductData";
import ComponentLoader from "../../components/ComponentLoader";
import LabelLoader from "../../components/ModalComponents/LabelLoader";


export default function ProductPage(){
    
    const router = useRouter();
    const[puState, setPU] = useState(false);
    const[productData, setProductData] = useState();
    


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
                                            onClick={()=> setPU(true)} 
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
                                            <ReplacementItem/>
                                            <ReplacementItem/>
                                            <ReplacementItem/>
                                        </div>

                                </ComponentLoader>
                                    </div>
                        </div>
                        
                        
                        <div className={styles.AdditionalProductsBlock}>
                            <p>{productData ? "С этим товаром покупают..." : <LabelLoader LoadSizeInSymbols={15}/>}</p>
                            <div className={styles.AdditionalList} ref={ref}>

                                {!productData ? [1,2,3].map(i => {
                                    return <AdditionalItem key={i}/>
                                 }) : (productData.additional_items).map((row) => {
                                     return <AdditionalItem key={row.uniqueId}/>
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
                                            <button className={styles.AddToCartAction}>
                                                Добавить в корзину
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



