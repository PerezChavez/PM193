import axios from 'axios';

const foursquareClientId = '11ODJ2VX2LHJKZOS2FTOQMBXQLGS30KZPRDDGEG4B4YKA1KQ';
const foursquareClientSecret = '11ODJ2VX2LHJKZOS2FTOQMBXQLGS30KZPRDDGEG4B4YKA1KQ';
const foursquareVersion = '20231001';

export const searchRestaurants = async (query, near) => {
  try {
    const response = await axios.get(
      `https://api.foursquare.com/v2/venues/search `,
      {
        params: {
          query,
          near,
          sortByDistance: 1,
          limit: 10,
          client_id: foursquareClientId,
          client_secret: foursquareClientSecret,
          v: foursquareVersion,
        },
      }
    );
    return response.data.response.venues;
  } catch (error) {
    throw new Error('Error al buscar restaurantes');
  }
};