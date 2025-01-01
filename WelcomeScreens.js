import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreens = () => {  
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true); // State for loading

  useEffect(() => {
    // Navigate to "OnboardingScreen" after 2500ms
    setTimeout(() => {
      setLoading(false); // Stop the loader after 2.5 seconds
      navigation.navigate('OnboardingScreen'); // Navigate to the next screen
    }, 4500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* logo image with responsive sizing */}
      <Image source={require('../assets/schlogo.png')} style={styles.logo} />

      {/* Loader */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#ffffff" // White color for the loader
          style={styles.loader} // Styling the loader
        />
      )}
    </View>
  );
}

export default WelcomeScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Black background
    paddingHorizontal: 20,
  },
  logo: {
    width: wp(60),  // 60% of the screen width
    height: hp(20), // 15% of the screen height
    resizeMode: 'contain', // Ensures image scales without distortion
  },
  loader: {
    marginTop: 20, // Adds space between the logo and loader
  },
});
