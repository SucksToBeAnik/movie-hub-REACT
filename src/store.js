import { configureStore } from "@reduxjs/toolkit";
import dropdownSliceReducer from "./slices/dropdownSlice";
import collectionSliceReducer from "./slices/collectionSlice";


const store = configureStore({
    reducer:{
        dropdown: dropdownSliceReducer,
        collection:collectionSliceReducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware(
        {serializableCheck: false}
    )
})

export default store;