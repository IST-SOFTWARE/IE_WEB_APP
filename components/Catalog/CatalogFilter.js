import { useState, useEffect, useReducer } from "react"

import CatalogFilterItem from "./CatalogFilterItem";
import ComponentLoader from "../ComponentLoader";

import { getManufacturers } from "../../queries/FilterQueries/getManufacturers";
import { getTypes } from "../../queries/FilterQueries/getTypes";
import { getUnits } from "../../queries/FilterQueries/getUnits";


export default function CatalogFilter({children, CatalogReducer}){

    const [filters, setFilters] = useState();

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
        console.log(filters);
    },[filters])

    return(
        <>
            <ComponentLoader data={filters}>
                
                {filters ? filters.map((elem, index) => 
                    <CatalogFilterItem label={Object.keys(elem)} list={elem} key={index}/>
                ) : ""}

                {children}
            </ComponentLoader>
        </>
    )
}