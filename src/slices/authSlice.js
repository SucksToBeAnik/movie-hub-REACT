import { createSlice } from "@reduxjs/toolkit";
import { pb } from "../pb/database";


// const session = JSON.parse(localStorage.getItem('pocketbase_auth'))

// let signedIn = false
// if(session) signedIn = pb.authStore.token === session.token


const initialState = {
    isSignedIn: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setIsSignedIn(state,action){
            state.isSignedIn = action.payload
        }
    }
})

export const {setIsSignedIn} = authSlice.actions

export default authSlice.reducer;