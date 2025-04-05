import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import LottieView from 'lottie-react-native';

const HighlightsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const highlights = [
    {
      id: '1',
      title: 'Annual Hackathon Is Here !!!',
      description: "NIIT's annual hackathon challenge is here. Grab your bags, buckle up seatbelts and w...",
      date: '30th Apr, 2025 - 8:00 AM',
      type: 'Event',
      image: require('../../assets/images/hackaton.png'),
    },
    {
      id: '2',
      title: 'New Course Added',
      description: 'We’re pleased to announce the creation of a new course: Express JS.',
      date: '30th Apr, 2025 - 8:00 AM',
      type: 'Announcement',
      image: require('../../assets/images/course.png'),
    },
    {
      id: '3',
      title: 'Project Submission Deadline Postponed.',
      description: 'We’re pleased to announce the extension of the project submission deadline.',
      date: '30th Apr, 2025 - 8:00 AM',
      type: 'Announcement',
      image: require('../../assets/images/deadline.png'),
    },
  ];

  // Filter highlights based on active tab
  const filteredHighlights = activeTab === 'All' ? highlights : highlights.filter(h => h.type === activeTab);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Highlights</Text>
        <Image source={require('../../assets/mynft.jpg')} style={styles.profileImage} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="Search for event" placeholderTextColor="gray" style={styles.input} />
      </View>

      {/* Tab Selection */}
      <View style={styles.tabs}>
        {['All', 'Events', 'Announcements'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

    {/* Highlights List */}
{filteredHighlights.length === 0 ? (
  <View style={styles.emptyContainer}>
    <LottieView
      source={require('../../assets/animations/not-available.json')} 
      autoPlay
      loop
      style={styles.animation}
    />
    <Text style={styles.emptyText}>No {activeTab === 'Events' ? 'Events' : 'Announcements'} Available</Text>
  </View>
) : (
  <FlatList
    data={filteredHighlights}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardDate}>{item.date}</Text>
          <View style={[styles.tag, item.type === 'Event' ? styles.eventTag : styles.announcementTag]}>
            <Text style={styles.tagText}>{item.type}</Text>
          </View>
        </View>
      </View>
    )}
  />
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.white,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#252525',
  },
  activeTab: {
    backgroundColor: Colors.purple,
  },
  tabText: {
    color: 'gray',
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.white,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 6,
  },
  cardDate: {
    color: Colors.white,
    fontSize: 12,
    marginBottom: 6,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  eventTag: {
    backgroundColor: Colors.purple,
  },
  announcementTag: {
    backgroundColor: Colors.orange,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 50,
  },
  animation: {
    width: 150,
    height: 150,
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
  },
  
  tagText: {
    color: Colors.white,
    fontSize: 12,
  },
});

export default HighlightsPage;
