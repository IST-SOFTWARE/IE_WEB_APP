import {configureStore} from "@reduxjs/toolkit";
import scrollSpyReducer from "./slices/pageTrackerSlice";
import modalReducer from "./slices/modalStateSlice"

const store = configureStore({
    reducer: {
        scrollSpy: scrollSpyReducer,
        modals: modalReducer,
    },
    middleware:
        getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck:{
                ignoredPaths:[
                    `scrollSpy.scrollSpy.updatePosition`,
                    `scrollSpy.scrollSpy.setActualPosition`
                ]
            }
        })

})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;