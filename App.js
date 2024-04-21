import React from "react";
import { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import Customer from "./Components/customer";
import Fab from "./Components/Fab";


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
      <ScrollView>
      <Customer/>
      <Fab/>
      </ScrollView>
  
    </LinearGradient>
  );
}
