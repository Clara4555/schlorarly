import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import WelcomeScreen from './src/app/Screen/WelcomeScreens';  // Correct import
import OnboardingScreen from './src/app/Screen/OnboardingScreen';
import SignUpScreen from './src/app/Screen/RegisterScreen';
import LoginScreen from './src/app/Screen/LoginScreen';
import HomeScreen from './src/app/Screen/HomeScreen';
import ProfileScreen from './src/app/Screen/ProfileScreen';  // Profile (Settings)
import SettingsScreen from './src/app/Screen/SettingsScreen';

type RootStackParamList = {
  Welcome: undefined,
  Onboarding: undefined,
  Register: undefined,
  Login: undefined,
  Profile: undefined,
  Home: undefined,
  Settings: undefined,
  Chats: {channelId: String}
}

/**
 * Dynamic Prop to get the ParamsList and etc of a Screen
 * 
 * The `name` must be a key of `RootStackParamList`
 * @author Teninlanimi Taiwo
 */
export type ScreenProps<RouteName extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, RouteName>;


export const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation(){
  return <Stack.Navigator id={undefined} initialRouteName='Welcome'>
    {/* Welcome Screen */}
      <Stack.Screen
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />

      {/* Other screens */}
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={SignUpScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home"
        component={HomeScreen} 
        options={{ headerShown: false, }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}  // Profile (for settings)
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}  // Settings screen
        options={{ headerShown: false }} 
      />
  </Stack.Navigator>
}
