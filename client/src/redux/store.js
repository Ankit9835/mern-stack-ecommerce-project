import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authSlice } from "./authSlice";
import { searchSlice } from "./searchSlice";
import { cartSlice } from "./cartSlice";
import { drawerSlice } from "./drawerSlice";
import {couponSlice} from "./couponSlice";




const rootReducer = combineReducers({
  auth: authSlice.reducer,
  search:searchSlice.reducer,
  cart:cartSlice.reducer,
  drawer:drawerSlice.reducer,
  coupon:couponSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;