import styles from "../../styles/Catalog.module.css"

const CatalogProductItem = lazy(() => import("./CatalogProductItem"));
// import CatalogProductItem from "./CatalogProductItem";
import CatalogProps from "./CatalogProps";
import CatalogItemLoader from "./CatalogItemLoader";
import CatalogContext from "../Context/CatalogContext";

import { createPortal } from "react-dom";
import { useEffect, useState, useReducer, useContext} from "react";
import { Suspense,lazy } from "react";


export default function Catalog(openState, searchFilter){
    const[isBrowser, setIsBrowser] = useState(false);


    const[products, setProducts] = useState([]);
    const[filteredProducts, setFiltered] = useState([]);

    // const[AllProducts, setAllProducts] = useState([]);

    const[productsLoaded, setPrLoaded] = useState(false);
    
    const Catalog_cont = useContext(CatalogContext);
    

    useEffect(()=>{
        setIsBrowser(true);
        setPrLoaded(false);
    },[]);
    
    const ToggleCatalog = "ToggleCatalog";
    const Search_BP = "Search_BP";
    
    const [CatalogReducer, dispatch] = useReducer(reducer, {
        isOpen: false,          //Open/Close Catalog
        
        Search: '',             //For Search
        ForLift: false,         //For Lift CheckBox
        ForEscalator: false,    //For Escalator CheckBox
        Availability: false,    //Availability CheckBox
        
        Manufacturer: [],       //Manufacturer List
        Type: [],               //Type List
        Unit: [],               //Unit List
        
        Search: "",             //Search Request
    })
    
    const ToggleCatalogGenerator = (payload) =>({
        type: ToggleCatalog,
        payload,
    })

    const SearchCatalogGenerator = (payload) =>({
        type: Search_BP,
        payload,
    })
    
    function reducer(satate, action){
        switch(action.type){
            case ToggleCatalog:
                return{
                    ...satate,
                    isOpen: action.payload
                }    
            case Search_BP:
                return{
                    ...satate,
                    Search: action.payload
                }              
            }
        }

        const delay = (ms) => {
            return new Promise(r => setTimeout(()=> r(), ms));
        }



        useEffect(()=>{
            (
                async ()=> {
                    try{

                        if(CatalogReducer.isOpen){
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
        dispatch(SearchCatalogGenerator(Catalog_cont.ProductSearch.s));
    },[Catalog_cont.ProductSearch])


    useEffect(()=>{
        let s_products = products.filter(p => p.product_name_ru.toLowerCase().indexOf(CatalogReducer.Search.toLowerCase()) >= 0 
        || p.vend_code.toLowerCase().indexOf(CatalogReducer.Search.toLowerCase()) >= 0);
        setFiltered(s_products);
    },[CatalogReducer.Search]);

    useEffect(()=>{
        const nf = document.querySelector(`.${styles.SearchResults}`);
        if(filteredProducts.length === 0 && nf)
        {
            nf.classList.add(`${styles.active}`);
        }
        else if(filteredProducts.length > 0 && nf && nf.classList.contains(`${styles.active}`)){
            nf.classList.remove(`${styles.active}`);
        }

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



    const CatalogBlock = CatalogReducer.isOpen ? (
        <>
            <div className={styles.CatalogConteiner}>
                <div className={styles.CatalogBlock}>
                        <div className="container">

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
