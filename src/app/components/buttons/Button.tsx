import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

interface props{
    loading?:boolean,
    title:string,
    onClick?:()=> void,
    disabled?:boolean,
    negative?:boolean,
    gradient?:boolean,
    style?: StyleProp<ViewStyle>
    outlined?: boolean,
    // invert?: boolean,
}

export default function Button(buttonProps:props) {

    const  {title, loading, onClick, disabled, negative, style, gradient, outlined} = buttonProps;

    const styles = StyleSheet.create({
        button:{
            backgroundColor: outlined? 'transparent' : negative? 'red' : Colors.purple,
            borderColor: negative? 'red': Colors.purple,
            borderWidth: outlined? 3: 0,
            borderRadius: 25,
            marginTop:10,
            alignItems:'center',
            justifyContent: 'center',
            height: 55,
            width: '100%', 
        }
    })
  return (
    <TouchableHighlight underlayColor={Colors.background} onPress={onClick} disabled={disabled || loading} style={[styles.button, style]}>
        <View style={{width:'100%', flex:1, alignItems:'center', justifyContent:'center'}}>
            {!loading && <Text style={{color:outlined? negative? 'red': Colors.purple : 'white', fontWeight:'600',}}>{title}</Text>}
            {loading && <ActivityIndicator size={14} color={outlined? negative? 'red': Colors.purple : 'white'} />}
        </View>
    </TouchableHighlight>
  )
}

