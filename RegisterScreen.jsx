import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { RENDER_URL } from '@env';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${RENDER_URL}/api/register/`, {
        username,
        email,
        password,
      });
      setSuccess('User created successfully');
      setError('');
    } catch (err) {
      setError('Error creating user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register User
      </Button>
      <Button onPress={() => navigation.navigate('Login')} style={styles.button}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    width: '70%',  // Adjust width to 70% to make inputs a more manageable size
    alignSelf: 'center',  // Center the input fields
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',  // Center the error message
  },
  success: {
    color: 'green',
    marginBottom: 12,
    textAlign: 'center',  // Center the success message
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',  // Center the button
    width: '70%',  // Adjust width to 70% to make buttons match the input size
  },
  heading: {
    textAlign: 'center',  // Center the heading horizontally
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
