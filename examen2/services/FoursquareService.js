// services/FoursquareService.js
import axios from 'axios';

const API_KEY = '11ODJ2VX2LHJKZOS2FTOQMBXQLGS30KZPRDDGEG4B4YKA1KQ';

export const searchRestaurants = async (foodType, city) => {
  const url = `https://api.foursquare.com/v3/places/search?query=${foodType}&near=${city}&limit=10`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: API_KEY,
      },
    });

    return response.data.results.map((place) => ({
      name: place.name,
      address: place.location?.formatted_address || 'Dirección no disponible',
      distance: place.distance ? `${place.distance} m` : 'N/A',
      rating: place.rating || 'N/A',
      phone: place.tel || 'N/A',
      image: 'https://placehold.co/200x200?text=Restaurant', // Foursquare no devuelve imagen directamente
    }));
  } catch (error) {
    throw new Error('Error al obtener los restaurantes');
  }
};
