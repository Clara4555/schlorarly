import { View, Text } from 'react-native'
import React from 'react'
import { ScreenProps } from '../../../navigation'

export default function AnnouncementScreen(props: ScreenProps<'Announcement'>) {
    const {navigation, route} = props
    const announcementId = route.params.announcementId;

    

  return (
    <View>
      <Text>AnnouncementScreen</Text>
    </View>
  )
}