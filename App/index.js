// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLetter = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. Please provide a random letter for kids learning to read.'
          },
          {
            role: 'user',
            content: 'Please provide a random letter.'
          }
        ],
        model: 'gpt-4o'
      });

      const { data } = response;
      const resultString = data.response;
      setLetter(resultString.trim());
    } catch (error) {
      console.error('Error fetching the letter:', error);
      setLetter('Error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.box}>
          <Text style={styles.title}>Learn to Read</Text>
          <View style={styles.letterContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.letter}>{letter}</Text>
            )}
          </View>
          <Button title="Next Letter" onPress={fetchLetter} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  letterContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  letter: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FF5733',
  },
});