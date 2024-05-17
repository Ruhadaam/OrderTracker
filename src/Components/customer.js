import React, { useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Fab from "./fab";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

const Customer = () => {
  const chats = [
    {
      id: 1,
      name: "Ramle Yatçı",
      deliveryDate: "24.05.2024",
      price: 600,
      paid: 350,
      remainder: 600 - 350,
      daysLeft: 3,
    },
    {
      id: 2,
      name: "Ayşe Demir",
      deliveryDate: "28.05.2024",
      price: 500,
      paid: 250,
      remainder: 500 - 250,
      daysLeft: 5,
    },
    {
      id: 3,
      name: "Ayşe Demir",
      deliveryDate: "24.05.2024",
      price: 600,
      paid: 350,
      remainder: 600 - 350,
      daysLeft: 4,
    },
    {
      id: 4,
      name: "Ayşe Demir",
      deliveryDate: "24.05.2024",
      price: 600,
      paid: 350,
      remainder: 600 - 350,
    },
    {
      id: 5,
      name: "Ayşe Demir",
      deliveryDate: "24.05.2024",
      price: 600,
      paid: 350,
      remainder: 600 - 350,
    },
    {
      id: 6,
      name: "Ayşe Demir",
      deliveryDate: "24.05.2024",
      price: 600,
      paid: 350,
      remainder: 600 - 350,
    },
    {
      id: 7,
      name: "Ayşe Demir",
      deliveryDate: "24.05.2024",
      price: 600,
      paid: 350,
      remainder: 600 - 350,
    },
  ];

  const [fontsLoaded, fontError] = useFonts({
    "Benny-Blanco": require("../../assets/fonts/BENNB___.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      console.log("yazı tipi yüklendi.");
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    console.log("yazı tipi yüklenmedi.");
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
        <View className="flex-1 pt-16">
          <View className="flex-row justify-center ">
            <Text style={styles.font} className="  w-full text-center ">
              TasarımKidsWorld
            </Text>
          </View>
          <View style={{ height: 1 }} className=" bg-gray-800 w-10/12 ml-10 " />
          {chats.map((item) => (
            <View
              style={styles.box}
              key={item.id}
              //kutular

              className="flex-row px-8 items-center border-b border-gray-300 py-8 rounded-xl  bg-white m-5" 
              >
              <View className="flex-1 flex-row justify-between">



                <View className="flex-col justify-between items-center ">
                  <Text className="font-bold text-lg">{item.name}</Text>
                  <View className="flex-row space-x-3">
                    <Text className="">
                      <Text className="font-extrabold">Kalan: </Text>
                      {item.remainder}TL
                    </Text>
                  </View>
                </View>



                <View className="flex-col justify-between items-center ">
                  <View className=" items-center space-x-3">
                    <Text className="font-bold text-4xl text-red-500">
                      {item.daysLeft}
                    </Text>
                    <Text className="font-extrabold pr-2 pt-2">Gün kaldı</Text>
                  </View>
                </View>



                <View className=" flex justify-between items-center  ">
                  <View className=" flex-row justify-between m-2 items-center ">
                    <TouchableOpacity className="mr-2">
                      <FontAwesome
                        name="trash"
                        color="red"
                        size={24}
                        className=" text-gray-400"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity className="ml-2">
                      <FontAwesome5 color="orange" name="edit" size={24} />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-gray-600 ">
                    <Text className="font-extrabold">Teslim: </Text>
                    {item.deliveryDate}
                  </Text>
                </View>



              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Fab />
      <Toast />
    </LinearGradient>
    
  );
};

export default Customer;
const styles = StyleSheet.create({
  font: {
    fontFamily: "Benny-Blanco",
    fontSize: 40,
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
