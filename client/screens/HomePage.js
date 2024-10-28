import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../constants/Footer'; // Adjust this path if Footer is in a different folder

const HomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to Home</Text>
        <Text style={styles.subheading}>
          Discover playlists, chat, and stay updated with the latest news.
        </Text>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    color: '#1E90FF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomePage;
