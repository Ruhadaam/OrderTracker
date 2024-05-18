import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import DateTimePickerModal, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import { format, differenceInDays } from "date-fns";
import Toast from "react-native-toast-message";

const Fab = () => {
  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [price, setPrice] = useState("");
  const [paid, setPaid] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setDeliveryDate(formattedDate);
    hideDatePicker();
  };

  const calculateDaysLeft = (date) => {
    const currentDate = new Date();
    const delivery = new Date(date);
    return differenceInDays(delivery, currentDate);
  };

  //SEND DATA
  const sendData = async () => {
    const remainder = price - paid;
    const daysLeft = calculateDaysLeft(deliveryDate);
    const currentDate = new Date();
    try {
      const docRef = await addDoc(collection(db, "Orders"), {
        name,
        deliveryDate,
        price: parseInt(price),
        paid: parseInt(paid),
        remainder,
        daysLeft,
        currentDate
      });
      console.log("Document written with ID: ", docRef.id);
      setModalVisible(false); // Modal'ı kapat
      Toast.show({
        type: "success",

        text1: "Başarılı!",
        text2: "Sipariş başarıyla kaydedildi",
        text1Style: {
          fontSize: 18, // Başlık için yazı boyutu
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      Toast.show({
        type: "error",
        text1: "Başarılı!",
        text2: "Sipariş kaydedilirken bir hata oluştu.",
        text1Style: {
          fontSize: 18, // Başlık için yazı boyutu
          fontWeight: "bold",
        },
        text2Style: {
          fontSize: 14,
        },
      });
    }
  };

  return (
    <View className="absolute bottom-8 right-8">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 bg-black/80  justify-center items-center">
          <View className=" bg-white  rounded-lg w-3/4  p-5  items-center shadow-lg">
            <Text className="text-lg mb-4">Yeni Sipariş Ekle</Text>
            <TextInput
              className="h-10 border border-gray-500 mb-4 rounded-lg w-full px-2"
              placeholder="Adı Soyadı"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.44,
                shadowRadius: 10.32,
                elevation: 16,
              }}
              onPress={showDatePicker}
              className="flex flex-row h-10 w-2/3 items-center bg-indigo-400 mb-4 rounded-lg justify-center px-2"
            >
              <FontAwesome name="calendar" size={24} color="black" />
              <Text>{deliveryDate ? deliveryDate : " Teslim Tarihi Seç"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput
              className="h-10 border border-gray-500 mb-4 rounded-lg w-full px-2"
              placeholder="Fiyat"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <TextInput
              className="h-10 border border-gray-500 mb-4 rounded-lg w-full px-2"
              placeholder="Kapora"
              keyboardType="numeric"
              value={paid}
              onChangeText={setPaid}
            />

            <TouchableOpacity onPress={sendData} activeOpacity={0.5}>
              <Text className="select-none mb-5 rounded-lg bg-blue-500 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <FontAwesome name="plus" size={16} color="white" /> Kaydet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="select-none mb-5 rounded-lg bg-red-500 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <FontAwesome name="close" size={16} color="white" /> Kapat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.5}
        className="w-16 h-16 rounded-2xl justify-center items-center bg-green-700"
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Fab;
