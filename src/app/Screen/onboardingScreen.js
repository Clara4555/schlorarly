import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('SignUp');
  };

  const DoneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Onboarding
      containerStyles={{ paddingHorizontal: 15 }}
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={DoneButton}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: '#a7f3d0',
          image: (
            <LottieView
              source={require('../assets/animations/Scholary.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          ),
          title: 'Your Classroom, Your Community',
          subtitle: 'Create and join channels to connect with teachers and fellow students',
        },
        {
          backgroundColor: '#fef3c7',
          image: (
            <LottieView
              source={require('../assets/animations/scholary2.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          ),
          title: 'Join the Conversation',
          subtitle: 'Create channels, chat with your peers',
        },
        {
          backgroundColor: '#a78bfa',
          image: (
            <LottieView
              source={require('../assets/animations/getstartedani.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          ),
          title: 'Get Started with SCHOLARLY',
          subtitle: 'Create, connect, and collaborate!',
        },
        
        
        // {
        //   backgroundColor: '#a78bfa',
        //   image: (
        //     <LottieView
        //       source={require('../assets/animations/getstarted.json')}
        //       autoPlay
        //       loop
        //       style={styles.lottie}
        //     />
        //   ),
        //   title: 'Get Started with SCHOLARLY',
        //   subtitle: 'Create, connect, and collaborate!',
        // },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.9,
    height: width,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
