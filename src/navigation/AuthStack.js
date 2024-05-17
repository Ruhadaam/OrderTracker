import {Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../Screens/LoginPage"
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
   <SafeAreaView style={{flex:1}}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStack;
