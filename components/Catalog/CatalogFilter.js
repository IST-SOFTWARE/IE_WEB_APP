import { useState, useEffect, useReducer } from "react"
import styles from "../../styles/Catalog.module.css"


import CatalogFilterItem from "./CatalogFilterItem";
import ComponentLoader from "../ComponentLoader";

import { getManufacturers } from "../../queries/FilterQueries/getManufacturers";
import { getTypes } from "../../queries/FilterQueries/getTypes";
import { getUnits } from "../../queries/FilterQueries/getUnits";


export default function CatalogFilter({children, CatalogReducer}){

    const [filters, setFilters] = useState();
    const[size, setSize] = useState();

    const FilterSetter = (Manufacturers, Types, Units) =>{
        const allFilters = [
            {Manufacturers},
            {Types},
            {Units}
        ]
        return allFilters;
    }

    useEffect(()=>{
        async function getProps(){
            const mfg = await getManufacturers();
            const types = await getTypes();
            const units = await getUnits();
    
            setFilters(FilterSetter(mfg, types, units))
            // dispatch(UpdateUTM(mfg));
    
        }
    
        if(!filters){
            getProps();
        }
    
    },[])

    useEffect(()=>{
        const filersBlock = document.querySelector(`.${styles.CatalogFilterBlock}`);

        const filersBlockWidth = filersBlock.offsetWidth;
        const fbParentWidth = (filersBlock.parentElement).offsetWidth;

        console.log(fbParentWidth);
        if(filersBlockWidth + 24 >= fbParentWidth){
            console.log(fbParentWidth);
        }
    },[])

    // useEffect(()=>{
    //     console.log(filters);
    // },[filters])
    const resizeChecker = (e) => {
        console.log(e);
    }

    useEffect(()=>{ 
        const filersBlock = document.querySelector(`.${styles.CatalogFilterBlock}`);

        filersBlock.addEventListener("resize", resizeChecker);
        return () => {
            filersBlock.removeEventListener("resize", resizeChecker);
          };
    },[])

    return(
        <>
            <div className={styles.CatalogFilterBlock}>
            <ComponentLoader data={filters}>
                    {filters ? filters.map((elem, index) => 
                        <CatalogFilterItem label={Object.keys(elem)} list={elem} key={index}/>
                    ) : ""}

                    {children}
            </ComponentLoader>
            </div>
        </>
    )
}