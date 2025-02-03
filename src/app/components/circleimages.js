import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native';

const CircleImages = () => {
    const images = [
        { id: 1, uri: require('../assets/mynft.jpg') },
        { id: 2, uri: require('../assets/mynft.jpg') },
        
    ];

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {images.map((image) => (
            <View key={image.id} style={styles.circle}>
              <Image source={image.uri} style={styles.image} />
            </View>
          ))}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',  // Aligns the images horizontally
    justifyContent: 'flex-start', // Align images to the start (left)
    alignItems: 'center',
    padding: 20,
  },

    circle: {
      width: 80,
      height: 80,
      borderRadius: 50,
      overflow: 'hidden',
      margin: 10,
      borderWidth: 4,
      borderColor: 'purple',
    },

    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
});

export default CircleImages;