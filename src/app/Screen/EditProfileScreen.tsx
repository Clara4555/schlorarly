import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const EditProfileScreen = () => {
  const [username, setUsername] = useState('Clara');
  const [email, setEmail] = useState('clara@example.com');
  const [profileImage, setProfileImage] = useState(require('../assets/mynft.jpg'));
  const [aboutMe, setAboutMe] = useState('This is a sample about me text where you can add more info about the user.');

  const handleSave = () => {
    // Here you can handle the logic to save the changes
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };

  const handleCancel = () => {
    // Reset to original values or navigate back
    Alert.alert('Cancelled', 'No changes have been made.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Edit Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileBanner}>
          <Image source={require('../assets/mynft.jpg')} style={styles.bannerImage} />
        </View>
        <View style={styles.profileDetails}>
          <Image source={profileImage} style={styles.avatar} />
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Profile Section */}
      <View style={styles.editSection}>
        <Text style={styles.sectionTitle}>Edit Profile</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#b9bbbe"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#b9bbbe"
        />
        
        {/* About Me Section */}
        <Text style={styles.aboutMeTitle}>About Me</Text>
        <TextInput
          style={styles.input}
          placeholder="Tell us about yourself"
          value={aboutMe}
          onChangeText={setAboutMe}
          placeholderTextColor="#b9bbbe"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3136',
  },
  header: {
    backgroundColor: '#202225',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2a2d32',
  },
  profileBanner: {
    height: 120,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  profileDetails: {
    flexDirection: 'column',
    paddingTop: -40,
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -40,
  },
  changeAvatarButton: {
    marginTop: 10,
    backgroundColor: '#5865f2',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  changeAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editSection: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#b9bbbe',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#36393f',
  },
  aboutMeTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#43b581',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cancelButton: {
    backgroundColor: '#f04747',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;