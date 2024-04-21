import React from "react";
import { useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import Customer from "./Components/customer";
import Fab from "./Components/fab";
import { addCustomer } from "./firebase";

addCustomer("user123", "Test Name", "test@example.com", "https://example.com/profile.jpg");

SplashScreen.preventAutoHideAsync();

export default function App() {


  const [fontsLoaded, fontError] = useFonts({
    "Benny-Blanco": require("./assets/fonts/BENNB___.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#fbc2eb", "#a6c1ee"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView onLayout={onLayoutRootView}>
        <Customer />
      </ScrollView>
      <Fab />
    </LinearGradient>
  );
}
