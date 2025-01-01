import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // You can also use other icon libraries if preferred

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.bottomNav}>
        {/* Home Tab */}
        <TouchableOpacity onPress={() => setActiveTab('home')}>
          <MaterialIcons
            name="home"
            size={30}
            color={activeTab === 'home' ? 'purple' : 'white'}
          />
        </TouchableOpacity>

        {/* Chat Tab */}
        <TouchableOpacity onPress={() => setActiveTab('chat')}>
          <MaterialIcons
            name="chat"
            size={30}
            color={activeTab === 'chat' ? 'purple' : 'white'}
          />
        </TouchableOpacity>

        {/* Communities Tab */}
        <TouchableOpacity onPress={() => setActiveTab('communities')}>
          <MaterialIcons
            name="group"
            size={30}
            color={activeTab === 'communities' ? 'purple' : 'white'}
          />
        </TouchableOpacity>

        {/* Notifications Tab */}
        <TouchableOpacity onPress={() => setActiveTab('notifications')}>
          <MaterialIcons
            name="notifications"
            size={30}
            color={activeTab === 'notifications' ? 'purple' : 'white'}
          />
        </TouchableOpacity>

        {/* Settings Tab */}
        <TouchableOpacity onPress={() => setActiveTab('settings')}>
          <MaterialIcons
            name="settings"
            size={30}
            color={activeTab === 'settings' ? 'purple' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000', // Black background
    borderTopLeftRadius: 20, // Rounded top-left corner
    borderTopRightRadius: 20, // Rounded top-right corner
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    paddingVertical: 10, // Adds vertical padding for better spacing
  },
});

export default BottomNav;
