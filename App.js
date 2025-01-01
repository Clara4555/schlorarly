import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';  // Import MenuProvider
import Navigation from './navigation';  // Import the Navigation component from Navigator.js

export default function App() {
  return (
    <MenuProvider>  {/* Wrap your entire app with MenuProvider */}
      <NavigationContainer>
        <Navigation />  {/* Use the Navigation component */}
      </NavigationContainer>
    </MenuProvider>
  );
}
