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

    function reducer(satate, action){
        return {...state};
    }

    const Item = () => {
        return(
            <>
                <div className="mb-5 p-0 col-xxl-3 col-xl-3 col-md-4 col-sm-6">
                    <CatalogProductItem/>
                </div>
            </>
        )
    }


    const CatalogBlock = CatalogReducer.isOpen ? (
        <>
            <div className={styles.CatalogConteiner}>
                <div className={styles.CatalogBlock}>

                        <div className="container">
                            <div className="row">

                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}
                                {Item()}

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
