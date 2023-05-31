import {configureStore} from "@reduxjs/toolkit";
import scrollSpyReducer from "./slices/pageTrackerSlice";
import regionReducer from "./slices/regionSlice"
import catalogReducer from "./slices/catalogSlice/catalogSlice"
import filtersReducer from "./slices/filtersListSlice/filtersListSlice"

const store = configureStore({
    devTools: true,
    reducer: {
        scrollSpy: scrollSpyReducer,
        region: regionReducer,
        catalog: catalogReducer,
        filtersList: filtersReducer
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