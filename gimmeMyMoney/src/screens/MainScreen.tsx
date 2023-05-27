import * as React from 'react';
import {Text, SafeAreaView, StyleSheet, Button} from 'react-native';
import {MainScreenProps, ScreenName} from '../navigation/type';

const MainScreen = ({navigation}: MainScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>MainScreen</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate(ScreenName.DetailScreen)}
        title="Press Me"
      />
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

export default MainScreen;
