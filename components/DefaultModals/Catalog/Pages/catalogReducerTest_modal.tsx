import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../Hooks/hooks";
import {addNewFilter} from "../../../../store/slices/catalogSlice/catalogSlice";
import {ICatalogFiltersType} from "../../../../store/slices/catalogSlice/catalogFiltersType";
import {useISTCatalog} from "../../../Catalog/useISTCatalog";


const CatalogReducerTestModal = ({}) => {

    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.catalog);
    const [filters, setFilters] = useState<ICatalogFiltersType>(null);
    const {createCatalog, buildFilterItem, addFilter} = useISTCatalog<ICatalogFiltersType>()


    useEffect(()=>{
        if(state && state.filters)
            setFilters(state.filters);
    },[])

    const handleClick = (filter: string) => {
        createCatalog();
        addFilter("mfg", [filter]);

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
                        dispatch(addNewFilter({
                            key: "type",
                            filter: true
                        }))

                    }}
                >set</button>
                <button
                    onClick={()=>handleClick("1")}
                >1</button>

                <button
                    onClick={()=>handleClick("2")}
                >2</button>

                <button
                    onClick={()=>handleClick("3")}
                >3</button>
                <button onClick={()=>{
                    dispatch(addNewFilter({
                        key: "type",
                        filter: []
                    }))

                }}>clear</button>
            </div>
        </>
    )
}

export default CatalogReducerTestModal;