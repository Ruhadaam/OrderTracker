import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
reducer: {
    login :authReducer 
},
middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})

})