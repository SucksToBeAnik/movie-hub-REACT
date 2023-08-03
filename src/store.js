import { configureStore } from "@reduxjs/toolkit";
import dropdownSliceReducer from "./slices/dropdownSlice";


const store = configureStore({
    reducer:{
        dropdown: dropdownSliceReducer,
    }
})

export default store;