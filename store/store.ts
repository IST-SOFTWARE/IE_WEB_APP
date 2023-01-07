import {configureStore} from "@reduxjs/toolkit";
import scrollSpyReducer from "./slices/pageTrackerSlice";

const store = configureStore({
    reducer: {
        scrollSpy: scrollSpyReducer,
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