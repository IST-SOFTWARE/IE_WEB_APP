import { useState, useEffect, useReducer } from "react"
import styles from "../../styles/Catalog.module.css"

import CatalogFilterItem from "./CatalogFilterItem";
import ComponentLoader from "../ComponentLoader";

import { getManufacturers } from "../../queries/FilterQueries/getManufacturers";
import { getTypes } from "../../queries/FilterQueries/getTypes";
import { getUnits } from "../../queries/FilterQueries/getUnits";

import { 
    SetAvailability_BP,
    SetEscalator_BP, 
    SetElevator_BP,
    SetMFG_BP,
    SetTypes_BP,
    SetUnits_BP
} from "./Reducer/boilerplates";

import { SetNewFilterGenerator } from "./Reducer/actions";

const FiltersProps = {
    Manufacturers: {
        label : "Производитель",
        boilerplate: SetMFG_BP
    },
    Types: {
        label: "Тип",
        boilerplate: SetTypes_BP,
    },
    Units: {
        label: "Узел",
        boilerplate: SetUnits_BP
    }
}

export default function CatalogFilter({reducer}){

    const [filters, setFilters] = useState();
    const [newFilter, setNewFilter] = useState();

    const FilterSetter = (Manufacturers, Types, Units) =>{
        const allFilters = [
            {Manufacturers},
            {Types},
            {Units}
        ]
        return allFilters;
    }

    const GetPropLabel = (obj, key) =>{ 
        try{
            const item = obj[key];
            return item.label;
        }
        catch{
            return key;
        }
    }

    const GetPropBP = (obj, key) =>{ 
        try{
            const item = obj[key];
            return item.boilerplate;
        }
        catch{
            return null;
        }
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
        if(newFilter)
            reducer(SetNewFilterGenerator(newFilter.bp, newFilter.state));
    },[newFilter])

    // useEffect(()=>{
    //     const filersBlock = document.querySelector(`.${styles.CatalogFilterBlock}`);

    //     const filersBlockWidth = filersBlock.offsetWidth;
    //     const fbParentWidth = (filersBlock.parentElement).offsetWidth;

    //     console.log(fbParentWidth);
    //     if(filersBlockWidth + 24 >= fbParentWidth){
    //         console.log(fbParentWidth);
    //     }
    // },[])



    return(
        <>
            <div className={styles.CatalogFilterBlock}>
            <ComponentLoader data={filters}>
                    {filters ? filters.map((elem, index) => 
                        <CatalogFilterItem
                        key={GetPropLabel(FiltersProps, Object.keys(elem)) + "1"}

                        label={GetPropLabel(FiltersProps, Object.keys(elem))}
                        boilerplate={GetPropBP(FiltersProps, Object.keys(elem))}
                        list={elem}
                        filterUpdater={setNewFilter}
                        />
                    ) : ""}

                    {/* You can add any filters here */}
                    <CatalogFilterItem label={"Для лифта"}
                        isChecBox={true} 
                        boilerplate={SetElevator_BP}
                        filterUpdater={setNewFilter}
                    />
                    <CatalogFilterItem label={"Для эскалатора"}
                        isChecBox={true} 
                        boilerplate={SetEscalator_BP}
                        filterUpdater={setNewFilter}
                    />
                    <CatalogFilterItem label={"Наличие"}
                        isChecBox={true} 
                        boilerplate={SetAvailability_BP}
                        filterUpdater={setNewFilter}
                    />
                    {/* ---------------------------- */}

            </ComponentLoader>
            </div>
        </>
    )
}