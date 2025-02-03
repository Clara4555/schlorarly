import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker, { ItemType, ValueType } from 'react-native-dropdown-picker'
import { Colors } from '../../constants/Colors'
import { TickCircle } from 'iconsax-react-native'

type props = {
    options: (ItemType<ValueType> | string)[],
    value: string | null,
    error?: string,
    placeholder: string,
    onSelectItem: (e:string) => void,
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>,
}


export default function Dropdown(props: props) {
    const {options, value, placeholder, style, textStyle, error, onSelectItem} = props
    const [open, setOpen] = useState(false);
    const items = options.map(option => (typeof option === 'string'? {label: option.charAt(0).toUpperCase().concat(option.substring(1).toLowerCase()), value:option} : option));
    const item = items.findLast(option => option.value?.toString() === value)
  return (
    <View style={{width: '100%', gap:1, flexDirection:'column', alignItems:'flex-start'}}>
      <DropDownPicker
        items={items}
        value={item?.value}
        onSelectItem={(item)=>{onSelectItem(item.value.toString())}}
        placeholder={placeholder}
        multiple={false}
        setValue={()=>{}}
        setItems={()=>{}}
        setOpen={setOpen}
        open={open}
        placeholderStyle={[
            {color:Colors.secondary},
            textStyle
        ]}
        style={[
            {
                width:"100%",
                borderRadius:20,
                gap:12,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:Colors.background,
                paddingTop:16,
                paddingBottom:16,
                paddingHorizontal:20,
            },
            style
        ]}
        closeAfterSelecting
        dropDownContainerStyle={{
            backgroundColor:Colors.background,
        }}
        modalAnimationType='slide'
        theme={'DARK'}
        textStyle={[
            {color:'#fff'},
            textStyle
        ]}
        TickIconComponent={(props)=> <TickCircle {...props} color='#fff' variant='Bold' size={17} />}
        selectedItemLabelStyle={[
            {color: '#fff'},
            textStyle
        ]}
        listItemLabelStyle={[
            {color: Colors.secondary},
            textStyle
        ]}       
      />
      {error && <Text style={{color: 'red', fontWeight:'bold', fontSize:11, marginLeft: 5,}}>{`* ${error.toLowerCase().trim()}`}</Text>}
    </View>
  )
}