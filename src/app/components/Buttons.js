import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Buttons = ({ text, onPress, gradientColors = ['rgba(113, 154, 243, 0.985)', 'rgba(86, 124, 205, 0.985)', 'rgba(185, 9, 238, 0.985)', '#c515cb'] }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={gradientColors}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Buttons;
