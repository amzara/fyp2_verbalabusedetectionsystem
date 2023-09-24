import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Vosk from 'react-native-vosk';
function AppScreen() {
  const [ready, setReady] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [result, setResult] = useState(null); // Initialize result as null

  const vosk = useRef(new Vosk()).current;

  const load = useCallback(() => {
    vosk
      .loadModel('model-en-us')
      .then(() => setReady(true))
      .catch((e) => console.log(e));
  }, [vosk]);

  const unload = useCallback(() => {
    vosk.unload();
    setReady(false);
  }, [vosk]);

  const sendToServer = async (text) => {
    try {
      const response = await fetch('http://192.168.0.8:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        console.error('Server response not OK');
        return;
      }

      const data = await response.json();
      console.log('Sentiment analysis result:', data);

      // Update the result state with the sentiment analysis result
      setResult(data);

      // Automatically initiate another recognition
      if (!recognizing) {
        record();
      }
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const record = () => {
    if (!ready) return;
    console.log('Starting recognition...');

    setRecognizing(true);

    vosk
      .start(null) // You can pass a grammar here if needed
      .then((res) => {
        console.log('Result is: ' + res);
        setResult(res);
        // Send the recognized text to the Flask server
        sendToServer(res);

        // Automatically initiate another recognition
        if (!recognizing) {
          record();
        }
      })
      .catch((e) => {
        console.log('Error: ' + e);
      })
      .finally(() => {
        setRecognizing(false);
      });
  };

  useEffect(() => {
    const resultEvent = vosk.onResult((res) => {
      console.log(res);
      setResult(res.data);

      // Send the recognized text to the Flask server
      sendToServer(res.data);

      // Automatically initiate another recognition
      if (!recognizing) {
        record();
      }
    });

    return () => {
      resultEvent.remove();
    };
  }, [vosk, recognizing]);

  useEffect(() => {
    if (ready && !recognizing) {
      record(); // Start initial recognition when ready
    }
  }, [ready, recognizing]);

  return (
    <View style={styles.container}>
      <Button onPress={ready ? unload : load} title={ready ? 'Unload model' : 'Load model'} color="blue" />
      <Text>Recognized word:</Text>
      {result && (
        <View>
          <Text>Sentiment Analysis Result:</Text>
          <Text>Text: {result.text}</Text>
          <Text>Sentiment: {result.sentiment}</Text>
          <Text>Compound Score: {result.compound_score}</Text>
          <Text>Positive Score: {result.positive_score}</Text>
          <Text>Negative Score: {result.negative_score}</Text>
          <Text>Neutral Scor    e: {result.neutral_score}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppScreen;
