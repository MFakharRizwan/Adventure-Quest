import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';

const StartGameScreen = ({ navigation }) => {
  const [enteredValue, setEnteredValue] = useState('');

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    navigation.navigate('Game', { userNumber: chosenNumber });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <ImageBackground 
          source={require('../assets/chess2.jpeg')} 
          style={styles.backgroundImage}
        >
          <Text style={styles.title}>Select a Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Reset" onPress={resetInputHandler} color="#1E90FF" />
              </View>
              <View style={styles.button}>
                <Button title="Confirm" onPress={confirmInputHandler} color="#1E90FF" />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%', // Ensure the background image covers the entire screen width
    height: '100%', // Ensure the background image covers the entire screen height
    justifyContent: 'center', // Centers the content vertically within the background
    alignItems: 'center', // Centers the content horizontally
  },
  title: {
    marginTop: -100,
    fontSize: 20,
    marginVertical: 10,
    color: '#fff', // White text
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 5,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    width: 50,
    textAlign: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    color: 'white',
  },
  button: {
    color: 'white',
    width: 100,
  },
});

export default StartGameScreen;

