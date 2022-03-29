import styles from "../../styles/Catalog.module.css"

import CatalogProductItem from "./CatalogProductItem";
import CatalogProps from "./CatalogProps";

import { createPortal } from "react-dom";
import { useEffect, useState, useReducer} from "react";

export default function Catalog(openState){
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
                    isOpen: action.payload
                }                
            }
    }

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

    const Item = (num) => {
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
