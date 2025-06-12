/*Zona 1 : Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react'; 


// Componente Propio Texto 
const Texto = ({ contenido }) => {
  return (
    <Text>{contenido}</Text>
  );
}


/*Zona 2 : Main o zona principal*/

export default function App() {
  const [contenido, setContenido] = useState('Hola Mundo');

  const actualizaTexto = () => {
    setContenido('Estado modificado');
  }

  return (
    <View style={styles.container}>
      <Texto contenido={contenido} />
      <Texto contenido={contenido} />
      <Texto contenido={contenido} />
      <Button title='Presionar' onPress={actualizaTexto} />
      <StatusBar style="auto" />
    </View>
  );
}


/*Zona 3 : Estilos - Estetica */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
