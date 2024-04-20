import React from "react";
import { useCallback } from 'react';
import { View,StyleSheet, Text, Image } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; 
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';


SplashScreen.preventAutoHideAsync();



export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Benny-Blanco': require('./assets/fonts/BENNB___.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


    const chats = [
      {
        id: 1,
        name: "Ramle Yatçı",
        message: "24.05.2024",
        kalan: "100",
      },
      {
        id: 2,
        name: "Ayşe Demir",
        message: "28.05.2024",
        kalan: "250",
      },
    
    ];
  

  return (
    <LinearGradient
    style={{ flex: 1 }}
    colors={['#fbc2eb', '#a6c1ee']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
  >
    <View className="flex-1 pt-16 " onLayout={onLayoutRootView}>
   
    <View className="flex-row  justify-center">
      <Text style={styles.font} className="  w-full text-center ">TasarımKidsWorld</Text>
    </View>
    {chats.map((item) => (
      <View style={styles.box} 
        key={item.id}
        className="flex-row px-3 items-center border-b border-gray-300 py-5 rounded-xl  bg-white m-5"
      >
        <View className="flex-1 justify-between">
          <View className="flex-row justify-between items-center ">
            <Text className="font-bold">{item.name}</Text>
            <View className="flex-row space-x-3">
              <FontAwesome
                name="trash"
                color="red"
                size={24}
                className="mr-2 text-gray-400"
              />
              <FontAwesome5
                color="orange"
                name="info-circle"
                size={24}
                className=""
              />
            </View>
          </View>
          <View className=" flex-row justify-between items-center pt-3">
            <Text className=""> <Text className="font-extrabold">Kalan: </Text>{item.kalan}TL</Text>

            <Text className="text-gray-600">
              <Text className="font-extrabold">Teslim: </Text>
              {item.message}
            </Text>
          </View>
        </View>
      </View>
    ))}


     
  </View>
  </LinearGradient>
  );
  
}
const styles = StyleSheet.create({
  font:{
    fontFamily:'Benny-Blanco',
    fontSize:40
  },

  box: {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 8,
},
shadowOpacity: 0.44,
shadowRadius: 10.32,

elevation: 16,
  },
});



