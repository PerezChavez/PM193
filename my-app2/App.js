/*Zona 1 : Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react'; //Permite manipular el estado de los componentes 


//componente Propio Texto 
const Texto = () => {
  const [contenido, setContenido] = useState('Hola Mundo');
  const actualizaTexto = () => {
    setContenido('Estado modificado');
  }
  return (
    <Text onPress={actualizaTexto}>{contenido}</Text>
  );
}

/*Zona 2 : Main o zona principal*/

export default function App() {
  return (

    <View style={styles.container}>
      <Texto >Hola</Texto>
      <Texto >Mundo</Texto>
      <Texto>ReactNative</Texto>
      <Button title='Presionar'></Button>
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
