import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    collectionIsOpen:false,
    selectedContent:null
}

const collectionSlice = createSlice({
    name:'collection',
    initialState,
    reducers:{
        setCollectionIsOpen(state){
            state.collectionIsOpen = !state.collectionIsOpen
        },
        setSelectedContent(state,action){
            state.selectedContent = action.payload
        }
    }
})

export const {setCollectionIsOpen, setSelectedContent} = collectionSlice.actions

export default collectionSlice.reducer