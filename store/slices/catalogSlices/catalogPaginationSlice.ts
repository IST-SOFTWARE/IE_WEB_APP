import {PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {IQueryPaginationVariable} from "../../../queries/common";

const initialState = {
    offset: 0,
    limit: 20
} as IQueryPaginationVariable

const catalogPaginationSlice = createGenericSlice(
    "catalogPaginationSlice",
    initialState,
    {
        setOffset(state, action: PayloadAction<number>){
            state.offset = action.payload;
        },

        incOffset(state){
            state.offset = state.offset + state.limit;
        }
    }
)

export const {
    setOffset,
    incOffset,
} = catalogPaginationSlice.actions

export default catalogPaginationSlice.reducer

