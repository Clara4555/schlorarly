import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomNav from './BottomNav';
import TabContent from './TabContent';
import { ChannelsProvider } from '../components/channels/ChannelsProvider';
import { ScreenProps } from '../../../navigation';

const HomeScreen = (props : ScreenProps<'Home'>) => {
  const [activeTab, setActiveTab] = useState('chat'); // Default tab

  return (
    <View style={styles.container}>
        <TabContent {...props} activeTab={activeTab} />
          {/* Bottom navigation bar */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    position: 'relative',
    backgroundColor: '#2C2F33',
  },
  
});

export default HomeScreen;
