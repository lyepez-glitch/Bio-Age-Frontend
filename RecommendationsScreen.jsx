import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Card, ActivityIndicator } from 'react-native-paper';
const renderUrl = Constants.expoConfig.extra.RENDER_URL;
console.log('render url',renderUrl);

///// Define the GraphQL query for recommendations
const GET_RECOMMENDATIONS = gql`
  query GetRecommendations {
    recommendations {
      id
      recommendationText
    }
  }
`;

export default function RecommendationsScreen() {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS);

  if (loading) return <ActivityIndicator animating={true} size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personalized Recommendations:</Text>
      {data.recommendations.map((rec) => (
        <Card key={rec.id} style={styles.card}>
          <Card.Content>
            <Text>{rec.recommendationText}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  input: {
    marginBottom: 10,
    width: '80%'
  },
  button: {
    marginTop: 20,
    width: '80%'
  }
});
