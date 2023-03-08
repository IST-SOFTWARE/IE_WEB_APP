import {createSlice} from "@reduxjs/toolkit";

const regionSlice = createSlice({
    name: "regionSlice",
    initialState: {
        region: "ru-RU",
    },
    reducers: {
        setRegion(state, action){
            state.region = action.payload;
        }
    }
})


export const {setRegion} = regionSlice.actions;
export default regionSlice.reducer;