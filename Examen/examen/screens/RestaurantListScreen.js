import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, Text, StyleSheet } from 'react-native';
import SearchForm from '../components/SearchForm';
import RestaurantCard from '../components/RestaurantCard';
import LoadingIndicator from '../components/LoadingIndicator';
import { searchRestaurants } from '../services/FoursquareService';

const RestaurantListScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (foodType, city) => {
    setLoading(true);
    setError('');

    try {
      const results = await searchRestaurants(foodType, city);
      setRestaurants(results.map((venue) => ({
        name: venue.name,
        image: venue.categories[0]?.icon?.prefix + '100x100' + venue.categories[0]?.icon?.suffix,
        rating: venue.rating ?? 'N/A',
        distance: venue.location.distance,
        address: venue.location.address,
        phone: venue.contact?.phone ?? 'No disponible',
        url: venue.url ?? 'No disponible',
      })));
    } catch (error) {
      setError('Hubo un error al buscar restaurantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchForm onSearch={handleSearch} />
      <LoadingIndicator visible={loading} />
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <RestaurantCard restaurant={item} />
        )}
      />
      {restaurants.length > 0 && (
        <ScrollView style={styles.detailsContainer}>
          {restaurants.map((restaurant, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailTitle}>Detalles de {restaurant.name}</Text>
              <Text> Dirección: {restaurant.address}</Text>
              <Text> Teléfono: {restaurant.phone}</Text>
              <Text> Página web: {restaurant.url}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RestaurantListScreen;