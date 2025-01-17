import { View, Text, TextInput, StyleProp, ViewStyle, InputModeOptions, Image, TouchableOpacity } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Eye, EyeSlash } from 'iconsax-react-native'
interface InputProps{
    style?: StyleProp<ViewStyle>,
    initialValue?:string,
    placeholder:string,
    isPassword?:boolean,
    prefix?:ReactNode,
    value?: string,
    error? : string | null,
    onChange?: (a: string) => void,
    inputMode?:InputModeOptions
}
export default function Input({style,initialValue,placeholder, onChange = ()=>{}, prefix, value ,error, inputMode, isPassword}:InputProps) {
    const [show, setShow] = useState(false)
  return (
    <View style={{width: '100%', gap:1, flexDirection:'column', alignItems:'flex-start'}}>
        <View style={[
            {width:"100%", borderRadius:20, gap:12, alignItems:'center', justifyContent:'center', backgroundColor:Colors.background, paddingVertical:8, paddingHorizontal:20, flexDirection:'row'},
            style
            ]}>
            {prefix && <View style={{width:20, height: 20, overflow:'hidden'}}>
                {prefix}
                </View>}
            <TextInput value={value} onChangeText={(e)=>onChange(e.trim())} placeholder={placeholder} secureTextEntry={!show && isPassword} placeholderTextColor={Colors.secondary} cursorColor={Colors.purple} defaultValue={initialValue} inputMode={inputMode} style={{flex: 1, backgroundColor:'transparent', fontSize:14 , color:'white'}} />
            {isPassword && <TouchableOpacity onPress={()=>setShow(!show)}>
                {show && <EyeSlash size={22} color={Colors.secondary} />}
                {!show && <Eye size={22} color={Colors.secondary} />}
            </TouchableOpacity>}
        </View>

        {error && <Text style={{color: 'red', fontWeight:'bold', fontSize:11, marginLeft: 5,}}>{`* ${error.toLowerCase().trim()}`}</Text>}
    </View>
  )
}