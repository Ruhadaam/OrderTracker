import { View,TouchableOpacity,Modal,StyleSheet,Text,Button } from 'react-native'
import React, {useState} from 'react'
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";



const Fab = () => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    
    <View  className="bottom-8 right-8 absolute">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Modal içeriği burada.</Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.5} className=" w-16 h-16 rounded-2xl justify-center items-center bg-green-700">
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
  )
}

export default Fab;

const styles = StyleSheet.create({
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
});

