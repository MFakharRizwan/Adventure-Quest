import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';

const GameOverScreen = ({ route, navigation }) => {
  const { userNumber, guessCount, finalGuess } = route.params;

  return (
    <ImageBackground source={require('../assets/chess2.jpeg')} style={styles.screen}>
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.resultText}>
        The correct number was <Text style={styles.highlight}>{finalGuess}</Text>.
      </Text>
      <Text style={styles.resultText}>
        It took <Text style={styles.highlight}>{guessCount}</Text> tries to guess the number!
      </Text>
      <Button title="Start New Game" onPress={() => navigation.popToTop()} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    color: '#fff', // White text
  },
  highlight: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default GameOverScreen;
