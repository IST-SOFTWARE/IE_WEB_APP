import {PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {ICatalogFiltersType} from "../common/catalogFiltersType";


const initialState = {
    mfg: [""],
    unit: [""],
    type: [""],
    available: [""]
} as ICatalogFiltersType


const filtersListSlice = createGenericSlice(
    "filtersListSlice",
    initialState,
    {

        filtersList_update(state, action: PayloadAction<typeof initialState>){
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = action.payload[key];
            }
        }

    }
)

export const {
    filtersList_update
} = filtersListSlice.actions

export default filtersListSlice.reducer

