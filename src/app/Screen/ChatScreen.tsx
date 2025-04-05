import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, ActivityIndicator, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { ScreenProps } from '../../../navigation';
import CircleImage from '../assets/images/CircleImage';
import { useChannel } from '../components/channels/ChannelsProvider';
import { ArrowDown2, ArrowLeft, Call, ChartCircle, CloseCircle, DocumentText, Image as ImageIIcon, MusicPlay, Paperclip, PlayCircle, Send, VideoPlay } from 'iconsax-react-native';
import { StatusBar } from 'react-native';
import { useStudent } from '../components/students/StudentProvider';
import { TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { useMutation } from '@tanstack/react-query';
import { delay } from '../utils/delay';
import { useChats } from '../components/chats/ChatsProvider';
import ChatItem from '../components/chats/ChatItem';
import { Member } from '../interfaces/Member';
import { AttachmentType, Chat } from '../interfaces/Chat';
import { Channel } from '../interfaces/Channel';
import { useStompClient } from '../context/StompClientContext';
import { markChatAsRead, sendAttachment, sendChat } from '../api/ChatApi';
import Toast from 'react-native-toast-message';
import {BottomSheet} from '../components/modals/BottomSheet';
import * as DocumentPicker from 'expo-document-picker';
import BottomSheetRefType from '../components/modals/BottomSheetRefType';
import LottieView from 'lottie-react-native';

const ChatScreen = (props: ScreenProps<'Chats'>) => {
  const { top } = useSafeAreaInsets();
  const {navigation, route} = props;
  const {channelId} = route.params;

  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
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
    if(listRef.current){
      listRef.current.scrollToEnd({animated:false});
    }
  }, [listRef.current])

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

  const uriToFile = async (uri: string, name: string, mimeType: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };
  


  const sendMessageMutation = useMutation({
    mutationFn: async()=>{
      const chat  = {message: text.trim() === ''? null:text, senderId:student.id} as Chat;

      if(file){
        chat.attachmentType = fileTypes().toLowerCase() as AttachmentType;
      }

      console.log(chat);

      const _file = file?await uriToFile(file.uri, file.name, file.mimeType):null;

      const send = await (file? sendAttachment(channelId.toString(), _file, chat, null) : sendChat(channelId.toString(), chat));

      if(send.status === 200){
        return send.data;
      }

      console.error(send.data);

      throw new Error(send.data.message);
    },
    onSuccess: ()=>{
      setFile(null)
      setThumbnailBlob(null)
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

  const markChat = (chat: Chat)=>{

    const readChat = {
      ...chat,
      readReceipt: [...chat.readReceipt, student.id]
    } as Chat;
    const readChannel = {
      ...channel,
      latestMessage: readChat,
      unreadMessages:0,
    } as Channel

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

  const fileTypes = (selectType?: AttachmentType)=> {

    if(!selectType && file){
      if(file.mimeType?.startsWith("*")){
        return 'Document';
      }

      const type = file.mimeType?.substring(0, file.mimeType?.indexOf("/"));

      return type.charAt(0).toUpperCase() + type.substring(1);
    }

    if(selectType === 'document'){
      return '*/*';
    }

    return `${selectType}/*`;
  }

  const getFileSize = ()=>{
    if(!file) return "";

    const size = file.size;

    const mb = size >= (1024 * 1024);

    const mbString = `${(size / (1024 * 1024)).toFixed(0)}MB`;
    const kbString = `${(size / (1024)).toFixed(0)}KB`;

    return mb ? mbString : kbString;
  }

  const pickFile = async (type: AttachmentType)=>{
    const result = await DocumentPicker.getDocumentAsync({
      type:fileTypes(type),
      multiple:false
    });

    bottomSheetRef?.current.close();

    if(result.canceled || (result.assets ?? []).length === 0){
      return;
    }

    const _file = result.assets[0];
    setFile(_file);
  }



  return (
    <View className='w-full flex-1 flex-col bg-background'>
      <StatusBar translucent barStyle='light-content' backgroundColor={'transparent'}  />
      {/* Header */}
      <View style={{marginTop: top}} className='w-full px-8 py-4 flex-row flex-center gap-4'>
        <ArrowLeft onPress={navigation.goBack} color='#fff' />
        <CircleImage size={47} textSize='14' color={channel.color} name={channel.channelName} url={channel.channelProfile} />
        <View className='flex-1 ml-2 justify-center'>
          <Text numberOfLines={1} className='text-white text-[16px] font-semibold'>{channel.channelName}</Text>
          <Text numberOfLines={1} className='text-white font-thin text-[12px]'>{channel.members.length} member{channel.members.length !=1 && 's'}</Text>
        </View>
        <Call
          variant='Bold'
          color='white'
          size={25} 
        />
      </View>

      {/* Body */}
      <View className='w-full flex-1 bg-black relative overflow-hidden'>
        <FlatList<Chat>
          ref={listRef}
          data={chats}
          className='px-7'
          onScroll={handleScroll}
          keyExtractor={(_, index)=>index.toString()}
          scrollEventThrottle={16}
          ListFooterComponent={()=><View style={{width:'100%', height:30}} />}
          renderItem={({index, item:chat})=>{
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

            

            

            if(!isSender && !chat.readReceipt.includes(student?.id ?? "")){
              console.log("Marking Chat As Read");
              markChat(chat);
            }


            return <ChatItem
              key={chat.id}
              chat={chat}
              read={isSender || chat.readReceipt.includes(student?.id ?? ' ')}
              // markAsRead={markChat}
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
        {file && (<View className={`flex flex-row w-full min-h-0 items-center rounded-t-[18px] overflow-hidden rounded-b-[5px] rounded-bl-[18px] bg-black border-[5px] mb-1 border-background sticky ${file? 'h-[120px] opacity-100 bottom-0 pointer-events-auto':'h-0 opacity-0 -bottom-3 pointer-events-none'} transition-all duration-500 ease`}>
          <View className='w-2 h-full bg-purple'/>
          <View className={`w-[100px] ${file.mimeType.startsWith('*')? 'bg-transparent':'bg-background'} h-full items-center justify-center flex flex-row mr-3 relative`}>
            {file.mimeType.startsWith('video') && <View className='w-full h-full bg-black absolute select-none items-center justify-center flex z-[1] bg-opacity-30'>
              <PlayCircle variant='Bold' size={25} />
            </View>}
            {!file.mimeType.startsWith('*') && <Image resizeMode='cover' src={file.uri} className='w-full h-full object-cover' />}
            {file.mimeType.startsWith('*') && <LottieView source={require('../assets/animations/doc-purple.json')} loop style={{width:'100%', height:'100%'}} />}
          </View>
          <View className='flex gap-1 flex-1 justify-center '>
            <Text numberOfLines={1} className='text-white text-[13px] font-semibold whitespace-nowrap text-ellipsis'>{file?.name}</Text>
            <Text className='text-[10px] text-secondary' >{fileTypes()}</Text>
            <Text className='text-[10px] text-blue font-medium '>{getFileSize()}</Text>
          </View>
          <CloseCircle disabled={sendMessageMutation.isPending} color='#fff' onPress={()=>{
            setFile(null)
            setImageSrc('');
            setThumbnailBlob(null);
          }} style={{marginHorizontal:16}} className='text-white mr-7 cursor-pointer relative' size={28} variant='Bold'
          />
        </View>)}

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
          <View className='flex flex-col gap-4 pt-2 pb-4'>

            <Text className='color-white font-semibold self-center text-[16px]'>What would you like to upload?</Text>


            <View className='w-[70%] self-center my-4 flex flex-row flex-wrap'>

              {/* Image Option */}
              <TouchableOpacity onPress={()=>pickFile('image')} className='items-center w-[50%] gap-2'>
                <View className='w-[50px] h-[50px] flex flex-center bg-blue rounded-circle'>
                  <ImageIIcon color='#fff' size={20} variant='Bold'  /> 
                </View>
                
                <Text className='text-white text-[11px]'>Image</Text>
              </TouchableOpacity>

              {/* Video Option */}
              <TouchableOpacity onPress={()=>pickFile('video')} className='items-center w-[50%] gap-2'>
                <View className='w-[50px] h-[50px] flex flex-center bg-red-600 rounded-circle'>
                  <VideoPlay color='#fff' size={20} variant='Bold'  /> 
                </View>
                
                <Text className='text-white text-[11px]'>Video</Text>
              </TouchableOpacity>

              {/* Audio Option */}
              <View className='items-center w-[50%] mt-6 gap-2'>
                <View className='w-[50px] h-[50px] flex flex-center bg-purple rounded-circle'>
                  <MusicPlay color='#fff' size={20} variant='Bold'  /> 
                </View>
                
                <Text className='text-white text-[11px]'>Audio</Text>
              </View>

              {/* Doc Option */}
              <View className='items-center w-[50%] mt-6 gap-2'>
                <View className='w-[50px] h-[50px] flex flex-center bg-green-700 rounded-circle'>
                  <DocumentText color='#fff' size={20} variant='Bold'  /> 
                </View>
                
                <Text className='text-white text-[11px]'>Doc</Text>
              </View>

            </View>


          </View>

      </BottomSheet>

    </View>
  );
};

export default ChatScreen;
