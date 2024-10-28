import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DailyQuestionnaire = () => {
    const [response, setResponse] = useState('');
    const navigation = useNavigation();

    const handleNext = () => {
        // Check if the response is not empty
        if (!response.trim()) {
            console.error('Input cannot be empty');
            return; // Prevent navigating if input is empty
        }

        // Navigate to the Playlist screen (you can change this to any other logic you want)
        navigation.navigate('HomePage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Your Response:</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your response here"
                placeholderTextColor="grey"
                value={response}
                onChangeText={setResponse}
            />

            <Pressable style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    label: {
        color: 'white',
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
        width: '80%',
        padding: 10,
        backgroundColor: '#1C1C1C',
        color: 'white',
        borderRadius: 5,
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DailyQuestionnaire;
