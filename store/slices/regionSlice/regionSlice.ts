import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createGenericSlice} from "../GenericSlice";
import {IRegionSlice} from "./IRegionSlice";

const initialState = {
    region: "RU",
    currency: "RUB",
    currencyMultiplier: 0
} as IRegionSlice;

const regionSlice = createGenericSlice(
    "regionSlice",
    initialState,
    {
        setRegion(state, action: PayloadAction<IRegionSlice>){
            state.region = action.payload.region;
            state.currencyMultiplier = action.payload.currencyMultiplier;
            state.currency = action.payload.currency;
        },

        setRegionName(state, action: PayloadAction<Pick<IRegionSlice, "region">>){
            state.region = action.payload.region;
        },

        setRegionCurrency(state, action: PayloadAction<Pick<IRegionSlice, "currency">>){
            state.currency = action.payload.currency;
        },

        switchRegionName(state){
            state.region = state.region === "RU" ? "EN" : "RU";
        },

        switchRegionCurrency(state){
            state.currency = state.currency === "RUB" ? "USD" : "RUB";
        }
    }
)


export const {
    setRegion,
    setRegionName,
    switchRegionName,
    switchRegionCurrency,
    setRegionCurrency,
} = regionSlice.actions;

export default regionSlice.reducer;