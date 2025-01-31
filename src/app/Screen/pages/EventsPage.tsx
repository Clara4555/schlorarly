import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { eventsDummyData } from '../../data/events';

export default function EventsPage() {
  const events = eventsDummyData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            {/* Event Image */}
            <Image source={{ uri: event.eventPhoto }} style={styles.eventImage} />
            <View style={styles.eventDetails}>
              <View style={styles.titleContainer}>
                {/* Optional: Add a small icon or image next to the event title */}
                <Image source={{ uri: event.eventPhoto }} style={styles.icon} />
                <Text style={styles.title}>{event.eventTitle}</Text>
              </View>
              <Text style={styles.details}>{event.eventDescription}</Text>
              <Text style={styles.eventDate}>
                {new Date(event.designatedTime).toLocaleString()}
              </Text>
            </View>
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
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 25,
    marginTop: 50, // Added marginTop to push the header down
    textAlign: 'center',
  },
  scrollView: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#1E1E1E', // Card background
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden', // Rounded corners for the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  eventDetails: {
    padding: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  details: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 12,
    color: '#999',
  },
});
