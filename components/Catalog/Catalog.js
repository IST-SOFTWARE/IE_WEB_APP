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
import { ToggleCatalogGenerator, SearchCatalogGenerator, UpdateUTM } from "./Reducer/actions";

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
                        await delay(300);
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
        if(CatalogReducer){
            let s_products = products.filter(p => p.product_name_ru.toLowerCase().indexOf(CatalogReducer.Search.toLowerCase()) >= 0 
            || p.vend_code.toLowerCase().indexOf(CatalogReducer.Search.toLowerCase()) >= 0);
            setFiltered(s_products);
        }
    },[CatalogReducer]);

    useEffect(()=>{
        const nf = document.querySelector(`.${styles.SearchResults}`);
        
            if(filteredProducts.length === 0 && nf
            && CatalogReducer && CatalogReducer.Search.length !== 0)
                nf.classList.add(`${styles.active}`);
            
            else if(filteredProducts.length > 0 && nf && nf.classList.contains(`${styles.active}`))
                nf.classList.remove(`${styles.active}`);
            
    },[filteredProducts, CatalogReducer])

    useEffect(()=>{
        console.log(filteredProducts);  
    },[filteredProducts])

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

                        <div className="
                                row
                                d-flex
                                justify-content-sm-center
                                justify-content-md-start">
                                    
                            <CatalogFilter CatalogReducer={CatalogReducer}>
                                <CatalogFilterItem label={"CheckBox"} isChecBox={true}/>
                                <CatalogFilterItem label={"CheckBox"} isChecBox={true}/>
                                <CatalogFilterItem label={"CheckBox"} isChecBox={true}/>
                            </CatalogFilter>
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
                                    return(
                                        <div className="mb-4 p-0 col-xxl-3 col-xl-3 col-md-5 col-sm-7 col-7" key={product.id}>
                                            <CatalogProductItem
                                            imgPath={product.image_url}
                                            Title={product.product_name_ru}
                                            Price={product.price}
                                            slug={product.slug}
                                            id={product.id}
                                            />
                                        </div>
                                    )       
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
