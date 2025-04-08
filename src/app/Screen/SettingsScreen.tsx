import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import  assets   from '../assets/image.png';
import {User, Sms, Call, Lock, ShieldSecurity, Notification, MessageText, Logout, Trash, ArrowRight2} from 'iconsax-react-native';
import {purple} from "nativewind/dist/metro/picocolors";

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
            <Text className='text-white w[81px] h-[18px] font-bold place-content-center tracking-normal'>
                View Profile
            </Text>
        </View>

        {/* Edit Profile Section with Icons */}

        <View className= 'w-[396px] h-[618px] gap-[10px] p-[10px]'>

            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A]   gap[30px] p-[10px]'>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <User  color="purple" variant="Outline" />
                    </TouchableOpacity>

                    <Text className='text-white font-bold'>Edit Profile</Text>
                </View>
                <ArrowRight2 color="white"  width="24px" height="24px"/>
            </View>


            {/* Messages Item */}
            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A] gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <Sms color="purple" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-white font-bold '>Change Email</Text>
                </View>
                <ArrowRight2 color="white" width="24px" height="24px"/>
            </View>


            {/* Contact Item */}
            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A] gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <Call  color="purple" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-white font-bold '> Change Phone</Text>
                </View>
                <ArrowRight2 color="white" width="24px" height="24px"/>
            </View>

            {/* Security Item */}
            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A] gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <Lock color="purple" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-white font-bold '> Change Passcode</Text>
                </View>
                <ArrowRight2 color="white" width="24px" height="24px"/>
            </View>


            {/* Notification Item */}

            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A] gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <ShieldSecurity color="purple" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-white font-bold '> Two-Factor Authentication</Text>
                </View>
                <ArrowRight2 color="white" width="24px" height="24px"/>
            </View>

            {/* Privacy Item */}

            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A] gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <Notification  color="purple" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-white font-bold '> App Notification</Text>
                </View>
                <ArrowRight2 color="white" width="24" height="24"/>
            </View>


            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A] gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <MessageText  color="purple" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-white font-bold '> Give Feedback</Text>
                </View>
                <ArrowRight2 color="white" width="24" height="24"/>
            </View>


            {/* Logout Item */}
            <View className='flex-row items-center justify-between border-b border-b-[#9CA3AF1A]   gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <Logout  color="red" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-red-600  font-bold '> Logout</Text>
                </View>
            </View>


            {/* Delete Account Item */}

            <View className='flex-row items-center justify-between  gap[30px] p-[10px] '>
                <View className='flex-row items-center gap-[10px]'>
                    <TouchableOpacity className='w-[30px] h-[30px]'>
                        <Trash  color="red" variant="Outline" />
                    </TouchableOpacity>
                    <Text className='text-red-600 font-bold '> Delete</Text>
                </View>
                <ArrowRight2 color="white" width="24" height="24p"  />
            </View>

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
