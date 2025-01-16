import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';

interface props{
    loading?:boolean,
    title:string,
    onClick?:()=> void,
    disabled?:boolean,
    negative?:boolean,
    gradient?:boolean,
    style?: StyleProp<ViewProps>
    outlined?: boolean,
    // invert?: boolean,
}

export default function CustomButton(buttonProps:props) {

    const  {title, loading, onClick, disabled, negative, style, gradient, outlined} = buttonProps;

    const styles = StyleSheet.create({
        button:{
            backgroundColor: outlined? 'transparent' : negative? 'red' : Colors.purple,
            borderColor: negative? 'red': Colors.purple,
            borderWidth: outlined? 3: 0,
            alignItems:'center',
            justifyContent: 'center',
            height: 55,
            width: '100%', 
        }
    })
  return (
    <TouchableOpacity onPress={onClick} disabled={disabled} style={[styles.button, style]}>
      {loading && <Text style={{color:outlined? negative? 'red': Colors.purple : 'white', fontWeight:'600',}}>{title}</Text>}
      {!loading && <ActivityIndicator size={14} color={outlined? negative? 'red': Colors.purple : 'white'} />}
    </TouchableOpacity>
  )
}

