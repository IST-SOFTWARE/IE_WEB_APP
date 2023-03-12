import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {CatalogMappingUtility, newCatalog} from "../../../components/Catalog/ICatalogQueries";
import {ICatalogFiltersType} from "./catalogFiltersType";

const initialState = newCatalog<ICatalogFiltersType>()


const CatalogQuerySlice = createGenericSlice(
    "catalogQuerySlice",
    newCatalog<ICatalogFiltersType>(),
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

        updateFilters(state, action: PayloadAction<ICatalogFiltersType>){
            state.filters = action.payload
        }

    }
)

export const {
    switchCatalog,
    setCatalogState,
    setSearch,
    updateFilters
} = CatalogQuerySlice.actions

export default CatalogQuerySlice.reducer
