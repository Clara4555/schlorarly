import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { coursesDummyData } from '../../data/courses'; // Assuming this is your dummy data import

export default function batchesPage() {
  const courses = coursesDummyData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Image source={{ uri: course.imageUrl }} style={styles.courseImage} />
            <Text style={styles.title}>{course.courseName}</Text>
            <Text style={styles.description}>{course.description}</Text>
            <Text style={styles.details}>Instructor: {course.instructor}</Text>
            <Text style={styles.details}>Duration: {course.duration}</Text>
            <Text style={styles.details}>Difficulty: {course.difficulty}</Text>
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
    marginTop: 50, // Added marginTop to push the header down
    marginBottom: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  courseCard: {
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
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#F5F5F5',
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: '#B3B3B3',
  },
});
