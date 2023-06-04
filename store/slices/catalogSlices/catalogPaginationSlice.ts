import {PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {ICatalogFiltersType} from "../common/catalogFiltersType";
import {IQueryPaginationVariable} from "../../../queries/common";



const initialState = {
    offset: 0,
    limit: 20
} as IQueryPaginationVariable

const catalogPaginationSlice = createGenericSlice(
    "catalogPaginationSlice",
    initialState,
    {

    }
)

export const {

} = catalogPaginationSlice.actions

export default catalogPaginationSlice.reducer

