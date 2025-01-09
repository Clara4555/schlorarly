import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/app/Screen/WelcomeScreens';  
import OnboardingScreen from './src/app/Screen/onboardingScreen';
import SignUpScreen from './src/app/Screen/SignUpScreen';
import LoginScreen from './src/app/Screen/LoginScreen';
import HomeScreen from './src/app/Screen/HomeScreen';
import ChatScreen from './src/app/Screen/ChatScreen';
import CommunitiesScreen from './src/app/Screen/CommunitiesScreen';  
import NotificationsScreen from './src/app/Screen/NotificationsScreen'; 
import ProfileScreen from './src/app/Screen/ProfileScreen';  
import SettingsScreen from './src/app/Screen/SettingsScreen';  
import ChatsPage from './src/app/Screen/pages/ChatsPage';
import EventsPage from './src/app/Screen/pages/EventsPage';
import SettingsPage from './src/app/Screen/pages/SettingsPage';
import CoursesPage from './src/app/Screen/pages/CoursesPage';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
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
        options={{ headerShown: false, }} 
      />
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}  
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SettingsScreen" 
        component={SettingsScreen}  
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default Navigation;
