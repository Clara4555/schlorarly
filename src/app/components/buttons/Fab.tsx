import React, { ReactNode } from "react"
import { StyleProp, ViewStyle, View, Text, TouchableHighlight, GestureResponderEvent } from "react-native"
import { Colors } from "../../constants/Colors"

type props = {
    children?: ReactNode,
    onPress?: (e: GestureResponderEvent)=> void,
    style?: StyleProp<ViewStyle>
}

export default function Fab({style, children, onPress}:props) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={Colors.background} style={[{width:55, height:55, borderRadius:'50%', position:'absolute', alignItems:'center', justifyContent:'center', zIndex:10, right:20, bottom: (85+ 20), backgroundColor:Colors.purple}, style]}>
      {children}
    </TouchableHighlight>
  )
}