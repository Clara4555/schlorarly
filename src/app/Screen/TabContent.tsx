import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import ChatScreen from './ChatScreen';
import CommunitiesScreen from './CommunitiesScreen';
import SettingsScreen from './SettingsScreen';
import NotificationsScreen from './NotificationsScreen';
import { Colors } from '../constants/Colors';
import ChatsPage from './pages/ChatsPage';
import EventsPage from './pages/EventsPage';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import { ScreenProps } from '../../../navigation';

interface props extends ScreenProps<'Home'> {
  activeTab: string,
  
}

const TabContent = (props: props) => {
  const {activeTab} = props
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
  const Content = ()=> {
    switch (activeTab) {
      case 'chat':
        return <ChatsPage {...props} />;
      case 'events':
        return <EventsPage />;
      case 'courses':
        return <CoursesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  }
  

  return (
    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
      <Content />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.black
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
