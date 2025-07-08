import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { searchRestaurants } from './services/FoursquareService';

export default function App() {
  const [foodType, setFoodType] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!foodType || !city) {
      Alert.alert('Error', 'Por favor ingresa tipo de comida y ciudad');
      return;
    }

    setLoading(true);
    try {
      const data = await searchRestaurants(foodType, city);
      setResults(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Tipo de comida (ej: sushi)"
        style={styles.input}
        value={foodType}
        onChangeText={setFoodType}
      />
      <TextInput
        placeholder="Ciudad (ej: Guadalajara)"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>📍 {item.address}</Text>
            <Text>📞 {item.phone}</Text>
            <Text>⭐ {item.rating}</Text>
            <Text>📏 {item.distance}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
  loader: { marginVertical: 20 },
  card: { backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  image: { width: '100%', height: 150, marginVertical: 10 }
});
