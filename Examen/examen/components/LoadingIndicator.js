import React from 'react';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const LoadingIndicator = ({ visible }) => {
  return <SpinnerOverlay visible={visible} textContent="Cargando..." />;
};

export default LoadingIndicator;