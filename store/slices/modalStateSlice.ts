import {createSlice} from "@reduxjs/toolkit";


const modalState =  createSlice({
    name: "modalState",
    initialState: {
        state: false,
    },
    reducers: {
        toggleModal(state, action) {
          state.state = action.payload;
        }
    }
})

export const {toggleModal} = modalState.actions;
export default modalState.reducer;