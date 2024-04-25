import { Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import app from '../../firebaseconfig';
import { useSelector } from "react-redux";




const RootNavigation = () => {

  const {isAuth} = useSelector(state => state.login);

  console.log(isAuth)
    return (
      
    <NavigationContainer>
      {isAuth ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
