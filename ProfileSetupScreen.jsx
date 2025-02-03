import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileSetupScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const renderUrl = Constants.expoConfig.extra.RENDER_URL;
  console.log('render url',renderUrl);
  const handleProfileSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(`https://${renderUrl}/api/profile-setup/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        height: 180,
        weight: 75,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('response', data);
      });

    navigation.navigate('HealthMetrics');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your Profile Details Over Here Please</Text>
      <TextInput
        label="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />
      <TextInput
        label="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />
      <TextInput
        label="Height"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleProfileSubmit} style={styles.button}>
        Next
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
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center', // Center the text horizontally
    fontWeight: 'bold', // Optional: Makes it bold
  },
  input: {
    marginBottom: 10,
    width: '70%', // Adjust the width to make it more appropriate
    alignSelf: 'center', // Center the input fields
  },
  button: {
    marginTop: 20,
    width: '70%', /// Adjust width to match the input fields
    alignSelf: 'center', // Center the button
  },
});
