// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDICCeNZpAc4UACv_PhgRzsHWPzRSIeM8U",
  authDomain: "ordertracker06.firebaseapp.com",
  databaseURL: "https://ordertracker06-default-rtdb.firebaseio.com",
  projectId: "ordertracker06",
  storageBucket: "ordertracker06.appspot.com",
  messagingSenderId: "19478042260",
  appId: "1:19478042260:web:57af77cf0b50f35d500681",
  measurementId: "G-JQB0H13985",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;



