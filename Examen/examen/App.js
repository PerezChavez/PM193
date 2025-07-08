import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import RestaurantListScreen from './screens/RestaurantListScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RestaurantListScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;