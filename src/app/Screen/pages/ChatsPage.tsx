import { View, Text, Image, ScrollView, StyleSheet, StatusBar, TouchableHighlight, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useChannels } from '../../components/channels/ChannelsProvider'
import CircleImage from '../../components/images/CircleImage';
import { useStudent } from '../../components/students/StudentProvider';
import Input from '../../components/input/Input';
import LottieView from 'lottie-react-native';
import { Colors } from '../../constants/Colors';
import { Add } from 'iconsax-react-native';
import Fab from '../../components/buttons/Fab';
import { ScreenProps } from '../../../../navigation';
import ChannelItem from '../../components/channels/ChannelItem';
import BottomBarSpace from '../../components/BottomBarSpace';

export default function ChatsPage(props: ScreenProps<'Home'>) {
  const {navigation, route} = props;
  const {student} = useStudent();
  const {channels} = useChannels();

  

  const SearchBar = ()=>{
    return (
      <Input 
        placeholder={'Search'}
        style={{paddingTop:5, marginTop:20, paddingBottom:5, borderRadius:13, backgroundColor:'rgba(255, 255, 255, 0.2)'}}
        inputMode='text'
      />
    )
  }

  const EmptyLayout = ()=>(
    <>
      <LottieView
          source={require('../../assets/animations/add-chat.json')}
          loop
          style={{width:'55%', aspectRatio:1}}
          autoPlay
        />
      <Text style={{color:'white', textAlign:'center', lineHeight:24}}>{"You are not in any channel.\nCreate One"}</Text>
    </>
  )

  const ChannelsList = ()=>(
    <FlatList
      className='w-full pt-4'
      data={channels}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical
      keyExtractor={(channel, index) => index.toString()}
      ListFooterComponent={BottomBarSpace}
      ItemSeparatorComponent={()=><View className='w-full h-[1px] bg-secondary opacity-20' />}
      renderItem={(channel)=>(
        <ChannelItem channel={channel.item} navigation={navigation} route={route} />
      )}
    />
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
      {/* Header Containing Title, Icons and Profile Icon */}
      <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <Text style={{color:'white', fontSize:23, fontWeight:'800'}}>Your Chats</Text>

        <CircleImage color={student.color} name={student.fullName?? `${student.firstName} ${student.lastName}`} url={student.profile} style={{width:40, height:40}} />
      </View>

      <SearchBar />

      <View style={{width:'100%', flex:1, alignItems:'center', justifyContent:'center', gap:20}}>
        {channels.length <=0 && <EmptyLayout />}
        {channels.length > 0 && <ChannelsList />}
      </View>

      {/* Fab  */}
      <Fab onPress={()=>navigation.push('CreateChannel')}>
        <Add size={22} color='#fff' />
      </Fab>


      {/* Bottom Bar Size */}
      {channels.length <=0 && <BottomBarSpace />}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    minHeight:'100%',
    paddingHorizontal:25,
    paddingTop:50,
    gap:13,
    alignItems:'center',
  }
  

});