import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    searchType: 'movie'
}
const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers:{
        changeSearchType(state,action){
            state.searchType = action.payload
        }
    }
})


export const {changeSearchType} = dropdownSlice.actions

export default dropdownSlice.reducer