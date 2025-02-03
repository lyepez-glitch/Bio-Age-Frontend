import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const renderUrl = process.env.RENDER_URL;

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${renderUrl}/api/token/`, {
                username,
                password,
            });

            AsyncStorage.setItem('token', response.data.access);
            setError('');
            navigation.navigate('ProfileSetup');
        } catch (err) {

            setError('Invalid username or password');
        }
    };

    return (
        <View style={styles.container}>
            <PaperInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <PaperInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Login" labelStyle={{ color: 'white' }} style={styles.button} onPress={handleLogin}>
                Login Here Please
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        alignItems: 'center' // Centers everything horizontally
    },

    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center' // Optionally center the error message
    },

    input: {
        width: '60%',  // Adjust the width of inputs to make them smaller
        marginBottom: 12,
        fontSize: 14,   // Reduced font size for smaller input
        paddingVertical: 8, // Reduced padding to make the input more compact
    },

    button: {
        width: '60%',  // Adjust the width of the button
        marginBottom: 10,
    }
});
