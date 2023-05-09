import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    coupon:  false
}

export const couponSlice = createSlice({
    name:'coupon',
    initialState,
    reducers:{
        addCoupon: (state,action) =>{
            state.coupon = action.payload
        }
    }
})

export const {addCoupon} = couponSlice.actions
export default couponSlice.reducer