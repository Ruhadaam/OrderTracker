import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;

      const userData = {
        token,
        user: user,
      };

      return userData;
    } catch (error) {
      console.log("21st line", error);
      throw error;
    }
  }
);

const initialState = {
  email: null,
  password: null,
  isAuth: false,
  token: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      //buradaki state kavramı initialstate'i temsil ediyor. örnğin email'e ulaşmak için state.email kullanmak gerekir
      const lowerCase = action.payload.toLowerCase();
      state.email = lowerCase;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLogin: (state) => {
      if (
        state.email === state.user.userEmail &&
        state.password === state.user.userPassword
      ) {
        console.log(true);
      } else {
        console.log(false);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.password;
      });
  },
});

export const { setEmail, setPassword, resetAuth } = authSlice.actions;

export default authSlice.reducer;
