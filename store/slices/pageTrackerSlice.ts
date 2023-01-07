import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {scrollPosition, createScrollSpy} from "../../components/pageTracker/data/scrollSpy";


const pageTrackerSlice = createSlice({
        name:"scrollSpy",
        initialState:{
            scrollSpy: createScrollSpy()
        },
        reducers:{

            updatePosition(state, action: PayloadAction<scrollPosition>){
                state.scrollSpy.updatePosition(action.payload, state.scrollSpy);
            },

            setActualPosition(state, action: PayloadAction<scrollPosition | number>){
                state.scrollSpy.setActualPosition(action.payload, state.scrollSpy)
            }
        }
    });

export const {
    updatePosition,
    setActualPosition
} = pageTrackerSlice.actions

export default pageTrackerSlice.reducer;