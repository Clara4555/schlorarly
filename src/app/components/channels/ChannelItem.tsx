import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScreenProps } from '../../../../navigation'
import { Channel } from '../../interfaces/Channel'
import CircleImage from '../../assets/images/CircleImage';

interface props extends ScreenProps<'Home'>{
    channel: Channel,

}

export default function ChannelItem(props: props) {
    const {channel, navigation, route} = props;
  return (
    <TouchableOpacity 
        className='flex flex-row w-full gap-5 py-4 items-center'
        onPress={()=>navigation.push('Chats', {channelId: channel.id})}>
        <>
            <CircleImage color={channel.color} name={channel.channelName} textSize={"15"} url={channel.channelProfile} className='w-[45px] h-[45px]' />
            <View className='flex-col flex-1 justify-center gap-1'>
                <Text className='text-white font-semibold text-[15px]'>{channel.channelName}</Text>
                <Text numberOfLines={1} className='text-secondary text-[11px] font-light'>{channel.latestMessage.message ?? "bleh"}</Text>
            </View>
            {channel.unreadMessages > 0 && <View className='min-w-7 h-7 bg-purple text-white rounded-circle flex-center'>
                <Text className='text-white font-medium text-[12px] text-center'>{channel.unreadMessages}</Text>
            </View>}
        </>
    </TouchableOpacity>
  )
}