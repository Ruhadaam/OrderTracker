import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

//configureStore ile state store oluşturulur.
//creatSlice ile state oluşturulur.
//useSelector ile state'ten veri çekilir.
//useDispatch ile state'e veri gönderilir


export const store = configureStore({
reducer: {
    login :authReducer 
}

})