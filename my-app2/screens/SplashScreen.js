import React  from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('C:/Users/chave/PycharmProjects/PM193/my-app2/src/assets/Paisaje1.jpg')} 
        style={styles.logo}
        resizeMode="contain"/>
        <Text style={styles.title}>
            Bienvenido a la App
        </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200
  },
  title: {
    marginTop: 20,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  }
});