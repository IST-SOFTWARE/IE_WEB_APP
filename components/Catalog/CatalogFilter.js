import { useState, useEffect, useRef } from "react"
import styles from "../../styles/ModalComponents/CatalogFilter.module.css"

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

export default function CatalogFilter({CatalogReducer, reducer}){

    const [filters, setFilters] = useState();
    const [newFilter, setNewFilter] = useState();

    const [mobFilterShower, setMobFilterShower] = useState(false); 

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



    // useEffect(()=>{
    //     console.log("Filters: ", filters);
    //     console.log("Reducer: ", CatalogReducer);
    // },[filters])

    useEffect(()=>{
        if(newFilter)
            reducer(SetNewFilterGenerator(newFilter.bp, newFilter.state));
    },[newFilter])



    const showFiltersMobile = () => {

        const filters = document.querySelector(`.${styles.CatalogFilterBlock}`);
        const filtersBtn =  document.querySelector(`.${styles.ShowFiltersBtn}`);
        if(mobFilterShower){
            filters.classList.add(`${styles.active}`);
            filtersBtn.classList.add(`${styles.active}`);
        }
        else{
            filters.classList.remove(`${styles.active}`);
            filtersBtn.classList.remove(`${styles.active}`);
        }

        
    }

    useEffect(()=>{
        showFiltersMobile();
    },[mobFilterShower])

    return(
        <>
            <button className={styles.ShowFiltersBtn}
            onClick={()=>setMobFilterShower(!mobFilterShower)}>
                <p>
                    {mobFilterShower ? "Скрыть фильтры" : "Открыть фильтр"}
                </p>
                <span>

                </span>
            </button>

            <div className={styles.CatalogFilterBlock}>
            <ComponentLoader data={filters}>
                    {filters ? filters.map((elem, index) => 
                        <CatalogFilterItem
                        key={GetPropLabel(FiltersProps, Object.keys(elem)) + "1"}
                        
                        label={GetPropLabel(FiltersProps, Object.keys(elem))}
                        boilerplate={GetPropBP(FiltersProps, Object.keys(elem))}
                        list={elem}
                        filterUpdater={setNewFilter}
                        CatalogReducer={CatalogReducer}
                        />
                        ) : ""}

                    {/* You can add any filters here */}
                    <CatalogFilterItem label={"Для лифта"}
                        isChecBox={true} 
                        boilerplate={SetElevator_BP}
                        filterUpdater={setNewFilter}
                        CatalogReducer={CatalogReducer}
                    />
                    <CatalogFilterItem label={"Для эскалатора"}
                        isChecBox={true} 
                        boilerplate={SetEscalator_BP}
                        filterUpdater={setNewFilter}
                        CatalogReducer={CatalogReducer}
                    />
                    <CatalogFilterItem label={"Наличие"}
                        isChecBox={true} 
                        boilerplate={SetAvailability_BP}
                        filterUpdater={setNewFilter}
                        CatalogReducer={CatalogReducer}
                    />
                    {/* ---------------------------- */}

            </ComponentLoader>
            </div>
        </>
    )
}