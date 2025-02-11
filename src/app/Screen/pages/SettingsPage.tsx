import { View, Text, ScrollView, TouchableOpacity,Image, GestureResponderEvent, StyleSheet } from 'react-native'
import React from 'react'

export default function SettingsPage() {
  function handleEditProfileScreen(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileBanner}>
          <Image
            source={require('../../assets/mynft.jpg')}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.profileDetails}>
          <Image
            source={require('../../assets/mynft.jpg')}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.username}>Clara</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileInfo}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          This is a sample about me text where you can add more info about the user.
        </Text>
      </View>

      {/* Buttons or additional actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfileScreen}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f', // Dark theme background
  },
  header: {
    backgroundColor: '#202225',
    paddingBottom: 20,
  },
  profileBanner: {
    height: 150,
    width: '100%',
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  profileDetails: {
    flexDirection: 'row',
    paddingTop: -40,
    marginLeft: 15,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -40,
  },
  profileText: {
    marginLeft: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  username: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  status: {
    color: '#1f1f1f',
    fontSize: 16,
  },
  profileInfo: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  aboutText: {
    color: '#b9bbbe',
    marginTop: 10,
    fontSize: 14,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,


  },
  actionButton: {
    backgroundColor: '#560677',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});