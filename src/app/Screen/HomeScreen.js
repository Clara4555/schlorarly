import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomNav from './BottomNav';
import TabContent from './TabContent';
import { ChannelsProvider } from '../components/channels/ChannelsProvider';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home'); // Default tab

  return (
    <ChannelsProvider>
      <View style={styles.container}>
        <TabContent activeTab={activeTab} />
          {/* Bottom navigation bar */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </ChannelsProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    position: 'relative',
    backgroundColor: '#2C2F33',
  },
  
});

export default HomeScreen;
