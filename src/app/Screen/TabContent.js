import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native'; // Import Text here
import { Ionicons } from '@expo/vector-icons'; // Icon library
import ChatsPage from './pages/ChatsPage';
import EventsPage from './pages/EventsPage';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import { Colors } from '../constants/Colors';

const TabContent = ({ activeTab }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const [activeIcon, setActiveIcon] = useState('notifications'); // Track active icon
  const [isNotificationVisible, setNotificationVisible] = useState(false); // Show notification box
  const [slideAnim] = useState(new Animated.Value(-300)); // Initial position off-screen

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  // Handle icon click and set active icon
  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
    if (iconName === 'notifications') {
      setNotificationVisible(!isNotificationVisible); // Toggle visibility
      if (!isNotificationVisible) {
        // Show notification box with a slide-up effect
        Animated.spring(slideAnim, {
          toValue: 0, // Slide to 0 to show the box
          useNativeDriver: true,
        }).start();
      } else {
        // Hide notification box with a slide-up effect
        Animated.spring(slideAnim, {
          toValue: -300, // Slide back up off the screen
          useNativeDriver: true,
        }).start();
      }
    }
  };

  // Determine which page content to display
  let content;
  switch (activeTab) {
    case 'chat':
      content = <ChatsPage />;
      break;
    case 'events':
      content = <EventsPage />;
      break;
    case 'courses':
      content = <CoursesPage />;
      break;
    case 'settings':
      content = <SettingsPage />;
      break;
    default:
      content = <HomePage />;
      break;
  }

  return (
    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
      {/* Header with Icons (aligned to the top-right) */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleIconClick('notifications')}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={activeIcon === 'notifications' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleIconClick('settings')}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={activeIcon === 'settings' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleIconClick('profile')}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={activeIcon === 'profile' ? Colors.purple : 'white'}
          />
        </TouchableOpacity>
      </View>

      {/* Page Content */}
      <View style={styles.pageContent}>{content}</View>

      {/* Notification Box (Appears on click) */}
      <Animated.View
        style={[
          styles.notificationBox,
          {
            transform: [{ translateY: slideAnim }], // Apply the slide animation
          },
        ]}>
        {isNotificationVisible && (
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>New Notification</Text>
            <Text style={styles.notificationMessage}>
              You have no notification!
            </Text>
          </View>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.black,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  icon: {
    marginLeft: 16,
  },
  pageContent: {
    flex: 1,
    marginTop: 110,
    backgroundColor: Colors.black,
  },
  notificationBox: {
    position: 'absolute',
    top: 80, // Adjust the position just below the notification icon
    left: 20,
    right: 20,
    backgroundColor: Colors.purple,
    borderRadius: 10,
    zIndex: 2,
    padding: 20,
    width: '90%', // Adjust width as needed
  },
  notificationContent: {
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  notificationMessage: {
    fontSize: 14,
    color: 'white',
    marginBottom: 20,
  },
});

export default TabContent;
