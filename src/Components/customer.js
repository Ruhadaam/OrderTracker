import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Fab from "./fab";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";

SplashScreen.preventAutoHideAsync();

const Customer = () => {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedRemainder, setUpdatedRemainder] = useState('');
  const [updatedDaysLeft, setUpdatedDaysLeft] = useState('');
  const [updatedDeliveryDate, setUpdatedDeliveryDate] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedPaid, setUpdatedPaid] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Orders"));
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() });
      });
    
      // Verileri daysLeft değerine göre sıralama
      dataArray.sort((a, b) => a.daysLeft - b.daysLeft);
    
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    
  };

  useEffect(() => {
    getData();
  }, [data]);

  const openEditModal = (item) => {
    setCurrentItem(item);
    setUpdatedName(item.name);
    setUpdatedRemainder(item.remainder.toString());
    setUpdatedDaysLeft(item.daysLeft.toString());
    setUpdatedDeliveryDate(item.deliveryDate);
    setUpdatedPrice(item.price.toString());
    setUpdatedPaid(item.paid.toString());
    setUpdateModalVisible(true);
  };

  const handleUpdate = async () => {
    const index = data.findIndex(item => item.id === currentItem.id);
    if (index !== -1) {
      const updatedData = [...data]; // Veri dizisini kopyala
      updatedData[index] = { // Belirli öğeyi güncelle
        ...updatedData[index],
        name: updatedName,
        remainder: parseFloat(updatedRemainder),
        daysLeft: parseInt(updatedDaysLeft),
        deliveryDate: updatedDeliveryDate,
        price: parseFloat(updatedPrice),
        paid: parseFloat(updatedPaid),
      };
      setData(updatedData); // Güncellenmiş veri dizisini ayarla

      // Firestore'daki belgeyi güncelle
      try {
        const docRef = doc(db, "Orders", currentItem.id);
        await updateDoc(docRef, {
          name: updatedName,
          remainder: updatedPrice-updatedPaid,
          daysLeft: parseInt(updatedDaysLeft),
          deliveryDate: updatedDeliveryDate,
          price: parseFloat(updatedPrice),
          paid: parseFloat(updatedPaid),
        });
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update document'
        });
      }
    }
    setUpdateModalVisible(false); // Modalı kapat
  };
  

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
          <View className="flex-row justify-center">
            <Text style={styles.font} className="w-full text-center">
              TasarımKidsWorld
            </Text>
          </View>
          <View style={{ height: 1 }} className="bg-gray-800 w-10/12 ml-10" />
          {data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            data.map((item, index) => (
              <View
                style={styles.box}
                key={index}
                className="flex-row px-8 items-center border-b border-gray-300 py-8 rounded-xl bg-white m-5"
              >
                <View className="flex-1 flex-row justify-between">
                  <View className="flex-col justify-between items-center">
                    <Text className="font-bold text-lg">{item.name}</Text>
                    <View className="flex-row space-x-3">
                      <Text>
                        <Text className="font-extrabold">Kalan: </Text>
                        {item.remainder}TL
                      </Text>
                    </View>
                  </View>

                  <View className="flex-col justify-between items-center">
                    <View className="items-center space-x-3">
                      <Text
                        className={`font-bold text-4xl ${
                          item.daysLeft <= 3
                            ? "text-red-500"
                            : item.daysLeft <= 5
                            ? "text-orange-400"
                            : "text-blue-500"
                        }`}
                      >
                        {item.daysLeft}
                      </Text>

                      <Text
                        className={`font-extrabold pr-2 pt-2 ${
                          item.daysLeft <= 3
                            ? "text-red-500"
                            : item.daysLeft <= 5
                            ? "text-orange-400"
                            : "text-blue-500"
                        }`}
                      >
                        Gün kaldı
                      </Text>
                    </View>
                  </View>

                  <View className="flex justify-between items-center">
                    <View className="flex-row justify-between m-2 items-center">
                      <TouchableOpacity className="mr-2">
                        <FontAwesome
                          name="trash"
                          color="red"
                          size={24}
                          className="text-gray-400"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="ml-2"
                        onPress={() => openEditModal(item)}
                      >
                        <FontAwesome5 color="orange" name="edit" size={24} />
                      </TouchableOpacity>
                    </View>

                    <Text className="text-gray-600">
                      <Text className="font-extrabold">Teslim: </Text>
                      {item.deliveryDate}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        visible={updateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View  className="flex-1 bg-black/80  justify-center items-center">
          <View className=" bg-white  rounded-lg w-3/4  p-5  items-center shadow-lg">
            <Text  className="text-lg mb-4">Düzenle</Text>
            <TextInput
              className="h-10 border border-gray-500 mb-4 rounded-lg w-full px-2"
              placeholder="Ad Soyad"
              value={updatedName}
              onChangeText={setUpdatedName}
            />
             <TextInput
              className="h-10 border border-gray-500 mb-4 rounded-lg w-full px-2"
              placeholder="Fiyat"
              keyboardType="numeric"
              value={updatedPrice}
              onChangeText={setUpdatedPrice}
            />
            <TextInput
                 className="h-10 border border-gray-500 mb-4 rounded-lg w-full px-2"
              placeholder="Kapora"
              keyboardType="numeric"
              value={updatedRemainder}
              onChangeText={setUpdatedRemainder}
            />
            <TextInput
               className="h-10 border border-gray-500 mb-4 rounded-lg w-full px-2"
              placeholder="Days Left"
              keyboardType="numeric"
              value={updatedDaysLeft}
              onChangeText={setUpdatedDaysLeft}
            />
       
   
            <TouchableOpacity onPress={handleUpdate}  activeOpacity={0.5}>
              <Text className="select-none mb-5 rounded-lg bg-green-500 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <FontAwesome name="upload" size={16} color="white" /> Güncelle
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setUpdateModalVisible(false)} 
            >
              <Text className="select-none mb-5 rounded-lg bg-red-500 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <FontAwesome name="close" size={16} color="white" /> Kapat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
});
