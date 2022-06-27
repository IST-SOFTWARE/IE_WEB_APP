import styles from "../../styles/Catalog.module.css"

const CatalogProductItem = lazy(() => import("./CatalogProductItem"));
// import CatalogProductItem from "./CatalogProductItem";

import CatalogItemLoader from "./CatalogItemLoader";
import CatalogContext from "../Context/CatalogContext";
import CatalogFilterItem from "./CatalogFilterItem";
import CatalogFilter from "./CatalogFilter";

import { createPortal } from "react-dom";
import { useEffect, useState, useReducer, useContext} from "react";
import { Suspense,lazy } from "react";

import reducer from "./Reducer/reducer";
import { ToggleCatalogGenerator, SearchCatalogGenerator} from "./Reducer/actions";

import "../../helpers/debounce"
import * as GlobalBP from "./ReducerGlobalBoilerplates";
import Filter from "./Filters/Filter";
import BooleanFilter from "./Filters/BooleanFilter";
import SearchFilter from "./Filters/SearchFilter";
import Excluder from "./Filters/Excluder";

export default function Catalog(openState, searchFilter){
    const[isBrowser, setIsBrowser] = useState(false);

    const[products, setProducts] = useState([]);
    const[filteredProducts, setFiltered] = useState([]);

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
        
        Search: "",             //Search Request
    })
    

    useEffect(()=>{
        (
            async ()=> {
                try{

                    if(CatalogReducer && CatalogReducer.isOpen){
                        if(Catalog_cont.CatalogProducts){
                        await delay(500);
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

  
    // useEffect(()=>{
    //     if(CatalogReducer){
    //         let s_products = products.filter(p => p.product_name_ru.toLowerCase().indexOf(CatalogReducer.Search.toLowerCase()) >= 0 
    //         || p.vend_code.toLowerCase().indexOf(CatalogReducer.Search.toLowerCase()) >= 0);
    //         setFiltered(s_products);
    //     }
    // },[CatalogReducer]);


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

        if(CatalogReducer && products){ 
        
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
        
    },[CatalogReducer,products]);

    useEffect(()=>{

    },[CatalogReducer.Search])

    useEffect(()=>{
        const nf = document.querySelector(`.${styles.SearchResults}`);
        
            if(filteredProducts.length === 0 && nf
            && CatalogReducer && CatalogReducer.Search.length !== 0)
                nf.classList.add(`${styles.active}`);
            
            else if(filteredProducts.length > 0 && nf && nf.classList.contains(`${styles.active}`))
                nf.classList.remove(`${styles.active}`);
            
    },[filteredProducts, CatalogReducer])

    // useEffect(()=>{
    //     console.log(CatalogReducer);  
    // },[CatalogReducer])


    useEffect(()=>{
        dispatch(ToggleCatalogGenerator(openState.openState));
      
        try{
            const CatalogConteiner = document.querySelector(`.${styles.CatalogConteiner}`);
            if(openState.openState){
                CatalogConteiner.classList.add(`${styles.open}`);
            }
            else{
                if(CatalogConteiner && CatalogConteiner.classList.contains(`${styles.open}`)){
                    CatalogConteiner.classList.remove(`${styles.open}`)
                }
            }
        }
        catch{
            alert("Что-то пощло не так :(\nПерезагрузите страницу");
        }
    },[openState])




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
                            
                            <CatalogItemLoader LoadersNum={15} Loaded={productsLoaded}/>

                            <div className="
                                row
                                d-flex
                                justify-content-sm-center
                                justify-content-md-start">
                                
                                
                                <Suspense fallback={<CatalogItemLoader Loaded={productsLoaded}/>}>
                                {filteredProducts.map((product, index) =>{
                                    // Check product filtered status
                                    if(!(product[GlobalBP.excluded_product] !== undefined ? product[GlobalBP.excluded_product] : false)) {
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
