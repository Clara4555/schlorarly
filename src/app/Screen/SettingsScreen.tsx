import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import  assets   from '../assets/image.png';
import {User, Sms, Call, Lock, ShieldSecurity, Notification, MessageText, Logout, Trash} from 'iconsax-react-native';

const SettingsScreen = () => {
  return (
    <View className='bg-black px-4 pt-16 flex-1'>
      <Text className='text-[32px] text-white font-bold'>Settings</Text>

        <View className='items-center p-[15px] w-[396px] h-[163px]'>
            <Image
                source={ require('../assets/image.png')}
                className='w-[100px] h-[100px] rounded-full mb-4'
                resizeMode= "cover"
            />
            <Text className='text-white w[81px] h[18px] font-bold   tracking-normal'>
                View Profile
            </Text>
        </View>

        <View>

        </View>
    </View>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2F33',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
