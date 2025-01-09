import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'

interface props{
    /**
     * Whether the current indicator is selected.
     */
    selected?: boolean,
    style?: StyleProp<ViewStyle>,
    className?: string,
}

export default function Indicators(indicatorProps: props) {
    const {selected=false, style, className} = indicatorProps;

    const styles = StyleSheet.create({
        indicator:{
            minWidth: 5,
            maxWidth: 15,
            height: 5,                  
            backgroundColor: selected? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.2)',
            //  White if selected else transparent white
            width: selected? 'auto': '100%',
            // If seleted take up the minWidth, else take up the maxWidth,
            transitionProperty: 'all',
            transitionTimingFunction:'ease',
            transitionDuration:'400ms'
        }
    })
  return (
    <View style={[styles.indicator, style]} />
  )
}