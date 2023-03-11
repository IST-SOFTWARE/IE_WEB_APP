import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {CatalogFilter, ICatalogQueries} from "../../../../../Desktop/IST_ELEVATOR_NEXTJS/components/Catalog/ICatalogQueries";


const initialState: ICatalogQueries = {
    catalog: false,
}


const CatalogQuerySlice = createGenericSlice(
    "catalogQuerySlice",
    initialState,
    {
        switchCatalog(state){
            state.catalog = !state.catalog
        },

        setCatalogState(state, action: PayloadAction<boolean>){
            state.catalog = action.payload
        },

        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload
        },

        // addFilter(state, action: PayloadAction<CatalogFilter>){
        //
        // }
    }
)