import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import ChatScreen from './ChatScreen';
import CommunitiesScreen from './CommunitiesScreen';
import SettingsScreen from './SettingsScreen';
import NotificationsScreen from './NotificationsScreen';

const TabContent = ({ activeTab }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  // Trigger fade-in animation whenever activeTab changes
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade-in to 1 (fully visible)
      duration: 500, // Duration of the fade-in effect
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  }, [activeTab]); // Dependency array, triggers on activeTab change

  // Select the content based on the activeTab value
  let content;
  switch (activeTab) {
    case 'chat':
      content = <ChatScreen />;
      break;
    case 'communities':
      content = <CommunitiesScreen />;
      break;
    case 'settings':
      content = <SettingsScreen />;
      break;
    case 'notifications':
      content = <NotificationsScreen />;
      break;
    default:
      content = (
        <View style={styles.defaultContainer}>
          <Text style={styles.defaultText}>Welcome to the Home Screen!</Text>
        </View>
      );
      break;
  }

  return (
    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
      {content}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  defaultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TabContent;
