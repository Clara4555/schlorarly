import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';  // Import MenuProvider
import Navigation from './navigation';  // Import the Navigation component from Navigator.js
import { StudentProvider } from './src/app/components/students/StudentProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider>  {/* Wrap your entire app with MenuProvider */}
        <StudentProvider>
          <NavigationContainer>
            <Navigation />  {/* Use the Navigation component */}
          </NavigationContainer>
        </StudentProvider>
      </MenuProvider>
    </QueryClientProvider>
  );
}
