import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function EventsPage() {
  const announcements = [
    { id: 1, title: 'System Update', details: 'The system will undergo maintenance on Feb 1, 2025.' },
    { id: 2, title: 'New Feature', details: 'We are excited to introduce dark mode starting next week!' },
    { id: 3, title: 'Holiday Notice', details: 'Our offices will be closed on Jan 30, 2025, for a public holiday.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {announcements.map((announcement) => (
          <View key={announcement.id} style={styles.announcementCard}>
            <Text style={styles.title}>{announcement.title}</Text>
            <Text style={styles.details}>{announcement.details}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  announcementCard: {
    backgroundColor: '#1E1E1E', // Card background color
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: '#F5F5F5',
    fontWeight: '600',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#B3B3B3',
  },
});