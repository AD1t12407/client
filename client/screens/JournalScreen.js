import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const JournalScreen = () => {
  const [mood, setMood] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    if (mood && entry) {
      setEntries([...entries, { mood, entry, id: Math.random().toString() }]);
      setMood('');
      setEntry('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardMood}>{item.mood}</Text>
      <Text style={styles.cardEntry}>{item.entry}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker & Journal</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="How do you feel today? (e.g., Happy, Sad)"
          value={mood}
          onChangeText={setMood}
        />
        <TextInput
          style={styles.input}
          placeholder="Write your journal entry..."
          value={entry}
          onChangeText={setEntry}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
          <Icon name="add-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.entriesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 60,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#ffff',
    
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  entriesList: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardMood: {
    color: '#1E90FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardEntry: {
    color: '#fff',
    marginTop: 4,
  },
});

export default JournalScreen;

