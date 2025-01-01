import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';  // Import the hook
import { Image } from 'expo-image';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ChatScreen = () => {
  const { top } = useSafeAreaInsets();  // Get the top inset for safe area handling

  return (
    <View style={styles.container}>
      {/* Header with safe area handling */}
      <View 
        style={{
          paddingTop: Platform.OS === 'ios' ? top : 10,  // Use the top inset on iOS, otherwise use a fallback value
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: '#4F46E5',  // Indigo background
          alignItems: 'center', // Ensure items are vertically centered
        }}
      >
        <Text style={[styles.text, styles.fontMedium]}>Chats</Text>

        {/* Menu and Image in the same row */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Menu>
            <MenuTrigger text='Select action' />
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text='Save' />
              <MenuOption onSelect={() => alert(`Delete`)} >
                <Text style={{ color: 'red' }}>Delete</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
            </MenuOptions>
          </Menu>

          <Image
            style={{ height: hp(4.3), width: hp(4.3), borderRadius: hp(2.15), marginLeft: 10 }}  // Adjust spacing between the menu and image
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={{ blurhash: '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[ayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[' }}
            transition={1000}
          />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#2C2F33', 
    paddingBottom: 24, 
    borderBottomLeftRadius: 30,  
    borderBottomRightRadius: 30, 
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8,
    elevation: 5,
  },
  
  text: {
    color: 'white', 
    fontSize: 18,
  },
  fontMedium: {
    fontWeight: '500', 
  },
});

export default ChatScreen;
