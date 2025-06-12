/*Zona 1 : Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


const Texto= (props)=>{
  const{children}=props
  return(
      <Text> {children} </Text>
  )
} 


/*Zona 2 : Main o zona principal*/

export default function App() {
  return (

    <View style={styles.container}>
      <Texto >Hola</Texto>
      <Texto >Mundo</Texto>
      <Texto>ReactNative</Texto>
      <Texto contenido= "Hola"></Texto>
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
