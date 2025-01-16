import { View, Text, StyleProp, ViewStyle, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

interface props{
    /**
     * Whether the current indicator is selected.
     */
    maxWidth?: number,
    minWidth?: number,
    selected?: boolean,
    duration?: number,
    style?: StyleProp<ViewStyle>,
    className?: string,
}

export default function Indicator(indicatorProps: props) {
    
    const {selected=false, style, minWidth=10, maxWidth=20, duration = 1000, className} = indicatorProps;

    

    const colors = ['rgb(255, 255, 255)', 'rgba(255, 255, 255, 0.2)'];

    const colorAnim = useRef(new Animated.Value(0)).current;
      
    const widthAnim = useRef(new Animated.Value(minWidth)).current; // Initial width value

    // Function to start the width & color animation
    const startAnimation = () => {
      Animated.timing(widthAnim, {
        toValue: selected? maxWidth:  minWidth, // Target width value
        duration, // Duration of the animation
        useNativeDriver: false, // Set to `false` as we are animating layout properties
      }).start();
      Animated.timing(colorAnim, {
            toValue: selected? 0: 1,
            duration: 500,
            delay: 0, // Duration for each color transition
            useNativeDriver: false, // Use `false` for color animations
      }).start();
    };

    const backgroundColor = colorAnim.interpolate({
      inputRange: colors.map((_, index) => index),
      outputRange: colors,
    });

    useEffect(()=>{
      startAnimation();
    }, [selected])

    const styles = StyleSheet.create({
      indicator:{
        minWidth,
        maxWidth,
        height: minWidth,
        borderRadius: 15,                
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        // If seleted take up the minWidth, else take up the maxWidth,
        transitionProperty: 'all',
        transitionTimingFunction:'ease',
        transitionDuration:'400ms'
      }
    })

    

   
  return (
    <Animated.View style={[styles.indicator, style, {width: widthAnim, backgroundColor}]} />
  )
}