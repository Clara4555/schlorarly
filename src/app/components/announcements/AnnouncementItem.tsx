import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Key } from 'react'
import { Announcement } from '../../interfaces/Announcement'
import { Image } from 'react-native'
import { ScreenProps } from '../../../../navigation'

interface props extends ScreenProps<'Home'>{
    announcement: Announcement,
}
export default function AnnouncementItem({announcement, navigation, route}:props) {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Announcement', {announcementId: announcement.id})} style={styles.announcementCard}>
       {announcement.announcementPhoto && (
            <Image source={{ uri: announcement.announcementPhoto }} style={styles.announcementImage} />
        )}
        <Text style={styles.title}>{announcement.announcementTitle}</Text>
        <Text style={styles.details}>{announcement.announcementDescription}</Text>
        <Text style={styles.date}>{new Date(announcement.createdTime).toDateString()}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    announcementCard: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      },
      announcementImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#34495E',
        marginBottom: 5,
      },
      details: {
        fontSize: 14,
        color: 'white',
        marginBottom: 10,
      },
      date: {
        fontSize: 12,
        color: '#95A5A6',
        textAlign: 'right',
      },
})