import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper'; // Use components from react-native-paper
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
const renderUrl = Constants.expoConfig.extra.RENDER_URL;
console.log('render url',renderUrl);

const UPDATE_HEALTH_METRICS = gql`
  mutation UpdateHealthMetrics(
    $restingHeartRate: Float!
    $hoursOfSleep: Float!
    $dailyActivityLevel: Float!
  ) {
    updateHealthMetrics(
      restingHeartRate: $restingHeartRate
      hoursOfSleep: $hoursOfSleep
      dailyActivityLevel: $dailyActivityLevel
    ) {
      success
    }
  }
`;

export default function HealthMetricsScreen({ navigation }) {
  const [heartRate, setHeartRate] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const [updateHealthMetrics, { loading, error }] = useMutation(UPDATE_HEALTH_METRICS);

  const handleMetricsSubmit = () => {
    if (!heartRate || !sleepHours || !activityLevel) {
      alert('Please fill in all fields.');
      return;
    }
    updateHealthMetrics({
      variables: {
        restingHeartRate: parseFloat(heartRate),
        hoursOfSleep: parseFloat(sleepHours),
        dailyActivityLevel: parseFloat(activityLevel),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Button
            style={styles.navButton}
            mode="contained"
            onPress={() => navigation.navigate('BiologicalAge')}
          >
            See Biological Age
          </Button>

          <TextInput
            label="Resting Heart Rate"
            value={heartRate}
            onChangeText={setHeartRate}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            returnKeyType="done"
          />
          <TextInput
            label="Hours of Sleep"
            value={sleepHours}
            onChangeText={setSleepHours}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            returnKeyType="done"
          />
          <TextInput
            label="Activity Level (1-10)"
            value={activityLevel}
            onChangeText={setActivityLevel}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            returnKeyType="done"
          />

          <Button
            style={styles.submitButton}
            mode="contained"
            onPress={handleMetricsSubmit}
          >
            Submit Metrics
          </Button>

          {loading && <Text style={styles.loading}>Loading...</Text>}
          {error && <Text style={styles.error}>Error: {error.message}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
    width: '80%',
  },
  navButton: {
    marginBottom: 20,
    width: '80%',
  },
  submitButton: {
    marginTop: 20,
    width: '80%',
  },
  loading: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
