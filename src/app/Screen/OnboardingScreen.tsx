import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, View, Animated, Pressable } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ScreenProps } from '../../../navigation';
import Indicator from '../components/Indicators';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({navigation}: ScreenProps<'Onboarding'>){

  const [index, setIndex] = useState(0);

  const colorAnim = useRef(new Animated.Value(0)).current;
  const colors = ['#a7f3d0', '#fef3c7', '#a78bfa'];

  const startAnimation = () => {
    Animated.timing(colorAnim, {
      toValue: index + 1,
      duration: 500,
      delay: 0, // Duration for each color transition
      useNativeDriver: false, // Use `false` for color animations
    }).start();
  };

  useEffect(()=>{
    startAnimation()
  }, [index])

  // Interpolate the color based on the animation value
  const backgroundColor = colorAnim.interpolate({
    inputRange: colors.map((_, index) => index),
    outputRange: colors,
  });

  type carouselItem = {
    lottie: any,
    title: string,
    subtitle: string
  }
  
  const carouselData: carouselItem[] = (
    [
      {
        lottie: require('../assets/animations/Scholary.json'),
        title: 'Your Classroom, Your Community',
        subtitle: 'Create and join channels to connect with teachers and fellow students'
      },
      {
        lottie: require('../assets/animations/scholary2.json'),
        title: 'Join the Conversation',
        subtitle: 'Create channels, chat with your peers'
      },
      {
        lottie: require('../assets/animations/getstartedani.json'),
        title: 'Get Started with SCHOLARLY',
        subtitle: 'Create, connect, and collaborate!'
      }
    ]
  )

  const carouselView = ({index}: {index: number})=>{
    const item = carouselData[index];

    return (
      <View style={{width: '100%', flex: 1, flexDirection:'column'}}>
        <View style={{width: '100%', flex:3, alignItems: 'center', justifyContent: 'center'}}>
            <LottieView 
              source={item.lottie}
              autoPlay
              loop
              style={styles.lottie}
            />
        </View>
        <View style={{width: '100%', flex:1, gap: '20', paddingHorizontal: 24, alignItems:'center', flexDirection:'column'}}>
          <Text style={{fontFamily: 'Raleway', fontSize:20, fontWeight: 'bold', color:'black', textAlign:'center'}}>
            {item.title}
          </Text>

          <Text style={{fontFamily: 'Raleway', fontSize:15, fontWeight: '400', color:'black0', textAlign:'center'}}>
            {item.subtitle}
          </Text>

        </View>
        <View style={{width:'100%', height: 70}} />

      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      position:'relative'
    },

    lottie: {
      width: width * 0.9,
      height: width,
    },
    buttonText: {
      width:75,
      height:35,
      color: '#000',
      backgroundColor:'#fff',
      borderRadius:15,
      position:'absolute',
      right:25,
      bottom:25,
      alignItems:'center',
      fontFamily:'OpenSans',
      justifyContent:'center',
    },
  });


  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <Carousel
        height={height}
        width={width}
        data={carouselData}
        scrollAnimationDuration={1000}
        loop={false}
        onProgressChange={(_, i)=>{
          if(Math.round(i) !== index && i !== index){
            setIndex(Math.round(i))
          }
        }}
        style={{flex: 1, paddingHorizontal: 15}}
        snapEnabled={true}
        renderItem={carouselView}
      />
      <View style={{width: '100%', height:70, flexDirection:'row', gap:10, justifyContent:'center', alignItems:'center', position:'absolute', bottom:0}}>
        {carouselData.map((data, _index) => (
          <Indicator selected={index === _index} key={_index} />
        ))}
      </View>

      {index === carouselData.length-1 && <TouchableOpacity onPress={()=>navigation.replace('Register')} style={{...styles.buttonText}}><Text style={{fontSize: 13, fontWeight: 'bold'}}>Lets Go</Text></TouchableOpacity>}
    </Animated.View>
  )

}





