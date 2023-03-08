import styles from "../../styles/Catalog.module.css"
import HeaderStyles from "../../styles/Header.module.css"

const CatalogProductItem = lazy(() => import("./CatalogProductItem"));
// import CatalogProductItem from "./CatalogProductItem";

import CatalogItemLoader from "./CatalogItemLoader";
import CatalogContext from "../Context/CatalogContext";
import CatalogFilterItem from "./CatalogFilterItem";
import CatalogFilter from "./CatalogFilter";

import { createPortal } from "react-dom";
import { useEffect, useState, useReducer, useContext, useRef} from "react";
import { Suspense,lazy } from "react";

import reducer from "./Reducer/reducer";
import {ToggleCatalogGenerator, SearchCatalogGenerator, SetNewFilterGenerator} from "./Reducer/actions";

import "../../helpers/debounce"
import * as GlobalBP from "./ReducerGlobalBoilerplates";
import Filter from "./Filters/Filter";
import BooleanFilter from "./Filters/BooleanFilter";
import SearchFilter from "./Filters/SearchFilter";
import Excluder from "./Filters/Excluder";
import {SetAvailability_BP, SetElevator_BP, SetEscalator_BP} from "./Reducer/boilerplates";

export default function Catalog({openState, catalogFilter, HeaderForLoader}){
    const[isBrowser, setIsBrowser] = useState(false);

    const[products, setProducts] = useState([]);
    const[filteredProducts, setFiltered] = useState([]);

    const[outProducts, setOutProducts] = useState([]);
    const[productsPages, setProductsPages] = useState({
        pagesNum: 1,
        actPage: 1,
        pageSize: 15
    })

    const[filteringProcess, setFilteringProcess] = useState(false);
    const[isFirstRender, setFirstRender] = useState(true);
    // const[AllProducts, setAllProducts] = useState([]);

    const[productsLoaded, setPrLoaded] = useState(false);
    
    const Catalog_cont = useContext(CatalogContext);
    
    const delay = (ms) => {
        return new Promise(r => setTimeout(()=> r(), ms));
    }

    useEffect(()=>{
        setIsBrowser(true);
        setPrLoaded(false);
    },[]);


    const [CatalogReducer, dispatch] = useReducer(reducer, {
        isOpen: false,          //Open/Close Catalog
        
        Search: '',             //For Search
        ForLift: false,         //For Lift CheckBox
        ForEscalator: false,    //For Escalator CheckBox
        Availability: false,    //Availability CheckBox
        
        Manufacturers: [],       //Manufacturer List
        Types: [],               //Type List
        Units: [],               //Unit List

    })
    

    useEffect(()=>{
        (
            async ()=> {
                try{

                    if(CatalogReducer && CatalogReducer.isOpen){
                        if(Catalog_cont.CatalogProducts){
                        await delay(400);
                        setPrLoaded(true);

                        setProducts(Catalog_cont.CatalogProducts);
                        setFiltered(Catalog_cont.CatalogProducts);
                        // console.log("opened");
                        }
                        
                    } else{
                        setPrLoaded(false);

                        setProducts([]);
                        setFiltered([]);
                        // console.log("closed");
                    }

            } catch(e){
                    console.error("Failed to fetch[Catalog items]: ", e);
                }

            }
        )()
    },[CatalogReducer.isOpen])
    

    useEffect(()=>{
        if(Catalog_cont)
            dispatch(SearchCatalogGenerator(Catalog_cont.ProductSearch.s));
    },[Catalog_cont])


    useEffect(()=>{ 

        let productsCategoriesList = new Array();
        let buffer = new Array();
        let PrItem = new Object();

        let ProductFilters = [
            GlobalBP.MFG_FilterReducer,
            GlobalBP.Types_FilterReducer,
            GlobalBP.Units_FilterReducer
        ];

        let BooleanFilters = [
            GlobalBP.Availability_FilterReducer,
            GlobalBP.ForLift_FilterReducer,
            GlobalBP.ForEscalator_FilterReducer
        ];

        if(CatalogReducer && products && products.length > 0){ 
        
            products.map((elem, i) => {

                // set product id
                PrItem["id"] = elem.id;

                PrItem[GlobalBP.ProdName_SearchFilter] = elem.product_name_ru;
                PrItem[GlobalBP.ProdDesc_SearchFilter] = elem.text_description;
                PrItem[GlobalBP.ProdVendCode_SearchFilter] = elem.vend_code;

                // set product type_of_equipment
                if((elem.type_of_equipment.includes(GlobalBP.elevatorSelector)) && (elem.type_of_equipment.includes(GlobalBP.escalatorSelector))){
                    PrItem[GlobalBP.ForLift_FilterReducer] = true;
                    PrItem[GlobalBP.ForEscalator_FilterReducer] = true;
                }
                
                else if((elem.type_of_equipment.includes(GlobalBP.elevatorSelector)) && !(elem.type_of_equipment.includes(GlobalBP.escalatorSelector))){
                    PrItem[GlobalBP.ForLift_FilterReducer] = true;
                    PrItem[GlobalBP.ForEscalator_FilterReducer] = false;
                }

                else if(!(elem.type_of_equipment.includes(GlobalBP.elevatorSelector)) && (elem.type_of_equipment.includes(GlobalBP.escalatorSelector))){
                    PrItem[GlobalBP.ForLift_FilterReducer] = false;
                    PrItem[GlobalBP.ForEscalator_FilterReducer] = true;
                }
                else{
                    PrItem[GlobalBP.ForLift_FilterReducer] = false;
                    PrItem[GlobalBP.ForEscalator_FilterReducer] = false;
                }

                // set available_status
                if(elem.available_status === GlobalBP.availableFalseSelector)
                    PrItem[GlobalBP.Availability_FilterReducer] = false;
                else
                    PrItem[GlobalBP.Availability_FilterReducer] = true;
                
                

                // set product Types
                elem.product_type.map(item=>{
                    let mfgId = item.Type_category_id.id;
                    buffer.push(mfgId);
                })
                PrItem[GlobalBP.Types_FilterReducer] = buffer;
                buffer = [];

                // set product Units
                elem.product_unit.map(item=>{
                    let mfgId = item.Unit_category_id.id;
                    buffer.push(mfgId);
                })
                PrItem[GlobalBP.Units_FilterReducer] = buffer;
                buffer = [];

                // set product MFG
                elem.product_manufacturer.map(item=>{
                    let mfgId = item.manufacturer_category_id.id;
                    buffer.push(mfgId);
                })
                PrItem[GlobalBP.MFG_FilterReducer] = buffer;
                productsCategoriesList.push(PrItem);

                buffer = [];
                PrItem = {};
            });
            

            const timer = setTimeout(() => {
                if(filteredProducts.length > 0){
                // Filtering by parameters
                    let BoolFilter = BooleanFilter(CatalogReducer, productsCategoriesList, BooleanFilters, filteredProducts);
                    let paramsFilter = Filter(CatalogReducer, productsCategoriesList, ProductFilters, filteredProducts);
                    let srchFilter = SearchFilter(CatalogReducer, productsCategoriesList, filteredProducts);
                    Excluder(BoolFilter, paramsFilter, srchFilter, filteredProducts, setFiltered);
                                
                }
            }, 500);
            return () => clearTimeout(timer);
        }
         
    },[CatalogReducer])

    const firstRenderChecker= useRef(true)

    useEffect(()=>{
    if(firstRenderChecker.current){
        firstRenderChecker.current=false
    }
        setFirstRender(firstRenderChecker.current);
    },[])

    useEffect(()=> {
        if(!isFirstRender && products.length > 0){
            setFilteringProcess(true);
        }
    },[isFirstRender, CatalogReducer])

    useEffect(()=> {
        if(!isFirstRender){
            setFilteringProcess(false);
            // console.log(filteredProducts);
        }
    },[isFirstRender, filteredProducts])

    useEffect(()=>{
        if(HeaderForLoader){
            if(filteringProcess)
                HeaderForLoader.classList.add(`${HeaderStyles.loading}`);
                
            else
                HeaderForLoader.classList.remove(`${HeaderStyles.loading}`);
        }
    },[HeaderForLoader, filteringProcess])


    useEffect(()=>{

        let showNf = true;
        filteredProducts.map(product => {
            if(
            product[GlobalBP.excluded_product] !== undefined && 
            product[GlobalBP.excluded_product] === false
            ){
                showNf = false;
            }
        });
        
        const nf = document.querySelector(`.${styles.SearchResults}`);
            if(showNf && nf
            && CatalogReducer && CatalogReducer.Search.length !== 0)
                nf.classList.add(`${styles.active}`);
            
            else if(!showNf && nf && nf.classList.contains(`${styles.active}`))
                nf.classList.remove(`${styles.active}`);
            
    },[filteredProducts, CatalogReducer])

    useEffect(()=>{
        dispatch(ToggleCatalogGenerator(openState));
      
        try{
            const CatalogBlock = document.querySelector(`.${styles.CatalogBlock}`);
            const CatalogConteiner = document.querySelector(`.${styles.CatalogConteiner}`);
            if(openState){
                CatalogConteiner.classList.add(`${styles.open}`);
            }
            else{
                if(CatalogConteiner && CatalogConteiner.classList.contains(`${styles.open}`)){
                    CatalogConteiner.classList.remove(`${styles.open}`)
                }
            }
        }
        catch{
            alert("Что-то пошло не так :(\nПерезагрузите страницу");
        }
    },[openState])

    useEffect(()=>{

        dispatch(SetNewFilterGenerator(SetElevator_BP, false));
        dispatch(SetNewFilterGenerator(SetEscalator_BP, false));
        dispatch(SetNewFilterGenerator(SetAvailability_BP, false));

        if(catalogFilter !== null){
            try{
                dispatch(SetNewFilterGenerator(catalogFilter, true));
            }catch {
                alert("Что-то пошло не так :(\nПерезагрузите страницу");
            }
        }
    },[catalogFilter])


    // const[outProducts, setOutProducts] = useState({
    //     products: [],
    //     pagesNum: 1,
    //     actPage: 1,
    //     pageSize: 15
    // });



    useEffect(()=>{
        setOutProducts([]);

        const bufferSize = productsPages.pageSize;
        const prodBuffer = filteredProducts.length / bufferSize;

        setProductsPages({
            ...productsPages,
            actPage: 1,
            pagesNum: Math.ceil(prodBuffer)
        })

    },[filteredProducts])

    useEffect(()=>{
        const actPage =  productsPages.actPage;
        const bufferSize = productsPages.pageSize;

        let bufferArr = [...outProducts];

        // alert(actPage);

        let startIndex = actPage * bufferSize - bufferSize;
        let endIndex = actPage * bufferSize;

        for(let i = startIndex; i < endIndex; i++)
            if(filteredProducts[i])
                bufferArr.push(filteredProducts[i])

        setOutProducts(bufferArr);


    },[productsPages])

    useEffect(() => {
        const catalog = document.querySelector(`.${styles.CatalogConteiner}`);

        if(catalog) {
            catalog.addEventListener("scroll", scrollHandler);
            return function () {
                catalog.removeEventListener("scroll", scrollHandler);
            };
        }
    })

    const scrollHandler = (e) => {


        if(e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) <= 100) {

            const pagesNum = productsPages.pagesNum;
            if (productsPages.actPage + 1 <= pagesNum) {
                setProductsPages({
                    ...productsPages,
                    actPage: productsPages.actPage + 1
                })
            }
        }
    }





    const CatalogBlock = CatalogReducer && CatalogReducer.isOpen ? (
        <>
            <div className={styles.CatalogConteiner}>
                <div className={styles.CatalogBlock}>
                        <div className="container">

                        <div className="row">
                            <div className="col-15">
                                <CatalogFilter
                                CatalogReducer={CatalogReducer}
                                reducer={dispatch}/>

                            </div>
                        </div>

                            <div className={styles.SearchResults}>
                                <p>Не найдено :(</p>
                            </div>

                            {/*<CatalogItemLoader LoadersNum={5} Loaded={productsLoaded}/>*/}

                            <div className="
                                row
                                d-flex
                                justify-content-sm-center
                                justify-content-md-start">


                                <Suspense fallback={<CatalogItemLoader Loaded={productsLoaded}/>}>
                                {filteredProducts.map((product, index) =>{
                                    // Check product filtered status
                                    if(!(product[GlobalBP.excluded_product] ?
                                        product[GlobalBP.excluded_product] : false)) {
                                        return(
                                            <div className="mb-4 p-0 col-xxl-3 col-xl-3 col-md-5 col-sm-7 col-7"
                                            key={product.id}>
                                                <CatalogProductItem
                                                // isExcluded={}
                                                imgPath={product.image_url}
                                                Title={product.product_name_ru}
                                                Price={product.price}
                                                slug={product.slug}
                                                id={product.id}
                                                />
                                            </div>
                                        )
                                    }
                                })}
                                </Suspense>

                            </div>
                        </div>
                </div>
            </div>
        </>
    ) : (
        <div className={styles.CatalogConteiner}>

        </div>
    );

    if(isBrowser){
        return createPortal(CatalogBlock,
            document.getElementById("CatalogSpace"));
    } else{
        return null;
    }

    
}
