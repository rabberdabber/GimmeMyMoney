import * as React from 'react';
import {Text, SafeAreaView, StyleSheet, Button} from 'react-native';
import {DetailScreenProps} from '../navigation/type';

const DetailScreen = ({navigation}: DetailScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>DetailsScreen</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.goBack()}
        title="go back">
        Return to Home Screen
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 70,
    height: 100,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default DetailScreen;
