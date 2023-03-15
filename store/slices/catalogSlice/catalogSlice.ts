import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {ICatalogFiltersType} from "./catalogFiltersType";
import {ISTCatalogAddFilter, ISTCatalogCreate, ISTCatalogFilter} from "../../../components/Catalog/ICatalogQueries";

const initialState =
    ISTCatalogCreate<ICatalogFiltersType>()


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

        addNewFilter(state, action:
            PayloadAction<ISTCatalogFilter<ICatalogFiltersType>>){
            ISTCatalogAddFilter<ICatalogFiltersType>(action.payload, state);
        }

    }
)

export const {
    switchCatalog,
    setCatalogState,
    setSearch,
    addNewFilter
} = CatalogQuerySlice.actions

export default CatalogQuerySlice.reducer
