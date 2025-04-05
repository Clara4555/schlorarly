import { View, Text, StyleSheet, ViewStyle, StyleProp, Image } from 'react-native'
import React from 'react'

type props = {
  url?: string | null,
  size?: number,
  textSize?: number | string
  color?: string,
  className?: string,
  name?:string,
  style?: StyleProp<ViewStyle>,

}

export default function CircleImage(prop:props) {
  const {url, style, name, color, size=50, textSize, className} = prop
  return (
    <View style={
      [
        {width:size, height:size, backgroundColor: color, borderRadius:'50%', alignItems:'center', justifyContent:'center', overflow:'hidden'},
        style
      ]
    } className={className}>
      {name && !url && <Text style={{color: 'white', fontSize:+textSize, fontWeight:'bold', letterSpacing:0.6,}}>{name.split(" ").splice(0,2).map(n => n.charAt(0).toLocaleUpperCase())}</Text>}
      {url && <Image style={{width:'100%', height:'100%', objectFit:'cover'}} src={url} />}
    </View>
  )
}
