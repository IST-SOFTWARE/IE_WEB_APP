import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {IRegionSlice} from "./IRegionSlice";

const initialState = {
    region: "RU",
    currencyMultiplier: 0
} as IRegionSlice;

const regionSlice = createGenericSlice(
    "regionSlice",
    initialState,
    {
        setRegion(state, action: PayloadAction<IRegionSlice>){
            state = action.payload;
        }
    }
)


export const {setRegion} = regionSlice.actions;
export default regionSlice.reducer;