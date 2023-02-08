import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: localStorage.getItem('token') || null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUser: (state,action) =>{
            state.user = action.payload
        }
    }
})

export const {loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer