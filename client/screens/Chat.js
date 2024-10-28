import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      // Add the new message to the list
      setMessages([...messages, { id: messages.length + 1, text: inputText }]);
      setInputText(''); // Clear the input field
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageList}
        inverted // Invert the list to show the latest messages at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={24} color="#1E90FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  messageList: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  messageContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1C1C1C',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    color: '#fff',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    padding: 10,
  },
});

export default Chat;
