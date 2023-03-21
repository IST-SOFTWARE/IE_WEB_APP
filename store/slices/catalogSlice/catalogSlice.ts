import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {ICatalogFiltersType} from "./catalogFiltersType";
import {
    ISTCatalogUpdateFilter,
    ISTCatalogCreate,
    ISTCatalogFilter,
    ICatalogQueries
} from "../../../components/ISTCatalog/ICatalogQueries";

const initialState =
    ISTCatalogCreate<ICatalogFiltersType>({
        catalog: undefined,
        filters: <ICatalogFiltersType>{},
        search: ""
    })


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
            ISTCatalogUpdateFilter<ICatalogFiltersType>(action.payload, state);
        },

        updateCatalog(state, action: PayloadAction<typeof initialState>){
            state = action.payload
        }

    }
)

export const {
    switchCatalog,
    setCatalogState,
    setSearch,
    addNewFilter,
    updateCatalog
} = CatalogQuerySlice.actions

export default CatalogQuerySlice.reducer
