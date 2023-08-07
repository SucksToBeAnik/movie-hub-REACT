import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCollections,getCurrentUsername } from "../pb/get";




export const fetchCollections = createAsyncThunk(
    'collection/fetchCollections',
    async function(){
        const username = await getCurrentUsername()
        
        const collections = await getCollections(username)
        return collections
    }
)



const initialState = {
    collectionIsOpen:false,
    selectedContent:null,
    collectionList:[],
    isLoading:false,
}

const collectionSlice = createSlice({
    name:'collection',
    initialState,
    reducers:{
        setCollectionIsOpen(state){
            state.collectionIsOpen = !state.collectionIsOpen
        },
        setSelectedContent(state,action){
            state.selectedContent = null
            state.selectedContent = action.payload
        },
        emptyCollectionList(state){
            state.collectionList = []
        }
    },
    extraReducers: (builder)=> builder.addCase(fetchCollections.fulfilled, (state,action)=>{
        state.isLoading = false
        state.collectionList = [...action.payload]
    }).addCase(fetchCollections.pending,(state)=>{
        state.isLoading = true
    })
})

export const {setCollectionIsOpen, setSelectedContent, emptyCollectionList} = collectionSlice.actions

export default collectionSlice.reducer