import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/Colors';
import ChatsPage from './pages/ChatsPage';
import SettingsPage from './pages/highlights';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/batches';
import SchedulePage from './pages/SchedulePage';
import { ScreenProps } from '../../../navigation';
import AnnouncementPage from './pages/AnnouncementPage';
import CallsPage from './pages/CallsPage'; // Add this import

interface props extends ScreenProps<'Home'> {
  activeTab: string,
}

const TabContent = (props: props) => {
  const { activeTab } = props;
  const [fadeAnim] = useState(new Animated.Value(0)); 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  const Content = () => {
    switch (activeTab) {
      case 'schedule':
        return <SchedulePage />;
      case 'chats':
        return <ChatsPage {...props} />;
      case 'batches':
        return <CoursesPage />;
      case 'highlights':
        return <SettingsPage />;
        case 'calls':
          return <CallsPage />;
      case 'announcements':
        return <AnnouncementPage {...props} />;
      default:
        return <SchedulePage />; // fallback to schedule as the default
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
