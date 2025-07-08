import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchForm = ({ onSearch }) => {
  const [foodType, setFoodType] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (!foodType || !city) {
      alert('Por favor ingresa tipo de comida y ciudad.');
      return;
    }
    onSearch(foodType, city);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tipo de comida (ej: sushi)"
        value={foodType}
        onChangeText={setFoodType}
        style={styles.input}
      />
      <TextInput
        placeholder="Ciudad (ej: Guadalajara)"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Button title="Buscar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SearchForm;