import { View, Text, TextInput, StyleProp, ViewStyle, InputModeOptions, Image, TouchableOpacity, TextStyle } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Eye, EyeSlash } from 'iconsax-react-native'
interface InputProps{
    style?: StyleProp<ViewStyle>,
    /**
     * The style of the text.
     * Don't include colors as this style should only specify the `fontSize`, `fontWeight`, etc
     */
    textStyle?: StyleProp<TextStyle>,
    initialValue?:string,
    placeholder:string,
    isPassword?:boolean,
    prefix?:ReactNode,
    value?: string,
    error? : string | null,
    onChange?: (a: string) => void,
    inputMode?:InputModeOptions
}
export default function Input({style,initialValue,placeholder, onChange = ()=>{}, textStyle, prefix, value ,error, inputMode, isPassword}:InputProps) {
    const [show, setShow] = useState(false)
  return (
    <View style={{width: '100%', gap:1, flexDirection:'column', alignItems:'flex-start'}}>
        <View style={[
            {width:"100%", borderRadius:20, gap:12, alignItems:'center', justifyContent:'center', backgroundColor:Colors.background, paddingTop:8, paddingBottom:8, paddingHorizontal:20, flexDirection:'row'},
            style
            ]}>
            {prefix && <View style={{width:20, height: 20, overflow:'hidden'}}>
                {prefix}
                </View>}
            <TextInput value={value} onChangeText={onChange} placeholder={placeholder} secureTextEntry={!show && isPassword} placeholderTextColor={Colors.secondary} cursorColor={'#fff'} defaultValue={initialValue} inputMode={inputMode} style={[{flex: 1, backgroundColor:'transparent', fontSize:14 , color:'white'}, textStyle]} />
            {isPassword && <TouchableOpacity onPress={()=>setShow(!show)}>
                {show && <EyeSlash size={22} color={Colors.secondary} />}
                {!show && <Eye size={22} color={Colors.secondary} />}
            </TouchableOpacity>}
        </View>

        {error && <Text style={{color: 'red', fontWeight:'bold', fontSize:11, marginLeft: 5,}}>{`* ${error.toLowerCase().trim()}`}</Text>}
    </View>
  )
}