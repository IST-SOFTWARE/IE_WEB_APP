import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {ICatalogFiltersType} from "../common/catalogFiltersType";
import {
    ISTCatalogUpdateFilter,
    ISTCatalogCreate,
    ISTCatalogFilter,
    ICatalogQueries
} from "../../../Hooks/useCatalog/ICatalogQueries";


const initialState =
    ISTCatalogCreate<ICatalogFiltersType>({
        catalog: false,
        filters: <ICatalogFiltersType>{},
        search: undefined
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
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = action.payload[key];
            }
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

