import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Colors } from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const SchedulePage = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Schedule</Text>
        <Image 
         source={require('../../assets/mynft.jpg')}  // Replace with real image URL
          style={styles.profileImage}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="Search your schedule" placeholderTextColor="gray" style={styles.input} />
      </View>

      {/* Calendar */}
      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: Colors.black,
          textSectionTitleColor: Colors.white,
          monthTextColor: Colors.white,
          dayTextColor: Colors.white,
          selectedDayBackgroundColor: Colors.purple,
          selectedDayTextColor: Colors.white,
          todayTextColor: Colors.purple,
          arrowColor: Colors.white,
        }}
        markedDates={{
          '2024-04-04': { selected: true, selectedColor: Colors.purple }, // Example selected date
        }}
      />
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
  calendar: {
    borderRadius: 10,
    backgroundColor: Colors.black,
  },
});

export default SchedulePage;
