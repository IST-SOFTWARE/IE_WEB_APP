import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../Hooks/hooks";
import {addFilter} from "../../../../store/slices/catalogSlice/catalogSlice";
import {ICatalogFiltersType} from "../../../../store/slices/catalogSlice/catalogFiltersType";
import {useISTCatalogFilters} from "../../../Catalog/ICatalogQueries";
import {add} from "unload";

const CatalogReducerTestModal = ({}) => {

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.catalog);
    const [filters, setFilters] = useState<ICatalogFiltersType>(null);
    const {createCatalog, buildFilterItem} = useISTCatalogFilters<ICatalogFiltersType>()


    useEffect(()=>{
        if(state && state.filters)
            setFilters(state.filters);
    },[])

    const handleClick = (filter: string) => {
        const obj = createCatalog();
        const newFilter = buildFilterItem("mfg", []);
        obj.addFilter(newFilter.key, newFilter.filter);
    }

    return(
        <>
            <div style={{
                color: "#fff"
            }}>
                {JSON.stringify(state)}
            </div>

            <div style={{
                maxHeight: "30px",
                width: "100%",
                display: "flex"
            }}>
                <button
                    onClick={()=>{
                        dispatch(addFilter({
                            key: "mfg",
                            filter: true
                        }))
                    }}
                >Clear</button>
                <button
                    onClick={()=>handleClick("1")}
                >1</button>

                <button
                    onClick={()=>handleClick("2")}
                >2</button>

                <button
                    onClick={()=>handleClick("3")}
                >3</button>
                <button>Switch av</button>
            </div>
        </>
    )
}

export default CatalogReducerTestModal;