import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useStudent } from '../components/students/StudentProvider';
import { ScreenProps } from '../../../navigation';
import { getStudent } from '../utils/Storage';


export default function WelcomeScreen({navigation}: ScreenProps<'Welcome'>){
  const [loading, setLoading] = React.useState(true);
  const {student, setStudent} = useStudent();

  useEffect(() => {
    getStudent().then(_student =>{
        setStudent(_student);
        
      })
    // Navigate to "Onboarding" or "Home" after 4500ms
    setTimeout(() => {
      setLoading(false);

      if(student){
        navigation.replace('Home');
        return;
      }
      navigation.replace('Onboarding');

      
    }, 4500);
  }, []);

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
