import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import WelcomeScreen from './src/app/Screen/WelcomeScreens';  // Correct import
import OnboardingScreen from './src/app/Screen/OnboardingScreen';
import SignUpScreen from './src/app/Screen/RegisterScreen';
import LoginScreen from './src/app/Screen/LoginScreen';
import HomeScreen from './src/app/Screen/HomeScreen';
import ProfileScreen from './src/app/Screen/ProfileScreen';  // Profile (Settings)
import SettingsScreen from './src/app/Screen/SettingsScreen';
import CreateChannelScreen from './src/app/Screen/CreateChannelScreen';
import ChatScreen from './src/app/Screen/ChatScreen';
import { ChatsProvider } from './src/app/components/chats/ChatsProvider';
import { Colors } from './src/app/constants/Colors';
import AnnouncementScreen from './src/app/Screen/AnnouncementScreen';
import EditProfileScreen from './src/app/Screen/EditProfileScreen';

type RootStackParamList = {
  Welcome: undefined,
  Onboarding: undefined,
  Register: undefined,
  Login: undefined,
  Profile: undefined,
  Home: undefined,
  Announcement: {announcementId: string}
  Settings: undefined,
  CreateChannel: undefined,
  Chats: {channelId: String}
  EditProfileScreen: undefined,  // ✅ Add this line
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
  return <Stack.Navigator id={undefined} screenOptions={{orientation:'portrait_up', navigationBarColor:Colors.black, animationDuration: 800, headerShown:false}} initialRouteName='Welcome'>
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
        options={{ headerShown: false, statusBarBackgroundColor:'transparent', statusBarTranslucent:true}} 
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
        name='CreateChannel'
        component={CreateChannelScreen}
        options={{headerShown: false}}
       />
       <Stack.Screen
        name='Chats'
        options={{headerShown:false,statusBarBackgroundColor:'transparent', navigationBarColor:Colors.background , statusBarTranslucent:true}}>
          {(props)=> <ChatsProvider channelId={props.route.params.channelId}>
              <ChatScreen {...props} />
            </ChatsProvider>}
      </Stack.Screen> 
      <Stack.Screen
        name='Announcement'
        component={AnnouncementScreen}
        options={{headerShown:false,statusBarBackgroundColor:'transparent', navigationBarColor:Colors.background , statusBarTranslucent:true}}
      />  
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}  // Settings screen
        options={{ headerShown: false }} 
      />
        <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
  
}
