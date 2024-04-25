import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  password: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action) => {//buradaki state kavramı initialstate'i temsil ediyor. örnğin email'e ulaşmak için state.email kullanmak gerekir
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    }
    
  }
});

export const { setEmail, setPassword, resetAuth } = authSlice.actions;

export default authSlice.reducer;
