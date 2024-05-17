import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import Customer from '../Components/customer';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar />
          <View style={styles.innerContainer}>
      <Customer />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'black',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomePage;
