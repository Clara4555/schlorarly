import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useReducer, useState } from 'react'
import { ScreenProps } from '../../../navigation'
import { Colors } from '../constants/Colors';
import Input from '../components/input/Input';
import Button from '../components/buttons/Button';
import { ArrowLeft } from 'iconsax-react-native';
import Dropdown from '../components/input/Dropdown';
import { useMutation } from '@tanstack/react-query';
import { delay } from '../utils/delay';
import { createChannel } from '../api/ChannelApi';
import Toast from 'react-native-toast-message';
import { useStudent } from '../components/students/StudentProvider';

type ReducerState = {
    channelName: string,
    channelDescription: string,
    channelType: 'announcement' | 'project' | 'qa' | null
}

type ReducerAction = {
    type: keyof ReducerState,
    value: string,
}

const reducer = (state: ReducerState, action: ReducerAction): ReducerState =>{
    if(action.type === 'channelType'){

        return {...state, channelType: action.value as 'announcement' | 'project' | 'qa'};
    }
    let result =  {...state};
    result[action.type] = action.value;
    return result;
}

export default function CreateChannelScreen(props: ScreenProps<'CreateChannel'>) {
    const {navigation, route} = props;

    const [error, setError] = useState('');

    const {student} = useStudent();

    const [{channelDescription, channelName, channelType}, dispatch] = useReducer(reducer, {channelName:'', channelDescription:'', channelType:null})

    const createChannelMutation = useMutation({
        mutationFn: async()=>{
            setError('');

            if(channelName.length === 0){
                setError("Channel Name is empty");
                return;
            }

            if(channelDescription.length === 0){
                setError("Channel Description is empty");
                return;
            }

            if(!channelType || channelType.length === 0){
                setError("Channel Role is empty");
                return;
            }


            console.log("Creating Channel")
            await delay(2000)
            const {data, status} = await createChannel({channelDescription, channelName, channelType}, student.id);

            if(status === 200){
                return data;
            }

            throw new Error(data.message)
        },
        onSuccess: async ({data, message})=>{
            Toast.show({text1:'Created Channel', text2:message, type:'success'});
            await delay(2000)
            navigation.goBack();
        },
        onError: async ({message})=>{
            if(message.includes('undefined')){
                return;
            }
            Toast.show({text1:'Error', text2:message, type:'error'})
        }
    })
    
  return (
    <View style={{flex:1, width:'100%', paddingHorizontal:25, paddingTop:50, gap:15}}>
        <ArrowLeft onPress={navigation.goBack} size={30} color='#fff' />
        <Text style={{color:'white', fontSize:23, fontWeight:'800'}}>Create Channel</Text>
        <Text style={{color:Colors.secondary, fontSize:13.5, fontWeight:'300', lineHeight:22}}>{"Please fill in the details below to create a channel. \nYou'll have to fill in the channel's name, description and type."}</Text>

        <Input error={error.toLowerCase().includes('name') && error} value={channelName} onChange={(value)=>dispatch({type:'channelName', value})} placeholder='Channel Name' style={{marginTop:20, marginBottom:5}} textStyle={{fontWeight:'300', fontSize:12}} />

        <Input error={error.toLowerCase().includes('description') && error} value={channelDescription} onChange={(value)=>dispatch({type:'channelDescription', value})} placeholder='Channel Description' style={{marginBottom:5}} textStyle={{fontWeight:'300', fontSize:12}} />

        <Dropdown error={error.toLowerCase().includes('role') && error} value={channelType} options={['announcement', 'project', {label:'Q/A', value:'q/a'}]} placeholder='Channel Role' onSelectItem={(value)=>dispatch({type:'channelType', value})} textStyle={{fontWeight:'300', fontSize:12}} />
        <Text style={[{marginTop:-5},styles.descriptionText]}>* Whether the channel is a project, announcement or Q/A channel</Text>

        <Button onClick={createChannelMutation.mutate} loading={createChannelMutation.isPending} style={{borderRadius:20, marginTop:20}} title='Create' />
    </View>
  )
}

const styles = StyleSheet.create({
    descriptionText: {
        color:Colors.secondary,
        fontWeight:'300',
        fontSize:12,
        alignContent:'center',
        verticalAlign:'middle',
        textAlignVertical:'center',
        textAlign:'left',
        position:'relative',
        alignItems:'center',
        justifyContent: 'center'
    }
})