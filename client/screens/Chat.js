import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { OpenAI } from 'openai';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // OpenAI API client setup
  const client = new OpenAI({
    baseURL: "https://api-inference.huggingface.co/v1/", // Ensure this is the correct URL for your model
    apiKey: "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", // Replace with your actual Hugging Face API key
  });

  const handleSend = async () => {
    if (inputText.trim()) {
      // Add user message to chat
      const userMessage = { id: messages.length + 1, text: inputText, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText('');
      setLoading(true); // Set loading to true while awaiting response

      let out = "";

      try {
        // Stream response from the OpenAI API
        const stream = await client.chat.completions.create({
          model: "microsoft/DialoGPT-medium", // Ensure this model is correct and available
          messages: [
            {
              role: "system",
              content: `You are a compassionate mental health counselor named Theary, engaging empathetically with the user. Respond with empathy, support, and understanding:

              1. Show empathy for the user’s feelings.
              2. Offer encouragement and reassurance.
              3. Suggest mindfulness or relaxation techniques.
              4. Ask open-ended questions to encourage sharing.
              5. Avoid giving medical advice; suggest they seek professional help if needed.
              
              ---\nUser Message: "${inputText}"\nResponse:`,
            },
            { role: "user", content: inputText },
          ],
          max_tokens: 500,
          stream: true,
        });

        // Iterate through the streamed response
        for await (const chunk of stream) {
          if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta.content;
            out += newContent;

            // Update the bot message in real-time (optional)
            const botMessage = {
              id: messages.length + 2,
              text: out, // Append response as it streams in
              sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          }
        }

        // Final bot message after streaming completes
        if (out) {
          const finalMessage = {
            id: messages.length + 2,
            text: out,
            sender: 'bot',
          };
          setMessages((prevMessages) => [...prevMessages, finalMessage]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = {
          id: messages.length + 2,
          text: "I'm here to support you, even if there was a technical issue. Please share if you're comfortable.",
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
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
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
          <Text style={styles.sendButtonText}>{loading ? 'Sending...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messageList: { padding: 16 },
  userMessage: { alignSelf: 'flex-end', padding: 10, backgroundColor: '#d1e7ff', borderRadius: 10, marginVertical: 5 },
  botMessage: { alignSelf: 'flex-start', padding: 10, backgroundColor: '#ececec', borderRadius: 10, marginVertical: 5 },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#ccc' },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15 },
  sendButton: { marginLeft: 10, backgroundColor: '#1e90ff', borderRadius: 20, padding: 10 },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default Chat;
