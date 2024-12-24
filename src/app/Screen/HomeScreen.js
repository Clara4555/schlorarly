import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomNav from './BottomNav';
import TabContent from './TabContent';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home'); // Default tab

  return (
    <View style={styles.container}>
      <TabContent activeTab={activeTab} />
        {/* Bottom navigation bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2F33',
  },
  
});

export default HomeScreen;
