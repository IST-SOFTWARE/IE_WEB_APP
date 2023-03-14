import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../Hooks/hooks";
import {updateFilters} from "../../../../store/slices/catalogSlice/catalogSlice";
import {ICatalogFiltersType} from "../../../../store/slices/catalogSlice/catalogFiltersType";
import {newCatalog} from "../../../Catalog/ICatalogQueries";

const CatalogReducerTestModal = ({}) => {

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.catalog);
    const [filters, setFilters] = useState<ICatalogFiltersType>(null);

    useEffect(()=>{
        if(state && state.filters)
            setFilters(state.filters);
    },[])

    const handleClick = (filter: string) => {
        const obj = newCatalog<ICatalogFiltersType>();
        obj.addFilter("mfg", [filter]);
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
                        dispatch(updateFilters())
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