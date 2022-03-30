import styles from "../../styles/Catalog.module.css"

import CatalogProductItem from "./CatalogProductItem";
import CatalogProps from "./CatalogProps";

import { createPortal } from "react-dom";
import { useEffect, useState, useReducer} from "react";

export default function Catalog(openState){
    const[isBrowser, setIsBrowser] = useState(false);
    const[products, setProducts] = useState([]);

    const[filteredProducts, setFiltered] = useState([]);
    const[allProducts, setAllProducts] = useState([]);
    
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
            case ToggleCatalog:
                return{
                    ...satate,
                    Search: action.payload.ToString()
                }              
            }
        }

        useEffect(()=>{
            (
                async ()=> {
                    const response = await fetch("https://fakestoreapi.com/products",{
                        method: `get`,
    
                    });
                    const content = await response.json();
    
                    setProducts(content);
                }
            )()
        },[CatalogReducer.isOpen])

    useEffect(()=>{
        dispatch(ToggleCatalogGenerator(openState.openState));
        // console.log("openState.openState: ", openState.openState);
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

    const Item = () => {
        return(
            <>
                <div className="mb-4 p-0 col-xxl-3 col-xl-3 col-md-5 col-sm-7 col-7">
                    <CatalogProductItem
                    imgPath={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                    Title={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                    Price={"357 750"}
                    />
                </div>
            </>
        )
    }
    



    const CatalogBlock = CatalogReducer.isOpen ? (
        <>
            <div className={styles.CatalogConteiner}>
                <div className={styles.CatalogBlock}>
                        <div className="container">
                            <div className="
                                row
                                d-flex
                                justify-content-sm-center
                                justify-content-md-start">

                                {products.map(product =>{
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
