import { View,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";


const Fab = () => {
  return (
    <View  className="bottom-8 right-8 absolute">
        <TouchableOpacity activeOpacity={0.5} className=" w-16 h-16 rounded-2xl justify-center items-center bg-green-700">
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
  )
}

export default Fab

