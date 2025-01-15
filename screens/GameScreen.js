import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Alert } from 'react-native';

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const GameScreen = ({ route, navigation }) => {
  const { userNumber } = route.params;

  // Define range limits as references so they persist across renders
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // State to keep track of the current guess
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userNumber)
  );
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setIsGameOver(true); // Set game over state
    }
  }, [currentGuess, userNumber]);

  const nextGuessHandler = (direction) => {
    if (isGameOver) return; // Prevent further guessing if the game is over

    // Check if the user lies (providing incorrect direction)
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert('Don\'t Lie!', 'You provided the wrong direction.', [{ text: 'Okay', style: 'destructive' }]);
      return; // No action taken if the user lies
    }

    // Adjust the range based on the user's feedback
    if (direction === 'lower') {
      currentHigh.current = currentGuess; // Update the upper bound
    } else {
      currentLow.current = currentGuess + 1; // Update the lower bound
    }

    // Generate a new random guess within the updated range
    const nextGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
  };

  return (
    <ImageBackground source={require('../assets/chess2.jpeg')} style={styles.screen}>
      {isGameOver ? (
        <View>
          <Text style={styles.title}>🎉 Correct Guess! 🎉</Text>
          <Text style={styles.correctGuess}>The number is {currentGuess}!</Text>
          <Button
            title="Start New Game"
            onPress={() => navigation.goBack()}
            color="#1E90FF"
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Opponent's Guess</Text>
          <Text style={styles.guess}>{currentGuess}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Lower"
              onPress={() => nextGuessHandler('lower')}
              color="#1E90FF"
            />
            <Button
              title="Greater"
              onPress={() => nextGuessHandler('greater')}
              color="#1E90FF"
            />
          </View>
        </View>
      )}
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
    color: '#fff', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  guess: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  correctGuess: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;

