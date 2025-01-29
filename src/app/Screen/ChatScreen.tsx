import React, { useEffect, useRef, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, Platform, ActivityIndicator, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';  
import { Image } from 'expo-image';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { ScreenProps } from '../../../navigation';
import CircleImage from '../components/images/CircleImage';
import { useChannel } from '../components/channels/ChannelsProvider';
import { ArrowDown2, Call, ChartCircle, Paperclip, Send } from 'iconsax-react-native';
import { StatusBar } from 'react-native';
import { useStudent } from '../components/students/StudentProvider';
import { TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { useMutation } from '@tanstack/react-query';
import { delay } from '../utils/delay';
import { useChats } from '../components/chats/ChatsProvider';
import ChatItem from '../components/chats/ChatItem';
import { Member } from '../interfaces/Member';
import { Chat } from '../interfaces/Chat';
import { Channel } from '../interfaces/Channel';
import { useStompClient } from '../context/StompClientContext';
import { markChatAsRead, sendChat } from '../api/ChatApi';
import Toast from 'react-native-toast-message';
import {BottomSheet} from '../components/modals/BottomSheet';
import BottomSheetRefType from '../components/modals/BottomSheetRefType';

const ChatScreen = (props: ScreenProps<'Chats'>) => {
  const { top } = useSafeAreaInsets();
  const {navigation, route} = props;
  const {channelId} = route.params;

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [canScroll, setCanScroll] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null);

  const listRef = useRef<FlatList>(null)
  const bottomSheetRef = useRef<BottomSheetRefType<string>>(null);

  const channel = useChannel(channelId ?? '');
  const {publish} = useStompClient();
  const {student} = useStudent();
  const {chats} = useChats();

  useEffect(()=>{
    console.log("Chats Length is", chats.length);
    

    if(!listRef.current) return;

    if(!canScroll) return;

    listRef.current.scrollToEnd({animated:true});

  }, [chats, canScroll])

  
  const handleScroll =(event: NativeSyntheticEvent<NativeScrollEvent>)=>{
    if(!listRef.current) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Calculate the distance from the bottom
    const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);

    // Update the state based on proximity to the bottom (e.g., within 50px)
    setCanScroll(distanceFromBottom < 50);

  }


  const sendMessageMutation = useMutation({
    mutationFn: async()=>{
      const chat  = {message: text.trim() === ''? null:text, senderId:student.id} as Chat;

      // if(file){
      //   chat.attachmentType = selectType;
      // }

      console.log(chat);

      const send = await sendChat(channelId.toString(), chat);

      if(send.status === 200){
        return send.data;
      }

      console.error(send.data);

      throw new Error(send.data.message);
    },
    onSuccess: ()=>{
      setText('');
    },
    onError: ({message})=>{
      Toast.show({
        type:'error',
        text1:"Failed to send",
        text2: message ?? "An unknown error occurred"
      })
    }
  })



  return (
    <View className='w-full flex-1 flex-col bg-background'>
      <StatusBar translucent barStyle='light-content' backgroundColor={'transparent'}  />
      {/* Header */}
      <View style={{marginTop: top}} className='w-full px-8 py-4 flex-row flex-center gap-4'>
        <CircleImage size={47} textSize='14' color={channel.color} name={channel.channelName} url={channel.channelProfile} />
        <View className='flex-1 ml-2 justify-center'>
          <Text className='text-white text-[16px] font-semibold'>{channel.channelName}</Text>
          <Text className='text-white font-thin text-[12px]'>{channel.members.length} member{channel.members.length !=1 && 's'}</Text>
        </View>
        <Call
          variant='Bold'
          color='white'
          size={25} 
        />
      </View>

      {/* Body */}
      <View className='w-full flex-1 bg-black relative overflow-hidden'>
        <FlatList
          ref={listRef}
          data={chats}
          className='px-7'
          onScroll={handleScroll}
          keyExtractor={(_, index)=>index.toString()}
          scrollEventThrottle={16}
          ListFooterComponent={()=><View style={{width:'100%', height:30}} />}
          renderItem={({item:chat, index})=>{
            const isFirstMessage = index === 0;
            const isLastMessage = index === chats.length-1;
            const isSender = chat.senderId === student.id;
            // const readImages = (channel!.members as Member[]).filter(member=> chat.readReceipt.includes(member.id) && member.id !== student.id).map(member => member.profile ?? {fullName: `${member.firstName} ${member.lastName}`, color: member.color ?? 'green'});
            const sender = channel!.members.find(member => member.id === chat.senderId);
            let sameSender = false;
            let firstTimeSender = false;
            let lastTimeSender = false;
            let differentDay = true;
            let differentDayBelow = false;

            const areSameDay = (date1:string, date2:string)=>{
              const a = new Date(date1);
              const b = new Date(date2);

              const day1 = Math.floor(a.getTime() / (1000 * 60 * 60 * 24));
              const day2 = Math.floor(b.getTime() / (1000 * 60 * 60 * 24));
              return day1 !== day2;
            }

            if(!isFirstMessage && !isLastMessage){
              sameSender = chat.senderId === chats[index-1].senderId;
              differentDayBelow = areSameDay(chats[index+1].timestamp, chat.timestamp);
            }

            if(!isFirstMessage){
              firstTimeSender = chat.senderId !== chats[index-1].senderId || chat.messageType !== chats[index-1].messageType;
              differentDay = areSameDay(chats[index-1].timestamp, chat.timestamp);
            }

            if(!isLastMessage){
              lastTimeSender = chat.senderId !== chats[index+1].senderId
            }
            else if(!isFirstMessage){
              lastTimeSender = chat.senderId !== chats[index-1].senderId
            }

            const readChat = {
              ...chat,
              readReceipt: [...chat.readReceipt, student.id]
            } as Chat;
            const readChannel = {
              ...channel,
              latestMessage: readChat,
              unreadMessages:0,
            } as Channel

            const markChat = ()=>{

              // We send to the user's chat & channel websocket that he's read the chat
              publish(`/chats/${channelId}`,JSON.stringify({
                message:'Chat Marked As Read',
                data: readChat
              }))
              
              publish(`/channels/${student?.id}`, JSON.stringify({
                  message:"Chat Marked As Read",
                  data: readChannel
              }))


              markChatAsRead(channelId?.toString(),chat.id, student.id )
            }


            return <ChatItem
              key={chat.id}
              chat={chat}
              read={chat.readReceipt.includes(student?.id ?? '')}
              markAsRead={markChat}
              channelColor={channel?.color}
              sender={sender}
              differentDay={differentDay}
              differentDayBelow={differentDayBelow}
              isSender={isSender}
              firstSender={firstTimeSender}
              lastMessageSent={isLastMessage}
              lastSender={lastTimeSender}
              sameSender={sameSender}
              />
          }}
        />

        {/* Icon That appears when it's time to scroll */}
      <TouchableOpacity
          onPress={()=>listRef.current?.scrollToEnd({animated:true})}
          className={`absolute left-[50%] z-[5] w-12 h-12 flex items-center justify-center rounded-circle bg-purple hover:bg-background transition-all ease-in-out duration-1000 ${canScroll? 'opacity-20 -bottom-11' :'opacity-100 bottom-7'}`}>
          <ArrowDown2 size={28} color='white' variant='Bold' />
      </TouchableOpacity>

      </View>

      {/* Footer */}
      <View className={`w-full flex flex-col ${file?'bg-black': 'bg-transparent'} rounded-b-[18px] relative items-center justify-center overflow-hidden`}>
        {/* Attachment Section */}
        <View>
          

        </View>
        {/* Input and Buttons Section */}
        <View className={`w-full px-8 py-4 bg-background flex gap-7 z-[2] flex-row ${file?'': 'pt-[8px]'} flex-center relative overflow-hidden`}>
          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor={Colors.secondary}
            multiline
            value={text}
            onChangeText={_text => setText(_text)}
            numberOfLines={7}
            cursorColor={'white'}
            readOnly={sendMessageMutation.isPending}
            className='flex-1 select-text bg-transparent text-white text-[13px]'
          />

          {text.trim().length <=0 && !file && <TouchableOpacity onPress={()=>bottomSheetRef.current?.open()}>
            <Paperclip size={28} color={Colors.secondary} />
          </TouchableOpacity>}

          {(text.trim().length > 0 || file) && <View className={`text-purple cursor-pointer transition-all ease duration-500 flex items-center justify-center w-[28px] opacity-100`}>
            {!sendMessageMutation.isPending && <Send color={Colors.purple} onPress={()=>sendMessageMutation.mutate()} variant='Bold' size={28} />}
            {sendMessageMutation.isPending && <ActivityIndicator color={'white'} size={28} />}
          </View>}

        </View>

      </View>

      <BottomSheet
        ref={bottomSheetRef}
        contentBackground={Colors.background}

        >
          <View className='flex flex-col'>
            <Text className='color-white font-semibold text-[16px]'>What would you like to upload</Text>

          </View>

        </BottomSheet>

    </View>
  );
};

export default ChatScreen;
