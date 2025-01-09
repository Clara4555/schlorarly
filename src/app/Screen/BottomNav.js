import React from 'react';
import {BookSaved, Calendar, Home, Setting, Message, Messages} from 'iconsax-react-native'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // You can also use other icon libraries if preferred
import { Colors } from '../constants/Colors';

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.bottomNav}>
        {/* Home Tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Home
            variant={activeTab === 'home' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'home' ?  Colors.purple: 'white'}
          />
        </TouchableOpacity>

        {/* Chat Tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('chat')}>
          <Messages
            variant={activeTab === 'chat' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'chat' ?  Colors.purple : 'white'}
          />
        </TouchableOpacity>

        {/* Events Tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('events')}>
          <Calendar
            variant={activeTab === 'events' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'events' ?  Colors.purple : 'white'}
          />
        </TouchableOpacity>

        {/* Courses Tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('courses')}>
          <BookSaved
            variant={activeTab === 'courses' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'courses' ?  Colors.purple : 'white'}
          />
        </TouchableOpacity>

        {/* Settings Tab */}
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('settings')}>
          <Setting
            variant={activeTab === 'settings' ? 'Bold' : 'Linear'}
            size={25}
            color={activeTab === 'settings' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 20,
    height: 65,
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius:30,
    backgroundColor: Colors.tertiary,
    overflow:'hidden'// Rounded top-right corner
  },

  navItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Adds vertical padding for better spacing
  },
});

export default BottomNav;
