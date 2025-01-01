import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Communities Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2F33',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommunitiesScreen;
