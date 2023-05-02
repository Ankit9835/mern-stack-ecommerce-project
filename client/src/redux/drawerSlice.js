import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    drawer:  {}
}

export const drawerSlice = createSlice({
    name:'drawer',
    initialState,
    reducers:{
        sideDrawer:(state,action) => {
            state.drawer = action.payload
        }
    }
})

export const {sideDrawer} = drawerSlice.actions
export default drawerSlice.reducer