import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    box:  JSON.parse(localStorage.getItem('cart')) || {}
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state,action) =>{
            state.box = action.payload
        }
    }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer