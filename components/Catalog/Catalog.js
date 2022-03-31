import styles from "../../styles/Catalog.module.css"

const CatalogProductItem = lazy(() => import("./CatalogProductItem"));
// import CatalogProductItem from "./CatalogProductItem";
import CatalogProps from "./CatalogProps";
import CatalogContext from "../Context/CatalogContext";

import { createPortal } from "react-dom";
import { useEffect, useState, useReducer, useContext} from "react";
import { Suspense,lazy } from "react";

export default function Catalog(openState, searchFilter){
    const[isBrowser, setIsBrowser] = useState(false);
    const[products, setProducts] = useState([]);

    const[filteredProducts, setFiltered] = useState([]);
    const[AllProducts, setAllProducts] = useState([]);
    
    const Catalog_cont = useContext(CatalogContext);
    
    useEffect(()=>{
        setIsBrowser(true);
    },[]);
    
    const ToggleCatalog = "ToggleCatalog";
    const Search_BP = "Search_BP";
    
    const [CatalogReducer, dispatch] = useReducer(reducer, {
        isOpen: true,          //Open/Close Catalog
        
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
                    const response = await fetch("https://fakestoreapi.com/products",{
                        method: `get`,
                        origin: "*"
                    });
                    const content = await response.json();

                    if(CatalogReducer.isOpen){
                        await delay(300);
                        setProducts(content);
                        setFiltered(content);
                        console.log("opened");
                    } else{
                        setProducts([]);
                        setFiltered([]);
                        console.log("closed");
                    }
                } catch(e){
                        console.log("Failed to fetch[Catalog items]: ", e);
                    }

                }
            )()
        },[CatalogReducer.isOpen])

    useEffect(()=>{
        dispatch(SearchCatalogGenerator(Catalog_cont.ProductSearch.s));
    },[Catalog_cont.ProductSearch])

    useEffect(()=>{
        let s_products = products.filter(p => p.title.toLowerCase().indexOf(CatalogReducer.Search.toLowerCase()) >= 0);
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
      
        const CatalogConteiner = document.querySelector(`.${styles.CatalogConteiner}`);
        if(openState.openState){
            CatalogConteiner.classList.add(`${styles.open}`);
        }
        else{
            if(CatalogConteiner && CatalogConteiner.classList.contains(`${styles.open}`)){
                CatalogConteiner.classList.remove(`${styles.open}`)
            }
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
                            

                            <div className="
                                row
                                d-flex
                                justify-content-sm-center
                                justify-content-md-start">
                                
                                <Suspense fallback={
                                <div className={styles.LoadingIndicator}>
                                    Loading...
                                </div>}>
                    
                                {filteredProducts.map((product, index) =>{
                                    return(
                                        <div className="mb-4 p-0 col-xxl-3 col-xl-3 col-md-5 col-sm-7 col-7" key={product.id}>
                                            <CatalogProductItem
                                            imgPath={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                            Title={product.title}
                                            Price={product.price}
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
