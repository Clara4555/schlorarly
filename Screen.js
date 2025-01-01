import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Screen = ({ children, bg }) => {
  return (
    <View style={[styles.screen, { backgroundColor: bg }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
