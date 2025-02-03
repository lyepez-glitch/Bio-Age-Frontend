import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const renderUrl = Constants.expoConfig.extra.RENDER_URL;
console.log('render url',renderUrl);

export default function BiologicalAgeScreen({ navigation }) {
  const [biologicalAge, setBiologicalAge] = useState(null);


  useEffect(() => {
    const fetchBiologicalAge = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        if (token) {
          // Make the fetch request with the token
          const response = await fetch(`${renderUrl}/api/biological-age/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          if (response.ok) {
            // Set the biological age if the request is successful
            setBiologicalAge(data.biological_age);
          } else {
            console.error('Error fetching biological age:');
          }
        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching biological age:');
      }
    };

    fetchBiologicalAge();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Biological Age is: {biologicalAge}</Text>
      <Button
        title="See Recommendations"
        onPress={() => navigation.navigate('Recommendations')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center', // Centers everything inside the container
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center', // Ensures the text is centered
  },
  button: {
    width: '70%', ///// Make the button 70% of the container width
    marginTop: 20, // Adds space above the button
    marginBottom: 20, // Adds space below the button
  },
});
