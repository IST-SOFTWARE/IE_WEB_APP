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
                maxHeight: "30px",
                width: "100%",
                display: "flex"
            }}>
                <button
                    onClick={()=>{
                        dispatch(addNewFilter({
                            key: "type",
                            filter: ["t1", "t2", "t3"]
                        }))

                    }}
                >set</button>
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