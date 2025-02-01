import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, StatusBar, FlatList } from 'react-native';
import { announcementDummyData } from '../../data/announcements';
import AnnouncementItem from '../../components/announcements/AnnouncementItem';
import BottomBarSpace from '../../components/BottomBarSpace';
import LottieView from 'lottie-react-native';
import { ScreenProps } from '../../../../navigation';
import { useAnnouncements } from '../../components/announcements/AnnouncementsProvider';

export default function AnnouncementPage({navigation, route}: ScreenProps<'Home'>) {
  const {announcements} = useAnnouncements();

  const EmptyLayout = ()=>(
      <>
        <LottieView
            source={require('../../assets/animations/add-chat.json')}
            loop
            style={{width:'55%', aspectRatio:1}}
            autoPlay
          />
        <Text style={{color:'white', textAlign:'center', lineHeight:24}}>{"No announcements yet"}</Text>
      </>
  )
  
  const AnnouncementsList = ()=>(
    <FlatList
      className='w-full pt-4'
      data={announcements}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical
      keyExtractor={(announcement, index) => index.toString()}
      ListFooterComponent={BottomBarSpace}
      ItemSeparatorComponent={()=><View className='w-full h-[1px] bg-secondary opacity-20' />}
      renderItem={({item: announcement})=>(
        <AnnouncementItem announcement={announcement} navigation={navigation} route={route}  />
      )}
    />
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
      <Text style={styles.header}>Announcements</Text>
      
       <View style={{width:'100%', flex:1, alignItems:'center', justifyContent:'center', gap:20}}>
          {announcements.length <=0 && <EmptyLayout />}
          {announcements.length > 0 && <AnnouncementsList />}
        </View>

      {/* Bottom Bar Size */}
      {announcements.length <=0 && <BottomBarSpace />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    paddingTop:50,
    paddingHorizontal:25,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 23, // Keep the margin for spacing below the header
    color: '#ffffff',
    // textShadowColor: '#000',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 5,
  },
  scrollView: {
    paddingBottom: 20,
  },
  
});
