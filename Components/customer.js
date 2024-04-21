import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Button
  
} from "react-native";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const customer = () => {
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
    {
      id: 3,
      name: "Ayşe Demir",
      message: "28.05.2024",
      kalan: "250",
    },
    {
      id: 4,
      name: "Ayşe Demir",
      message: "28.05.2024",
      kalan: "250",
    },
    {
      id: 5,
      name: "Ayşe Demir",
      message: "28.05.2024",
      kalan: "250",
    },
    {
      id: 6,
      name: "Ayşe Demir",
      message: "28.05.2024",
      kalan: "250",
    },
    {
      id: 7,
      name: "Ayşe Demir",
      message: "28.05.2024",
      kalan: "250",
    },
  ];
 

  return (
    <View className="flex-1 pt-16">



      <View className="flex-row  justify-center">
        <Text style={styles.font} className="  w-full text-center ">
          TasarımKidsWorld
        </Text>
      </View>
      <View style={{ height: 1 }} className=" bg-gray-800 w-10/12 ml-10 " />
      {chats.map((item) => (
        <View
          style={styles.box}
          key={item.id}
          className="flex-row px-8 items-center border-b border-gray-300 py-8 rounded-xl  bg-white m-5"
        >
          <View className="flex-1 justify-between">
            <View className="flex-row justify-between items-center ">
              <Text className="font-bold text-lg">{item.name}</Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity>
                  <FontAwesome
                    name="trash"
                    color="red"
                    size={24}
                    className="mr-2 text-gray-400"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5
                    color="orange"
                    name="edit"
                    size={24}
                    className=""
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className=" flex-row justify-between items-center pt-3">
              <Text className="">
                {" "}
                <Text className="font-extrabold">Kalan: </Text>
                {item.kalan}TL
              </Text>

              <Text className="text-gray-600">
                <Text className="font-extrabold">Teslim: </Text>
                {item.message}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default customer;
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
