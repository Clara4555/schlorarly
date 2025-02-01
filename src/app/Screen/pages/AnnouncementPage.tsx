import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { announcementDummyData } from '../../data/announcements';

export default function AnnouncementPage() {
  const announcements = announcementDummyData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {announcements.map((announcement) => (
          <View key={announcement.id} style={styles.announcementCard}>
            {announcement.announcementPhoto && (
              <Image source={{ uri: announcement.announcementPhoto }} style={styles.announcementImage} />
            )}
            <Text style={styles.title}>{announcement.announcementTitle}</Text>
            <Text style={styles.details}>{announcement.announcementDescription}</Text>
            <Text style={styles.date}>{new Date(announcement.createdTime).toDateString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30, // Keep the margin for spacing below the header
    marginTop: 50, // Added marginTop to push the header down
    color: '#ffffff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
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
});
