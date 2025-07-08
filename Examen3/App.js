import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [comida, setComida] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState({ lat: null, lon: null });

  const imagenesPorTipo = {
    mexican: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    italian: 'https://images.unsplash.com/photo-1608137688990-bbe5c99f7b72?auto=format&fit=crop&w=800&q=80',
    japanese: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
    burger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    chinese: 'https://images.unsplash.com/photo-1571091718767-18b5b140d46a?auto=format&fit=crop&w=800&q=80',
    indian: 'https://images.unsplash.com/photo-1617196038311-472c24667dbb?auto=format&fit=crop&w=800&q=80',
    seafood: 'https://images.unsplash.com/photo-1612392061783-5eaa50d2507b?auto=format&fit=crop&w=800&q=80',
    default: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
  };

  const obtenerImagenCocina = (cuisine) => {
    if (!cuisine) return imagenesPorTipo.default;
    const tipo = cuisine.toLowerCase();

    if (tipo.includes('mexican')) return imagenesPorTipo.mexican;
    if (tipo.includes('italian')) return imagenesPorTipo.italian;
    if (tipo.includes('japanese')) return imagenesPorTipo.japanese;
    if (tipo.includes('burger')) return imagenesPorTipo.burger;
    if (tipo.includes('chinese')) return imagenesPorTipo.chinese;
    if (tipo.includes('indian')) return imagenesPorTipo.indian;
    if (tipo.includes('seafood')) return imagenesPorTipo.seafood;

    return imagenesPorTipo.default;
  };

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const buscarRestaurantes = async () => {
    if (!ciudad) {
      Alert.alert('Error', 'Por favor ingresa una ciudad.');
      return;
    }

    setLoading(true);
    setRestaurantes([]);

    try {
      const nominatimUrl = 'https://nominatim.openstreetmap.org/search';
      const locationRes = await axios.get(nominatimUrl, {
        params: {
          q: ciudad,
          format: 'json',
          limit: 1,
        },
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'ReactNativeApp/1.0',
        },
      });

      if (!locationRes.data.length) {
        throw new Error('Ciudad no encontrada');
      }

      const { lat, lon } = locationRes.data[0];
      setUserCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });

      const filter = comida ? `["cuisine"~"${comida}",i]` : '';
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="restaurant"]${filter}(around:5000,${lat},${lon});
          way["amenity"="restaurant"]${filter}(around:5000,${lat},${lon});
          relation["amenity"="restaurant"]${filter}(around:5000,${lat},${lon});
        );
        out center;
      `;

      const overpassUrl = 'https://overpass-api.de/api/interpreter';
      const overpassRes = await axios.post(overpassUrl, overpassQuery, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      if (!overpassRes.data.elements.length) {
        Alert.alert('Sin resultados', 'No se encontraron restaurantes para esa búsqueda.');
        setLoading(false);
        return;
      }

      setRestaurantes(overpassRes.data.elements);
    } catch (err) {
      console.error(err.message);
      Alert.alert('Error', 'No se pudo realizar la búsqueda. Intenta de nuevo.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽 Buscador de Restaurantes</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo de comida (opcional)"
        value={comida}
        onChangeText={setComida}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={ciudad}
        onChangeText={setCiudad}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Buscar" onPress={buscarRestaurantes} color="#00bfa5" />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#00bfa5" style={{ marginTop: 20 }} />
      )}

      <ScrollView style={{ marginTop: 20 }}>
        {restaurantes.map((r, i) => {
          const cuisine = r.tags?.cuisine || '';
          const imgUrl = obtenerImagenCocina(cuisine);
          const lat = r.lat || r.center?.lat;
          const lon = r.lon || r.center?.lon;

          const distancia =
            lat && lon && userCoords.lat && userCoords.lon
              ? calcularDistancia(userCoords.lat, userCoords.lon, lat, lon).toFixed(2)
              : 'Desconocida';

          const rating = (Math.random() * 2 + 3).toFixed(1);

          return (
            <View key={i} style={styles.card}>
              <Text style={styles.name}>{r.tags?.name || 'Sin nombre'}</Text>
              <Image source={{ uri: imgUrl }} style={styles.image} resizeMode="cover" />
              <Text style={styles.text}>🍴 Comida: {cuisine || 'Desconocida'}</Text>
              <Text style={styles.text}>⭐ Calificación: {rating} / 5</Text>
              <Text style={styles.text}>
                📍 Dirección:{' '}
                {r.tags?.['addr:full'] || r.tags?.['addr:street'] || 'No disponible'}
              </Text>
              <Text style={styles.text}>📏 Distancia: {distancia} km</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#e0f7f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00bfa5',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#b2dfdb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderColor: '#b2dfdb',
    borderWidth: 1,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00796b',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#e0f2f1',
  },
  text: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
});
