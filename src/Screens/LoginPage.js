import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
 
} from "react-native";


import { useSelector,useDispatch } from "react-redux";
import { setEmail,setPassword } from "../redux/authSlice";


const LoginPage = () => {
  //authSlice içerisindeki verilerin okunması
  const {email,password} = useSelector((state)=> state.login);
  console.log(email);
  console.log(password);



  //authSlice içerisindeki reducer yapılarını kullanma veya veri gönderme
  const dispatch = useDispatch()



  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My App</Text>
      <View style={styles.inputView}>
        <TextInput
          inputMode="email"
          style={styles.inputText}
          placeholder="E-posta"
          placeholderTextColor="#003f5c"
          onChangeText={(text) =>  dispatch(setEmail(text))}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Şifre"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => dispatch(setPassword(password))}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} >
        <Text style={styles.loginText}>Giriş</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default LoginPage;
