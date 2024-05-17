import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import RootNavigation from "./src/navigation/RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";




export default function App() {
  return (
    <Provider store={store}>
<RootNavigation/>
    </Provider>
  );
}
