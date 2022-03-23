import styles from "../../styles/Catalog.module.css"
import bStyles from "../../styles/Bootstrap/bootstrap.module.css"

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

    const CatalogBlock = CatalogReducer.isOpen ? (
        <>

            <div className={styles.CatalogConteiner}>
                <div className={styles.CatalogBlock}>
                    <div className="container">
                        <div className="row">
                            <div className="col">sadcasdcsad</div>
                            <div className="col">sadcasdcsad</div>
                            <div className="col">sadcasdcsad</div>
                            <div className="col">sadcasdcsad</div>
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
