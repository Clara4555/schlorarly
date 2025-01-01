import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/app/Screen/WelcomeScreens';  // Correct import
import OnboardingScreen from './src/app/Screen/onboardingScreen';
import SignUpScreen from './src/app/Screen/SignUpScreen';
import LoginScreen from './src/app/Screen/LoginScreen';
import HomeScreen from './src/app/Screen/HomeScreen';
import ChatScreen from './src/app/Screen/ChatScreen';
import CommunitiesScreen from './src/app/Screen/CommunitiesScreen';  // Communities
import NotificationsScreen from './src/app/Screen/NotificationsScreen';  // Notifications
import ProfileScreen from './src/app/Screen/ProfileScreen';  // Profile (Settings)
import SettingsScreen from './src/app/Screen/SettingsScreen';  // Settings


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      {/* Welcome Screen */}
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />

      {/* Other screens */}
      <Stack.Screen 
        name="OnboardingScreen" 
        component={OnboardingScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CommunitiesScreen" 
        component={CommunitiesScreen}  // Communities
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="NotificationsScreen" 
        component={NotificationsScreen}  // Notifications
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}  // Profile (for settings)
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SettingsScreen" 
        component={SettingsScreen}  // Settings screen
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default Navigation;
