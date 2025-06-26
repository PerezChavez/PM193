import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, Button, Alert, Switch } from "react-native";

const HomeScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = (name) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);

  const handleRegister = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre");
      return;
    }
    if (!isValidName(name)) {
      Alert.alert("Error", "El nombre solo debe contener letras");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Por favor ingresa un correo válido");
      return;
    }
    if (!aceptaTerminos) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones");
      return;
    }
    Alert.alert("Registro Exitoso", `Nombre: ${name}\nCorreo: ${email}`);
  };

  return (
    <ImageBackground 
      source={require('C:/Users/chave/PycharmProjects/PM193/NuevoTarea/src/PantallaP.jpg')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.content}>
        <Text style={styles.text}>Registrar Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={name}
          onChangeText={setName}
        />
        {name !== "" && !isValidName(name) && (
          <Text style={styles.errorText}>Solo se permiten letras en el nombre</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {email !== "" && !isValidEmail(email) && (
          <Text style={styles.errorText}>Correo no válido</Text>
        )}

        {/* switch de términos y condiciones */}
        <View style={styles.switchContainer}>
          <Switch
            value={aceptaTerminos}
            onValueChange={setAceptaTerminos}
          />
          <Text style={styles.switchLabel}>
            Acepto los términos y condiciones
          </Text>
        </View>

        <Button
          title="Registrar"
          color="#e6a2f1"
          onPress={handleRegister}
          disabled={!aceptaTerminos}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
});
