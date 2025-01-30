import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';  // Import MenuProvider
import Navigation from './navigation';  // Import the Navigation component from Navigator.js
import { StudentProvider } from './src/app/components/students/StudentProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Colors } from './src/app/constants/Colors';
import { View } from 'react-native';
import { StompClientProvider } from './src/app/context/StompClientContext';
import { ChannelsProvider } from './src/app/components/channels/ChannelsProvider';
import "./global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const queryClient = new QueryClient();

const toastConfig : import('react-native-toast-message').ToastConfig = {
  success: (props)=>(
    <BaseToast
      {...props}
      style={{borderLeftColor:'green', backgroundColor: Colors.tertiary}}
      text1Style={{color: '#fff'}}
      text2Style={{color:Colors.secondary}}
    />
  ),

  error: (props)=>(
    <ErrorToast
      {...props}
      style={{borderLeftColor:'red',backgroundColor: Colors.tertiary}}
      text1Style={{color: '#fff'}}
      text2Style={{color:Colors.secondary}}
    />
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider>
        <StompClientProvider>
          <StudentProvider>
            <ChannelsProvider>
              <GestureHandlerRootView style={{flex:1, width:'100%'}}>
                <View style={{backgroundColor:Colors.black, flex:1, width:'100%'}}>
                  <NavigationContainer theme={{...DefaultTheme, dark:true, colors:{...DefaultTheme.colors, card:'#000', background:'#000'}}}>
                    <Navigation />  {/* Use the Navigation component */}
                    <Toast config={toastConfig} position='top' topOffset={30} />
                  </NavigationContainer>
                </View>
              </GestureHandlerRootView>
            </ChannelsProvider>
          </StudentProvider>
        </StompClientProvider>
      </MenuProvider>
    </QueryClientProvider>
  );
}
