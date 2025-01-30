import { View, Text, Image } from 'react-native'
import React from 'react'
import { Chat } from '../../interfaces/Chat'
import { Member } from '../../interfaces/Member'
import CircleImage from '../images/CircleImage'
import { ExportSquare, PlayCircle, TickCircle } from 'iconsax-react-native'
import LottieView from 'lottie-react-native'
import { Colors } from '../../constants/Colors'
import {InView} from 'react-native-intersection-observer';

interface props{
    chat: Chat,
    channelColor?:string,
    markAsRead: ()=> void,
    sender?:Member,
    read?:boolean,
    isSender?:boolean,
    firstSender?:boolean,
    lastSender?:boolean,
    sameSender?:boolean,
    differentDay?:boolean,
    differentDayBelow?:boolean,
    lastMessageSent?:boolean,
}
export default function ChatItem(chatProps: props) {
    const {chat, markAsRead, channelColor, differentDay=false, differentDayBelow=false, firstSender=true, isSender=false, lastMessageSent=false, lastSender=false, read=false, sameSender=false, sender} = chatProps

    const currentTime = new Date();
    const isToday = ()=>{
        const a = new Date(chat.timestamp)

        const day1 = Math.floor(a.getTime() / (1000 * 60 * 60 * 24));
        const day2 = Math.floor(currentTime.getTime() / (1000 * 60 * 60 * 24));
        return day1 === day2;
    }

    const isYesterday = ()=>{
        const a = new Date(chat.timestamp)

        const day1 = Math.floor(a.getTime() / (1000 * 60 * 60 * 24));
        const day2 = Math.floor(currentTime.getTime() / (1000 * 60 * 60 * 24));
        return day2-day1 === 1;
    }

    const formatedText = ()=>{
        const date = new Date(chat.timestamp)
        const isSameYear = currentTime.getFullYear() === date.getFullYear();
        const options = { day: '2-digit', month: 'short', year: isSameYear? undefined : 'numeric' } as Intl.DateTimeFormatOptions;
        let formattedDate = date.toLocaleDateString('en-GB', options);

        return formattedDate;
    }

    const otherType = ()=>(
        <View className='w-full flex flex-col gap-2 items-center justify-center'>
            {chat.attachment && <Image className='rounded-circle w-[170px] h-[170px] border-[5px] border-tertiary object-cover' src={chat.attachment} alt='channel photo' />}
            <View  className='bg-background rounded-[15px] px-3 py-2'>
                <Text className='text-white select-none text-[11px] font-semibold text-center '>{chat.message}</Text>
            </View>
            
        </View>
    )

    const dateElement = ()=>(
        <View className='w-full flex items-center select-none justify-center'>
            <View className='bg-background rounded-[25px] px-4 py-2'>
                <Text className='text-white select-none text-[13px] font-semibold text-center'>
                    {isYesterday() && "Yesterday"}
                    {isToday() && "Today"}
                    {!isToday() && !isYesterday() && formatedText()}

                </Text>
            </View>
            
        </View>
    )

    const messageType = ()=>(
        <View className={`w-full flex flex-row items-center gap-2 ${isSender? 'justify-end':'justify-start'}`}>
            {!isSender && <View className='w-[30px] h-[30px] flex rounded-circle self-end overflow-hidden'>
                {(lastMessageSent || lastSender || differentDayBelow) && <CircleImage color={sender?.color} size={30} url={sender.profile} name={`${sender.firstName} ${sender.lastName}`} textSize={10} />}
                </View>}
            <View className={`${isSender? 'max-w-[62%] items-end' : 'max-w-[65%] items-start'} w-auto flex flex-col gap-[3px]`}>
                {chat.attachment && (
                    <View className='overflow-hidden max-h-[350px] rounded-[25px] relative w-full'>
                        {chat.attachmentType === 'video' && <View className='cursor-pointer w-full absolute z-[1] flex items-center justify-center h-full bg-[rgba(0,0,0,0.3)]'>
                            <PlayCircle variant='Bold' color='white' size={45} />
                            </View>}
                        {['image', 'video'].includes(chat.attachmentType) && <Image className='w-full select-none h-auto min-h-[200px] bg-tertiary max-h-[350px] object-cover' src={chat.thumbnail ?? chat.attachment} />}
                        {!['image', 'video'].includes(chat.attachmentType) && (
                            <View className='w-full bg-background bg-opacity-[0.03] cursor-pointer px-3 flex flex-row items-center justify-center'>
                                <LottieView autoPlay source={require('../../assets/animations/doc-purple.json')} loop style={{width:85, height:75}} />
                                <View className='flex flex-col justify-center  gap-1 select-none flex-1 text-secondary'>
                                    <Text numberOfLines={1} className='text-white font-semibold text-[13.5px]'>{chat.fileName}</Text>
                                    <View className="flex flex-row items-center justify-between gap-0">
                                        <Text numberOfLines={1} className='text-secondary text-[12px]'>{chat.fileName?.substring(chat.fileName.lastIndexOf('.')+1)} file</Text>
                                        <ExportSquare size={15} color={Colors.secondary} className='mr-2' />
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}
                {chat.message && (
                    <View className={`rounded-[20px] select-none w-auto py-2.5 px-4 flex flex-col items-center justify-center cursor-pointer`} style={{
                        backgroundColor: isSender? (channelColor??Colors.purple): Colors.background,
                        borderBottomRightRadius: !isSender? 20: firstSender || differentDay? 8:20,
                        borderTopRightRadius: !isSender? 20: ((lastSender || lastMessageSent) && !differentDay) && !firstSender? 8: differentDayBelow? 8 : 20,
                        borderBottomLeftRadius: isSender? 20: firstSender || differentDay? 8:20,
                        borderTopLeftRadius: isSender? 20: ((lastSender || lastMessageSent) && !differentDay) && !firstSender? 8: differentDayBelow? 8 : 20,

                    }}>
                        <Text className='text-white text-[13px] font-normal'>{chat.message}</Text>
                    </View>
                )}
                {(lastMessageSent || lastSender || differentDayBelow) && isSender && chat.readReceipt.length-1 !==0  && readReceipt()}
            </View>
        </View>
    )

    const readReceipt = ()=>(
        <View className='flex w-fit gap-2 mt-2 select-none flex-center'>
            <TickCircle size={15} variant={'Bold'} color='white' />
        </View>
    )
  return (
    <InView triggerOnce onChange={(inView)=>{if(inView && !read) markAsRead()}} className={`font-[RaleWay] w-full flex items-center mt-2 flex-col gap-5 justify-center`} style={{
        marginTop:differentDay || chat.messageType !== 'chat'? 20: sameSender? 3:firstSender? 25:3,
        marginBottom:chat.messageType !== 'chat'? 25:0
    }}>
        {differentDay && dateElement()}
        {chat.messageType !== 'chat' && otherType()}
        {chat.messageType === 'chat' && messageType()}
        
    </InView>
  )
}