import styles from "../../styles/Catalog.module.css"

import CatalogProductItem from "./CatalogProductItem";
import CatalogProps from "./CatalogProps";

import { createPortal } from "react-dom";
import { useEffect, useState, useReducer} from "react";

export default function Catalog(){
    const[isBrowser, setIsBrowser] = useState(false);

    useEffect(()=>{
        setIsBrowser(true);
    },[]);

    const ToggleCatalog = "ToggleCatalog";

    const [CatalogReducer, dispatch] = useReducer(reducer, {
        isOpen: true,          //Open/Close Catalog

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

    function reducer(satate, action){
        switch(action.type){
            case ToggleCatalog:
                return{
                    ...satate,
                    isOpen: payload
                }                
            }
    }

    const Item = (num) => {
        return(
            <>
                <div className="mb-4 p-0 col-xxl-3 col-xl-3 col-md-5 col-sm-7 col-7">
                    <CatalogProductItem
                    imgPath={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}/>
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

                                {Item(1)}
                                {Item(2)}
                                {Item(3)}
                                {Item(4)}
                                {Item(5)}
                                {Item(6)}
                                {Item(7)}
                                {Item(8)}
                                {Item(9)}
                                {Item(10)}
                                {Item(11)}
                                {Item(12)}
                                {Item(13)}
                                {Item(14)}
                                {Item(15)}
                                {Item(16)}
                                {Item(17)}
                                {Item(18)}
 
                                
                            </div>
                        </div>

                </div>
            </div>
        </>
    ) : "";

    if(isBrowser){
        return createPortal(CatalogBlock,
            document.getElementById("CatalogSpace"));
    } else{
        return null;
    }

}
