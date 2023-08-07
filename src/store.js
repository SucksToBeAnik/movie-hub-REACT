import { configureStore } from "@reduxjs/toolkit";
import dropdownSliceReducer from "./slices/dropdownSlice";
import collectionSliceReducer from "./slices/collectionSlice";
import authSliceReducer from './slices/authSlice'


const store = configureStore({
    reducer:{
        dropdown: dropdownSliceReducer,
        collection:collectionSliceReducer,
        auth:authSliceReducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware(
        {serializableCheck: false}
    )
})

export default store;